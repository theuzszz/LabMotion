from pathlib import Path
import re, importlib.util, json
from copy import deepcopy
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT, WD_ROW_HEIGHT_RULE
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
PROJECT=ROOT/'LabMotion'
OUT=PROJECT/'entrega'
OUT.mkdir(parents=True,exist_ok=True)
spec=importlib.util.spec_from_file_location('intro',ROOT/'tools'/'math_support.py')
helper=importlib.util.module_from_spec(spec);spec.loader.exec_module(helper)
helper.BLACK='000000'

EQUATIONS={
 'media':r'\bar{x}=\frac{1}{N}\sum_{i=1}^{N}x_i',
 'tipo_a':r'u_A(\bar{x})=\sqrt{\frac{\sum_{i=1}^{N}(x_i-\bar{x})^2}{N(N-1)}}',
 'combinada':r'u_c=\sqrt{u_A^2+u_B^2}',
 'mru':r'x=x_0+vt',
 'mruv':r'x=x_0+v_0t+\frac{1}{2}at^2',
}

def equation(doc,key,n):
    p=doc.add_paragraph();p.alignment=WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.first_line_indent=Inches(0);p.paragraph_format.keep_together=True;p.paragraph_format.space_after=Pt(9)
    math=OxmlElement('m:oMath')
    if key in EQUATIONS:
        nodes=helper.equation_nodes(EQUATIONS[key])
    else:
        sub=lambda symbol:helper.m_sub(helper.m_run(symbol),helper.m_run('i'))
        bar=lambda symbol:helper.m_bar(helper.m_run(symbol))
        def sigma(content):
            return helper.m_sum([helper.m_run('i'),helper.m_run('=1',plain=True)],helper.m_run('N'),content)
        def difference(a,b):
            return [helper.m_run('(',plain=True),a,helper.m_run('−',plain=True),b,helper.m_run(')',plain=True)]
        def hat(symbol):
            accent=OxmlElement('m:acc');props=OxmlElement('m:accPr');char=OxmlElement('m:chr');char.set(qn('m:val'),'̂');props.append(char);base=OxmlElement('m:e');base.append(helper.m_run(symbol));accent.extend([props,base]);return accent
        if key=='ajuste':
            numerator=sigma(difference(sub('t'),bar('t'))+difference(sub('x'),bar('x')))
            denominator=sigma(helper.m_sup(difference(sub('t'),bar('t')),helper.m_run('2',plain=True)))
            nodes=[helper.m_run('A='),helper.m_frac(numerator,denominator),helper.m_run('     B='),bar('x'),helper.m_run('−A'),bar('t')]
        else:
            fitted=helper.m_sub(hat('x'),helper.m_run('i'))
            numerator=sigma(helper.m_sup(difference(sub('x'),fitted),helper.m_run('2',plain=True)))
            denominator=sigma(helper.m_sup(difference(sub('x'),bar('x')),helper.m_run('2',plain=True)))
            nodes=[helper.m_sup(helper.m_run('R'),helper.m_run('2',plain=True)),helper.m_run('=1−',plain=True),helper.m_frac(numerator,denominator)]
    for node in nodes:math.append(node)
    p._p.append(math);p.add_run(f'     ({n})').font.size=Pt(9)

def inline(p,text,size=11):
    # Markdown formatting, keeping labels legible and links real.
    for chunk in re.split(r'(\*\*.*?\*\*|\*[^*]+\*)',text):
        run=p.add_run(chunk.strip('*') if chunk.startswith('*') else chunk)
        run.font.name='Arial';run.font.size=Pt(size);run.font.color.rgb=RGBColor(0,0,0)
        if chunk.startswith('**'):run.bold=True
        elif chunk.startswith('*'):run.italic=True

def para(doc,text,style=None):
    p=doc.add_paragraph(style=style)
    inline(p,text)
    p.paragraph_format.widow_control=True
    return p

def figure(doc,filename,caption,num):
    path=PROJECT/filename
    if not path.exists():raise FileNotFoundError(path)
    w,h=Image.open(path).size
    width=min(6.45,4.25*w/h)
    p=doc.add_paragraph();p.alignment=WD_ALIGN_PARAGRAPH.CENTER;p.paragraph_format.first_line_indent=Inches(0);p.paragraph_format.space_before=Pt(6);p.paragraph_format.space_after=Pt(3);p.paragraph_format.keep_with_next=True
    p.add_run().add_picture(str(path),width=Inches(width))
    dr=p._p.xpath('.//wp:docPr')
    if dr:dr[0].set('descr',re.sub(r'^Figura \d+\s*[—–-]\s*','',caption))
    cp=doc.add_paragraph();cp.alignment=WD_ALIGN_PARAGRAPH.CENTER;cp.paragraph_format.first_line_indent=Inches(0);cp.paragraph_format.space_after=Pt(10);cp.paragraph_format.keep_together=True
    cap=re.sub(r'^Figura \d+\s*[—–-]\s*','',caption)
    inline(cp,f'Figura {num} — {cap}',9)

def table(doc,lines):
    rows=[[c.strip() for c in l.strip().strip('|').split('|')] for l in lines]
    rows=[r for r in rows if not all(re.fullmatch(r':?-+:?',c) for c in r)]
    if not rows:return
    columns=len(rows[0]);tbl=doc.add_table(rows=1,cols=columns);tbl.alignment=WD_TABLE_ALIGNMENT.CENTER;tbl.autofit=False
    if columns==2:widths=[2.1,4.35]
    elif columns==3:widths=[1.5,1.25,3.70]
    elif columns>=8:widths=[1.05]+[(6.45-1.05)/(columns-1)]*(columns-1)
    else:widths=[6.45/columns]*columns
    if columns==3 and any('Comentário' in c for c in rows[0]):widths=[1.0,2.0,3.45]
    if columns==3 and rows[0][1] in ['Conteúdo','Tempo previsto','Tempo']:widths=[1.6,1.0,3.85] if 'Tempo' in rows[0][1] else [1.5,2.1,2.85]
    for col,width in zip(tbl.columns,widths):col.width=Inches(width)
    for i,row in enumerate(rows):
        cells=tbl.rows[0].cells if i==0 else tbl.add_row().cells
        for j,(cell,val) in enumerate(zip(cells,row)):
            cell.width=Inches(widths[j]);cell.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
            helper.set_cell_margins(cell,top=90,start=90,bottom=90,end=90)
            p=cell.paragraphs[0];p.paragraph_format.first_line_indent=Inches(0);p.paragraph_format.line_spacing=1.06;p.paragraph_format.space_after=Pt(0)
            p.alignment=WD_ALIGN_PARAGRAPH.LEFT if columns<5 else WD_ALIGN_PARAGRAPH.CENTER
            inline(p,val,8.3 if columns>=8 else 9.3)
            if i==0:
                helper.set_cell_fill(cell,'E4EDF1')
                p.paragraph_format.keep_with_next=True
                for run in p.runs:run.bold=True
            elif i%2==0:helper.set_cell_fill(cell,'F6F7F8')
        helper.set_row_cant_split(tbl.rows[i])
    helper.set_repeat_table_header(tbl.rows[0]);helper.set_table_borders(tbl,color='D9D9D9',size=5)
    if columns==5 and 'Justificativa da equipe' in rows[0]:
        for row in tbl.rows[1:]:
            row.height=Inches(.65);row.height_rule=WD_ROW_HEIGHT_RULE.AT_LEAST
    doc.add_paragraph().paragraph_format.space_after=Pt(0)

def expand():
    text=(PROJECT/'projeto.md').read_text(encoding='utf-8')
    refs=(ROOT/'referencias_verificadas.md').read_text(encoding='utf-8').split('## Bibliografia consolidada')[1].split('## Correções necessárias')[0].strip()
    local_ref='UNIVERSIDADE FEDERAL DO VALE DO SÃO FRANCISCO. Física Experimental A FISC 0099. Contrato didático e materiais das aulas 1 e 2. Material da disciplina fornecido pela Profa. Mariele Pinheiro, 2026.'
    refs=refs.replace('VELDKAMP, Alice;',local_ref+'\n\nVELDKAMP, Alice;')
    aps=(ROOT/'apendices.md').read_text(encoding='utf-8')
    aps='\n'.join(aps.splitlines()[2:]);aps=re.sub(r'^## (Apêndice[^\n]+)',r'# \1',aps,flags=re.M);aps=re.sub(r'^### ',r'## ',aps,flags=re.M)
    caps='\n\n'.join([
      'As imagens mostram a interface revisada em uma demonstração técnica, sem respostas de uma turma.',
      '![Abertura com narrativa e objetivo da investigação. Fonte: captura da versão local do LabMotion em 20 out. 2026.](figuras/tela_abertura.png)',
      'O mapa orienta a sequência. As missões seguintes permanecem bloqueadas até que a anterior seja concluída e justificada.',
      '![Mapa das cinco missões e progressão do relatório. Fonte: captura da versão local do LabMotion.](figuras/tela_mapa.png)',
      'A resposta incorreta produz feedback explicativo e permite nova tentativa. As pistas são graduais; não há pontuação por velocidade.',
      '![Feedback da missão de medidas após uma resposta incorreta. Fonte: demonstração técnica do LabMotion.](figuras/tela_feedback.png)',
      'Os desafios de cinemática apresentam tabelas e equações para que as alternativas sejam discutidas a partir dos dados.',
      '![Missão sobre MRU com dados e interpretação do ajuste. Fonte: captura da versão local do LabMotion.](figuras/tela_mru.png)',
    ])
    verification=(ROOT/'verificacao_relatorio.md').read_text(encoding='utf-8')
    text=text.replace('@@referencias',refs).replace('@@apendices',aps).replace('@@capturas',caps).replace('@@verificacao',verification)
    # Reference to rubric is Apêndice D in supplied appendices.
    text=text.replace('rubrica do Apêndice C','rubrica do Apêndice D')
    (PROJECT/'projeto_consolidado.md').write_text(text,encoding='utf-8')
    return text

def build():
    doc=Document();helper.configure_document(doc)
    sec=doc.sections[0];sec.top_margin=Inches(.8);sec.bottom_margin=Inches(.8);sec.left_margin=Inches(1);sec.right_margin=Inches(1)
    normal=doc.styles['Normal'];normal.font.size=Pt(11);normal.paragraph_format.line_spacing=1.16;normal.paragraph_format.space_after=Pt(6);normal.paragraph_format.first_line_indent=Inches(.35)
    for name,size in [('Title',24),('Subtitle',13),('Heading 1',15),('Heading 2',12),('Heading 3',11)]:
        s=doc.styles[name];s.font.name='Arial';s.font.size=Pt(size);s.font.color.rgb=RGBColor(0,0,0)
        s.paragraph_format.first_line_indent=Inches(0)
    title=doc.add_paragraph('LabMotion',style='Title');title.alignment=WD_ALIGN_PARAGRAPH.CENTER
    p=doc.add_paragraph('Produto educacional para Física Experimental A',style='Subtitle');p.alignment=WD_ALIGN_PARAGRAPH.CENTER
    p=doc.add_paragraph('UNIVERSIDADE FEDERAL DO VALE DO SÃO FRANCISCO\nUNIVASF');p.alignment=WD_ALIGN_PARAGRAPH.CENTER;p.paragraph_format.first_line_indent=Inches(0)
    p=doc.add_paragraph('Alinne de Souza Santos Castro\nMatheus Souza da Silva Leite\nJoão Charles Farias Gomes Junior\nArielly Ferreira Marques de Lima');p.alignment=WD_ALIGN_PARAGRAPH.CENTER;p.paragraph_format.first_line_indent=Inches(0);p.paragraph_format.space_before=Pt(22);p.paragraph_format.space_after=Pt(22)
    p=doc.add_paragraph('Turma de Física Experimental A\nProfessora Mariele Pinheiro');p.alignment=WD_ALIGN_PARAGRAPH.CENTER;p.paragraph_format.first_line_indent=Inches(0)
    p=doc.add_paragraph('20 de outubro de 2026');p.alignment=WD_ALIGN_PARAGRAPH.CENTER;p.paragraph_format.first_line_indent=Inches(0);p.paragraph_format.space_before=Pt(22)
    p=doc.add_paragraph('Relatório do desenvolvimento com roteiro de aplicação e gabarito');p.alignment=WD_ALIGN_PARAGRAPH.CENTER;p.paragraph_format.first_line_indent=Inches(0)
    doc.add_page_break()
    text=expand();lines=text.splitlines();i=0;eq=0;fig=0;in_references=False
    while i<len(lines):
        line=lines[i].strip()
        if not line:i+=1;continue
        if line.startswith('#'):
            level=min(3,len(line)-len(line.lstrip('#')));label=line.lstrip('#').strip()
            if level==1:in_references=label.startswith('7 ')
            if level==1 and (label.startswith('7 ') or label.startswith('Apêndice')):
                doc.add_page_break()
            p=doc.add_paragraph(label,style=f'Heading {level}');p.paragraph_format.first_line_indent=Inches(0)
            i+=1;continue
        if line.startswith('@@eq:'):
            eq+=1;equation(doc,line.split(':',1)[1],eq);i+=1;continue
        if line.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].strip().startswith('|'):rows.append(lines[i]);i+=1
            table(doc,rows);continue
        pic=re.match(r'!\[(.*?)\]\((.*?)\)',line)
        if pic:
            fig+=1;figure(doc,pic[2],pic[1],fig);i+=1;continue
        bullet=re.match(r'^([-*]|\d+\.)\s+(.*)',line)
        if bullet:
            is_bullet=bullet[1] in ['-','*']
            p=para(doc,bullet[2] if is_bullet else bullet[1]+' '+bullet[2],style='List Bullet' if is_bullet else None);p.paragraph_format.first_line_indent=Inches(-.15);p.paragraph_format.left_indent=Inches(.22)
        else:
            p=para(doc,line)
            if in_references or 'https://' in line:
                p.paragraph_format.alignment=WD_ALIGN_PARAGRAPH.LEFT;p.paragraph_format.first_line_indent=Inches(0);p.paragraph_format.line_spacing=1.0;p.paragraph_format.space_after=Pt(4)
                for run in p.runs:run.font.size=Pt(10)
        i+=1
    doc.core_properties.title='LabMotion produto educacional para Física Experimental A'
    doc.core_properties.author='Alinne de Souza Santos Castro; Matheus Souza da Silva Leite; João Charles Farias Gomes Junior; Arielly Ferreira Marques de Lima'
    doc.core_properties.subject='Relatório de desenvolvimento e roteiro de aplicação'
    path=OUT/'LabMotion_Projeto_Completo.docx';doc.save(path)
    print(path);print('Figuras:',fig,'Equações:',eq,'Tabelas:',len(doc.tables),'Parágrafos:',len(doc.paragraphs))

if __name__=='__main__':build()
