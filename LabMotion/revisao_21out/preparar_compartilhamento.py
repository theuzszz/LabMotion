"""Prepara jogo e fonte para partilha local, sem publicar ou enviar arquivos.

Não altera o jogo nem o pacote antigo. Os documentos finais são adicionados
depois pelo responsável à pasta PARA_COMPARTILHAR. Não cria o ZIP final dessa
pasta, evitando empacotar documentos enquanto ainda estão sendo revisados.
"""
from __future__ import annotations

import hashlib
import json
import re
import shutil
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

REVISION = Path(__file__).resolve().parent
PROJECT = REVISION.parent
SHARE = REVISION / 'PARA_COMPARTILHAR'
SOURCE = PROJECT / 'site'
GAME = PROJECT / 'jogo_portatil'
SOURCE_ZIP = REVISION / 'LabMotion_Codigo_Fonte.zip'

# Resolve each location and confine generated paths to the revision directory.
for generated in [SHARE, SOURCE_ZIP]:
    if not generated.resolve().is_relative_to(REVISION):
        raise RuntimeError('Destino fora da pasta de revisão')
for source in [SOURCE, GAME]:
    if not source.resolve().is_relative_to(PROJECT):
        raise RuntimeError('Origem fora da pasta do projeto')

for folder in ['Professora', 'Grupo', 'Jogo']:
    (SHARE / folder).mkdir(parents=True, exist_ok=True)

for name in ['LabMotion.html', 'LICENCA_FONTE_FREDOKA.txt', 'LEIA-ME.md']:
    original = GAME / name
    if not original.is_file():
        raise FileNotFoundError(original)
    shutil.copy2(original, SHARE / 'Jogo' / name)

guide = '''# Como compartilhar o LabMotion

Esta pasta reúne os arquivos para a professora, o grupo e a demonstração do jogo.

- **Professora**: relatório final em PDF para leitura e avaliação.
- **Grupo**: Word editável, apresentação e roteiro para organizar o trabalho.
- **Jogo**: LabMotion.html, instruções e licença da fonte. O HTML funciona sozinho.

## Enviar os arquivos

No WhatsApp, anexe o ZIP completo ou o HTML como **documento/arquivo**. Por e-mail ou no AVA, anexe os arquivos solicitados pela professora. Para uma entrega acadêmica completa, envie o relatório em PDF e o jogo; o Word pode acompanhar quando solicitado. Os slides e o roteiro servem ao ensaio do grupo.

Se usar uma pasta no Drive, envie o link dessa pasta somente depois de configurar o acesso dos destinatários. Os arquivos desta pasta ainda não foram enviados ou publicados automaticamente.

Um caminho como `C:/Users/...` só funciona no computador em que o arquivo está salvo. Não cole esse caminho no WhatsApp esperando que outra pessoa consiga abrir; envie o arquivo como anexo.

## Abrir e mostrar o jogo

1. Baixe o ZIP e extraia a pasta, quando receber o pacote completo.
2. No computador, abra `Jogo/LabMotion.html` com um duplo clique ou pela opção de abrir no navegador.
3. O jogo não precisa de login, instalação ou internet. Se a prévia de um aplicativo não executar o jogo, baixe o HTML e abra-o no navegador do computador.
4. Para apresentar, projete a janela do navegador ou compartilhe a tela. Teste o arquivo no computador que será usado antes da aula.
5. Ao terminar uma equipe, use **Exportar registro da equipe** antes de iniciar outra. O JSON fica no computador; seu envio à professora é manual.

O diagnóstico do jogo registra a equipe, não cada estudante. Os exemplos são didáticos e não representam resultados de aprendizagem de uma turma. Textos e argumentos precisam de avaliação docente.

Use o HTML desta pasta para a demonstração. O site hospedado anteriormente tem acesso privado e pode conter outra versão; ele não substitui o arquivo entregue.

## Código-fonte

O código-fonte está em um ZIP separado, `LabMotion_Codigo_Fonte.zip`, na pasta da revisão. Destina-se a quem pretende desenvolver ou reconstruir o aplicativo. A professora e os colegas não precisam dele para jogar.
'''
(SHARE / 'LEIA_PRIMEIRO.md').write_text(guide, encoding='utf-8')

skip_dirs = {'.git', 'node_modules', '.next', '.vinext', '.wrangler', 'dist', 'portable-dist', '__pycache__'}
def excluded(path: Path) -> bool:
    relative = path.relative_to(SOURCE)
    return (bool(skip_dirs.intersection(relative.parts))
            or path.name.startswith('.env')
            or path.name.endswith('.tsbuildinfo')
            or bool(re.search(r'credential|secret|(?:access[_-]?)?token', path.name, re.I)))

files = sorted(p for p in SOURCE.rglob('*') if p.is_file() and not excluded(p))
config = SOURCE / '.openai' / 'hosting.json'
if config not in files:
    raise RuntimeError('Configuração hosting.json ausente')
hosting = json.loads(config.read_text(encoding='utf-8-sig'))
if set(hosting) - {'project_id', 'd1', 'r2', 'static', 'capabilities', 'plugins', 'connectors'}:
    raise RuntimeError('Rever campos inesperados na configuração antes de compartilhar')

high_confidence_secret = re.compile(r'\b(?:art_v2_[A-Za-z0-9_]{20,}|sk-(?:proj-)?[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})')
for file in files:
    if not file.resolve().is_relative_to(SOURCE.resolve()):
        raise RuntimeError(f'Arquivo vinculado fora da origem: {file.relative_to(SOURCE)}')
    if file.suffix.lower() in {'.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.txt', '.yaml', '.yml'}:
        if high_confidence_secret.search(file.read_text(encoding='utf-8-sig', errors='replace')):
            raise RuntimeError(f'Possível credencial; rever arquivo {file.relative_to(SOURCE)}')

readme = '''# Código-fonte do LabMotion

Para jogar, use a entrega HTML portátil; não é necessário compilar.

Para desenvolver: instale Node compatível com package.json e pnpm; execute
`pnpm install` e `pnpm dev`. A configuração `.openai/hosting.json` é incluída
porque vite.config.ts a importa. Ela contém somente identificação do projeto
e campos de armazenamento sem credenciais. Esta cópia não publica nada.

Para gerar a versão portátil: `pnpm exec vite build --config vite.portable.config.ts`
e `node portable/export-single.mjs CAMINHO_DE_SAIDA.html`.

Os scripts, estilos e fonte são incorporados no HTML. A licença Fredoka acompanha
o diretório portable. Não há arquivos .env, credenciais, dependências instaladas
ou caches neste pacote. Não substitua a configuração por credenciais pessoais
ao compartilhar. Publicação externa é uma operação separada.
'''
temp_zip = SOURCE_ZIP.with_suffix('.zip.tmp')
with ZipFile(temp_zip, 'w', ZIP_DEFLATED) as archive:
    archive.writestr('LabMotion_Codigo_Fonte/LEIA_PRIMEIRO.md', readme)
    for file in files:
        archive.write(file, 'LabMotion_Codigo_Fonte/' + file.relative_to(SOURCE).as_posix())
with ZipFile(temp_zip) as archive:
    names = archive.namelist()
    if 'LabMotion_Codigo_Fonte/.openai/hosting.json' not in names:
        raise RuntimeError('ZIP não contém a configuração necessária')
    if any(Path(name).name.startswith('.env') or re.search(r'credential|secret|(?:access[_-]?)?token', Path(name).name, re.I) for name in names):
        raise RuntimeError('ZIP contém arquivo proibido')
    if archive.testzip() is not None:
        raise RuntimeError('Falha de integridade do ZIP')
temp_zip.replace(SOURCE_ZIP)

manifest = {
    'data': '2026-10-21',
    'jogo_sha256': hashlib.sha256((SHARE / 'Jogo/LabMotion.html').read_bytes()).hexdigest(),
    'codigo_arquivos': len(files),
    'configuracao_incluida': '.openai/hosting.json',
    'sem_arquivos_env_ou_credenciais': True,
    'publicado_ou_enviado': False,
    'documentos_finais': 'Adicionados separadamente pelo responsável; este script não os modifica.',
}
(REVISION / 'manifesto_compartilhamento.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'pasta': str(SHARE), 'codigo_fonte_zip': str(SOURCE_ZIP), **manifest}, ensure_ascii=False, indent=2))
