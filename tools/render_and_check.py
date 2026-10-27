from pathlib import Path
import json
from pypdf import PdfReader
from pdf2image import convert_from_path

ROOT=Path(__file__).resolve().parents[1]
PROJECT=ROOT/'LabMotion';PDF=PROJECT/'entrega'/'LabMotion_Projeto_Completo.pdf';OUT=PROJECT/'qa_final';OUT.mkdir(exist_ok=True)
reader=PdfReader(PDF)
pages=[{'pagina':i+1,'caracteres':len(p.extract_text() or ''),'inicio':(p.extract_text() or '')[:90].replace('\n',' ')} for i,p in enumerate(reader.pages)]
(OUT/'paginas.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2),encoding='utf-8')
convert_from_path(str(PDF),dpi=140,output_folder=str(OUT),fmt='png',output_file='pagina',paths_only=True,poppler_path=r'C:\Users\Usuario\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin')
print(json.dumps(pages,ensure_ascii=False,indent=2))
