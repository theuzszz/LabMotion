# 1 Identificação

**Título:** LabMotion — do dado à lei física. **Natureza:** produto educacional digital para revisão de análise experimental e cinemática. **Instituição:** Universidade Federal do Vale do São Francisco — UNIVASF. **Disciplina e turma:** Física Experimental A. **Docente:** Profa. Mariele Pinheiro. **Autores:** Alinne de Souza Santos Castro; Matheus Souza da Silva Leite; João Charles Farias Gomes Junior; Arielly Ferreira Marques de Lima. **Data desta versão:** 21 de outubro de 2026.

O produto consiste em um escape room digital com cinco missões sobre medidas e incertezas, gráficos científicos, Movimento Retilíneo Uniforme, Movimento Retilíneo Uniformemente Variado e argumentação. Este relatório apresenta a fundamentação, os objetivos, os materiais, a construção do recurso, o procedimento de aplicação, os cálculos dos desafios e a verificação técnica da versão desenvolvida. A aplicação com estudantes será realizada após a avaliação da professora; por isso, a discussão dos resultados se refere ao desenvolvimento e à análise do produto.

# 2 Introdução com fundamentação teórica

## 2.1 Contexto e problema educacional

O laboratório de Física permite relacionar modelos teóricos, procedimentos de medição e construção de explicações. Entretanto, seguir um roteiro e substituir valores em equações não garante que o estudante compreenda a qualidade das medidas, o significado dos gráficos ou os limites de uma conclusão. Em Física Experimental A, interpretar incertezas, ajustar dados e reconhecer parâmetros físicos são habilidades que acompanham as práticas posteriores da disciplina.

Essas habilidades também são relevantes para a formação em Engenharia. Decisões sobre desempenho de equipamentos, controle da qualidade e acompanhamento de processos dependem da leitura de dados com unidades, da avaliação da variabilidade e da escolha de modelos adequados. Na Engenharia de Produção, por exemplo, gráficos de tempos de operação e medidas de um processo precisam ser interpretados antes de orientar uma intervenção. Esses exemplos mostram a utilidade do raciocínio experimental além da disciplina, sem pressupor que a obtenção de um número seja suficiente para justificar uma decisão técnica.

Historicamente, parte do trabalho de laboratório foi organizada como verificação de leis já apresentadas em aula. Trumper (2002) discute a necessidade de ampliar essa prática para desenvolver a compreensão dos métodos de investigação e do significado dos resultados. As recomendações da AAPT (2014) incluem modelagem, planejamento experimental, análise e visualização de dados e comunicação. Nesse contexto, uma atividade digital pode servir à preparação e à revisão do laboratório quando exige decisões sobre evidências e permite explicá-las.

Um escape room educacional é uma atividade em que os participantes resolvem desafios conectados por uma narrativa para atingir um objetivo comum. No formato digital, as respostas liberam etapas e permitem acompanhar o percurso da equipe. O objetivo do LabMotion é recuperar partes de um relatório experimental corrompido; a conclusão da história depende da interpretação de dados de Física. Escolheu-se esse formato para reunir colaboração, decisões justificadas e revisão após o erro em uma sequência com continuidade. A opção por análise experimental e cinemática decorre da presença desses conteúdos em Física Experimental A e da oportunidade de trabalhar dificuldades de interpretação que permanecem ocultas quando a tarefa exige apenas substituir valores em uma fórmula.

O LabMotion aborda esse problema com cinco missões. A equipe deve recuperar uma medida confiável, corrigir um gráfico, interpretar velocidade e aceleração e produzir uma conclusão fundamentada. As missões acompanham as etapas medir, representar, modelar, interpretar e argumentar. Os conjuntos numéricos são usados como exemplos didáticos; sua análise não representa uma nova coleta experimental realizada pelos autores.

## 2.2 Aprendizagem ativa e investigação

Freeman et al. (2014) reuniram evidências de melhoria de desempenho em cursos superiores STEM com aprendizagem ativa. Esse resultado fundamenta a escolha de tarefas em que os estudantes discutem, interpretam e justificam, mas não permite antecipar um ganho específico para o LabMotion. O efeito de um recurso depende também da mediação, do conhecimento prévio e do tempo de trabalho.

Sasseron (2015) relaciona alfabetização científica, investigação e argumentação: o estudante precisa trabalhar com evidências, avaliar possibilidades e comunicar explicações. Moreira (2011) destaca a participação do aluno e a articulação com conhecimentos prévios. No produto, o diagnóstico inicial torna visíveis algumas interpretações da equipe, os feedbacks permitem revisá-las e a discussão final retoma o raciocínio empregado. A atuação do professor permanece necessária para analisar as respostas abertas e esclarecer dificuldades.

O percurso representado na Figura 1 relaciona cada missão a uma ação de investigação guiada. Na primeira, a equipe compara leituras e distingue dispersão e incerteza. Na segunda, avalia como os dados devem ser representados. Na terceira e na quarta, confronta as tabelas e os gráficos com os modelos de MRU e MRUV, interpretando parâmetros e condições de uso. Na quinta, reúne uma afirmação, a evidência que a sustenta e a explicação física dessa ligação. O registro de justificativas permite ao professor examinar o raciocínio que levou à escolha, além do acerto da alternativa.

![Figura 1 — Percurso conceitual das missões do LabMotion. Fonte: elaboração dos autores.](figuras/percurso.png)

Trata-se de investigação guiada porque os dados, as alternativas e a sequência são previamente definidos. O produto não oferece uma investigação aberta em que os participantes planejam livremente um experimento e coletam novas medidas. Dentro dessa delimitação, a equipe precisa comparar interpretações, escolher um modelo, receber feedback e rever sua resposta. O debriefing retoma as escolhas e pede que os participantes expliquem o que os fez mudar de ideia. A argumentação, assim, acompanha as missões e não aparece apenas como um texto no encerramento.

## 2.3 Medidas e incertezas

Uma medição produz uma estimativa acompanhada de informação sobre sua incerteza. A repetição das leituras permite avaliar a dispersão, enquanto resolução, calibração e outras informações do instrumento contribuem para a avaliação do tipo B. Tipo A e tipo B designam formas de avaliação da incerteza, e não duas categorias universais de erro (JCGM, 2008).

Para N observações independentes da mesma grandeza, a média é:

@@eq:media

Na Equação (1), x̄ é a média aritmética; xᵢ é o valor da i-ésima observação; N é o número total de observações; e i é o índice inteiro que percorre os valores de 1 a N. O símbolo ∑ indica a soma das observações nesse intervalo. N e i são contagens adimensionais; x̄ e xᵢ têm a mesma unidade da grandeza medida, como centímetro (cm) ou metro (m) para comprimento.

A incerteza-padrão do tipo A associada à média pode ser calculada por:

@@eq:tipo_a

Na Equação (2), uA(x̄) é a incerteza-padrão do tipo A associada à média x̄. Cada xᵢ representa uma leitura, i é o índice de 1 a N e N é o total de leituras, com N ≥ 2. A diferença xᵢ − x̄ é o desvio de uma leitura em relação à média; ∑ reúne os quadrados desses desvios. O numerador tem a unidade da grandeza ao quadrado, o denominador N(N − 1) é adimensional e a raiz quadrada faz uA ter a mesma unidade de xᵢ e x̄. Essa estimativa corresponde ao desvio-padrão amostral dividido por √N, sob as hipóteses de observações independentes e condições comparáveis de medição.

Quando as contribuições do tipo A e do tipo B são independentes e estão expressas como incertezas-padrão para a mesma grandeza, com coeficientes de sensibilidade unitários, utiliza-se:

@@eq:combinada

Na Equação (3), uc é a incerteza-padrão combinada, uA é a contribuição avaliada estatisticamente e uB é a contribuição avaliada por outras informações, como resolução ou calibração do instrumento. As três têm a mesma unidade da grandeza de interesse. Os quadrados expressam a combinação das variâncias e a raiz devolve a unidade original. O resultado x̄ ± uc informa uma incerteza-padrão combinada; não especifica, por si só, uma probabilidade fixa de cobertura, como 95%.

O resultado deve informar unidade e coerência entre as casas decimais do valor central e da incerteza. Precisão, exatidão, erro e incerteza não são sinônimos: medidas próximas entre si podem apresentar um desvio sistemático, e dispersão não demonstra, isoladamente, um erro grosseiro. A Missão 1 trabalha essas distinções e a escrita do resultado, sem exigir uma estimativa instrumental universal a partir apenas da resolução.

Uma resolução digital Δ, modelada como arredondamento uniforme no intervalo de −Δ/2 a +Δ/2, contribui com uB = Δ/√12. Nessa expressão, Δ é o incremento de indicação do instrumento e uB é a incerteza-padrão dessa contribuição, ambos na unidade da grandeza medida; 12 é um fator adimensional decorrente do modelo retangular. Outra informação instrumental pode exigir outro modelo. A escrita (4,12 ± 0,01) cm do jogo é uma convenção didática declarada para o exercício de apresentação; os cálculos completos e a comparação com um modelo de resolução aparecem na seção 5. Não se confunde essa convenção com a determinação metrológica única da incerteza-padrão.

Como exemplo complementar, distinto das dez leituras em centímetros utilizadas na Missão 1, considerem-se cinco leituras hipotéticas de comprimento: 1,21 m; 1,23 m; 1,22 m; 1,24 m; e 1,20 m. A média é 1,220 m e o desvio-padrão amostral é aproximadamente 0,01581 m. A incerteza-padrão da média é uA = 0,01581/√5 ≈ 0,0071 m, evidenciando que a dispersão das leituras e a incerteza da média são quantidades diferentes.

Supondo nesse exemplo um instrumento digital com resolução Δ = 0,01 m e somente a contribuição de arredondamento ao valor mais próximo, uB = 0,005/√3 ≈ 0,0029 m. Com as hipóteses da Equação (3), obtém-se uc ≈ 0,0076 m e a escrita arredondada (1,220 ± 0,008) m. Esses números ilustram o uso das equações e não foram medidos pelo grupo. O conjunto é complementar: não substitui os dados, as unidades ou o gabarito da missão original.

## 2.4 Representações gráficas e cinemática

Um gráfico científico precisa identificar as grandezas, suas unidades, a escala e os dados utilizados. Pontos experimentais e curva de ajuste têm funções diferentes: os primeiros apresentam as observações; a segunda expressa o modelo ajustado. A leitura deve relacionar as representações verbal, matemática e gráfica. Klein et al. (2021) analisam objetivos de itens do Test of Understanding Graphs in Kinematics a partir de movimentos oculares, contribuindo para a discussão dessas relações.

No Movimento Retilíneo Uniforme, a velocidade é constante e a posição é descrita por:

@@eq:mru

Na Equação (4), x é a posição do móvel no instante considerado e x₀ é a posição inicial, ambas em metros (m); v é a velocidade constante, em metros por segundo (m/s); e t é o tempo transcorrido desde o instante de referência, em segundos (s). O produto vt é um deslocamento e tem unidade de metro, compatível com os outros termos da expressão.

No gráfico de posição em função do tempo, a inclinação representa a velocidade e o intercepto representa a posição inicial estimada. A unidade da inclinação é m/s quando a posição é dada em metros e o tempo em segundos. Uma posição inicial diferente de zero não impede que o movimento seja uniforme.

No Movimento Retilíneo Uniformemente Variado, a aceleração é constante:

@@eq:mruv

Na Equação (5), x é a posição no instante considerado, em metros (m); x₀ é a posição inicial, em metros (m); v₀ é a velocidade inicial, em metros por segundo (m/s); t é o tempo transcorrido, em segundos (s); e a é a aceleração constante, em metros por segundo ao quadrado (m/s²). O fator 1/2 é adimensional. Tanto v₀t quanto (1/2)at² têm unidade de metro e representam as contribuições para o deslocamento.

Se a velocidade inicial é desprezível, representar a posição em função de t² permite obter uma reta com inclinação a/2. Nesse gráfico, t² tem unidade de segundo ao quadrado (s²), o coeficiente angular A tem unidade de m/s² e o intercepto corresponde a x₀, em metros. Portanto, a = 2A, em que 2 é adimensional. Para os dados idealizados da Missão 4, x₀ = 0 e v₀ = 0; assim, x = 0,20t², com coeficiente de 0,20 m/s², e a = 0,40 m/s². A transformação não é uma regra geral para qualquer MRUV: com velocidade inicial relevante, o termo v₀t precisa ser considerado no ajuste.

No método de mínimos quadrados ordinários, a reta x = At + B é escolhida para minimizar a soma dos quadrados dos resíduos verticais. A aplicação pressupõe que essa forma de ajuste seja adequada aos dados; incertezas relevantes no tempo ou pesos diferentes exigiriam tratamento mais específico. Neste produto o ajuste é um exemplo didático sem ponderação, e não um estudo completo de incerteza de parâmetros.

@@eq:ajuste

Na Equação (6), A é o coeficiente angular da reta ajustada x = At + B, em m/s, e B é o coeficiente linear, em metros (m). Os pares (tᵢ, xᵢ) são os valores de tempo, em segundos (s), e posição, em metros (m), da observação de índice i. As médias t̄ e x̄ correspondem, respectivamente, aos tempos e às posições do conjunto. N é o total de pares, i varia de 1 a N e ∑ indica a soma sobre esses pares; N e i são adimensionais. Os desvios tᵢ − t̄ e xᵢ − x̄ têm unidades de s e m; por isso, a razão que determina A tem unidade m/s. O produto At̄ tem unidade de metro, de modo que B = x̄ − At̄ também é uma posição. O cálculo de A exige variação nos valores de tempo, para que seu denominador não seja zero.

@@eq:r2

Na Equação (7), R² é o coeficiente de determinação, adimensional. xᵢ é a posição observada no par de índice i, x̂ᵢ é a posição prevista pela reta para o mesmo tempo tᵢ, dada por x̂ᵢ = Atᵢ + B, e x̄ é a média das posições observadas, todas em metros (m). A é a inclinação do ajuste em m/s, B é seu intercepto em m e tᵢ é o tempo em segundos. N é o número de pares, i percorre os valores de 1 a N e ∑ representa a soma nesse intervalo. O resíduo xᵢ − x̂ᵢ e o desvio xᵢ − x̄ têm unidade de metro; as duas somas de quadrados têm unidade de m², que se cancela na razão. O fator 1 é adimensional. Essa forma de R² pressupõe que a variabilidade das posições em torno da média seja diferente de zero.

O coeficiente de determinação R² compara a soma dos quadrados dos resíduos com a variabilidade dos valores de posição em torno da média. Um R² elevado indica bom ajuste nesse sentido estatístico; não verifica sozinho as unidades, o mecanismo físico, a qualidade dos instrumentos nem as hipóteses experimentais. O jogo solicita uma linguagem proporcional à evidência, como “os dados são compatíveis com o modelo”.

## 2.5 Jogos educacionais e feedback

Wang et al. (2022) encontraram efeito positivo médio de jogos digitais sobre aprendizagem em STEM em uma meta-análise com 33 estudos e 3.894 participantes. Sailer e Homner (2020) também identificam potencial da gamificação, condicionado ao desenho da atividade. Esses estudos justificam investigar o formato, mas não substituem a avaliação do produto desenvolvido.

Um escape room educacional articula narrativa, objetivo comum e desafios relacionados. A revisão de Veldkamp et al. (2020) ressalta o alinhamento entre enigmas e objetivos educacionais e a necessidade de distinguir satisfação de aprendizagem. No LabMotion, a progressão exige interpretar conceitos da disciplina, com pistas e novas tentativas. A rapidez não integra a pontuação.

Hattie e Timperley (2007) discutem o feedback que orienta o estudante sobre a tarefa e os próximos passos. Por isso, as respostas incorretas recebem uma explicação conceitual. A missão final organiza a conclusão em afirmação, evidência e raciocínio, estratégia didática adotada no LabMotion para tornar explícita a ligação entre os dados e a conclusão. A leitura docente das justificativas se apoia na discussão de Sampson e Clark (2008) sobre estrutura, justificação e conteúdo dos argumentos científicos. Essa referência não é apresentada como origem ou validação específica da rubrica do jogo. A verificação automática de texto apenas identifica elementos estruturais; a avaliação da correção conceitual depende da leitura docente.

# 3 Objetivos

## 3.1 Objetivo geral

Desenvolver um produto educacional digital para apoiar a interpretação de dados experimentais e a elaboração de conclusões físicas fundamentadas em atividades de revisão de Física Experimental A.

## 3.2 Objetivos específicos

- Organizar cinco missões com desafios, pistas, feedbacks e registro de justificativas.
- Trabalhar média, fontes de incerteza, qualidade dos gráficos, MRU, MRUV e limites do ajuste estatístico.
- Relacionar inclinação e intercepto às grandezas físicas e linearizar um conjunto didático de MRUV com partida do repouso.
- Solicitar conclusões que conectem modelo, evidência numérica e raciocínio físico.
- Disponibilizar um roteiro de aplicação, gabarito e instrumentos de avaliação.
- Verificar cálculos, navegação, regras de pontuação e preservação dos registros antes da apresentação.

# 4 Materiais e métodos

## 4.1 Natureza do desenvolvimento

O trabalho é um desenvolvimento de produto educacional com verificação técnica e análise de conjuntos didáticos. O público previsto é a turma de Física Experimental A. A atividade foi planejada para equipes de três ou quatro estudantes, com duração total de aproximadamente 60 minutos. Essa organização de participantes se refere ao uso do jogo, não ao limite de autores estabelecido pela disciplina.

A versão final utiliza uma aplicação web própria, com interface em português. A sequência foi organizada em apresentação, instruções, diagnóstico inicial da equipe, mapa das cinco missões, discussão final, pós-teste e síntese dos resultados. O aplicativo registra uma sessão por equipe. Um diagnóstico individual, quando desejado, deve ser aplicado em folha ou formulário separado, conforme o Apêndice C.

## 4.2 Materiais utilizados e requisitos de acesso

| Material ou recurso | Utilização |
|---|---|
| Computador de desenvolvimento | Edição, execução e verificação do aplicativo |
| React e TypeScript | Construção da interface e das regras de interação |
| Vite e vinext | Execução e empacotamento da aplicação web |
| HTML CSS e SVG | Textos, componentes, tabelas e representação gráfica |
| Navegador atualizado | Acesso ao jogo e execução dos testes de uso |
| Computador ou celular por equipe | Participação na atividade |
| Projetor ou tela compartilhada | Apresentação e discussão coletiva |
| Roteiros das aulas e contrato didático | Delimitação dos conteúdos e da estrutura do projeto |
| Folha de registro e rubrica | Avaliação docente das justificativas e da colaboração |
| Biblioteca NumPy e gráficos em Matplotlib | Recálculo dos exemplos e elaboração das figuras científicas do relatório |

O jogo trabalha com dados previamente definidos. Não foi necessário montar um trilho de ar ou medir um corpo durante o desenvolvimento digital. Os exemplos representam situações relacionadas às aulas; a possibilidade de aplicá-los após um experimento físico depende do planejamento da docente. O formato digital não substitui o treinamento com instrumentos e procedimentos de laboratório.

## 4.3 Construção do produto

Primeiramente foram selecionadas as habilidades de interpretação presentes nos materiais da disciplina. Cada habilidade foi associada a uma missão e a perguntas com alternativas plausíveis. A narrativa de um relatório corrompido deu continuidade às etapas. Para cada questão foram definidos resposta, explicação do acerto, orientação em caso de erro e duas pistas graduais.

A interface apresenta textos curtos, botões de resposta e cartões com dados. O mapa mostra a progressão; as etapas seguintes são liberadas após o cumprimento das anteriores. Ao terminar uma missão, a equipe registra uma justificativa. A quinta missão solicita uma limitação experimental e uma conclusão. O professor pode utilizar o conjunto dessas produções para avaliar o raciocínio, além do número de acertos.

Na revisão técnica foram corrigidos problemas de repetição da pontuação e perda de registros. O progresso passou a ser preservado localmente no navegador. A síntese final permite exportar os registros da sessão para arquivo JSON. O aplicativo não constitui um sistema de matrícula, diário de classe ou base de dados central da turma. A exportação precisa ser guardada pela equipe ou recolhida pela docente.

As imagens mostram a interface revisada em uma demonstração técnica, sem respostas de uma turma.

![Abertura com narrativa e objetivo da investigação. Fonte: captura da versão local do LabMotion em 20 out. 2026.](figuras/tela_abertura.png)

O mapa orienta a sequência. As missões seguintes permanecem bloqueadas até que a anterior seja concluída e justificada.

![Mapa das cinco missões e progressão do relatório. Fonte: captura da versão local do LabMotion.](figuras/tela_mapa.png)

A resposta incorreta produz feedback explicativo e permite nova tentativa. As pistas são graduais; não há pontuação por velocidade.

![Feedback da missão de medidas após uma resposta incorreta. Fonte: demonstração técnica do LabMotion.](figuras/tela_feedback.png)

Os desafios de cinemática apresentam tabelas e equações para que as alternativas sejam discutidas a partir dos dados.

![Missão sobre MRU com dados e interpretação do ajuste. Fonte: captura da versão local do LabMotion.](figuras/tela_mru.png)

## 4.4 Arranjo de aplicação

Cada equipe utiliza um dispositivo. São sugeridos papéis alternados de leitura, operação do dispositivo, verificação dos dados e registro, conforme o número de participantes. Os papéis mudam entre missões para distribuir a participação. As decisões devem ser discutidas antes do envio; o responsável pelo dispositivo representa a resposta da equipe.

A docente ou mediadora apresenta o objetivo e acompanha as dúvidas. Pistas do aplicativo devem ser consultadas antes de uma intervenção que entregue a resposta. Quando uma dificuldade persistir, a intervenção pode pedir que a equipe identifique as variáveis e unidades ou releia a relação matemática. O objetivo é manter o raciocínio visível.

## 4.5 Missões e correspondência com os objetivos

| Missão | Conteúdo | Produção solicitada |
|---|---|---|
| 1 Medidas sob suspeita | Média, variação das leituras, tipos A e B e escrita do resultado | Respostas e justificativa sobre qualidade da medida |
| 2 O gráfico sabotado | Eixos, unidades, escala, ajuste e leitura do gráfico | Identificação dos problemas e justificativa |
| 3 O carrinho constante | MRU, inclinação, intercepto e R² | Interpretação dos parâmetros e limites da conclusão |
| 4 A curva escondida | MRUV, transformação t² e aceleração | Cálculo de a e explicação da linearização |
| 5 O parecer científico | Evidência, limitações e argumentação | Limitação plausível e conclusão fundamentada |

## 4.6 Procedimento de aplicação

| Etapa | Tempo previsto | Procedimento |
|---|---:|---|
| Abertura e papéis | 5 min | Explicar finalidade, dados didáticos, regras e registro da equipe |
| Diagnóstico inicial | 7 min | Responder às seis questões sem consultar o gabarito |
| Cinco missões | 35 min | Discutir, responder, consultar pistas quando necessário e justificar |
| Discussão final | 8 min | Retomar hipóteses, erros e evidências em pelo menos duas perguntas |
| Pós-teste e registro | 5 min | Responder, comparar escores da equipe e exportar o arquivo |

Esses tempos são estimativas de planejamento. A primeira aplicação permitirá verificar se a duração é adequada. O questionário de experiência é complementar e pode ser respondido após os 60 minutos. O roteiro completo e os gabaritos estão nos apêndices.

## 4.7 Avaliação e tratamento dos registros

O diagnóstico digital tem seis questões de múltipla escolha, com um ponto por acerto. O pós-teste reutiliza os mesmos conceitos e alternativas; portanto, a diferença entre os escores, de −6 a +6, mede a mudança imediata da resposta da equipe. Não é uma nota individual nem uma evidência isolada de retenção. A repetição dos itens pode produzir familiaridade, e a discussão em grupo impede atribuir o resultado a cada participante.

A avaliação docente utiliza a rubrica do Apêndice D, com seis critérios de zero a dois pontos e total de 12. Ela examina medidas, gráficos, MRU, MRUV, argumentação e colaboração. Essa escala é independente dos seis pontos do diagnóstico e da pontuação lúdica do jogo. O questionário de experiência mede percepções e clareza; suas respostas não serão tratadas como prova de aprendizagem conceitual.

Para uma aplicação futura, o registro deve incluir data, quantidade de participantes e equipes, dispositivos, duração, intervenções e problemas de uso. Os arquivos podem ser identificados por códigos de equipe, sem nomes completos. A análise pode apresentar tabela com escores antes e depois, diferença em pontos, frequência dos erros e síntese das justificativas. Sem desenho comparativo, não se atribui causalmente qualquer mudança apenas ao jogo.

## 4.8 Critérios de verificação técnica

Foram definidos como critérios: consistência dos dados e gabaritos; sequência das missões; feedback após resposta; limite de duas pistas por missão; preservação dos registros; ausência de ganho duplicado ao repetir ações; possibilidade de reinício consciente; e geração do arquivo de sessão. A verificação de interface inclui legibilidade e acesso às funções no navegador. Esses critérios documentam funcionamento, sem equivaler a uma auditoria completa de acessibilidade ou a um piloto pedagógico com estudantes.

# 5 Resultados e discussão

## 5.1 Produto desenvolvido

O resultado do desenvolvimento é uma aplicação navegável com cinco missões, diagnóstico inicial, pós-teste, feedbacks, pistas e registro de justificativas. A sequência conecta análise de medidas e gráficos à interpretação de modelos e à conclusão científica. As capturas apresentadas em materiais e métodos documentam a versão local revisada em 20 de outubro de 2026; os registros exibidos são de demonstração técnica. A versão portátil é entregue em um arquivo HTML com estilos, scripts e fonte incorporados, que pode ser aberto no navegador sem autenticação e sem conexão.

## 5.2 Cálculos da missão sobre medidas

| Leitura | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Comprimento em cm | 4,11 | 4,13 | 4,12 | 4,11 | 4,11 | 4,14 | 4,12 | 4,11 | 4,10 | 4,12 |

A soma das dez leituras é 41,17 cm. Aplicando a equação da média, obtém-se 4,117 cm, apresentada como 4,12 cm no exercício. O desvio-padrão amostral é aproximadamente 0,01160 cm, e a incerteza-padrão da média, calculada pela equação do tipo A, é 0,00367 cm. Esses valores foram recalculados a partir das dez observações.

Se a contribuição instrumental for modelada apenas pelo arredondamento digital com resolução Δ = 0,01 cm, obtém-se uB = 0,00289 cm e uc = 0,00467 cm. Já a adoção didática de uB = 0,01 cm resulta em uc = 0,01065 cm, que pode ser apresentada como 0,01 cm conforme o arredondamento utilizado no exercício. A comparação mostra por que o modelo instrumental precisa ser informado. O objetivo da pergunta final é reconhecer a escrita coerente (4,12 ± 0,01) cm sob a convenção declarada, e não inferir automaticamente a incerteza a partir da resolução.

## 5.3 Ajuste e interpretação do MRU

| t em s | 0,10 | 0,20 | 0,30 | 0,40 | 0,50 |
|---|---|---|---|---|---|
| x em m | 0,51 | 0,59 | 0,72 | 0,80 | 0,92 |
| Valor ajustado em m | 0,502 | 0,605 | 0,708 | 0,811 | 0,914 |
| Resíduo em m | 0,008 | −0,015 | 0,012 | −0,011 | 0,006 |

O ajuste por mínimos quadrados ordinários fornece A = 1,03 m/s e B = 0,399 m. A soma dos quadrados dos resíduos é 0,000590 m² e a soma dos quadrados em torno da média é 0,106680 m². Assim, R² = 1 − 0,000590/0,106680 = 0,994469, apresentado como 0,9945. Esses resultados reproduzem a equação utilizada na Missão 3.

![Figura 2 — Ajuste linear e resíduos do conjunto didático de MRU. Fonte: elaboração dos autores a partir dos dados do jogo.](figuras/mru_ajuste.png)

A inclinação é interpretada como velocidade e o intercepto como posição estimada em t = 0. A tendência é compatível com MRU no contexto didático. Entretanto, os cinco pontos e o R² elevado não permitem estimar todas as fontes de incerteza ou demonstrar a ausência de outros efeitos. A figura apresenta os resíduos para que a análise não se limite à aparência da reta. Não foram atribuídas barras de incerteza sem informação instrumental que as sustentasse.

## 5.4 Linearização do MRUV

| t em s | 0,00 | 0,50 | 1,00 | 1,50 | 2,00 |
|---|---|---|---|---|---|
| t² em s² | 0,00 | 0,25 | 1,00 | 2,25 | 4,00 |
| x em m | 0,00 | 0,05 | 0,20 | 0,45 | 0,80 |

O conjunto foi preparado para satisfazer exatamente x = 0,20t². No gráfico x em função de t, a relação é parabólica; no gráfico x em função de t², a inclinação é 0,20 m/s². Comparando com x = (a/2)t², obtém-se a = 2 × 0,20 = 0,40 m/s². A consistência exata é uma propriedade da construção didática dos dados e não evidencia um experimento físico sem incerteza.

![Figura 3 — Relação original e linearização do conjunto idealizado de MRUV. Fonte: elaboração dos autores.](figuras/mruv_linearizacao.png)

## 5.5 Verificação técnica e ajustes

Na inspeção do código e nos testes locais, foram identificados e corrigidos o reinício indevido de missão ao voltar ao mapa, a possibilidade de acumular pontos por repetição e a perda de justificativas. O diagnóstico foi rotulado como resposta da equipe. Foram acrescentados armazenamento local e exportação dos registros.

| Verificação | Evidência obtida |
|---|---|
| Ajuste numérico do MRU | Inclinação 1,03 m/s, intercepto 0,399 m e R² 0,994469 reproduzidos |
| Validação estrutural e leitura do estado salvo | Dez casos automatizados passaram, além das três verificações do ajuste |
| Tipagem e construção da aplicação | Verificação TypeScript e empacotamentos principal e portátil concluídos |
| Percurso no navegador | As cinco missões, justificativas, debriefing e diagnóstico final foram concluídos em uma sessão demonstrativa |
| Feedback e pista | Uma resposta incorreta produziu explicação e permitiu correção; uma pista foi exibida e registrada |
| Retorno e recarregamento | Questão aceita e pontuação foram recuperadas ao retornar à missão e após recarregar a página |
| Exportação | Arquivo JSON foi baixado com registros da demonstração e respostas da equipe |

A sessão no navegador foi uma demonstração técnica executada para verificar o fluxo. Suas respostas foram escolhidas para testar funções e não representam observações de uma turma. A pontuação lúdica máxima é 265: dezenove desafios valem até dez pontos e cada uma das cinco justificativas finais vale quinze. Um acerto após erro vale seis pontos; pistas não descontam pontos. Essa regra foi mantida como organização do jogo, não como instrumento validado de aprendizagem.

A checagem de código dos arquivos ativos foi concluída, mas a análise global do template ainda aponta regras em componentes genéricos não importados pelo produto. Essa limitação não foi tratada como aprovação integral de acessibilidade. O armazenamento depende das permissões do navegador e pode ser apagado ao limpar os dados; o arquivo exportado deve ser guardado antes de reiniciar. A verificação se refere à versão local entregue, e não comprova atualização do endereço hospedado anteriormente.


## 5.6 Discussão pedagógica e limites

Os desafios apresentam correspondência entre objetivo e ação solicitada: a média exige considerar todas as leituras; o gráfico exige identificar grandezas e unidades; o MRU exige interpretar parâmetros; o MRUV exige relacionar coeficiente e aceleração; e o parecer final exige conectar evidência e modelo. Essa correspondência responde à recomendação de alinhamento encontrada em Veldkamp et al. (2020). Em uma resposta sobre MRU, por exemplo, a equipe precisa relacionar a inclinação de 1,03 m/s ao aumento da posição por unidade de tempo. Na conclusão, deve explicar por que a tendência linear sustenta a compatibilidade com velocidade aproximadamente constante, preservando os limites dos dados. Assim, a argumentação utiliza o resultado das missões anteriores em vez de se reduzir a uma opinião sobre o jogo.

As alternativas e pistas tornam a atividade próxima de uma investigação guiada. A contribuição para a autonomia dependerá de como o mediador conduz as discussões. A validação automática das respostas abertas verifica sinais textuais e extensão; ela pode aceitar uma frase fisicamente incorreta ou rejeitar uma explicação válida formulada de outro modo. Por isso, o aviso na interface e a rubrica reservam à docente a avaliação conceitual.

Até esta versão, não houve aplicação com estudantes, coleta de pré e pós-testes de uma turma ou questionário de experiência. Consequentemente, não são apresentados percentuais de satisfação, ganhos de aprendizagem ou tempos observados de uma turma. Os resultados demonstrados são o desenvolvimento do artefato, a coerência dos cálculos e a verificação técnica documentada. O instrumento está preparado para que a primeira aplicação produza os dados necessários à avaliação pedagógica.

# 6 Conclusões

Foi desenvolvido o LabMotion, um produto educacional digital para revisão de medidas, gráficos e cinemática em Física Experimental A. As cinco missões conectam identificação de fontes de incerteza, leitura de representações, interpretação de velocidade e aceleração e elaboração de uma conclusão apoiada em evidências. O roteiro e o gabarito permitem à docente acompanhar tanto as respostas quanto as justificativas das equipes.

Os exemplos numéricos foram verificados: a média do comprimento é 4,117 cm; o ajuste do MRU fornece velocidade de 1,03 m/s, posição inicial estimada de 0,399 m e R² aproximado de 0,9945; a linearização do MRUV idealizado fornece aceleração de 0,40 m/s². A explicitação das convenções de incerteza e das condições de linearização evita tratar simplificações didáticas como regras universais.

A versão revisada acrescenta preservação de progresso e registros, exportação da sessão e proteção contra pontuação duplicada. A verificação técnica atende ao objetivo de preparar o produto para demonstração e avaliação da professora. A eficácia na aprendizagem permanece como questão para a aplicação: deverá ser examinada com os instrumentos propostos, considerando conhecimento prévio, participação, intervenções e limitações do diagnóstico de equipe.

# 7 Bibliografia

AMERICAN ASSOCIATION OF PHYSICS TEACHERS. **AAPT Recommendations for the Undergraduate Physics Laboratory Curriculum**. College Park: AAPT, 2014. Disponível em: https://www.aapt.org/resources/upload/labguidlinesdocument_ebendorsed_nov10.pdf. Acesso em: 20 out. 2026.

FREEMAN, Scott; EDDY, Sarah L.; MCDONOUGH, Miles; SMITH, Michelle K.; OKOROAFOR, Nnadozie; JORDT, Hannah; WENDEROTH, Mary Pat. Active learning increases student performance in science, engineering, and mathematics. **Proceedings of the National Academy of Sciences**, v. 111, n. 23, p. 8410–8415, 2014. DOI: https://doi.org/10.1073/pnas.1319030111.

HATTIE, John; TIMPERLEY, Helen. The power of feedback. **Review of Educational Research**, v. 77, n. 1, p. 81–112, 2007. DOI: https://doi.org/10.3102/003465430298487.

JOINT COMMITTEE FOR GUIDES IN METROLOGY. **Evaluation of measurement data — Guide to the expression of uncertainty in measurement**. JCGM 100:2008. Sèvres: BIPM, 2008. DOI: https://doi.org/10.59161/JCGM100-2008E. Disponível em: https://www.bipm.org/documents/20126/2071204/JCGM_100_2008_E.pdf. Acesso em: 20 out. 2026.

KLEIN, P.; BECKER, S.; KÜCHEMANN, S.; KUHN, J. Test of understanding graphs in kinematics: Item objectives confirmed by clustering eye movement transitions. **Physical Review Physics Education Research**, v. 17, art. 013102, 2021. DOI: https://doi.org/10.1103/PhysRevPhysEducRes.17.013102.

MOREIRA, Marco Antonio. Abandono da narrativa, ensino centrado no aluno e aprender a aprender criticamente. **Ensino, Saúde e Ambiente**, v. 4, n. 1, 2011. DOI: https://doi.org/10.22409/resa2011.v4i1.a21094. Disponível em: https://periodicos.uff.br/ensinosaudeambiente/article/view/21094. Acesso em: 20 out. 2026.

SAILER, Michael; HOMNER, Lisa. The gamification of learning: a meta-analysis. **Educational Psychology Review**, v. 32, p. 77–112, 2020. DOI: https://doi.org/10.1007/s10648-019-09498-w.

SAMPSON, Victor; CLARK, Douglas B. Assessment of the ways students generate arguments in science education: Current perspectives and recommendations for future directions. **Science Education**, v. 92, n. 3, p. 447–472, 2008. DOI: https://doi.org/10.1002/sce.20276.

SASSERON, Lúcia Helena. Alfabetização científica, ensino por investigação e argumentação: relações entre Ciências da Natureza e escola. **Ensaio Pesquisa em Educação em Ciências**, v. 17, n. esp., p. 49–67, 2015. DOI: https://doi.org/10.1590/1983-2117201517s04. Disponível em: https://www.scielo.br/j/epec/a/K556Lc5V7Lnh8QcckBTTMcq/. Acesso em: 20 out. 2026.

TRUMPER, Ricardo. What do we expect from students’ physics laboratory experiments? **Journal of Science Education and Technology**, v. 11, p. 221–228, 2002. DOI: https://doi.org/10.1023/A:1016016417872.

UNIVERSIDADE FEDERAL DO VALE DO SÃO FRANCISCO. Física Experimental A FISC 0099. Contrato didático e materiais das aulas 1 e 2. Material da disciplina fornecido pela Profa. Mariele Pinheiro, 2026.

VELDKAMP, Alice; VAN DE GRINT, Liesbeth; KNIPPELS, Marie-Christine P. J.; VAN JOOLINGEN, Wouter R. Escape education: A systematic review on escape rooms in education. **Educational Research Review**, v. 31, art. 100364, 2020. DOI: https://doi.org/10.1016/j.edurev.2020.100364. Disponível em: https://www.fi.uu.nl/publicaties/literatuur/2020_veldkamp_escape_room.pdf. Acesso em: 20 out. 2026.

WANG, Liang-Hui; CHEN, Bing; HWANG, Gwo-Jen; GUAN, Jue-Qi; WANG, Yun-Qing. Effects of digital game-based STEM education on students’ learning achievement: a meta-analysis. **International Journal of STEM Education**, v. 9, art. 26, 2022. DOI: https://doi.org/10.1186/s40594-022-00344-0.

# Apêndice A Roteiro de aplicação

O LabMotion é uma aplicação web de revisão de Física Experimental A. A narrativa organiza cinco missões sequenciais sobre medidas, gráficos, MRU, MRUV e argumentação científica. Os dados apresentados nos desafios são conjuntos didáticos; respostas dadas durante uma demonstração técnica não constituem resultados de aprendizagem de uma turma.

## Preparação

Antes da aula, o mediador deve abrir o arquivo LabMotion.html da pasta jogo_portatil em cada dispositivo, conferir legibilidade e acesso, testar o fluxo completo e disponibilizar uma folha de registro por equipe. O HTML incorpora o jogo e a fonte e dispensa autenticação e internet. Restrições de armazenamento e download dependem do navegador; por isso, o arquivo deve ser conferido no computador da apresentação. O endereço hospedado anteriormente é opcional e pode exigir autenticação da conta proprietária.

São necessários um computador ou celular por equipe, conexão adequada ao modo de acesso escolhido, lápis e folha de registro, calculadora simples para conferir as médias e um projetor para o debriefing coletivo, quando disponível. O mediador deve conhecer o gabarito e distinguir um auxílio de navegação de uma pista conceitual.

Formar equipes de três ou quatro participantes. Essa organização da atividade é distinta do número de autores permitido no projeto da disciplina. Distribuir os papéis de conferência dos dados, análise das representações, relato e navegação; em equipes de três, o relator também pode exercer a navegação. Alternar os papéis entre missões para reduzir a concentração da participação.

## Sessão de 60 minutos

| Etapa | Tempo | Procedimento |
|---|---:|---|
| Apresentação e regras | 5 min | Explicar objetivos, narrativa, colaboração, pistas e registro. Informar como os registros serão utilizados. |
| Diagnóstico inicial | 7 min | Responder às seis questões sem consultar o gabarito. Usar o protocolo individual ou coletivo descrito abaixo. |
| Cinco missões | 35 min | Discutir as alternativas, verificar respostas, ler feedback, usar até duas pistas por missão e registrar uma justificativa ao final de cada etapa. |
| Debriefing | 8 min | Retomar ao menos duas perguntas, comparar interpretações e explicar um erro que levou à revisão de uma hipótese. |
| Pós-teste e encerramento | 5 min | Responder novamente aos seis itens e registrar a comparação. O questionário de experiência pode ser aplicado após a sessão para preservar o tempo. |

O tempo de 35 minutos de jogo é uma estimativa de planejamento. Sua adequação precisa ser observada na aplicação; não deve ser apresentada como tempo médio medido sem registros reais.

## Unidade de análise do diagnóstico

No protocolo com um dispositivo por equipe, o diagnóstico registrado dentro do jogo é uma resposta coletiva. O pré-teste e o pós-teste devem ser respondidos pela mesma equipe, segundo as mesmas regras, e seu resultado é interpretado como desempenho da equipe. Não converter uma única resposta coletiva em três ou quatro resultados individuais.

Para estudar mudança individual, cada participante responde aos seis itens em uma folha identificada por código, antes e depois do jogo, sem conversar nessa etapa. O jogo continua colaborativo, mas os resultados individuais provêm das folhas emparelhadas. O preenchimento coletivo dentro do jogo não substitui essas respostas. Os códigos devem permitir a associação entre os momentos sem exigir o nome completo do estudante.

## Mediação durante o jogo

O mediador não deve revelar o gabarito durante o diagnóstico. Nas missões, deve incentivar a leitura das unidades e o uso dos dados para justificar a escolha. Quando houver uma resposta incorreta, orientar a equipe a ler o feedback antes de tentar novamente. As pistas apoiam a aprendizagem e não eliminam a equipe. Concluir uma missão exige uma justificativa escrita; a existência do texto não assegura sua correção conceitual, que precisa ser apreciada pelo mediador.

## Debriefing

1. Qual resposta inicial a equipe mudaria agora e por quê?
2. Em qual missão um erro ajudou a compreender o conteúdo?
3. Que evidência permitiu diferenciar MRU e MRUV?
4. Por que um R² próximo de 1 não é suficiente para validar um modelo físico?
5. Como a incerteza modifica a linguagem de uma conclusão?

Solicitar ao menos duas sínteses. Retomar que o jogo trabalha com interpretação de dados já preparados e não substitui a coleta experimental nem a avaliação das condições do laboratório.

# Apêndice B Gabarito comentado das missões

As letras correspondem à ordem das alternativas do produto. Nas questões abertas, os exemplos seguintes são modelos de resposta para a análise docente, e não respostas únicas obrigatórias.

## Missão 1 Medidas sob suspeita

Dados de comprimento em centímetros: 4,11; 4,13; 4,12; 4,11; 4,11; 4,14; 4,12; 4,11; 4,10; 4,12. A resolução informada do instrumento digital é 0,01 cm.

| Item | Resposta | Comentário |
|---|---|---|
| 1.1 O valor central | B — 4,12 cm | A soma é 41,17 cm e a média não arredondada é 4,117 cm. Arredondada ao centésimo, resulta em 4,12 cm. Escolher apenas um extremo ou usar a soma como média é inadequado. |
| 1.2 Erro ou incerteza | B — Há variações fortuitas e limitações do instrumento e do procedimento. | Leituras diferentes não significam, por si só, erro grosseiro. A dispersão pode ser analisada estatisticamente. |
| 1.3 Tipos A e B | A — Repetição estatística → A; resolução ou especificação instrumental → B. | A distinção se refere ao método de avaliação da incerteza. Informações instrumentais precisam ser interpretadas segundo o modelo adotado; resolução não é automaticamente uma incerteza-padrão. |
| 1.4 Resultado final | C — (4,12 ± 0,01) cm | O item verifica a presença de unidade e a coerência da casa decimal. A incerteza usada nesse exemplo deve ser explicitamente fornecida segundo a convenção da disciplina; não é uma dedução completa a partir da resolução. |

Modelo de justificativa: “A média das dez leituras é 4,117 cm. A escrita do resultado deve indicar a unidade e uma incerteza definida pelo procedimento, com casas decimais coerentes.”

## Missão 2 O gráfico sabotado

O gráfico apresentado contém eixos inadequados ao enunciado, unidades ausentes, escala irregular e segmentos ligando ponto a ponto. A atividade exige reconhecer os elementos da representação, não construir um gráfico livre dentro da aplicação.

| Item | Resposta | Comentário |
|---|---|---|
| 2.1 Eixos | B — Tempo no horizontal e distância no vertical. | Em distância em função do tempo, t organiza o eixo horizontal e d ocupa o vertical. |
| 2.2 Elementos essenciais | B — Título, grandezas, unidades, escala regular, pontos e ajuste coerente. | A representação deve permitir identificar as grandezas e analisar a tendência dos dados. O ajuste só deve ser incluído quando pertinente ao objetivo e ao modelo estudado. |
| 2.3 Gráfico não é trajetória | B — Não; representa a relação entre grandezas. | A curva de posição ou distância em função do tempo não desenha o caminho espacial do objeto. |
| 2.4 Ajuste | B — Uma reta ou curva de ajuste coerente com o modelo. | Ligar os pontos pode mostrar a sequência das observações, mas não substitui o ajuste usado para estimar os parâmetros do modelo. |

Modelo de justificativa: “Ao representar distância em função do tempo, o eixo horizontal deve mostrar t em segundos e o vertical d em metros. O ajuste deve representar a relação física estudada; a aparência da curva não corresponde ao desenho da pista.”

## Missão 3 O carrinho constante

| t em s | 0,10 | 0,20 | 0,30 | 0,40 | 0,50 |
|---|---:|---:|---:|---:|---:|
| d em m | 0,51 | 0,59 | 0,72 | 0,80 | 0,92 |

O ajuste fornecido é d = 1,03t + 0,399, com R² = 0,9945. A posição inicial é interpretada em relação à origem e à referência adotadas para os dados do exemplo.

| Item | Resposta | Comentário |
|---|---|---|
| 3.1 Modelo | A — Sim, aproximadamente, pois d varia linearmente com t. | A tendência é compatível com velocidade aproximadamente constante, sob as hipóteses do exemplo. A dispersão não precisa ser nula. |
| 3.2 Inclinação | B — Velocidade aproximada de 1,03 m/s. | A inclinação em d × t tem unidade de comprimento dividido por tempo. |
| 3.3 Intercepto | C — Posição estimada para t = 0. | Substituir t = 0 no modelo fornece 0,399 m. Como o primeiro tempo tabelado é 0,10 s, o valor em zero é uma estimativa do modelo. |
| 3.4 R² | B — Não; indica bom ajuste, mas exige coerência física e análise das condições. | R² não verifica as unidades, a calibração, as incertezas ou as condições do movimento. |

Modelo de justificativa: “A tendência aproximadamente linear de d em função de t é compatível com MRU no intervalo considerado. A inclinação indica 1,03 m/s e o intercepto estima a posição no instante zero; o R² elevado deve ser interpretado juntamente com as condições físicas.”

## Missão 4 A curva escondida

| t em s | 0,00 | 0,50 | 1,00 | 1,50 | 2,00 |
|---|---:|---:|---:|---:|---:|
| t² em s² | 0,00 | 0,25 | 1,00 | 2,25 | 4,00 |
| d em m | 0,00 | 0,05 | 0,20 | 0,45 | 0,80 |

Esses valores são didáticos e seguem exatamente d = 0,20t². A proporcionalidade exata não deve ser apresentada como resultado real de uma coleta sujeita a dispersão.

| Item | Resposta | Comentário |
|---|---|---|
| 4.1 Forma original | B — Uma parábola, para aceleração constante e partida do repouso. | A equação de posição contém o termo quadrático (a/2)t². |
| 4.2 Linearização | A — Representar d em função de t². | Com velocidade inicial aproximadamente nula, a nova variável t² produz uma relação linear. Para v₀ não desprezível, essa transformação simples exige outra análise. |
| 4.3 Coeficiente | C — 0,40 m/s². | Comparando d = 0,20t² com d = (a/2)t², obtém-se a = 2 × 0,20 = 0,40 m/s². |
| 4.4 Evidência | B — Compatibilidade com aceleração aproximadamente constante nas condições consideradas. | A conclusão precisa respeitar as hipóteses da partida do repouso e do modelo aplicado. |

Modelo de justificativa: “A representação de d em função de t² é linear para estes dados didáticos. Como o coeficiente 0,20 m/s² corresponde a a/2, o modelo fornece aceleração de 0,40 m/s², assumindo velocidade inicial nula.”

## Missão 5 O parecer científico

| Item | Resposta ou critério | Comentário |
|---|---|---|
| 5.1 Escolha da conclusão | B — Relatório B. | Relaciona o modelo aos dados e a um parâmetro físico. A beleza do gráfico não é evidência científica. Condições como horizontalidade devem ser reconhecidas como hipóteses do cenário didático quando não foram medidas. |
| 5.2 Limitação | Uma limitação plausível acompanhada de seu efeito. | Exemplos: atrito residual pode alterar a velocidade; desnível pode introduzir aceleração; resolução do sensor limita a leitura; poucos dados dificultam avaliar a tendência; erro de zero afeta a posição estimada. |
| 5.3 CER | Afirmação compatível com os dados, evidência numérica com unidade ou indicador pertinente e ligação física entre ambos. | A validação automática apoia o fluxo. O mediador deve analisar se a evidência citada sustenta a afirmação e se o raciocínio evita extrapolações. |

Exemplo de conclusão CER: “Os dados didáticos são compatíveis com MRU no intervalo apresentado. O ajuste d = 1,03t + 0,399 tem inclinação de 1,03 m/s e R² = 0,9945. A relação aproximadamente linear entre posição e tempo sustenta velocidade aproximadamente constante, sem dispensar a verificação das condições e das incertezas em uma aplicação experimental.”

Uma resposta que apenas copie palavras como “MRU” ou “linear” não basta para comprovar argumentação. A avaliação da qualidade deve considerar a rubrica do Apêndice D.

# Apêndice C Diagnóstico e pós-teste

Usar os mesmos itens nos dois momentos, preservando a ordem e o protocolo de resposta. Cada acerto vale um ponto e cada erro vale zero: total de 0 a 6. As justificativas complementares podem ser analisadas pelo mediador, mas não modificam a escala automática sem declaração expressa de outro procedimento.

1. **Em medidas repetidas, o que sustenta a avaliação tipo A?** A) A resolução indicada pelo fabricante. B) A análise estatística das observações. C) A unidade escolhida. D) O maior valor. **Gabarito B.** A avaliação tipo A se apoia na análise estatística; não se confunde com a especificação instrumental.
2. **Em distância em função do tempo, qual variável fica no eixo horizontal?** A) Distância. B) Velocidade. C) Tempo. D) Aceleração. **Gabarito C.** O eixo horizontal representa a variável independente t.
3. **A forma de um gráfico posição × tempo desenha a trajetória do objeto?** A) Sempre. B) Somente no MRU. C) Não; mostra a relação entre grandezas. D) Somente se houver curva. **Gabarito C.** A relação entre eixos não é uma imagem do caminho espacial.
4. **O que representa a inclinação em d × t no MRU?** A) A velocidade. B) A aceleração. C) O tempo inicial. D) O R². **Gabarito A.** A razão entre variação da posição e do tempo corresponde à velocidade no modelo.
5. **Por que representar d em função de t² no MRUV que parte do repouso?** A) Para eliminar unidades. B) Para produzir uma relação linear. C) Para aumentar o R² automaticamente. D) Para desenhar a pista. **Gabarito B.** O procedimento lineariza o caso de partida do repouso considerado no jogo.
6. **R² = 0,99 é suficiente para provar um modelo físico?** A) Sim. B) Não; também é necessária coerência física. C) Sim, se houver cinco pontos. D) Não; R² nunca serve. **Gabarito B.** O indicador estatístico tem utilidade, mas não determina sozinho a validade do modelo.

O ganho bruto é a pontuação do pós-teste menos a do pré-teste, entre −6 e +6. Um ganho positivo descreve uma diferença entre os momentos; não demonstra causalidade nem eficácia geral do produto. Repetição dos itens, discussão em equipe, mediação docente e familiarização com o conteúdo podem influenciar o resultado. Informar o número de respostas emparelhadas e não incluir ausências como pontuação zero.

A pontuação lúdica é separada do diagnóstico: são 19 desafios, com dez pontos quando resolvidos antes de um erro e seis pontos quando resolvidos após uma resposta incorreta. Cada uma das cinco justificativas de missão concluídas acrescenta 15 pontos. O máximo é 265 pontos. As pistas são limitadas a duas por missão e não retiram pontos. A pontuação das justificativas indica que o registro foi preenchido; sua qualidade conceitual continua sendo apreciada pelo mediador.

# Apêndice D Rubrica de análise docente

A rubrica complementa o diagnóstico de seis itens. Deve ser aplicada aos registros e à observação da atividade, com total de 0 a 12. Essa escala não corresponde à pontuação lúdica do jogo.

| Critério | 0 ponto | 1 ponto | 2 pontos |
|---|---|---|---|
| Medidas e incertezas | Confunde erro e incerteza ou não interpreta a medida. | Identifica parte das fontes ou explica a média com lacunas. | Distingue média, fontes A e B e escrita coerente do resultado. |
| Gráficos | Não identifica variáveis, unidades ou significado da representação. | Reconhece parte dos elementos. | Explica eixos, unidades e ajuste, distinguindo gráfico de trajetória. |
| MRU | Não relaciona os dados ao modelo. | Reconhece a tendência linear sem interpretar todos os parâmetros. | Relaciona inclinação, intercepto e unidades ao modelo e reconhece limites do R². |
| MRUV | Não relaciona posição a t². | Reconhece a linearização, mas erra o coeficiente ou as condições. | Explica a transformação e obtém a = 0,40 m/s² sob as hipóteses do exemplo. |
| Argumentação | Afirma sem evidência pertinente. | Cita evidência, mas não explica sua relação com a afirmação. | Conecta afirmação, evidência numérica e raciocínio e delimita a conclusão. |
| Colaboração | Uma pessoa concentra as decisões ou não há discussão observável. | Participação desigual com alguma troca. | Papéis distribuídos e contribuições dos integrantes nas decisões. |

Registrar uma evidência concreta para justificar cada pontuação. Não atribuir automaticamente dois pontos a uma equipe apenas por ter concluído as telas.

# Apêndice E Folha de registro da equipe

Código da equipe: __________   Data: __________   Turma: __________

Quantidade de participantes: __________   Mediador: __________

Pré-teste coletivo: ____/6   Pós-teste coletivo: ____/6   Diferença: ____ pontos

Se o protocolo for individual, utilizar uma linha por participante com código, pré-teste, pós-teste e diferença; manter separado o resumo coletivo do jogo.

| Missão | Evidência ou valor usado | Justificativa da equipe | Pistas 0 a 2 | Dificuldade observada |
|---|---|---|---:|---|
| 1 Medidas | | | | |
| 2 Gráficos | | | | |
| 3 MRU | | | | |
| 4 MRUV | | | | |
| 5 Parecer | | | | |

Conclusão CER da equipe: __________________________________________________

Limitação e seu possível efeito: _____________________________________________

Hipótese revisada no debriefing e motivo: _____________________________________

Início do jogo: ____:____   Fim do jogo: ____:____   Intervenções do mediador: ____

# Apêndice F Questionário complementar de experiência

Aplicar em folha ou formulário separado. O questionário foi organizado para este projeto para registrar percepções de clareza, usabilidade e experiência. Sua validade psicométrica ainda não foi estabelecida. O questionário não é prova objetiva de aprendizagem.

Escala: 1 = discordo totalmente; 2 = discordo; 3 = nem concordo nem discordo; 4 = concordo; 5 = concordo totalmente. Disponibilizar também “não se aplica” e analisar essas respostas separadamente.

1. Foi fácil entender como avançar no jogo.
2. Os textos, botões e gráficos estavam legíveis.
3. Os desafios tiveram dificuldade adequada.
4. O feedback ajudou a entender meus erros.
5. O jogo manteve minha atenção.
6. As missões foram relevantes para Física Experimental.
7. A discussão com a equipe ajudou minha aprendizagem.
8. Sinto-me mais confiante para interpretar gráficos.
9. Consigo explicar melhor a diferença entre MRU e MRUV.
10. Eu utilizaria o LabMotion como atividade de revisão.

Perguntas abertas: Qual missão mais ajudou sua aprendizagem e por quê? O que ficou confuso ou cansativo? Que mudança deveria ser feita antes da próxima aplicação?

Apresentar frequências ou medianas por item, informando o número de respostas válidas. Os dois itens de autoconfiança medem percepção; confrontá-los com o diagnóstico e com os textos produzidos.

# Apêndice G Registros e privacidade

Informar aos participantes a finalidade pedagógica dos registros, quem poderá acessá-los e o prazo de guarda definido pela instituição. Coletar apenas os dados necessários. Utilizar códigos para equipes e participantes; evitar nome completo, documentos, endereço e informações pessoais nos campos abertos. Em fotos e capturas, preservar a identidade dos estudantes.

A versão revisada mantém a sessão no armazenamento local do navegador e oferece exportação em JSON na tela final. O registro reúne pré/pós-teste, pontuação, pistas, justificativas das missões, limitação, conclusão CER e respostas do debriefing. A equipe deve exportar antes de reiniciar, conferir se o arquivo foi salvo e identificá-lo por código na pasta definida para a atividade. Não há envio automático ao professor ou a uma planilha; a entrega é realizada pelo procedimento combinado com o mediador.

O armazenamento local não substitui a cópia de acompanhamento e pode ser removido ao limpar os dados do navegador. Em dispositivos compartilhados, exportar o registro necessário e reiniciar a sessão antes da equipe seguinte. Em uma instalação antiga sem esses recursos, utilizar a folha de registro e identificar a versão aplicada; não afirmar que os registros foram preservados automaticamente.

# Apêndice H Dados necessários para relatar a aplicação

Para resultados e discussão da aplicação, registrar a data, o contexto, a quantidade de participantes e equipes, o protocolo individual ou coletivo, o tempo observado, os registros completos e as intervenções. Relatar desistências, problemas de acesso e respostas ausentes. Descrever os erros mais frequentes por missão e confrontar as conclusões escritas com a rubrica.

O relatório deve separar resultados de implementação e teste técnico dos resultados de uso com estudantes. Sem aplicação registrada, é possível relatar a construção do produto, a coerência dos cálculos e o funcionamento testado; não é possível atribuir aumento de aprendizagem, satisfação ou redução de dificuldades a uma turma.
