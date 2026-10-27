# LabMotion — análise inicial da plataforma multiturma

Data: 27/10/2026. Etapa: análise. A implementação depende do OK solicitado nas seções 3 e 5 do pedido. A proposta resumida está em [DECISOES_V1.md](DECISOES_V1.md).

## Preservação

- Repositório inicialmente limpo, branch `master`, HEAD `2ceb2a2a304a447f9e82c85ccb26240fc1f0946d`; o remoto GitHub confirmou esse mesmo commit em `master`.
- Tag anotada `v2.0-aprovada` criada nesse commit e enviada ao GitHub; branch de trabalho criada com o nome exato solicitado: `plataforma-multiturma`.
- Não alterar `LabMotion/jogo_portatil/`, `LabMotion/entrega/` nem `LabMotion/revisao_21out/`. Nenhum fonte do jogo ou relatório foi editado nesta etapa.
- Nenhuma operação de implantação, configuração de acesso, ambiente ou banco foi feita no site publicado.
- Os três arquivos `LabMotion.html` têm 542.070 bytes e SHA-256 idêntico: `9985a811f19bf530ecbdc2bb11bec974714eb2d784e5e907b2d32ef432f13be9`.
- Caminhos: `jogo_portatil/LabMotion.html`, `entrega/jogo_portatil/LabMotion.html`, `revisao_21out/PARA_COMPARTILHAR/Jogo/LabMotion.html`, relativos a `LabMotion/`.

## Seção 1 conferida no código

| Premissa | Verificação / correção |
| --- | --- |
| React 19, Tailwind 4, shadcn/base-ui, Recharts, vinext e Cloudflare Workers | Confirmado em `site/package.json` e `site/vite.config.ts`. React 19.2.6, Tailwind 4.2.1, vinext 1.0.0-beta.5. Recharts está instalado; o gráfico do jogo é SVG próprio, não Recharts. |
| `.openai/hosting.json` com D1/R2 nulos e previsão de bindings | Confirmado. O ID fictício de D1 no Vite serve à configuração local, não comprova banco provisionado. |
| Sem backend, API nem fetch | Confirmado no código de aplicação `app/` e `lib/`; não confundir infraestrutura do framework com API de produto. |
| Um componente cliente com cerca de 580 linhas | Confirmado: `app/page.tsx` tem 579 linhas e contém o fluxo principal e subcomponentes. |
| Cinco missões, 19 desafios, seis diagnósticos | Confirmado: 4+4+4+4+3. São 17 desafios objetivos e dois textos estruturais. Conteúdo, gabaritos, feedback e pistas estão no cliente. |
| Cerca de 15 chaves locais | Corrigir para **17** chamadas persistentes: phase, recovered, evidence, missionIndex, questionIndex, selected, text, result, hadError, hints, hintText, reflection, pre, post, debrief, justifications e writtenAnswers. Prefixo `labmotion-v2:` e validação por `lib/activity.ts`. |
| Correção de primeira 10, após erro 6, justificativa +15; máximo 265 | Confirmado: 19×10 + 5×15 = 265. Textos 5.2/5.3 também recebem pontos lúdicos por estrutura; isso não avalia correção física. Justificativas de missão exigem pelo menos 35 caracteres. |
| Duas pistas por missão, sem desconto | Confirmado; a cota é compartilhada entre os desafios da missão. Não são duas por desafio. |
| Sem registro de tempo ou rapidez | Confirmado. `new Date()` serve apenas ao instante de exportação. |
| Sem histórico de respostas por desafio | Confirmado. Mantém seleção/texto/erro atual; não preserva as alternativas dos 17 desafios objetivos nem a sequência de erros. |
| JSON 2.0, unidade equipe, pré/pós, textos, pistas e pontos | Confirmado; acrescentar que exporta também **gabaritoDiagnostico** e instante da exportação. Não contém o instante inicial nem duração ou número de participantes. |
| 5.2/5.3 com checagem estrutural | Confirmado em `acceptsLimitation` e `acceptsCER`: tamanho mínimo e padrões de termos/conectivos. Não existe correção física automática. |
| Pré/pós iguais e coletivos | Confirmado: reutilizam a mesma lista com seis questões. `portable/LEIA-ME.md` declara que o diagnóstico digital não produz resultados individuais. |
| Dados didáticos e idealizados | Confirmado. MRUV reproduz exatamente d = 0,20t²; MRU usa os cinco pares fornecidos, ajuste 1,03t+0,399 e R² 0,9945. |
| Lint falha somente no template não utilizado | **Corrigir:** falhas também em `app/page.tsx` (SVG com role img e aviso de pista com role status) e em `vite.portable.config.ts` (`rollupOptions` obsoleto), além de componentes e hook do template. |

Os limites numéricos do armazenamento local não garantem coerência entre campos. Por exemplo, o índice máximo genérico de questão é 3, embora a última missão tenha três questões, índices 0–2. O backend deverá validar fase, missão, item e transição em conjunto; não tratar estado importado como autoridade.

## Hospedagem: evidência e limite

A consulta somente de leitura ao Sites identificou o projeto de `hosting.json`, site público ativo, sem prévia atual. A consulta ao banco retornou `bindings: []` e `tables: []`. Isso demonstra ausência de banco vinculado hoje; não demonstra incompatibilidade com D1.

A skill Sites, referência `references/storage.md`, prevê provisionamento por binding lógico `d1`, migrações antes do Worker e separação entre banco local e hospedado. O starter inclui exemplo em `examples/d1/app/api/notes/route.ts`. A versão instalada de vinext documenta route handlers e bindings com `import { env } from 'cloudflare:workers'`, e contém o roteador correspondente.

**Conclusão técnica:** suporte documentado à arquitetura proposta. Ainda não existe prova de leitura/escrita D1 em produção neste projeto. Criar uma rota ou implantar para prová-lo agora ultrapassaria a etapa de análise expressamente solicitada. A primeira tarefa após o OK será uma prova em ambiente isolado, com banco próprio, antes do restante do backend.

O conector Sites trata seus deploys como publicação do projeto selecionado. Não chamar deploy do ID atual como se fosse prévia. Após aprovação, definir uma prévia realmente separada, com origem, banco e segredos próprios, preservando o site atual. Não foi criado nem publicado outro projeto nesta etapa.

Fontes públicas consultadas em 27/10/2026:

- [Documentação oficial do vinext](https://github.com/cloudflare/vinext): route handlers e bindings Workers. A documentação da versão instalada também foi lida.
- [Preços oficiais D1](https://developers.cloudflare.com/d1/platform/pricing/): Workers Free inclui 5 milhões de linhas lidas/dia, 100 mil escritas/dia e 5 GB totais. Não é confirmação de franquia ou preço repassado pelo Sites.
- [Preços oficiais Supabase](https://supabase.com/pricing): Free com 500 MB e pausa após uma semana de inatividade; Pro a partir de US$ 25/mês, sujeito a limites e adicionais. Alternativa proposta via HTTPS.

Auth de professores/admin precisa cumprir e-mail/senha ou link mágico solicitado. A skill Sites usa identidade ChatGPT por padrão; isso não equivale ao login próprio pedido. A proposta submete Supabase Auth por link mágico à aprovação, sem impor uma conta ChatGPT ao aluno. A compatibilidade do provedor externo com a hospedagem deverá ser testada na prévia; não foi demonstrada nesta etapa.

## Restrições pedagógicas e documentos

Não alterar textos dos 19 desafios, pontuação ou conteúdos físicos sem aprovação específica. Há trechos existentes de feedback que usam “dados experimentais”, “natureza experimental” e “condições do experimento”; a tela final usa “Ganho observado”. A marca “dados didáticos” aparece em alguns locais, mas não em todas as fases. Esses pontos devem entrar na revisão de linguagem **após aprovação**, sem mudança silenciosa da versão aprovada.

Manter como requisitos: investigação guiada; debriefing por missão com erros e justificativas; feedback e novas tentativas; registro de cada pista sem penalidade; tempo descritivo; nenhuma classificação entre alunos; revisão física humana de textos; seis diagnósticos repetidos com interpretação imediata/descritiva; data, duração, modo, participantes e condições de aplicação. Preservar u_c = 0,01 cm como convenção fornecida, condição de repouso da linearização e limites interpretativos de R².

Na comparação por assunto, explicitar quantidade de itens e evitar fabricar cobertura: o diagnóstico atual não tem um item exclusivo de escrita/CER para Parecer. As questões de Gráficos têm dois itens; as demais correspondências precisam ser documentadas, incluindo R² como tema transversal. “Sem item específico” é uma apresentação válida quando não houver cobertura.

Se a opção individual for aprovada, revisar posteriormente: identificação/público; organização em equipes e papéis; dispositivo por participante; unidade do pré/pós; descrição de desempenho; coleta/exportação e reinício. Isso alcança as seções 1, 2.3 e 4 indicadas do relatório v5, LEIA-ME, roteiro e microtextos do jogo. Os Markdown locais consultados têm numeração anterior (fundamentação na seção 2, avaliação em 4.7), sem identificação inequívoca de v5; localizar a fonte editável v5 antes de reescrever. As restrições transcritas no pedido são a referência desta análise. Não reescrever as cópias protegidas.

Importação legada: guardar a unidade equipe e a procedência, sem atribuir acertos coletivos a um aluno. Se não houver dados por item, tentativa ou tempo, registrar ausência. Uma importação não verificada não compõe automaticamente os indicadores verificados do servidor.

## Critérios previstos para as próximas etapas

- Backend: isolamento entre dois professores/turmas; tentativas de acesso por ID de outro titular; autorização de admin; login com limite persistente de tentativas; convite revogado; código pessoal mostrado uma vez e armazenado só como hash; rotação revoga código e sessões antigas e gera evento sem segredo.
- Consistência: duplicatas/reenvios concorrentes não duplicam pontos nem avançam a fase duas vezes; mesma chave com conteúdo diferente é rejeitada; versão de conteúdo e ordem dos eventos são validadas pelo servidor; itens 5.2/5.3 continuam estruturais.
- Retomada: reconciliação da fila local com o servidor, indicação de pendências e falhas de armazenamento, nova partida com histórico anterior intacto e importação coletiva sem inventar dados ausentes.
- Painéis: erros por item, primeira tentativa objetiva por assunto, pistas por missão/item, justificativas para debriefing e rubrica docente versionada com comentário e auditoria. Exportações distintas de alunos e itens, em CSV/JSON, com IDs estáveis e denominadores explícitos.
- Administração: totais de turmas, alunos e partidas, conclusão, duração descritiva com cobertura dos registros, itens com mais erros e uso por data; nunca ranking dos estudantes.
- Piloto: alunos fictícios, percurso completo, interrupção/retomada e revisão docente; repetir teste existente, TypeScript e build ao fim de cada etapa. Novos testes acompanham o código novo, após aprovação.
- Privacidade antes do piloto: aviso claro sobre apelidos/códigos e finalidade; não pedir nome real/e-mail dos alunos nem inserção de dados pessoais nos textos; definir responsável, base legal aplicável, retenção, exclusão e acesso; separar segredos de fonte/exportações/logs; verificar limpeza de dados no dispositivo compartilhado. Checklist ainda não executada.

## Validação executada

- `node --experimental-strip-types portable/activity.test.mjs`: passou (10 casos de validação/armazenamento e conferência numérica MRU).
- `pnpm exec tsc --noEmit`: passou, sem diagnósticos.
- `pnpm build`: passou nas cinco fases. Avisos não fatais sobre tempo de plugins e classificação estática desconhecida da rota `/`.
- `pnpm lint`: falhou com 22 diagnósticos preexistentes, distribuídos em componentes, hook, página e configuração portátil. Sem correções nesta etapa.
- Dependências instaladas com `pnpm install --frozen-lockfile`; pacote/lockfile preservados.
- Inspeção estática do HTML: nenhum script externo ou link de stylesheet; fonte incorporada. Isso não substitui abrir o arquivo no navegador.
- Abertura direta por `file://` foi recusada pela política de segurança da ferramenta de navegador (somente HTTP/HTTPS). A ação não foi contornada. Abertura visual por duplo clique e percurso completo offline **não verificados nesta execução**.
- Verificação de hashes/diff confirma preservação dos três HTMLs, pastas protegidas e código-fonte original, incluindo desafios e regras de pontuação. Não é uma nova comprovação funcional completa.

Não há código novo de produto nem migração aplicada nesta etapa. Próxima ação dependente: aprovação das decisões; depois, prova de infraestrutura em prévia isolada.
