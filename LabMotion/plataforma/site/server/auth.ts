import {ApiError,code,cookie,hash,id,now,sessionCookie,str} from './security.ts';
import {one,audit,type Actor,type DB} from './store.ts';
import {passwordHash,validatePassword,verifyPassword} from './passwords.ts';
export type Settings={ADMIN_SETUP_HASH?:string;INFRA_PROBE_TOKEN?:string};
export async function throttle(db:DB,request:Request,scope:string,limit=12){
  const bucket=Math.floor(Date.now()/600_000),expires=(bucket+1)*600_000;
  const key=await hash(`${scope}|${request.headers.get('cf-connecting-ip')??'local'}|${bucket}`);
  const r=await db.prepare('INSERT INTO limites_entrada(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(key,expires).first<{count:number}>();
  if(!r||r.count>limit)throw new ApiError(429,'Muitas tentativas. Aguarde até dez minutos e tente novamente.');
  await db.prepare('DELETE FROM limites_entrada WHERE expires<?').bind(Date.now()).run();
}
export async function session(db:DB,request:Request,actor:Actor){const token=code(24),at=now();await db.prepare('INSERT INTO sessoes_auth(token_hash,actor_id,role,expires_at,created_at) VALUES(?,?,?,?,?)').bind(await hash(token),actor.id,actor.role,new Date(Date.now()+43_200_000).toISOString(),at).run();return sessionCookie(request,token);}
export async function actorFor(db:DB,request:Request):Promise<Actor|null>{
  const token=cookie(request,'lm_session');if(!token)return null;
  const s=await one<{actor_id:string;role:string}>(db,'SELECT actor_id,role FROM sessoes_auth WHERE token_hash=? AND expires_at>?',await hash(token),now());if(!s)return null;
  if(s.role==='student'){const a=await one<{id:string;class_id:string;nickname:string}>(db,'SELECT id,class_id,nickname FROM alunos WHERE id=?',s.actor_id);return a?{id:a.id,role:'student',nickname:a.nickname,classId:a.class_id}:null;}
  const p=await one<{id:string;email:string;role:'teacher'|'admin';must_change_password:number}>(db,'SELECT id,email,role,must_change_password FROM professores WHERE id=? AND active=1',s.actor_id);
  return p?{id:p.id,email:p.email,role:p.role,mustChangePassword:!!p.must_change_password}:null;
}
export function emailAddress(value:unknown){const email=str(value,'E-mail docente',3,254).toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new ApiError(400,'E-mail inválido.');return email;}
export async function passwordLogin(db:DB,request:Request,emailValue:unknown,passwordValue:unknown){
  await throttle(db,request,'adult-login',8);
  const email=emailAddress(emailValue),password=typeof passwordValue==='string'&&passwordValue.length<=128?passwordValue:'';
  const p=await one<{id:string;email:string;role:'teacher'|'admin';password_hash:string|null;must_change_password:number}>(db,'SELECT id,email,role,password_hash,must_change_password FROM professores WHERE email=? AND active=1',email);
  if(!await verifyPassword(password,p?.password_hash??null)||!p)throw new ApiError(401,'E-mail ou senha inválidos.');
  const actor:Actor={id:p.id,email:p.email,role:p.role,mustChangePassword:!!p.must_change_password};
  await audit(db,actor,'adult_login',actor.id);return {actor,cookie:await session(db,request,actor)};
}
export async function bootstrap(db:DB,request:Request,settings:Settings,body:Record<string,unknown>){
  await throttle(db,request,'admin-setup',5);
  if(!settings.ADMIN_SETUP_HASH||await hash(str(body.setupToken,'Chave de configuração',20,200))!==settings.ADMIN_SETUP_HASH)throw new ApiError(403,'Chave de configuração inválida.');
  if(await one(db,"SELECT key FROM configuracao WHERE key='admin_created'"))throw new ApiError(409,'O administrador inicial já foi configurado.');
  const email=emailAddress(body.email),encoded=await passwordHash(validatePassword(body.password)),actor:Actor={id:id(),email,role:'admin'};const at=now();
  await db.batch([
    db.prepare("INSERT INTO configuracao(key,value) VALUES('admin_created',?) ON CONFLICT(key) DO NOTHING").bind(actor.id),
    db.prepare("INSERT INTO professores(id,email,role,active,created_at,password_hash) SELECT ?,?,'admin',1,?,? WHERE EXISTS(SELECT 1 FROM configuracao WHERE key='admin_created' AND value=?)").bind(actor.id,email,at,encoded,actor.id),
  ]);
  if(!await one(db,'SELECT id FROM professores WHERE id=?',actor.id))throw new ApiError(409,'O administrador inicial já foi configurado.');
  await audit(db,actor,'admin_bootstrapped',actor.id);return {actor,cookie:await session(db,request,actor)};
}
export async function changePassword(db:DB,request:Request,actor:Actor,body:Record<string,unknown>){
  await throttle(db,request,'password-change',5);
  const current=await one<{password_hash:string|null}>(db,'SELECT password_hash FROM professores WHERE id=? AND active=1',actor.id);
  if(!current||!await verifyPassword(typeof body.currentPassword==='string'?body.currentPassword:'',current.password_hash))throw new ApiError(401,'Senha atual inválida.');
  const encoded=await passwordHash(validatePassword(body.password));
  await db.batch([db.prepare('UPDATE professores SET password_hash=?,must_change_password=0 WHERE id=?').bind(encoded,actor.id),db.prepare('DELETE FROM sessoes_auth WHERE actor_id=?').bind(actor.id)]);
  await audit(db,actor,'password_changed',actor.id);return session(db,request,{...actor,mustChangePassword:false});
}
