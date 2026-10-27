# Alinhamento entre revisão textual e sistema entregue

Auditoria de leitura realizada em 21/10/2026. Fontes: `Downloads/LabMotion_Revisao_3_ABNT.docx`, código em `LabMotion/site`, HTML em `LabMotion/jogo_portatil` e `LabMotion_Pacote_Entrega.zip`. Não houve alteração do jogo, publicação, envio ou abertura de navegador. Os números P abaixo são posições dos parágrafos no DOCX, contando parágrafos vazios; a paginação cabe à revisão visual do PDF.

## Conclusão

A nova revisão é uma entrega de **introdução, objetivos e fundamentação**, não um projeto completo. Está explicitamente identificada assim na capa (P11), folha de rosto (P24), resumo (P30), escopo (P55) e sumário. O sistema jogável já existe. Não se deve substituir o relatório completo anterior somente por esse texto ao enviar o projeto integral.

## Prioridades de alinhamento

| Prioridade | Evidência no DOCX novo | Estado do sistema e ação recomendada |
|---|---|---|
| Alta | P55: diagnóstico, justificativas e discussão “ainda dependem de implementação”; P111: fluxo não comprova interface pronta; P121: esquema não é tela desenvolvida | `site/app/page.tsx` implementa diagnóstico, cinco missões, justificativas, debriefing e exportação. O HTML incorpora isso. Se o texto descrever o estado atual, atualizar o tempo verbal e separar **implementado** de **ainda não aplicado com alunos**. Se for resgate da etapa inicial, datar e delimitar esse escopo histórico. |
| Alta para entrega completa | P55 e sumário param em fundamentos e referências | Não há seções de materiais e métodos, resultados/discussão e conclusões do produto. Utilizar este material como seção revisada do projeto completo, preservando as seções restantes e as capturas reais da versão implementada. |
| Média | P66 fala em teste final com “questões equivalentes” | `page.tsx:354` define uma única lista `diagnosticQuestions`; os modos inicial e final percorrem essa mesma lista (`:471`, `:571`, `:575`). São os mesmos enunciados e alternativas, não formas paralelas. Explicitar isso e a familiaridade causada pela repetição; questões diferentes exigiriam implementação futura. |
| Média | P66 prevê indicadores e rubrica, sem unidade individual/equipe definida | Digital aceita uma resposta consensual da equipe (`:451`, `:469`) e compara escores /6 (`:548–549`). Instrumento individual deve ser aplicado fora do jogo. A pontuação lúdica /265 não é a rubrica CER nem a nota individual. |
| Média | P89–91 e Figura 4/P121 usam cinco leituras hipotéticas em metros e esperam cálculo de incerteza da média | O jogo usa dez leituras em centímetros (`:62`), com média 4,117 cm arredondada a 4,12 cm, associação A/B e escrita com u_c=0,01 cm fornecida (`:146`, `:172–176`). Ele não pede calcular u_A=0,0071 m. O exemplo pode permanecer como aprofundamento conceitual, identificado como diferente da atividade programada; para apresentá-lo como tela real, precisaria mudar jogo ou figura. |
| Média para código-fonte compartilhado | Não se aplica ao DOCX | O ZIP contém código-fonte, mas omite `.openai/hosting.json`, importado por `vite.config.ts`. Isso impede reconstruir o projeto principal diretamente do ZIP sem recriar a configuração. Não afeta o HTML portátil. O diretório local `site` possui esse arquivo. A versão fonte deveria conter instruções ou configuração de exemplo sem credenciais. |

## O exemplo de incerteza foi conferido

Cinco valores: 1,21; 1,23; 1,22; 1,24; 1,20 m. Média=1,220 m; desvio amostral=0,0158114 m; u_A=s/raiz(5)=0,0070711 m. Com resolução 0,01 m, arredondamento ao mais próximo e distribuição retangular, u_B=0,005/raiz(3)=0,0028868 m; u_c=0,0076376 m. O resultado (1,220 ± 0,008) m é coerente com os pressupostos declarados em P90. A divergência em relação ao jogo é de conjunto e objetivo didático, não de aritmética.

Também está coerente com o jogo a condição v_0 aproximadamente zero para linearizar x contra t² (P100). Os dois materiais distinguem R² alto de prova de validade física e não afirmam eficácia educacional demonstrada.

## Arquivo portátil e envio

- `jogo_portatil/LabMotion.html` existe, tem 542.070 bytes e contém um script inline. Não há scripts ou estilos externos no HTML; a única URL de fonte CSS é incorporada como dados. A auditoria confirmou no bundle os conjuntos de dados do jogo, instruções de equipe, armazenamento local e exportação.
- SHA256: `9985a811f19bf530ecbdc2bb11bec974714eb2d784e5e907b2d32ef432f13be9`.
- O HTML dentro do ZIP é idêntico ao HTML avulso.
- `Abrir LabMotion.cmd` apenas contém `start "" "%~dp0LabMotion.html"`; é um atalho opcional. Para professora/colegas, basta o HTML e as instruções, ou o ZIP completo para receber também relatório e apresentação. Não precisam executar o CMD nem instalar as dependências do código-fonte.
- Extraia o ZIP, abra o HTML no navegador e teste no computador da apresentação. Se o visualizador do serviço de arquivos só mostrar uma prévia, baixe o arquivo para executá-lo no navegador.
- A execução e o registro são locais: não há envio automático dos resultados para professora ou colegas. Exporte o JSON de cada equipe ao concluir e envie-o manualmente se solicitado. Não iniciar outra equipe antes da exportação.
- O link hospedado antigo não foi atualizado nesta revisão. Não presumir que seu conteúdo ou acesso equivalem ao HTML entregue. O arquivo portátil permite demonstração por projeção ou compartilhamento de tela, sem depender daquele link privado.

## Situação acadêmica a comunicar

O artefato foi implementado e verificado tecnicamente; a aplicação pedagógica com estudantes ainda não foi realizada. O DOCX novo pode aprimorar a fundamentação, mas precisa de ajuste temporal e de escopo quando incorporado ao relatório atual. Os exemplos e demonstrações não são resultados de aprendizagem de uma turma. Não publiquei nem enviei arquivos nesta auditoria.
