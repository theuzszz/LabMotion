// Preserve the approved questions byte-for-byte in server data; never import the key in client components.
import ts from 'typescript';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const sourcePath = fileURLToPath(new URL('../../../site/app/page.tsx', import.meta.url));
const source = ts.createSourceFile(sourcePath, readFileSync(sourcePath, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
function value(n) {
  if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
  if (ts.isNumericLiteral(n)) return Number(n.text);
  if (ts.isArrayLiteralExpression(n)) return n.elements.map(value);
  if (ts.isObjectLiteralExpression(n)) return Object.fromEntries(n.properties.filter(p => ts.isPropertyAssignment(p) && !['context','icon','validate'].includes(p.name.getText(source))).map(p => [p.name.getText(source), value(p.initializer)]));
  throw new Error(`Unexpected content expression: ${n.getText(source).slice(0,60)}`);
}
const content = {};
function visit(n) { if (ts.isVariableDeclaration(n) && ['missions','diagnosticQuestions'].includes(n.name.getText(source))) content[n.name.getText(source)] = value(n.initializer); ts.forEachChild(n,visit); }
visit(source);
const output = new URL('../server/content.json', import.meta.url);
writeFileSync(output, JSON.stringify(content,null,2)+'\n');
console.log(`Extracted ${content.missions.reduce((n,m)=>n+m.questions.length,0)} approved challenges and ${content.diagnosticQuestions.length} diagnostic items.`);
