# Testar o protótipo local

Abra **`site/Iniciar prototipo.cmd`** e, quando o servidor estiver pronto, acesse **http://127.0.0.1:8787**. Mantenha a janela do servidor aberta enquanto testa. Se ele já estiver rodando, basta abrir o endereço.

## Acessos fictícios

| Perfil | E-mail | Senha de demonstração |
| --- | --- | --- |
| Administrador | `admin@labmotion.local` | `LabMotion-Piloto-2026` |
| Professor | `professor@labmotion.local` | `LabMotion-Piloto-2026` |

Código da turma fictícia: **`TURMA-PILOTO-LABMOTION`**. No acesso de aluno, selecione “É meu primeiro acesso”, escolha um apelido fictício e guarde o código pessoal que será mostrado. Para voltar, use a turma e o código pessoal.

Essas contas são criadas **apenas no banco local**. Não usar essas credenciais numa publicação. O site aprovado e as três cópias offline não foram alterados.

## Percurso sugerido

1. Entre como aluno e crie um perfil fictício. Faça o pré-teste e uma missão, use uma pista e tente uma resposta incorreta antes de acertar.
2. Volte ao percurso, feche e abra o navegador e retome a mesma partida. Faça as cinco missões, justificativas, debriefing e pós-teste.
3. Entre como professor para ver o progresso, os erros por item, as pistas, o pré/pós e os textos. Registre uma revisão pela rubrica e exporte CSV/JSON.
4. Entre como administrador e carregue a visão geral. Crie um professor ou redefina o acesso de um professor fictício. A senha temporária exige troca no primeiro acesso.
5. Jogue novamente com o mesmo código do aluno; o histórico anterior é preservado.

O tempo é descritivo e não gera pontos. Não há ranking ou resultado geral automático. As questões 5.2/5.3 têm checagem estrutural, com avaliação física pela professora. A comparação pré/pós usa seis questões repetidas e não sustenta eficácia causal.

## Rede e registros

Cada resposta verificada é salva no servidor. Se o envio falhar, fica na fila local do perfil e pode ser sincronizado quando a conexão voltar, sem pontuar duas vezes. Sem servidor, uma resposta fica pendente; o protótipo não inclui gabarito no navegador. É possível baixar os envios pendentes.

Importe o JSON antigo em “Importar sessão antiga”. Ele permanece identificado como registro coletivo não verificado, fora dos indicadores individuais.

## Desenvolvimento e publicação posterior

O protótipo está em `LabMotion/plataforma/site/`. Não depende de Supabase. Usa D1/SQLite local e login próprio por e-mail/senha para adultos, com hash scrypt e salt. As senhas em texto puro não são guardadas no banco. Alunos usam códigos gerados pelo sistema.

Com Node e pnpm disponíveis:

```text
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm test
pnpm build
node --experimental-strip-types scripts/seed-local.mjs
pnpm start
```

O banco local fica em `.wrangler/state`, ignorado pelo Git. O script de preparação aplica migrações pendentes e insere os dados fictícios sem substituir partidas existentes.

Antes de publicar para uma turma real: usar um banco novo, configurar o primeiro administrador com uma chave de uso único, trocar todos os acessos de teste, definir aviso/retencão/exclusão dos registros com a escola e executar o piloto. O procedimento de publicação deve usar o projeto de prévia separado; a publicação aprovada permanece protegida. Relatório e LEIA-ME aprovados não foram reescritos.
