# Revisão técnica do LabMotion

Data: 20 de outubro de 2026. Escopo: revisão do código e correção local do produto digital. Não houve publicação externa nesta etapa nem aplicação com estudantes.

## Produto entregue

- Código-fonte atualizado em `LabMotion/site`, sem dependências instaladas, caches, credenciais ou histórico Git.
- Aplicação offline em `LabMotion/jogo_portatil/LabMotion.html`, com JavaScript, CSS e fonte incorporados. Abre diretamente no navegador e dispensa conta, servidor e conexão para jogar.
- Instruções e licença da fonte acompanham o HTML. O arquivo `Abrir LabMotion.cmd` apenas abre o HTML adjacente no navegador padrão.

## Correções realizadas

1. Voltar ao mapa e reabrir a missão mantém a questão, resposta, estado de correção e justificativa em andamento. Antes, a missão reiniciava e podia gerar pontos repetidos.
2. O processamento de uma resposta já aceita tem proteção contra nova pontuação; a finalização da missão verifica progresso e comprimento mínimo.
3. Justificativas de cada missão, limitação, conclusão CER e debriefing são preservados e entram no registro final. Antes, os textos de missão eram descartados ao avançar.
4. Progresso é armazenado no navegador em chaves com prefixo `labmotion-v2:`. Erros de armazenamento ou JSON inválido não interrompem a atividade. Esta persistência não é uma base remota; modo privado, limpeza do navegador e restrições a arquivos locais podem removê-la.
5. A tela final exporta arquivo JSON com pré e pós, gabarito de comparação, pontos, pistas, justificativas, limitação, CER e debriefing. Nenhum nome pessoal é solicitado pelo programa.
6. Reiniciar exige confirmação porque apaga a sessão atual. É preciso exportar o registro antes de iniciar outra equipe.
7. O diagnóstico digital passou a indicar explicitamente que registra respostas consensuais da equipe, total de seis pontos. Uma sessão não produz resultados individuais de três ou quatro pessoas. Instrumentos individuais pertencem ao manual de aplicação.
8. Validação CER passou a exigir sinais de modelo MRU, número com significado, relação explicativa e referência à tendência linear. O feedback avisa que a checagem automática é estrutural e não avalia correção científica. A revisão da professora continua necessária.
9. Limitações exigem texto de pelo menos vinte caracteres e menção a uma condição experimental, incluindo quantidade de dados.
10. Conjuntos de dados são rotulados didáticos. A missão de escrita fornece incerteza combinada arredondada de 0,01 cm e distingue esse valor da resolução instrumental; não apresenta resolução como sinônimo de incerteza.
11. A questão diagnóstica sobre linearização especifica partida do repouso. Em MRUV com velocidade inicial não nula, usar posição contra tempo ao quadrado, sem retirar o termo linear, não garante uma reta.
12. O texto final distingue comparação descritiva da equipe de evidência causal sobre eficácia educacional.

## Verificações executadas

| Verificação | Resultado |
|---|---|
| `node --experimental-strip-types portable/activity.test.mjs` | Passou: dez casos de aceitação/rejeição de texto e estado salvo, além de três verificações do ajuste MRU |
| Ajuste de mínimos quadrados dos cinco pares MRU | Inclinação 1,03 m/s; intercepto 0,399 m; R² arredondado 0,9945 |
| `tsc --noEmit` | Passou sem erros |
| Build principal `pnpm build` | Passou nas cinco etapas Vinext; classificação automática da rota exibiu aviso de análise estática da ferramenta |
| Build portátil Vite | Passou; inclui fonte local e não depende de Cloudflare |
| Lint dos arquivos ativos `app/page.tsx` e `lib/activity.ts` | Passou com a regra de preferência de tag semântica permitida para SVG com papel de imagem e região de status |
| Lint global inicial | Identificou regras de acessibilidade e tipagem em componentes genéricos do template que o produto não importa. Não foi declarado aprovado globalmente |

O teste automatizado de CER verifica critérios estruturais; exemplos sem número, como repetição de “MRU”, são rejeitados. Mesmo um texto aceito pode estar conceitualmente incorreto e deve receber avaliação humana.

## Pontuação e limites de interpretação

Há dezenove desafios: quatro em cada uma das missões 1 a 4 e três na missão 5. Acerto inicial vale dez pontos; acerto após tentativa errada vale seis. Cada registro final de missão vale quinze pontos. O máximo lúdico é 265 pontos. Pistas não descontam pontos, com limite de duas por missão. Velocidade não gera pontos.

A pontuação lúdica não corresponde à rubrica acadêmica de argumentação. A diferença entre os diagnósticos da equipe é apenas descritiva, sujeita à discussão coletiva e ao efeito de repetição das mesmas questões. Não há grupo de comparação nem teste de eficácia educacional nesta revisão.

Os dados MRUV satisfazem exatamente d = 0,20t² e representam um conjunto idealizado. Não devem ser apresentados como medições reais com dispersão instrumental. No MRU, os números são usados como amostra didática para interpretar ajuste e unidades.

## Uso e reconstrução

Para jogar, abra o HTML entregue. Para desenvolver, use a pasta `LabMotion/site`, instale as dependências com pnpm e execute `pnpm dev`. Para gerar a versão portátil: `pnpm exec vite build --config vite.portable.config.ts` e `node portable/export-single.mjs CAMINHO_DE_SAIDA.html`.

A versão publicada anteriormente pode continuar com o comportamento antigo. Os resultados desta revisão se referem aos arquivos locais entregues.
