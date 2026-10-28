import {scrypt,randomBytes,timingSafeEqual} from 'node:crypto';
import {ApiError} from './security.ts';
// OWASP scrypt profile: 32 MiB, N=2^15, r=8, p=3. One KDF at a time per isolate.
let queue=Promise.resolve();let waiting=0;
async function derive(password:string,salt:string):Promise<Buffer>{
  if(waiting>=4)throw new ApiError(429,'Aguarde um momento antes de tentar novamente.');
  waiting++;const previous=queue;let release!:()=>void;queue=new Promise<void>(r=>{release=r;});
  await previous;
  try{return await new Promise<Buffer>((resolve,reject)=>scrypt(password,salt,64,{N:32768,r:8,p:3,maxmem:48*1024*1024},(e,k)=>e?reject(e):resolve(k)));}
  finally{waiting--;release();}
}
export function validatePassword(value:unknown):string{
  if(typeof value!=='string'||value.trim().length<12||value.length>128)throw new ApiError(400,'Use uma senha ou frase com 12 a 128 caracteres.');
  return value;
}
export async function passwordHash(password:string){const salt=randomBytes(16).toString('hex');return `scrypt$32768$8$3$${salt}$${(await derive(password,salt)).toString('hex')}`;}
export async function verifyPassword(password:string,encoded:string|null){
  const parts=(encoded??'').split('$');
  const valid=parts.length===6&&parts.slice(0,4).join('$')==='scrypt$32768$8$3'&&/^[a-f0-9]{32}$/.test(parts[4])&&/^[a-f0-9]{128}$/.test(parts[5]);
  // Unknown accounts perform the same KDF; no cleartext/default password exists.
  const result=await derive(password,valid?parts[4]:'0'.repeat(32));
  return valid&&timingSafeEqual(result,Buffer.from(parts[5],'hex'));
}
