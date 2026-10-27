import {cpSync,existsSync,mkdirSync,readdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const source=fileURLToPath(new URL('../',import.meta.url));
const destination=resolve(source,'../../../.pptx-build/labmotion-preview-source');
mkdirSync(destination,{recursive:true});
const excluded=new Set(['.git','node_modules','.wrangler','.sites-runtime','outputs','work','.next','.vinext']);
for(const name of readdirSync(source)) {
  if(excluded.has(name)||name.endsWith('.tsbuildinfo')||(name.startsWith('.env')&&name!=='.env.example')||name.startsWith('.dev.vars'))continue;
  cpSync(join(source,name),join(destination,name),{recursive:true});
}
console.log(destination);
