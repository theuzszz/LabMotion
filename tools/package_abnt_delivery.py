"""Empacota a entrega com formatação ABNT depois da aprovação visual do relatório.

Executar somente quando LabMotion/abnt_27out/LabMotion_Projeto_ABNT.docx e
LabMotion_Projeto_ABNT.pdf estiverem finalizados. Usa lista explícita de arquivos;
não altera jogo, documentos de origem, pacotes anteriores ou serviços externos.
"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, is_zipfile

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / 'LabMotion'
ABNT = PROJECT / 'abnt_27out'
SHARE = PROJECT / 'revisao_21out' / 'PARA_COMPARTILHAR'
OUTPUT = ABNT / 'LabMotion_Pacote_ABNT.zip'

FILES = [
    (ABNT / 'LabMotion_Projeto_ABNT.pdf', 'Professora/LabMotion_Projeto_ABNT.pdf'),
    (ABNT / 'LabMotion_Projeto_ABNT.docx', 'Grupo/LabMotion_Projeto_ABNT.docx'),
    (SHARE / 'Grupo/LabMotion_Apresentacao.pptx', 'Grupo/LabMotion_Apresentacao.pptx'),
    (SHARE / 'Grupo/Roteiro_Apresentacao.md', 'Grupo/Roteiro_Apresentacao.md'),
    (SHARE / 'Grupo/Roteiro_Apresentacao.txt', 'Grupo/Roteiro_Apresentacao.txt'),
    (SHARE / 'Jogo/LabMotion.html', 'Jogo/LabMotion.html'),
    (SHARE / 'Jogo/LICENCA_FONTE_FREDOKA.txt', 'Jogo/LICENCA_FONTE_FREDOKA.txt'),
]

INSTRUCTIONS = '''LABMOTION — ENTREGA ABNT DE 27 DE OUTUBRO DE 2026

PARA A PROFESSORA
Enviar Professora/LabMotion_Projeto_ABNT.pdf e Jogo/LabMotion.html como
documentos/anexos, ou enviar este ZIP completo pelo canal solicitado.

PARA O GRUPO
Baixar e extrair o ZIP. Em Grupo estão o Word editável, os slides e o roteiro
para organizar as falas e ensaiar. A divisão do roteiro é uma proposta;
não registra participação já realizada.

PARA JOGAR E APRESENTAR
Abrir Jogo/LabMotion.html com dois cliques no navegador do computador.
O jogo funciona sem login, sem instalar o código-fonte e sem internet.
Se a prévia de um aplicativo não executar o jogo, baixar o HTML e abrir
no navegador. Testar o arquivo no computador da apresentação antes da aula.
Ao concluir uma equipe, exportar o registro antes de reiniciar a atividade.
Os resultados ficam no computador e seu envio à professora é manual.

WHATSAPP, E-MAIL OU AVA
Anexar o PDF e o HTML como documentos/arquivos, ou anexar o ZIP completo.
Um caminho C:/Users/... não abre no computador de outra pessoa; enviar os
arquivos de verdade. O site antigo é privado e não substitui esta entrega.

SITUAÇÃO DO PROJETO
O produto foi implementado e verificado tecnicamente. Ainda não houve
aplicação com estudantes. Os dados são didáticos; não são resultados de
aprendizagem de uma turma. O diagnóstico do jogo registra a equipe e os
argumentos escritos precisam de avaliação docente.

Esta versão aplica a formatação ABNT preparada para o relatório. A revisão
da professora continua sendo a referência para exigências da disciplina.
Nada foi publicado nem enviado automaticamente por este empacotamento.
'''

GAME_INSTRUCTIONS = '''ABRIR O LABMOTION

Abra LabMotion.html no navegador do computador com um duplo clique.
O jogo, os estilos e a fonte estão incorporados; não é necessário login.
Se recebeu um ZIP, extraia antes de abrir. Mantenha a aba aberta durante
a sessão e exporte o registro final antes de iniciar outra equipe.
Armazenamento e download podem depender das permissões do navegador.
'''


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    # Falha antes de criar qualquer saída se os novos relatórios não existem.
    for source, destination in FILES:
        if not source.resolve().is_relative_to(PROJECT.resolve()):
            raise RuntimeError(f'Origem fora do projeto: {source.name}')
        if not source.is_file() or source.stat().st_size == 0:
            raise FileNotFoundError(f'Arquivo final ausente ou vazio: {source}')
        if Path(destination).is_absolute() or '..' in Path(destination).parts:
            raise RuntimeError('Nome inválido dentro do ZIP')

    pdf = FILES[0][0]
    if not pdf.read_bytes().startswith(b'%PDF-'):
        raise RuntimeError('O relatório PDF não tem cabeçalho PDF válido')
    for source, _ in FILES:
        if source.suffix.lower() in {'.docx', '.pptx'}:
            if not is_zipfile(source):
                raise RuntimeError(f'Arquivo Office inválido: {source.name}')
            with ZipFile(source) as office:
                required = 'word/document.xml' if source.suffix.lower() == '.docx' else 'ppt/presentation.xml'
                if required not in office.namelist() or office.testzip() is not None:
                    raise RuntimeError(f'Estrutura Office inválida: {source.name}')

    original_game = PROJECT / 'jogo_portatil/LabMotion.html'
    game_hash = sha256(SHARE / 'Jogo/LabMotion.html')
    if not original_game.is_file() or game_hash != sha256(original_game):
        raise RuntimeError('O jogo da distribuição difere do HTML original; conferir antes de empacotar')

    manifest = {
        'versao': 'ABNT 27 de outubro de 2026',
        'jogo_preservado_sha256': game_hash,
        'aplicacao_com_estudantes': False,
        'publicado_ou_enviado': False,
        'arquivos': [
            {'arquivo': destination, 'bytes': source.stat().st_size, 'sha256': sha256(source)}
            for source, destination in FILES
        ],
        'instrucoes_geradas': ['LEIA_PRIMEIRO.txt', 'Jogo/COMO_ABRIR.txt'],
    }

    if not OUTPUT.resolve().is_relative_to(ABNT.resolve()):
        raise RuntimeError('Destino fora da pasta ABNT')
    ABNT.mkdir(parents=True, exist_ok=True)
    temporary = OUTPUT.with_suffix('.zip.tmp')
    expected_names = {destination for _, destination in FILES}
    expected_names.update({'LEIA_PRIMEIRO.txt', 'Jogo/COMO_ABRIR.txt', 'manifesto.json'})
    with ZipFile(temporary, 'w', ZIP_DEFLATED, compresslevel=9) as package:
        for source, destination in FILES:
            package.write(source, destination)
        package.writestr('LEIA_PRIMEIRO.txt', INSTRUCTIONS.encode('utf-8-sig'))
        package.writestr('Jogo/COMO_ABRIR.txt', GAME_INSTRUCTIONS.encode('utf-8-sig'))
        package.writestr('manifesto.json', json.dumps(manifest, ensure_ascii=False, indent=2).encode('utf-8'))

    with ZipFile(temporary) as package:
        if set(package.namelist()) != expected_names or len(package.namelist()) != len(expected_names):
            raise RuntimeError('O ZIP contém arquivos inesperados ou duplicados')
        if package.testzip() is not None:
            raise RuntimeError('O ZIP falhou no teste de integridade')
        if hashlib.sha256(package.read('Jogo/LabMotion.html')).hexdigest() != game_hash:
            raise RuntimeError('O jogo mudou dentro do ZIP')

    temporary.replace(OUTPUT)
    print(json.dumps({
        'pacote': str(OUTPUT),
        'arquivos': len(expected_names),
        'bytes': OUTPUT.stat().st_size,
        'integridade_zip': 'aprovada',
        'jogo_preservado': True,
        'relatorios_antigos_incluidos': False,
        'codigo_de_desenvolvimento_incluido': False,
        'publicado_ou_enviado': False,
    }, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
