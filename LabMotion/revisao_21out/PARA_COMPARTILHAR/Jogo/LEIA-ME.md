# LabMotion portátil

Abra `LabMotion.html` no navegador com um duplo clique. O jogo e a fonte estão incorporados no arquivo; não é necessário login ou conexão para jogar. Se o navegador restringir armazenamento ou download em arquivos locais, a sessão ainda funciona, mas mantenha a aba aberta e copie as respostas importantes antes de fechá-la.

O diagnóstico digital registra respostas da equipe, com total de 6 pontos. Para avaliar estudantes individualmente, use os instrumentos do manual. A pontuação do jogo tem máximo de 265 pontos e não representa nota conceitual ou validação automática da qualidade dos argumentos.

Ao terminar, use **Exportar registro da equipe**. O arquivo JSON contém respostas, justificativas, limitação, conclusão, debriefing, pistas e pontos. A correção das respostas escritas cabe à professora. **Iniciar nova equipe** apaga o progresso atual após confirmação.

Os conjuntos de dados são didáticos. Nenhum resultado apresentado pelo programa comprova eficácia do produto ou aplicação com alunos.

## Regenerar a versão portátil

Na pasta do código-fonte, instale as dependências e execute `pnpm exec vite build --config vite.portable.config.ts`. A saída `portable-dist/portable/index.html` pode ser servida como site estático junto com a pasta `assets`. O HTML único entregue foi gerado incorporando JS, CSS e a fonte dessa saída.
