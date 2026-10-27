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
