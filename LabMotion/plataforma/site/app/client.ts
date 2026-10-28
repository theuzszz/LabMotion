import type {Action} from './models';
export class ClientError extends Error{status:number;constructor(message:string,status:number){super(message);this.status=status;}}
export async function api<T>(path:string,body?:unknown):Promise<T>{
  const r=await fetch('/api/'+path,{method:body===undefined?'GET':'POST',credentials:'same-origin',cache:'no-store',headers:body===undefined?{}:{'content-type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)})});
  const result=await r.json() as T & {error?:string};if(!r.ok)throw new ClientError(result.error??'Não foi possível concluir a operação.',r.status);return result;
}
export function download(name:string,value:unknown){const text=typeof value==='string'?value:JSON.stringify(value,null,2),url=URL.createObjectURL(new Blob([text],{type:typeof value==='string'?'text/plain;charset=utf-8':'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export type Pending={gameId:string;eventId:string;action:Action};
export const queueKey=(actorId:string)=>'labmotion-platform:'+actorId+':outbox';
export function loadPending(actorId:string):Pending[]{try{const value=JSON.parse(localStorage.getItem(queueKey(actorId))??'[]');return Array.isArray(value)?value.filter(x=>typeof x.gameId==='string'&&typeof x.eventId==='string'&&x.action&&typeof x.action.type==='string').slice(0,100):[];}catch{return [];}}
export function savePending(actorId:string,items:Pending[]){localStorage.setItem(queueKey(actorId),JSON.stringify(items));}
export const date=(s:string)=>new Date(s).toLocaleString('pt-BR');
