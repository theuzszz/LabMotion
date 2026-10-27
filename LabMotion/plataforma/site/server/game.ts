import content from './content.json' with { type: 'json' };
import { acceptsCER, acceptsLimitation } from './structural.ts';
import { ApiError, integer, str } from './security.ts';

export const VERSION = 'labmotion-2.0-individual-v1';
export const missions = content.missions;
export const diagnostics = content.diagnosticQuestions;
type Phase = 'intro'|'pretest'|'map'|'mission'|'reflection'|'debrief'|'posttest'|'results';
export type State = {
  phase: Phase; completed: number; question: number; points: number; hints: number[];
  pre: number[]; post: number[]; attempts: Record<string,number>; solved: string[];
  feedback: null | { correct: boolean; text: string }; hint: string;
  justifications: string[]; written: string[]; debrief: string[];
};
export type Action = { type: string; itemId?: string; value?: unknown; elapsedMs?: number };
export type Detail = { kind: string; itemId?: string; response?: unknown; correct?: boolean; attempt?: number; structural?: boolean; hint?: string; textType?: string; elapsedMs?: number|null };
export function initialState(): State {
  return {phase:'intro',completed:0,question:0,points:0,hints:[0,0,0,0,0],pre:[],post:[],attempts:{},solved:[],feedback:null,hint:'',justifications:[],written:[],debrief:[]};
}
export function applyAction(original: State, action: Action): { state: State; detail: Detail } {
  const state = structuredClone(original);
  const detail: Detail = { kind: action.type, elapsedMs: action.elapsedMs === undefined ? null : integer(action.elapsedMs,0,43_200_000) };
  const need = (...phases: Phase[]) => { if (!phases.includes(state.phase)) throw new ApiError(409,'A partida avançou. Atualize antes de enviar esta operação.'); };
  if (action.type === 'start') { need('intro'); state.phase='pretest'; }
  else if (action.type === 'diagnostic') {
    need('pretest','posttest');
    const answers = state.phase === 'pretest' ? state.pre : state.post;
    const i = answers.length;
    if (action.itemId !== `${state.phase}:${i+1}`) throw new ApiError(409,'Item diagnóstico fora de sequência.');
    const answer = integer(action.value,0,diagnostics[i].o.length-1);
    detail.itemId=action.itemId; detail.response=answer; detail.correct=answer===diagnostics[i].c; detail.attempt=1;
    answers.push(answer);
    if (answers.length===6) state.phase=state.phase==='pretest'?'map':'results';
  } else if (action.type === 'enter') { need('map'); if (state.completed>=5) throw new ApiError(409,'Missões concluídas.'); state.phase='mission'; }
  else if (action.type === 'answer') {
    need('mission');
    const q = missions[state.completed].questions[state.question];
    if (action.itemId !== q.id || state.solved.includes(q.id)) throw new ApiError(409,'Este item já foi concluído ou não é o item atual.');
    const textual = 'kind' in q && q.kind==='text';
    const value = textual ? str(action.value,'Resposta',1,5000) : integer(action.value,0,q.options!.length-1);
    const correct = textual ? (q.id==='5.2'?acceptsLimitation(String(value)):acceptsCER(String(value))) : value === ('correct' in q ? q.correct : -1);
    const attempt = (state.attempts[q.id] ?? 0)+1;
    state.attempts[q.id]=attempt;
    if (correct) { state.points+=attempt===1?10:6; state.solved.push(q.id); if (textual) state.written[q.id==='5.2'?0:1]=String(value); }
    state.feedback={correct,text:correct?q.success:q.error};
    Object.assign(detail,{itemId:q.id,response:value,correct,attempt,structural:textual});
  } else if (action.type === 'hint') {
    need('mission');
    const q=missions[state.completed].questions[state.question];
    if (state.solved.includes(q.id) || state.hints[state.completed]>=2) throw new ApiError(409,'Pistas indisponíveis para este item.');
    state.hint=q.hints[state.hints[state.completed]++]; detail.itemId=q.id; detail.hint=state.hint;
  } else if (action.type === 'next') {
    need('mission');
    if (!state.solved.includes(missions[state.completed].questions[state.question].id)) throw new ApiError(409,'Verifique a resposta antes de avançar.');
    if (++state.question===missions[state.completed].questions.length) { state.phase='reflection'; state.question=0; }
    state.feedback=null; state.hint='';
  } else if (action.type === 'reflection') {
    need('reflection');
    const text=str(action.value,'Justificativa',35,5000);
    state.justifications.push(text); detail.response=text; detail.itemId=`mission:${state.completed+1}`; detail.textType='justification';
    state.points+=15; state.completed++; state.phase='map';
  } else if (action.type === 'debrief') {
    need('map','debrief');
    if (state.completed!==5) throw new ApiError(409,'Conclua as cinco missões.');
    if (action.value === undefined) state.phase='debrief';
    else {
      if (!Array.isArray(action.value) || action.value.length!==5) throw new ApiError(400,'Preencha as cinco respostas do debriefing.');
      state.debrief=action.value.map(v=>str(v,'Debriefing',15,5000)); state.phase='posttest'; detail.response=state.debrief; detail.textType='debrief'; detail.itemId='debrief';
    }
  } else throw new ApiError(400,'Operação desconhecida.');
  if (state.points>265) throw new Error('Scoring invariant violated');
  return {state,detail};
}
export function publicContent(state: State) {
  // Never serialize `correct`, diagnostic `c`, validators or an entire answer key.
  const m = missions[Math.min(state.completed,4)];
  const q = m.questions[state.question];
  const challenge = state.phase==='mission' ? {id:q.id,label:q.label,prompt:q.prompt,options:'options' in q?q.options:undefined,kind:'kind' in q?q.kind:'choice',placeholder:'placeholder' in q?q.placeholder:undefined} : null;
  const n = state.phase==='pretest'?state.pre.length:state.post.length;
  const diagnostic = ['pretest','posttest'].includes(state.phase) ? {id:`${state.phase}:${n+1}`,prompt:diagnostics[n].q,options:diagnostics[n].o,index:n+1} : null;
  const results = state.phase==='results' ? diagnostics.map((q,i)=>({item:i+1,subject:['Medidas','Gráficos','Gráficos','MRU','MRUV','Parecer / R² (transversal)'][i],before:state.pre[i]===q.c,after:state.post[i]===q.c})) : null;
  return {state,challenge,diagnostic,mission:{index:Math.min(state.completed,4),title:m.title,short:m.short,subtitle:m.subtitle},missions:missions.map(m=>({title:m.title,short:m.short})),results,contentVersion:VERSION,dataLabel:'Dados didáticos e idealizados'};
}
