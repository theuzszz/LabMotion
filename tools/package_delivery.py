from pathlib import Path
import hashlib,json,zipfile
from pypdf import PdfReader
from docx import Document

ROOT=Path(__file__).resolve().parents[1];PROJECT=ROOT/'LabMotion';DELIVERY=PROJECT/'entrega'
doc=Document(DELIVERY/'LabMotion_Projeto_Completo.docx')
plain='\n'.join(p.text for p in doc.paragraphs)
assert '@@' not in plain
for heading in ['1 Identificação','2 Introdução com fundamentação teórica','3 Objetivos','4 Materiais e métodos','5 Resultados e discussão','6 Conclusões','7 Bibliografia']:
    assert heading in plain,heading
assert len(doc.inline_shapes)==7
for name in ['Alinne de Souza Santos Castro','Matheus Souza da Silva Leite','João Charles Farias Gomes Junior','Arielly Ferreira Marques de Lima']:
    assert name in plain
pdf=PdfReader(DELIVERY/'LabMotion_Projeto_Completo.pdf')
assert len(pdf.pages)>=20
alltext='\n'.join(p.extract_text() or '' for p in pdf.pages)
assert '1. Em medidas repetidas' in alltext or '1.Em medidas repetidas' in alltext or '1.  Em medidas repetidas' in alltext
assert 'que parte do repouso' in alltext
assert 'ganhos de aprendizagem' in alltext
html=(DELIVERY/'jogo_portatil'/'LabMotion.html').read_text(encoding='utf-8')
assert '<script type="module">' in html
manifest={'data':'2026-10-20','paginas_relatorio':len(pdf.pages),'slides':10,'figuras_relatorio':7,'equacoes':7,'aplicacao_com_estudantes':'ainda não realizada','verificacao':'cálculos, tipagem, builds e percurso técnico no navegador','arquivos':[]}
for p in sorted(DELIVERY.rglob('*')):
    if p.is_file() and p.name!='manifesto.json':
        manifest['arquivos'].append({'arquivo':str(p.relative_to(DELIVERY)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(DELIVERY/'manifesto.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
archive=PROJECT/'LabMotion_Pacote_Entrega.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=8) as z:
    for p in DELIVERY.rglob('*'):
        if p.is_file():z.write(p,Path('LabMotion')/p.relative_to(DELIVERY))
    for p in (PROJECT/'site').rglob('*'):
        if p.is_file() and not any(part in ['node_modules','.git','.openai','dist','portable-dist'] for part in p.parts):
            z.write(p,Path('LabMotion')/'codigo_fonte'/p.relative_to(PROJECT/'site'))
with zipfile.ZipFile(archive) as z:assert z.testzip() is None
print(json.dumps({'zip':str(archive),'bytes':archive.stat().st_size,'paginas':len(pdf.pages),'arquivos_entrega':len(manifest['arquivos'])},ensure_ascii=False,indent=2))
