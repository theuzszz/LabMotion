// End-to-end pilot against the real local Worker + D1. Fictitious users only.
import assert from 'node:assert/strict';
import {missions,diagnostics} from '../server/game.ts';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.argv[2]??'http://127.0.0.1:8787';
if(!['localhost','127.0.0.1'].includes(new URL(base).hostname))throw new Error('Este piloto aceita apenas o servidor local.');
async function client(){let cookie='';return async(path,body)=>{const r=await fetch(base+'/api/'+path,{method:body===undefined?'GET':'POST',headers:{origin:base,'content-type':'application/json',cookie},...(body===undefined?{}:{body:JSON.stringify(body)})});const next=r.headers.get('set-cookie');if(next)cookie=next.split(';')[0];const json=await r.json();assert.ok(r.ok,`${path}: ${r.status} ${JSON.stringify(json)}`);return json;};}
const teacher=await client(),admin=await client(),student=await client();
assert.equal((await teacher('auth/password',{email:'professor@labmotion.local',password:'LabMotion-Piloto-2026'})).actor.role,'teacher');
await admin('auth/password',{email:'admin@labmotion.local',password:'LabMotion-Piloto-2026'});
const registration=await student('auth/student',{register:true,privacyAccepted:true,classCode:'TURMA-PILOTO-LABMOTION',nickname:'Piloto simulado'});
const gameId=crypto.randomUUID();let g=await student('games',{gameId,conditions:'Piloto técnico fictício; servidor local, sem estudantes reais.'});
const send=async(action,eventId=crypto.randomUUID())=>{g=await student(`games/${gameId}/events`,{eventId,action});return g;};
await send({type:'start'});for(const [i,q] of diagnostics.entries())await send({type:'diagnostic',itemId:`pretest:${i+1}`,value:(q.c+1)%q.o.length});
for(const [mi,m]of missions.entries()){
  await send({type:'enter'});
  for(const q of m.questions){
    if(q.id==='1.1'){
      await send({type:'hint'});await send({type:'answer',itemId:q.id,value:0,elapsedMs:2000});
      const correct={type:'answer',itemId:q.id,value:q.correct,elapsedMs:1500},eventId=crypto.randomUUID();
      await send(correct,eventId);const score=g.state.points;await send(correct,eventId);assert.equal(g.state.points,score);
      await student('auth/logout',{});await student('auth/student',{classCode:'TURMA-PILOTO-LABMOTION',personalCode:registration.personalCode});g=await student('games/'+gameId);assert.equal(g.state.points,6);
    }else await send({type:'answer',itemId:q.id,value:q.kind==='text'?(q.id==='5.2'?'O atrito residual pode limitar as condições do movimento.':'Os dados são compatíveis com MRU porque apresentam tendência linear e inclinação de 1,03 m/s, considerando as limitações.'):q.correct,elapsedMs:1200});
    await send({type:'next'});
  }
  await send({type:'reflection',value:`Registro fictício da missão ${mi+1}: os dados didáticos sustentam a interpretação nas condições consideradas.`});
}
await send({type:'debrief'});await send({type:'debrief',value:Array(5).fill('Registro fictício para discutir evidências e limitações com a professora.')});for(const [i,q]of diagnostics.entries())await send({type:'diagnostic',itemId:`posttest:${i+1}`,value:q.c});
assert.equal(g.state.phase,'results');assert.equal(g.state.points,261);assert.equal(g.results.filter(r=>r.before).length,0);assert.equal(g.results.filter(r=>r.after).length,6);
const report=await teacher('classes/demo-class/report'),text=report.texts.find(t=>t.game_id===gameId);
await teacher(`texts/${text.id}/review`,{rubric:{afirmação:2,evidência:2,raciocínio:2,limitação:1},comment:'Registro fictício compatível com os dados didáticos. Discutir as condições de validade.'});
await student('games',{gameId:crypto.randomUUID(),conditions:'Segunda partida fictícia para verificar o histórico.'});
const history=await student('me/summary');assert.equal(history.completedActivities,1);assert.equal(history.games.length,2);
const overview=await admin('admin/overview');
const evidence={date:new Date().toISOString(),environment:'local Worker + D1',fictitious:true,gameId,checks:{adultPasswordLogin:true,studentCodes:true,firstErrorSixPoints:true,idempotentReplay:true,logoutResume:true,completeFiveMissions:true,points:261,maximum:265,textReview:true,newGamePreservesHistory:true,adminOverview:true},beforeCorrect:0,afterCorrect:6,interpretation:'Mudança imediata e descritiva em seis itens repetidos; teste técnico sem alunos reais.',counts:overview.counts};
mkdirSync('outputs',{recursive:true});writeFileSync('outputs/piloto-local.json',JSON.stringify(evidence,null,2));console.log(JSON.stringify(evidence,null,2));
