import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'portable-dist');
const entry = readFileSync(join(dist, 'portable/index.html'), 'utf8');
const scriptPath = entry.match(/src="\.\.\/(assets\/[^"]+\.js)"/)[1];
const stylePath = entry.match(/href="\.\.\/(assets\/[^"]+\.css)"/)[1];
const script = readFileSync(join(dist, scriptPath), 'utf8').replaceAll('</script', '<\\/script');
let css = readFileSync(join(dist, stylePath), 'utf8');
const font = readdirSync(join(dist, 'assets')).find((name) => name.endsWith('.woff2'));
css = css.replace(/url\([^)]*\.woff2\)/g, `url(data:font/woff2;base64,${readFileSync(join(dist, 'assets', font)).toString('base64')})`);
const output = resolve(process.argv[2] || join(dist, 'LabMotion.html'));
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>LabMotion</title><style>${css}</style></head><body><div id="root"></div><script type="module">${script}</script></body></html>`);
console.log(output);
