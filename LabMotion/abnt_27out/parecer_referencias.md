# Parecer de normalização das referências do LabMotion

Data da revisão: 27 de outubro de 2026.

Objeto: as 13 referências e as chamadas autor-data de `LabMotion/revisao_21out/projeto_consolidado_21out.md`. O relatório original não foi alterado. O arquivo `referencias_formatadas.md` contém somente os 13 parágrafos destinados à substituição do bloco final. Esta é uma revisão documental apoiada nas fontes abaixo; não constitui certificação formal de conformidade.

## Resultado prático

O bloco já seguia ordem alfabética e destacava os títulos de livros/guias e de periódicos. Os principais ajustes feitos foram: completar endereço e acesso nos sete artigos que tinham somente DOI; uniformizar os prenomes por iniciais, sem desenvolver nomes não confirmados; padronizar a indicação do DOI; delimitar título e subtítulo no guia de metrologia; aplicar destaque ao título do material da disciplina; explicitar a ausência de dados de publicação sem preencher cidades por suposição.

As datas de acesso de 20 out. 2026 correspondem à verificação anterior registrada no projeto e foram preservadas. Não foram substituídas pela data desta revisão. Não foram acrescentados dias/meses de publicação, números de fascículos ou páginas sem confirmação. O número 1 do fascículo de Klein foi confirmado na página da APS na verificação anterior.

## Regras aplicadas

Na NBR 6023:2025, os itens 6.3, 6.6–6.8, 7.7.6, 8.4.3–8.4.4 e 8.13 sustentam: lista com alinhamento à esquerda, espaço simples e separação de uma linha; destaque uniforme; DOI existente nos artigos eletrônicos; endereço e data de consulta para fontes online; uso de colchetes para local identificado externamente ou não identificado. O DOI pode ser seguido do endereço resolvível como disponibilidade. A informação de acesso não é eliminada pela existência do DOI. A data de publicação deve permanecer diferente da data de consulta. [NBR 6023:2025 disponível pela Biblioteca FHO](https://www.fho.edu.br/assets/documentos/FHO_Biblioteca_Referencia_ABNT_6023_2025.pdf).

A atualização de 2025 tornou explícitos DOI e e-localização no modelo de artigo eletrônico; não autoriza trocar um identificador de artigo por uma paginação inventada. Os códigos 013102, 100364 e 26 foram preservados. [Biblioteca Universitária Zilda Paim da UFRB](https://www.ufrb.edu.br/bibliotecacecult/noticias/437-referencias-sem-misterio-como-organizar-as-fontes-do-seu-trabalho-pelas-normas-da-abnt).

Para o destaque escolhido neste trabalho, os títulos dos periódicos ficam em negrito e os títulos dos artigos permanecem sem esse destaque. Livros/guias recebem negrito no título principal. O padrão de abreviação dos nomes foi uniformizado; os autores continuam separados por ponto e vírgula. [Guia da Biblioteca IE/CEDOC da Unicamp](https://www3.eco.unicamp.br/biblioteca/images/arquivos/NBR60232025Referencias.pdf). Esse guia possui exemplos herdados da edição anterior; quando diverge sobre o DOI, prevalece o texto efetivo da norma de 2025 consultado acima.

Na NBR 10520:2023, sobrenomes nas chamadas entre parênteses utilizam iniciais maiúsculas, sem caixa alta integral; siglas institucionais continuam em maiúsculas. Para mais de três autores, é possível usar primeiro autor e *et al.*, inclusive quando todos estão indicados na referência. A expressão latina é grafada em itálico. [Biblioteca Central da UFPA](https://bc.ufpa.br/atualizacao-da-norma-de-citacoes-da-abnt-nbr-10520/).

## Avaliação das chamadas no relatório

| Elemento | Situação | Ação prática para o builder |
|---|---|---|
| Trumper, Sasseron, Moreira, Hattie/Timperley e Sampson/Clark em chamadas narrativas | Caixa dos nomes adequada | Preservar nomes com inicial maiúscula. |
| Freeman, Klein, Wang e Veldkamp seguidos de et al. | Conteúdo e quantidade de autores permitem a abreviação | Transformar `et al.` em itálico em todas as chamadas. |
| `(JCGM, 2008)` | Sigla em caixa alta é admitida; falta expansão para o leitor na primeira menção | Introduzir o nome Joint Committee for Guides in Metrology e a sigla JCGM na primeira ocorrência, mantendo a chamada autor-data. |
| AAPT (2014) | Sigla em caixa alta é admitida; deve ser esclarecida | Explicitar American Association of Physics Teachers (AAPT) na primeira menção. |
| Material UNIVASF na lista final | Fonte mencionada como “materiais da disciplina”, mas sem chamada autor-data inequívoca | Acrescentar `(UNIVASF, 2026)` na frase da seção 4.3 sobre seleção das habilidades nos materiais, pois a sigla já consta na identificação. |
| Correspondência | As 12 referências externas têm menção no corpo; a 13ª é o material da disciplina | Não inserir no relatório as fontes usadas somente para normalização. |

Não foram identificadas citações diretas acadêmicas que exijam acrescentar uma página por regra de localização. As aspas nos exemplos de resposta do jogo identificam modelos elaborados no próprio projeto; não representam trechos atribuídos às obras acadêmicas. Evitar inventar números de página para paráfrases.

## Dados de publicação e limitações

College Park e Sèvres foram mantidos porque já constavam das referências conferidas. A cidade Belo Horizonte consta da identificação do periódico Ensaio no material já consultado. Para Ensino, Saúde e Ambiente, a ficha bibliográfica institucional declara publicação em Niterói; foi adotado `[Niterói]` porque a informação foi identificada externamente ao registro do artigo. [Ficha bibliográfica do periódico na UFF](https://periodicos.uff.br/ensinosaudeambiente/about); [registro institucional do periódico Ensaio na SciELO](https://new.scielo.br/j/epec/i/2015.v17n2/?ilang=en).

Nos oito outros periódicos, o local não foi determinado a partir dos metadados disponíveis nesta revisão; foi usado `[S. l.]` para sinalizar a lacuna, sem confundir afiliação dos autores com cidade de publicação. Esses marcadores são conservadores e podem ser substituídos por cidades quando uma ficha bibliográfica da revista ou o exemplar consultado as comprovar. Não representam confirmação de que seja impossível localizar a cidade por outras fontes.

A entrada da UNIVASF reúne materiais internos da disciplina. Conserva a descrição e o ano previamente registrados; `[S. l.: s. n.]` informa ausência de confirmação de local e editor no registro disponível. Não foi inventada URL pública nem data de acesso para arquivos recebidos diretamente. Para uma catalogação mais detalhada, contrato e cada aula podem receber entradas individuais a partir de seus próprios títulos e metadados, sem atribuir à professora uma autoria que o arquivo não declare.

## Instruções de integração

1. Substituir somente o bloco das 13 referências pelo conteúdo de `referencias_formatadas.md`.
2. Aplicar as pequenas correções de chamadas descritas na tabela, mantendo o conteúdo científico.
3. Renderizar cada referência em parágrafo próprio, alinhado à esquerda, com espaço simples, sem recuo de primeira linha e com uma linha em branco entre referências. Evitar hifenização que modifique URLs e DOI.
4. Interpretar os marcadores Markdown `**...**` como negrito real; não imprimir asteriscos no documento. Aplicar itálico real às ocorrências de *et al.*.
5. Manter as fontes deste parecer fora da bibliografia científica do LabMotion, pois foram consultadas apenas para a formatação.

A página da Ufes confirma a vigência conjunta da NBR 6023:2025 e da NBR 10520:2023 e distingue essas normas da NBR 14724:2024, que trata da apresentação geral do trabalho. Esta auditoria não avaliou capa, margens, sumário ou paginação. [Sistema Integrado de Bibliotecas da Ufes](https://biblioteca.ufes.br/manuais-de-normalizacao).
