import { ApiError, code, cookie, hash, normalizeCode, now, sessionCookie, str } from './security.ts';
import { one, type Actor, type DB } from './store.ts';
export type Settings = {SUPABASE_URL?:string;SUPABASE_ANON_KEY?:string;ADMIN_EMAILS?:string;INFRA_PROBE_TOKEN?:string};
export async function throttle(db:DB, request:Request, scope:string, limit=12) {
  const bucket=Math.floor(Date.now()/600_000), expires=(bucket+1)*600_000;
  // IP itself is not persisted. One bucket covers all guessed codes on that IP.
  const key=await hash(`${scope}|${request.headers.get('cf-connecting-ip')??'local'}|${bucket}`);
  const result=await db.prepare('INSERT INTO limites_entrada(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(key,expires).first<{count:number}>();
  if (!result || result.count>limit) throw new ApiError(429,'Muitas tentativas. Aguarde até dez minutos e tente novamente.');
  await db.prepare('DELETE FROM limites_entrada WHERE expires<?').bind(Date.now()).run();
}
export async function session(db:DB, request:Request, actor:Actor) {
  const token=code(24), at=now(), expires=new Date(Date.now()+43_200_000).toISOString();
  await db.prepare('INSERT INTO sessoes_auth(token_hash,actor_id,role,expires_at,created_at) VALUES(?,?,?,?,?)').bind(await hash(token),actor.id,actor.role,expires,at).run();
  return sessionCookie(request,token);
}
export async function actorFor(db:DB, request:Request):Promise<Actor|null> {
  const token=cookie(request,'lm_session'); if (!token) return null;
  const s=await one<{actor_id:string;role:string}>(db,'SELECT actor_id,role FROM sessoes_auth WHERE token_hash=? AND expires_at>?',await hash(token),now());
  if (!s) return null;
  if (s.role==='student') {
    const a=await one<{id:string;class_id:string;nickname:string}>(db,'SELECT id,class_id,nickname FROM alunos WHERE id=?',s.actor_id);
    return a?{id:a.id,role:'student',nickname:a.nickname,classId:a.class_id}:null;
  }
  const p=await one<{id:string;email:string;role:'teacher'|'admin'}>(db,'SELECT id,email,role FROM professores WHERE id=? AND active=1',s.actor_id);
  return p?{id:p.id,email:p.email,role:p.role}:null;
}
export function authConfig(settings:Settings) {
  if (!settings.SUPABASE_URL || !settings.SUPABASE_ANON_KEY) throw new ApiError(503,'Login docente ainda não configurado. É necessário um projeto Supabase.');
  const url=new URL(settings.SUPABASE_URL);
  if (url.protocol!=='https:') throw new ApiError(503,'Provedor de autenticação inválido.');
  return {base:url.origin,headers:{'apikey':settings.SUPABASE_ANON_KEY,'content-type':'application/json'}};
}
export async function magicLink(db:DB,request:Request,settings:Settings,emailValue:unknown,fetcher:typeof fetch) {
  const config=authConfig(settings), email=str(emailValue,'E-mail docente',3,254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new ApiError(400,'E-mail inválido.');
  await throttle(db,request,'magic',5);
  const admins=(settings.ADMIN_EMAILS??'').toLowerCase().split(',').map(s=>s.trim());
  const known=admins.includes(email)||Boolean(await one(db,'SELECT id FROM professores WHERE email=? AND active=1',email));
  // Same response for unknown accounts; no mail is sent to unapproved addresses.
  const verifier=code(24).replaceAll('-','');
  const bytes=new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier)));
  const challenge=btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');
  if (known) {
    const redirect=new URL('/auth/confirm',request.url).href;
    const r=await fetcher(`${config.base}/auth/v1/otp?redirect_to=${encodeURIComponent(redirect)}`,{method:'POST',headers:config.headers,body:JSON.stringify({email,create_user:true,code_challenge:challenge,code_challenge_method:'s256'})});
    if (!r.ok) throw new ApiError(502,'Não foi possível solicitar o link de acesso.');
  }
  return {message:'Se o e-mail estiver autorizado, você receberá um link de acesso.',cookie:`lm_pkce=${verifier}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600${new URL(request.url).protocol==='https:'?'; Secure':''}`};
}
export async function exchange(db:DB,request:Request,settings:Settings,authCode:unknown,fetcher:typeof fetch) {
  const config=authConfig(settings), verifier=cookie(request,'lm_pkce');
  if (!verifier) throw new ApiError(401,'Abra o link no mesmo navegador em que pediu o acesso.');
  await throttle(db,request,'exchange',8);
  const r=await fetcher(`${config.base}/auth/v1/token?grant_type=pkce`,{method:'POST',headers:config.headers,body:JSON.stringify({auth_code:str(authCode,'Código de acesso',1,1000),code_verifier:verifier})});
  if (!r.ok) throw new ApiError(401,'Link inválido ou expirado. Solicite outro.');
  const tokens=await r.json() as {access_token:string};
  const u=await fetcher(`${config.base}/auth/v1/user`,{headers:{...config.headers,Authorization:`Bearer ${tokens.access_token}`}});
  if (!u.ok) throw new ApiError(401,'Identidade não confirmada.');
  const user=await u.json() as {email?:string;email_confirmed_at?:string};
  if (!user.email || !user.email_confirmed_at) throw new ApiError(401,'E-mail não confirmado.');
  const email=user.email.toLowerCase();
  const admins=(settings.ADMIN_EMAILS??'').toLowerCase().split(',').map(s=>s.trim());
  if (admins.includes(email)) await db.prepare("INSERT INTO professores(id,email,role,active,created_at) VALUES(?,?,'admin',1,?) ON CONFLICT(email) DO NOTHING").bind(crypto.randomUUID(),email,now()).run();
  const row=await one<{id:string;email:string;role:'teacher'|'admin'}>(db,'SELECT id,email,role FROM professores WHERE email=? AND active=1',email);
  if (!row) throw new ApiError(403,'Conta sem autorização para o LabMotion.');
  const actor:Actor={id:row.id,email:row.email,role:row.role};
  return {actor,cookie:await session(db,request,actor)};
}
