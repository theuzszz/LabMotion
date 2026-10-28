# Entrega do protótipo local — 27/10/2026

O escopo foi ajustado pelo usuário durante a implementação: entregar um protótipo funcional local, simplificando banco/login e deixando publicação e piloto real para depois. A aplicação está em `site/`, separada da versão aprovada em `LabMotion/site/`.

## O que funciona

- Professor/admin entram por e-mail e senha no próprio backend. Senhas com hash scrypt e salt, limite de tentativas, sessão em cookie HttpOnly, redefinição pelo administrador e troca obrigatória da senha temporária. Sem Supabase ou envio de e-mails.
- Turmas com convite revogável; perfis de aluno com apelido e código pessoal mostrado uma vez, cópia/download e hash no banco. Código mantém identidade e histórico mesmo se o apelido mudar; redefinição revoga códigos e sessões anteriores.
- Jogo individual com os 19 desafios extraídos do fonte aprovado, pré/pós repetidos, cinco justificativas e debriefing. Servidor verifica respostas, preserva feedback, registra tentativas/pistas/textos/tempos e controla a pontuação 10/6/+15, máximo 265.
- Retomada da partida, novas partidas com histórico, fila local de envios pendentes e importação do JSON 2.0 mantida como registro coletivo não verificado.
- Resumo individual; painel docente com progresso, assuntos, itens, pré/pós, textos, rubrica/comentários e CSV/JSON; administração com professores, turmas e indicadores gerais descritivos.
- “Dados didáticos” em todas as telas pelo cabeçalho/rodapé. Sem ranking, pontuação por rapidez ou avaliação automática da correção física de textos.

## Verificação

- Teste existente `portable/activity.test.mjs`: passou, incluindo os cálculos de MRU.
- TypeScript: passou no fonte aprovado e no protótipo.
- Build: passou no fonte aprovado e no protótipo.
- 18 testes de backend passaram, com SQLite real: isolamento, credenciais, primeiro administrador, troca de senha, rotação/revogação, limite de entrada, transições, pontuação, transação, concorrência/idempotência, exportação, importação e revisão.
- Piloto via HTTP no **Worker + D1 locais**: login de professor/admin, criação de aluno fictício, percurso completo, uma pista, erro seguido de acerto, reenvio da mesma operação, logout e retomada, revisão docente e segunda partida. Resultado esperado: 261 pontos, preservando máximo de 265. Os pré/pós artificiais foram 0/6 e 6/6 por construção do teste; não são evidência pedagógica.
- Navegador: entrada docente e painel da turma fictícia conferidos visualmente. O percurso completo foi exercitado via HTTP, não clicado integralmente no navegador.
- Evidência do piloto: `site/outputs/piloto-local.json`; captura: `site/outputs/painel-professor.png` (artefatos locais ignorados pelo Git).
- Três HTMLs offline continuam idênticos ao commit aprovado; pastas protegidas e fonte aprovado sem diferenças. A abertura direta via `file://` não foi revalidada visualmente, devido ao bloqueio da ferramenta informado na análise inicial.

## Infraestrutura hospedada

Antes da simplificação para protótipo local, foi criada uma prévia **privada e separada**, projeto `appgprj_6ae125e9f6ac81918bc39a063c2dd78a`. A prova do backend inicial implantou 15 tabelas no D1 e confirmou leitura/escrita via `app/api/[...path]/route.ts`: dois envios idênticos persistiram um único registro. A URL de infraestrutura é `https://labmotion-multiturma-previa.alinnecastro155.chatgpt.site`.

Essa prévia hospedada contém a etapa inicial de infraestrutura, **não a entrega final local com os painéis e login simplificado**. A quarta migração e os dados fictícios foram aplicados somente localmente. Nenhum dado de alunos reais foi usado. A publicação aprovada original não foi alterada.

## O que fica para depois

Publicação da versão completa; primeiro administrador de produção com acesso próprio; piloto com a professora; política de retenção/exclusão e aviso institucional antes de dados reais; ajustes de relatório/LEIA-ME aprovados em documentos próprios. Não foram reescritos os arquivos protegidos. O lint global preexistente da versão aprovada continua fora do escopo.

O protótipo não pretende completar controles operacionais de produção, como recuperação automatizada, monitoramento, testes extensivos de falhas e gestão institucional de dados. As contas prontas são exclusivamente fictícias e locais. Instruções de teste e credenciais estão em [COMO_TESTAR.md](COMO_TESTAR.md).
