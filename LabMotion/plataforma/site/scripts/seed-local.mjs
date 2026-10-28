// Explicitly local, fictitious accounts. This script never calls a remote database.
import {spawnSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync,readdirSync,existsSync,unlinkSync} from 'node:fs';
import {passwordHash} from '../server/passwords.ts';
import {hash,normalizeCode} from '../server/security.ts';
import './sites-env.mjs';
const config='dist/server/wrangler.json';
if(!existsSync(config))throw new Error('Execute pnpm build antes de preparar o banco local.');
const cmd=(args)=>{const r=spawnSync(process.execPath,['--import','./scripts/sites-env.mjs','./node_modules/wrangler/bin/wrangler.js',...args],{stdio:'inherit'});if(r.status!==0)process.exit(r.status??1);};
const at=new Date().toISOString(),q=s=>"'"+String(s).replaceAll("'","''")+"'";
mkdirSync('.wrangler',{recursive:true});
// Apply only migrations not previously applied to this local database.
const marker='.wrangler/local-migrations.json';const applied=existsSync(marker)?JSON.parse(readFileSync(marker,'utf8')):[];
for(const file of readdirSync('drizzle').filter(f=>f.endsWith('.sql')).sort()){if(applied.includes(file))continue;cmd(['d1','execute','DB','--local','--config',config,'--persist-to','.wrangler/state','--file','drizzle/'+file]);applied.push(file);writeFileSync(marker,JSON.stringify(applied));}
const encoded=await passwordHash('LabMotion-Piloto-2026');
const invitation=await hash(normalizeCode('TURMA-PILOTO-LABMOTION'));
const sql=`INSERT OR IGNORE INTO professores(id,email,role,active,created_at,password_hash,must_change_password) VALUES ('demo-admin','admin@labmotion.local','admin',1,${q(at)},${q(encoded)},0),('demo-teacher','professor@labmotion.local','teacher',1,${q(at)},${q(encoded)},0);
INSERT OR IGNORE INTO configuracao(key,value) VALUES('admin_created','demo-admin');
INSERT OR IGNORE INTO turmas(id,teacher_id,title,created_at) VALUES('demo-class','demo-teacher','Turma piloto fictícia',${q(at)});
INSERT OR IGNORE INTO convites_turma(id,class_id,code_hash,created_at) VALUES('demo-invite','demo-class',${q(invitation)},${q(at)});`;
const file='.wrangler/seed-local.sql';writeFileSync(file,sql);
try{cmd(['d1','execute','DB','--local','--config',config,'--persist-to','.wrangler/state','--file',file]);}finally{unlinkSync(file);}
console.log('\nProtótipo local preparado. Contas fictícias: admin@labmotion.local e professor@labmotion.local\nSenha de demonstração: LabMotion-Piloto-2026\nCódigo da turma: TURMA-PILOTO-LABMOTION\nExecute pnpm start. Não use essas contas numa publicação.');
