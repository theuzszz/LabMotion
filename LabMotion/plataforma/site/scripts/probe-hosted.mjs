// Secrets arrive only through hidden stdin, never argv or source.
process.stderr.write('Ready for probe JSON on stdin (input is hidden).\n');
if(process.stdin.isTTY)process.stdin.setRawMode(true);
let input='';
for await(const chunk of process.stdin){input+=chunk;if(input.includes('\n')||input.includes('\r'))break;}
if(process.stdin.isTTY)process.stdin.setRawMode(false);
const config=JSON.parse(input);
const headers={'OAI-Sites-Authorization':`Bearer ${config.serviceToken}`,'content-type':'application/json',origin:config.url};
const health=await fetch(config.url+'/api/health',{headers});
console.log(JSON.stringify({healthStatus:health.status,...(health.ok?await health.json():{})}));
const eventId=crypto.randomUUID();
for(let i=0;i<2;i++){
  const r=await fetch(config.url+'/api/infra-probe',{method:'POST',headers:{...headers,'x-lm-probe':config.probeToken},body:JSON.stringify({eventId})});
  console.log(JSON.stringify({send:i+1,status:r.status,...(r.ok?await r.json():{})}));
  if(!r.ok)process.exitCode=1;
}
process.stdin.pause();
