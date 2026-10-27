import { ApiError, hash, now, stable } from './security.ts';
import { initialState, applyAction, publicContent, VERSION, type Action, type State } from './game.ts';
export type DB = Pick<D1Database,'prepare'|'batch'>;
export type Actor = {id:string;role:'student'|'teacher'|'admin';nickname?:string;classId?:string;email?:string};
export type GameRow = {id:string;student_id:string;class_id:string;content_version:string;state:string;revision:number;created_at:string;completed_at:string|null;conditions:string;participants:number;mode:string};
export const all = async <T = Record<string,unknown>>(db: DB, sql: string, ...args: unknown[]) => (await db.prepare(sql).bind(...args).all<T>()).results;
export const one = <T = Record<string,unknown>>(db: DB, sql: string, ...args: unknown[]) => db.prepare(sql).bind(...args).first<T>();
export async function audit(db:DB, actor:Actor, action:string, target:string) {
  await db.prepare('INSERT INTO auditoria(id,actor_id,action,target_id,at) VALUES(?,?,?,?,?)').bind(crypto.randomUUID(),actor.id,action,target,now()).run();
}
export async function requireClass(db:DB, actor:Actor, classId:string) {
  const row = await one<{id:string;teacher_id:string}>(db,'SELECT id,teacher_id FROM turmas WHERE id=?',classId);
  if (!row || (actor.role==='teacher' && row.teacher_id!==actor.id) || (actor.role==='student' && actor.classId!==classId)) throw new ApiError(404,'Turma não encontrada.');
  return row;
}
export async function getGame(db:DB, actor:Actor, gameId:string) {
  const game = await one<GameRow>(db,'SELECT * FROM partidas WHERE id=?',gameId);
  if (!game || (actor.role==='student' && game.student_id!==actor.id)) throw new ApiError(404,'Partida não encontrada.');
  await requireClass(db,actor,game.class_id);
  return game;
}
export async function createGame(db:DB, actor:Actor, gameId:string, conditions:string) {
  if (actor.role!=='student') throw new ApiError(403,'Entre com o perfil do aluno.');
  const prior = await one<GameRow>(db,'SELECT * FROM partidas WHERE id=?',gameId);
  if (prior) { if (prior.student_id!==actor.id) throw new ApiError(409,'Identificador de partida indisponível.'); return prior; }
  await db.prepare('INSERT INTO partidas(id,student_id,class_id,content_version,mode,participants,conditions,state,revision,created_at) VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING')
    .bind(gameId,actor.id,actor.classId,VERSION,'individual',1,conditions,JSON.stringify(initialState()),0,now()).run();
  return getGame(db,actor,gameId);
}
export function gameView(game:GameRow) {
  return {id:game.id,revision:game.revision,createdAt:game.created_at,completedAt:game.completed_at,conditions:game.conditions,...publicContent(JSON.parse(game.state) as State)};
}
export async function mutateGame(db:DB, actor:Actor, gameId:string, eventId:string, action:Action) {
  if (actor.role!=='student') throw new ApiError(403,'Somente o aluno pode responder.');
  const requestHash = await hash(stable({gameId,action}));
  for (let retry=0;retry<4;retry++) {
    const game = await getGame(db,actor,gameId);
    const prior = await one<{request_hash:string;response:string}>(db,'SELECT request_hash,response FROM eventos WHERE id=? AND game_id=?',eventId,gameId);
    if (prior) { if (prior.request_hash!==requestHash) throw new ApiError(409,'Identificador já usado com outro conteúdo.'); return {...JSON.parse(prior.response),replayed:true}; }
    if (game.content_version!==VERSION) throw new ApiError(409,'Versão de conteúdo indisponível para esta partida.');
    const {state,detail}=applyAction(JSON.parse(game.state),action);
    const at=now(), revision=game.revision+1;
    const response={...gameView({...game,state:JSON.stringify(state),revision,completed_at:state.phase==='results'?at:null}),replayed:false};
    const gate='EXISTS(SELECT 1 FROM eventos WHERE id=? AND game_id=? AND request_hash=? AND revision=?)';
    const gateArgs=[eventId,gameId,requestHash,revision];
    const batch = [
      db.prepare('INSERT INTO eventos(id,game_id,request_hash,revision,kind,item_id,detail,response,at) SELECT ?,?,?,?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM partidas WHERE id=? AND revision=?) ON CONFLICT(id) DO NOTHING')
        .bind(eventId,gameId,requestHash,revision,detail.kind,detail.itemId??null,JSON.stringify(detail),JSON.stringify(response),at,gameId,game.revision),
      db.prepare(`UPDATE partidas SET state=?,revision=?,completed_at=? WHERE id=? AND revision=? AND ${gate}`)
        .bind(JSON.stringify(state),revision,state.phase==='results'?at:null,gameId,game.revision,...gateArgs),
    ];
    if (['answer','diagnostic'].includes(detail.kind)) batch.push(db.prepare(`INSERT INTO respostas(id,game_id,item_id,response,correct,attempt,structural,hints_used,elapsed_ms,at) SELECT ?,?,?,?,?,?,?,?,?,? WHERE ${gate} ON CONFLICT(id) DO NOTHING`)
      .bind(eventId,gameId,detail.itemId,JSON.stringify(detail.response),detail.correct?1:0,detail.attempt,detail.structural?1:0,state.hints[Math.min(state.completed,4)],detail.elapsedMs??null,at,...gateArgs));
    const texts: {id:string;kind:string;text:string;mission:number|null}[]=[];
    if (detail.kind==='answer' && detail.structural && detail.correct) texts.push({id:eventId,kind:detail.itemId==='5.2'?'limitation':'cer',text:String(detail.response),mission:5});
    if (detail.textType==='justification') texts.push({id:eventId,kind:'justification',text:String(detail.response),mission:state.completed});
    if (detail.textType==='debrief') (detail.response as string[]).forEach((text,i)=>texts.push({id:`${eventId}_${i}`,kind:'debrief',text,mission:i+1}));
    for (const t of texts) batch.push(db.prepare(`INSERT INTO textos(id,game_id,kind,mission,body,created_at) SELECT ?,?,?,?,?,? WHERE ${gate} ON CONFLICT(id) DO NOTHING`).bind(t.id,gameId,t.kind,t.mission,t.text,at,...gateArgs));
    await db.batch(batch);
    const saved=await one<{request_hash:string;response:string}>(db,'SELECT request_hash,response FROM eventos WHERE id=? AND game_id=?',eventId,gameId);
    if (saved) { if (saved.request_hash!==requestHash) throw new ApiError(409,'Identificador já usado com outro conteúdo.'); return JSON.parse(saved.response); }
  }
  throw new ApiError(409,'Outra resposta foi recebida. Atualize e tente novamente.');
}
