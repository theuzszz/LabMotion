import assert from 'node:assert/strict';
import { acceptsCER, acceptsLimitation, validSavedValue } from '../lib/activity.ts';

const cases = [
  () => assert.equal(acceptsCER('MRU '.repeat(25)), false),
  () => assert.equal(acceptsCER('Os dados são compatíveis com MRU porque apresentam tendência linear e inclinação de 1,03 m/s, indicando velocidade constante.'), true),
  () => assert.equal(acceptsCER('Os dados são compatíveis com MRU porque apresentam tendência linear e R² de 0,9945, respeitadas as limitações da atividade.'), true),
  () => assert.equal(acceptsLimitation('atrito'), false),
  () => assert.equal(acceptsLimitation('Poucos dados limitam a avaliação da tendência.'), true),
  () => assert.equal(validSavedValue('phase', 'mission', 'intro'), true),
  () => assert.equal(validSavedValue('phase', 'unknown', 'intro'), false),
  () => assert.equal(validSavedValue('missionIndex', 12, 0), false),
  () => assert.equal(validSavedValue('pre', [1,2], [-1,-1,-1,-1,-1,-1]), false),
  () => assert.equal(validSavedValue('pre', [1,2,2,0,1,1], [-1,-1,-1,-1,-1,-1]), true),
];
cases.forEach((check) => check());
const t=[0.1,0.2,0.3,0.4,0.5], d=[0.51,0.59,0.72,0.80,0.92];
const mean=(xs)=>xs.reduce((a,b)=>a+b,0)/xs.length;
const mt=mean(t), md=mean(d);
const slope=t.reduce((sum,x,i)=>sum+(x-mt)*(d[i]-md),0)/t.reduce((sum,x)=>sum+(x-mt)**2,0);
const intercept=md-slope*mt;
const r2=1-d.reduce((sum,y,i)=>sum+(y-(slope*t[i]+intercept))**2,0)/d.reduce((sum,y)=>sum+(y-md)**2,0);
assert.ok(Math.abs(slope-1.03)<1e-10);
assert.ok(Math.abs(intercept-0.399)<1e-10);
assert.equal(r2.toFixed(4),'0.9945');
console.log(`PASS: ${cases.length} validation/storage cases; MRU slope=${slope.toFixed(2)}, intercept=${intercept.toFixed(3)}, R2=${r2.toFixed(4)}.`);
