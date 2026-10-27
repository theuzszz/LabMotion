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

@@capturas

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

A avaliação docente utiliza a rubrica do Apêndice C, com seis critérios de zero a dois pontos e total de 12. Ela examina medidas, gráficos, MRU, MRUV, argumentação e colaboração. Essa escala é independente dos seis pontos do diagnóstico e da pontuação lúdica do jogo. O questionário de experiência mede percepções e clareza; suas respostas não serão tratadas como prova de aprendizagem conceitual.

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

@@verificacao

## 5.6 Discussão pedagógica e limites

Os desafios apresentam correspondência entre objetivo e ação solicitada: a média exige considerar todas as leituras; o gráfico exige identificar grandezas e unidades; o MRU exige interpretar parâmetros; o MRUV exige relacionar coeficiente e aceleração; e o parecer final exige conectar evidência e modelo. Essa correspondência responde à recomendação de alinhamento encontrada em Veldkamp et al. (2020). Em uma resposta sobre MRU, por exemplo, a equipe precisa relacionar a inclinação de 1,03 m/s ao aumento da posição por unidade de tempo. Na conclusão, deve explicar por que a tendência linear sustenta a compatibilidade com velocidade aproximadamente constante, preservando os limites dos dados. Assim, a argumentação utiliza o resultado das missões anteriores em vez de se reduzir a uma opinião sobre o jogo.

As alternativas e pistas tornam a atividade próxima de uma investigação guiada. A contribuição para a autonomia dependerá de como o mediador conduz as discussões. A validação automática das respostas abertas verifica sinais textuais e extensão; ela pode aceitar uma frase fisicamente incorreta ou rejeitar uma explicação válida formulada de outro modo. Por isso, o aviso na interface e a rubrica reservam à docente a avaliação conceitual.

Até esta versão, não houve aplicação com estudantes, coleta de pré e pós-testes de uma turma ou questionário de experiência. Consequentemente, não são apresentados percentuais de satisfação, ganhos de aprendizagem ou tempos observados de uma turma. Os resultados demonstrados são o desenvolvimento do artefato, a coerência dos cálculos e a verificação técnica documentada. O instrumento está preparado para que a primeira aplicação produza os dados necessários à avaliação pedagógica.

# 6 Conclusões

Foi desenvolvido o LabMotion, um produto educacional digital para revisão de medidas, gráficos e cinemática em Física Experimental A. As cinco missões conectam identificação de fontes de incerteza, leitura de representações, interpretação de velocidade e aceleração e elaboração de uma conclusão apoiada em evidências. O roteiro e o gabarito permitem à docente acompanhar tanto as respostas quanto as justificativas das equipes.

Os exemplos numéricos foram verificados: a média do comprimento é 4,117 cm; o ajuste do MRU fornece velocidade de 1,03 m/s, posição inicial estimada de 0,399 m e R² aproximado de 0,9945; a linearização do MRUV idealizado fornece aceleração de 0,40 m/s². A explicitação das convenções de incerteza e das condições de linearização evita tratar simplificações didáticas como regras universais.

A versão revisada acrescenta preservação de progresso e registros, exportação da sessão e proteção contra pontuação duplicada. A verificação técnica atende ao objetivo de preparar o produto para demonstração e avaliação da professora. A eficácia na aprendizagem permanece como questão para a aplicação: deverá ser examinada com os instrumentos propostos, considerando conhecimento prévio, participação, intervenções e limitações do diagnóstico de equipe.

# 7 Bibliografia

@@referencias

@@apendices
