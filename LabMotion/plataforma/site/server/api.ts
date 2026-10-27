import { ApiError, checkOrigin, code, cookie, csv, eventKey, hash, id, nickname, normalizeCode, now, sessionCookie, str, integer } from './security.ts';
import { actorFor, exchange, magicLink, session, throttle, type Settings } from './auth.ts';
import { all, one, audit, createGame, gameView, getGame, mutateGame, requireClass, type Actor, type DB, type GameRow } from './store.ts';
import { VERSION, type Action, type State } from './game.ts';

const json = (body:unknown,status=200,headers:HeadersInit={}) => Response.json(body,{status,headers:{'cache-control':'no-store','x-content-type-options':'nosniff','referrer-policy':'no-referrer',...headers}});
function requireActor(actor:Actor|null,roles:Actor['role'][]):asserts actor is Actor {
  if (!actor) throw new ApiError(401,'Entre para continuar.');
  if (!roles.includes(actor.role)) throw new ApiError(403,'Acesso não autorizado.');
}
function admin(actor:Actor|null):asserts actor is Actor { requireActor(actor,['admin']); }
function hasPath(path:string[], ...parts:string[]) {return path.length===parts.length&&parts.every((p,i)=>p==='*'||path[i]===p);}
function summary(games:GameRow[], answers:Record<string,unknown>[], events:Record<string,unknown>[]) {
  const bySubject=['Medidas','Gráficos','MRU','MRUV','Parecer'].map((subject,i)=>{
    const first=answers.filter(a=>String(a.item_id).startsWith(`${i+1}.`)&&a.attempt===1&&!a.structural);
    return {subject,firstCorrect:first.filter(a=>a.correct===1).length,attempted:first.length};
  });
  return {completedActivities:games.filter(g=>Boolean(g.completed_at)).length,bySubject,hints:events.filter(e=>e.kind==='hint').length,
    evolution:games.map(g=>{const s=JSON.parse(g.state) as State;return {gameId:g.id,date:g.created_at,completed:s.completed,phase:s.phase,points:s.points,pre:s.pre,post:s.post,contentVersion:g.content_version,finished:!!g.completed_at};})};
}
async function report(db:DB, actor:Actor, classId:string) {
  await requireClass(db,actor,classId);
  const students=await all(db,'SELECT id,nickname,created_at FROM alunos WHERE class_id=? ORDER BY nickname',classId);
  const games=await all<GameRow>(db,'SELECT * FROM partidas WHERE class_id=? ORDER BY created_at',classId);
  const answers=await all(db,'SELECT r.*,p.student_id FROM respostas r JOIN partidas p ON p.id=r.game_id WHERE p.class_id=?',classId);
  const events=await all(db,'SELECT e.game_id,e.kind,e.item_id,e.detail,e.at,p.student_id FROM eventos e JOIN partidas p ON p.id=e.game_id WHERE p.class_id=?',classId);
  const texts=await all(db,`SELECT t.*,p.student_id,a.nickname,r.rubric,r.comment,r.version,r.created_at AS reviewed_at FROM textos t JOIN partidas p ON p.id=t.game_id JOIN alunos a ON a.id=p.student_id LEFT JOIN revisoes_docentes r ON r.text_id=t.id AND r.version=(SELECT MAX(version) FROM revisoes_docentes WHERE text_id=t.id) WHERE p.class_id=? ORDER BY t.created_at`,classId);
  const studentsReport=students.map(a=>({studentId:a.id,nickname:a.nickname,...summary(games.filter(g=>g.student_id===a.id),answers.filter(r=>r.student_id===a.id),events.filter(e=>e.student_id===a.id))}));
  const items=[...new Set(answers.map(a=>`${a.game_id}|${a.item_id}`))].map(key=>{
    const group=answers.filter(a=>`${a.game_id}|${a.item_id}`===key).sort((a,b)=>Number(a.attempt)-Number(b.attempt));const a=group[0];
    return {studentId:a.student_id,nickname:students.find(s=>s.id===a.student_id)?.nickname,gameId:a.game_id,itemId:a.item_id,attempts:group.length,errors:group.filter(r=>!r.correct).length,firstCorrect:!!a.correct,structural:!!a.structural,hints:events.filter(e=>e.game_id===a.game_id&&e.item_id===a.item_id&&e.kind==='hint').length,elapsedMs:group.reduce((n,r)=>n+Number(r.elapsed_ms??0),0),dataLabel:'dados didáticos'};
  });
  return {dataLabel:'Dados didáticos e idealizados',students:studentsReport,games:games.map(gameView),answers,items,events,texts,...summary(games,answers,events)};
}

export async function handleApi(request:Request,db:DB,settings:Settings={},fetcher:typeof fetch=fetch):Promise<Response> {
  try {
    const url=new URL(request.url), path=url.pathname.replace(/^\/api\/?/,'').split('/').filter(Boolean);
    const method=request.method;
    let body:Record<string,unknown>={};
    if (method==='POST') {
      checkOrigin(request);
      if (Number(request.headers.get('content-length')??0)>100_000) throw new ApiError(413,'Registro muito grande.');
      const raw=await request.text(); if(raw.length>100_000) throw new ApiError(413,'Registro muito grande.');
      try {body=JSON.parse(raw);}catch{throw new ApiError(400,'JSON inválido.');}
      if (!body || typeof body!=='object' || Array.isArray(body)) throw new ApiError(400,'Registro inválido.');
    }
    if (hasPath(path,'health')&&method==='GET') {
      await one(db,'SELECT 1 AS ok'); return json({ok:true,contentVersion:VERSION,dataLabel:'Dados didáticos',adultAuthConfigured:!!settings.SUPABASE_URL&&!!settings.SUPABASE_ANON_KEY});
    }
    // Restricted to an ephemeral secret and an isolated infrastructure-only table.
    if (hasPath(path,'infra-probe')&&method==='POST') {
      if (!settings.INFRA_PROBE_TOKEN || request.headers.get('x-lm-probe')!==settings.INFRA_PROBE_TOKEN) throw new ApiError(404,'Recurso não encontrado.');
      const key=eventKey(body.eventId);
      await db.prepare('INSERT INTO infra_probes(id,created_at) VALUES(?,?) ON CONFLICT(id) DO NOTHING').bind(key,now()).run();
      const row=await one(db,'SELECT id,created_at FROM infra_probes WHERE id=?',key);
      const total=await one<{n:number}>(db,'SELECT COUNT(*) AS n FROM infra_probes WHERE id=?',key);
      return json({persisted:!!row,count:total?.n});
    }
    if (hasPath(path,'auth','magic')&&method==='POST') { const r=await magicLink(db,request,settings,body.email,fetcher);return json({message:r.message},200,{'set-cookie':r.cookie}); }
    if (hasPath(path,'auth','exchange')&&method==='POST') { const r=await exchange(db,request,settings,body.code,fetcher);return json({actor:r.actor},200,{'set-cookie':r.cookie}); }
    if (hasPath(path,'auth','student')&&method==='POST') {
      await throttle(db,request,'student',12);
      const invite=await one<{class_id:string}>(db,'SELECT i.class_id FROM convites_turma i JOIN turmas t ON t.id=i.class_id WHERE i.code_hash=? AND i.revoked_at IS NULL AND t.archived=0',await hash(normalizeCode(str(body.classCode,'Código de turma',10,200))));
      if (!invite) throw new ApiError(401,'Código de turma ou pessoal inválido.');
      let studentId:string, personalCode:string|undefined;
      if (body.register===true) {
        if (body.privacyAccepted!==true) throw new ApiError(400,'Leia o aviso de uso dos dados antes de criar o perfil.');
        studentId=id(); personalCode=code(); const at=now();
        await db.batch([
          db.prepare('INSERT INTO alunos(id,class_id,nickname,created_at) VALUES(?,?,?,?)').bind(studentId,invite.class_id,nickname(body.nickname),at),
          db.prepare('INSERT INTO credenciais_aluno(id,student_id,code_hash,created_at) VALUES(?,?,?,?)').bind(id(),studentId,await hash(normalizeCode(personalCode)),at),
        ]);
      } else {
        const student=await one<{id:string}>(db,'SELECT a.id FROM credenciais_aluno c JOIN alunos a ON a.id=c.student_id WHERE c.code_hash=? AND c.revoked_at IS NULL AND a.class_id=?',await hash(normalizeCode(str(body.personalCode,'Código pessoal',20,200))),invite.class_id);
        if (!student) throw new ApiError(401,'Código de turma ou pessoal inválido.'); studentId=student.id;
        // Nickname is a display label. Identity always comes from the personal code.
        if (body.nickname!==undefined) await db.prepare('UPDATE alunos SET nickname=? WHERE id=?').bind(nickname(body.nickname),studentId).run();
      }
      const actor:Actor={id:studentId,role:'student',classId:invite.class_id};
      return json({actor,personalCode,showOnce:!!personalCode},200,{'set-cookie':await session(db,request,actor)});
    }
    const actor=await actorFor(db,request);
    if (hasPath(path,'me')&&method==='GET') return json({actor});
    if (hasPath(path,'auth','logout')&&method==='POST') {
      const token=cookie(request,'lm_session');if(token) await db.prepare('DELETE FROM sessoes_auth WHERE token_hash=?').bind(await hash(token)).run();
      return json({ok:true},200,{'set-cookie':sessionCookie(request,'',0)});
    }
    if (hasPath(path,'me','nickname')&&method==='POST') {requireActor(actor,['student']);await db.prepare('UPDATE alunos SET nickname=? WHERE id=?').bind(nickname(body.nickname),actor.id).run();return json({ok:true});}
    if (hasPath(path,'me','summary')&&method==='GET') {
      requireActor(actor,['student']);
      const games=await all<GameRow>(db,'SELECT * FROM partidas WHERE student_id=? ORDER BY created_at',actor.id);
      const answers=await all(db,'SELECT r.* FROM respostas r JOIN partidas p ON p.id=r.game_id WHERE p.student_id=?',actor.id);
      const events=await all(db,'SELECT e.kind FROM eventos e JOIN partidas p ON p.id=e.game_id WHERE p.student_id=?',actor.id);
      const imports=await all(db,'SELECT id,created_at,origin FROM sessoes_legadas WHERE student_id=?',actor.id);
      const reviews=await all(db,'SELECT t.kind,t.mission,r.rubric,r.comment FROM revisoes_docentes r JOIN textos t ON t.id=r.text_id JOIN partidas p ON p.id=t.game_id WHERE p.student_id=? AND r.version=(SELECT MAX(version) FROM revisoes_docentes WHERE text_id=t.id)',actor.id);
      return json({...summary(games,answers,events),games:games.map(gameView),imports,reviews});
    }
    if (hasPath(path,'games')&&method==='POST') {requireActor(actor,['student']);return json(gameView(await createGame(db,actor,eventKey(body.gameId),str(body.conditions,'Condições de uso',2,1000))));}
    if (hasPath(path,'games','*')&&method==='GET') {requireActor(actor,['student','teacher','admin']);return json(gameView(await getGame(db,actor,path[1])));}
    if (hasPath(path,'games','*','events')&&method==='POST') {
      requireActor(actor,['student']); const action=body.action;
      if(!action||typeof action!=='object'||Array.isArray(action))throw new ApiError(400,'Operação inválida.');
      return json(await mutateGame(db,actor,path[1],eventKey(body.eventId),action as Action));
    }
    if (hasPath(path,'imports')&&method==='POST') {
      requireActor(actor,['student']);const legacy=body.record as Record<string,unknown>;
      if(!legacy||legacy.produto!=='LabMotion'||legacy.versao!=='2.0'||legacy.unidade!=='equipe')throw new ApiError(400,'Selecione um registro de equipe LabMotion 2.0.');
      // Whitelist legacy fields. Never trust its score, answer key, timestamps or ownership.
      const safe={produto:'LabMotion',versao:'2.0',unidade:'equipe',pontuacaoLudica:typeof legacy.pontuacaoLudica==='number'?Math.min(265,Math.max(0,legacy.pontuacaoLudica)):null,
        diagnosticoInicial:Array.isArray(legacy.diagnosticoInicial)?legacy.diagnosticoInicial.slice(0,6):null,diagnosticoFinal:Array.isArray(legacy.diagnosticoFinal)?legacy.diagnosticoFinal.slice(0,6):null,
        justificativas:Array.isArray(legacy.justificativas)?legacy.justificativas.slice(0,5).map(x=>String(x).slice(0,5000)):[],limitacao:String(legacy.limitacao??'').slice(0,5000),conclusaoCER:String(legacy.conclusaoCER??'').slice(0,5000),debriefing:Array.isArray(legacy.debriefing)?legacy.debriefing.slice(0,5).map(x=>String(x).slice(0,5000)):[],
        origin:'equipe_local_nao_verificada',missing:['tentativas por item','tempo','participantes','identidade individual'],dataLabel:'dados didáticos'};
      const key=eventKey(body.importId);
      await db.prepare('INSERT INTO sessoes_legadas(id,student_id,record,origin,created_at) VALUES(?,?,?,?,?) ON CONFLICT(id) DO NOTHING').bind(key,actor.id,JSON.stringify(safe),'equipe_local_nao_verificada',now()).run();
      return json({ok:true,origin:safe.origin,excludedFromVerifiedIndicators:true});
    }
    if (hasPath(path,'classes')&&method==='GET') {requireActor(actor,['teacher','admin']);return json(await all(db,`SELECT t.*,p.email AS teacher_email FROM turmas t JOIN professores p ON p.id=t.teacher_id ${actor.role==='admin'?'':'WHERE teacher_id=?'} ORDER BY created_at DESC`,...(actor.role==='admin'?[]:[actor.id])));}
    if (hasPath(path,'classes')&&method==='POST') {
      requireActor(actor,['teacher','admin']);const classId=id();const teacherId=actor.role==='admin'&&body.teacherId?str(body.teacherId,'Professor'):actor.id;
      if(!await one(db,"SELECT id FROM professores WHERE id=? AND active=1",teacherId))throw new ApiError(400,'Professor indisponível.');
      await db.prepare('INSERT INTO turmas(id,teacher_id,title,created_at) VALUES(?,?,?,?)').bind(classId,teacherId,str(body.title,'Nome da turma',2,100),now()).run();
      await audit(db,actor,'class_created',classId);return json({id:classId});
    }
    if (hasPath(path,'classes','*','invite')&&method==='POST') {
      requireActor(actor,['teacher','admin']);await requireClass(db,actor,path[1]);const at=now(),personal=body.revokeOnly?null:code(12);
      const statements=[db.prepare('UPDATE convites_turma SET revoked_at=? WHERE class_id=? AND revoked_at IS NULL').bind(at,path[1])];
      if(personal)statements.push(db.prepare('INSERT INTO convites_turma(id,class_id,code_hash,created_at) VALUES(?,?,?,?)').bind(id(),path[1],await hash(normalizeCode(personal)),at));
      await db.batch(statements);await audit(db,actor,'class_invite_rotated',path[1]);return json({code:personal,link:personal?`${url.origin}/?turma=${encodeURIComponent(personal)}`:null});
    }
    if (hasPath(path,'classes','*','report')&&method==='GET') {requireActor(actor,['teacher','admin']);return json(await report(db,actor,path[1]));}
    if (hasPath(path,'classes','*','export')&&method==='GET') {
      requireActor(actor,['teacher','admin']);const r=await report(db,actor,path[1]);await audit(db,actor,'class_export',path[1]);
      if(url.searchParams.get('format')==='csv') {
        const rows=url.searchParams.get('scope')==='items'?r.items:r.students.map(s=>({studentId:s.studentId,nickname:s.nickname,completedActivities:s.completedActivities,hints:s.hints,latestProgress:s.evolution.at(-1)?.completed??0,phase:s.evolution.at(-1)?.phase??'sem partida',bySubject:s.bySubject,evolution:s.evolution,dataLabel:'dados didáticos'}));
        return new Response(csv(rows),{headers:{'content-type':'text/csv; charset=utf-8','content-disposition':'attachment; filename="LabMotion_registros.csv"','cache-control':'no-store'}});
      }
      return json(r,200,{'content-disposition':'attachment; filename="LabMotion_registros.json"'});
    }
    if (hasPath(path,'students','*','rotate-code')&&method==='POST') {
      requireActor(actor,['teacher','admin']);const a=await one<{class_id:string}>(db,'SELECT class_id FROM alunos WHERE id=?',path[1]);if(!a)throw new ApiError(404,'Aluno não encontrado.');await requireClass(db,actor,a.class_id);
      const personal=code(),at=now();await db.batch([
        db.prepare('UPDATE credenciais_aluno SET revoked_at=? WHERE student_id=? AND revoked_at IS NULL').bind(at,path[1]),
        db.prepare('DELETE FROM sessoes_auth WHERE actor_id=?').bind(path[1]),
        db.prepare('INSERT INTO credenciais_aluno(id,student_id,code_hash,created_at) VALUES(?,?,?,?)').bind(id(),path[1],await hash(normalizeCode(personal)),at),
        db.prepare('INSERT INTO auditoria(id,actor_id,action,target_id,at) VALUES(?,?,?,?,?)').bind(id(),actor.id,'student_code_rotated',path[1],at),
      ]);return json({personalCode:personal,showOnce:true});
    }
    if (hasPath(path,'texts','*','review')&&method==='POST') {
      requireActor(actor,['teacher','admin']);const t=await one<{class_id:string}>(db,'SELECT p.class_id FROM textos t JOIN partidas p ON p.id=t.game_id WHERE t.id=?',path[1]);if(!t)throw new ApiError(404,'Texto não encontrado.');await requireClass(db,actor,t.class_id);
      const rubric=body.rubric as Record<string,unknown>;
      if(!rubric||typeof rubric!=='object'||Array.isArray(rubric)||Object.keys(rubric).length<1||Object.keys(rubric).length>10)throw new ApiError(400,'Rubrica inválida.');
      const cleaned=Object.fromEntries(Object.entries(rubric).map(([k,v])=>[str(k,'Critério',1,60),integer(v,0,3)]));
      const comment=str(body.comment,'Comentário',3,5000);
      await db.prepare('INSERT INTO revisoes_docentes(id,text_id,teacher_id,rubric,comment,version,created_at) SELECT ?,?,?,?,?,COALESCE(MAX(version),0)+1,? FROM revisoes_docentes WHERE text_id=?').bind(id(),path[1],actor.id,JSON.stringify(cleaned),comment,now(),path[1]).run();
      await audit(db,actor,'text_reviewed',path[1]);return json({ok:true});
    }
    if (hasPath(path,'admin','teachers')&&method==='GET') {admin(actor);await audit(db,actor,'admin_teachers_read','all');return json(await all(db,'SELECT id,email,role,active,created_at FROM professores ORDER BY email'));}
    if (hasPath(path,'admin','teachers')&&method==='POST') {
      admin(actor);const email=str(body.email,'E-mail docente',3,254).toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new ApiError(400,'E-mail inválido.');
      if(email===actor.email&&body.active===false)throw new ApiError(400,'Você não pode desativar sua própria conta.');
      await db.prepare("INSERT INTO professores(id,email,role,active,created_at) VALUES(?,?,'teacher',?,?) ON CONFLICT(email) DO UPDATE SET active=excluded.active").bind(id(),email,body.active===false?0:1,now()).run();await audit(db,actor,'teacher_updated',email);return json({ok:true});
    }
    if (hasPath(path,'admin','overview')&&method==='GET') {
      admin(actor);await audit(db,actor,'admin_overview_read','all');
      const counts=await one(db,'SELECT (SELECT COUNT(*) FROM turmas) AS classes,(SELECT COUNT(*) FROM alunos) AS students,(SELECT COUNT(*) FROM partidas) AS games,(SELECT COUNT(*) FROM partidas WHERE completed_at IS NOT NULL) AS completed,(SELECT AVG((julianday(completed_at)-julianday(created_at))*86400) FROM partidas WHERE completed_at IS NOT NULL) AS meanDurationSeconds');
      const wrongItems=await all(db,'SELECT item_id,COUNT(*) AS attempts,SUM(CASE WHEN correct=0 THEN 1 ELSE 0 END) AS errors FROM respostas GROUP BY item_id ORDER BY errors DESC');
      const byDate=await all(db,'SELECT substr(created_at,1,10) AS date,COUNT(*) AS games FROM partidas GROUP BY substr(created_at,1,10) ORDER BY date');
      const hints=await one(db,"SELECT COUNT(*) AS n FROM eventos WHERE kind='hint'");return json({counts,wrongItems,byDate,hints,dataLabel:'Dados didáticos',durationDefinition:'Tempo decorrido entre início e conclusão; inclui interrupções. Não participa de pontuação.'});
    }
    throw new ApiError(404,'Recurso não encontrado.');
  } catch(error) {
    if(error instanceof ApiError)return json({error:error.message},error.status);
    // Do not expose query text, provider tokens, personal codes or submitted texts in logs/errors.
    return json({error:'Não foi possível concluir a operação. O envio local pode ser retomado.'},500);
  }
}
