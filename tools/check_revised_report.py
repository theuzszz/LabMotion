from pathlib import Path
import json
from pypdf import PdfReader
from pdf2image import convert_from_path

ROOT = Path(__file__).resolve().parents[1]
REV = ROOT / 'LabMotion' / 'revisao_21out'
PDF = REV / 'PARA_COMPARTILHAR' / 'Professora' / 'LabMotion_Projeto_Final_21out.pdf'
OUT = REV / 'qa_final'
OUT.mkdir(exist_ok=True)
reader = PdfReader(PDF)
pages = []
for i, p in enumerate(reader.pages):
    text = p.extract_text() or ''
    pages.append({'pagina': i + 1, 'caracteres': len(text), 'inicio': text[:120].replace('\n', ' ')})
    (OUT / f'texto_{i+1:02d}.txt').write_text(text, encoding='utf-8')
(OUT / 'paginas.json').write_text(json.dumps(pages, ensure_ascii=False, indent=2), encoding='utf-8')
paths = convert_from_path(str(PDF), dpi=120, output_folder=str(OUT), fmt='png', output_file='pagina', paths_only=True,
    poppler_path=r'C:\Users\Usuario\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin')
(OUT / 'imagens.json').write_text(json.dumps(paths, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(pages, ensure_ascii=False, indent=2))
