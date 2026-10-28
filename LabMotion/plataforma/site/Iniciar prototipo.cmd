@echo off
setlocal
cd /d "%~dp0"
set "LM_NODE=node"
if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "LM_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
echo LabMotion - prototipo local com dados ficticios
echo Abra http://127.0.0.1:8787 no navegador quando aparecer Ready.
echo Admin: admin@labmotion.local
echo Professor: professor@labmotion.local
echo Senha de demonstracao: LabMotion-Piloto-2026
echo Codigo da turma: TURMA-PILOTO-LABMOTION
"%LM_NODE%" --experimental-strip-types scripts\seed-local.mjs
if errorlevel 1 goto fim
"%LM_NODE%" --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js dev --config dist/server/wrangler.json --local --persist-to .wrangler/state --ip 127.0.0.1 --port 8787 --inspector-port 0
:fim
pause
endlocal
