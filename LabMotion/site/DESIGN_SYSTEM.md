# LabMotion Design System — Ciência lúdica editorial

## Conceito

O LabMotion combina a precisão da Física Experimental com uma linguagem visual acessível, arredondada e confiante. A interface usa blocos planos de cor, contornos escuros e elementos que lembram adesivos educacionais. Não usa gradientes, sombras cinzentas, fundo branco puro ou estética tecnológica genérica.

## 1. Sistema de cores

| Token | HEX | Uso |
|---|---:|---|
| `background` | `#B7D3DE` | Canvas azul suave |
| `surface` | `#F7F3EA` | Cards e áreas de leitura |
| `text` | `#161616` | Texto e contornos |
| `primary` | `#FF5B39` | Ação principal e progresso |
| `secondary` | `#B7A4EA` | Decoração e módulos |
| `accent` | `#FBC94A` | Pistas e destaques secundários |
| `info` | `#A9D3E5` | Tags e informação contextual |
| `success` | `#4F8D68` | Evidência validada |
| `destructive` | `#C63D2B` | Hipótese rejeitada |

Proporção: 60% azul, 25% creme, 10% cores de apoio e 5% laranja-vermelho para a ação principal.

## 2. Tipografia

- Família única: Fredoka, pesos 400–700.
- H1: 48–60 px no desktop e 36–40 px no celular, entrelinha 1,02.
- H2: 32–40 px, entrelinha 1,10.
- H3: 24 px, entrelinha 1,20.
- Corpo: 16–18 px, entrelinha 1,50–1,60.
- Apoio: 12–14 px, entrelinha 1,40.
- Títulos podem alternar regular, negrito e itálico na mesma frase.
- Rótulos usam sentence case, sem caixa alta espaçada.

## 3. Componentes

### Botões e tags

- Formato pill, raio de 999 px e contorno de 2 px em `#161616`.
- Primário: fundo laranja-vermelho e texto escuro.
- Secundário: creme ou lavanda.
- Ghost: transparente com contorno visível no foco.
- Hover: mudança plana de cor em 160 ms.
- Active: deslocamento de 1 px, sem sombra.
- Disabled: opacidade reduzida, mantendo contraste legível.

### Cards e superfícies

- Raio de 16–24 px.
- Contorno escuro de 1,5–2 px.
- Sem drop-shadow suave; profundidade por sobreposição de blocos coloridos.
- Um selo orgânico ou scalloped por seção, no máximo.
- Dados experimentais ficam sobre cards creme com grade azul discreta.

### Formulários e respostas

- Inputs claros, borda escura e foco laranja-vermelho.
- Opção selecionada recebe fundo lavanda e barra lateral laranja.
- Erro e sucesso sempre combinam cor, ícone e explicação.
- Área mínima de toque: 44 × 44 px.

## 4. Grid e espaçamento

- Escala baseada em 4 px: 4, 8, 12, 16, 20, 24, 32, 40, 48 e 64 px.
- Desktop: 12 colunas, largura máxima de 1280 px e gutters de 24 px.
- Tablet: 8 colunas e margens de 24 px.
- Celular: 4 colunas e margens de 16–20 px.
- Conteúdo de leitura: máximo de 760 px.

## 5. Iconografia e direção de arte

- Ícones Lucide lineares com traço arredondado.
- Ilustrações específicas de Física: carrinho, régua, gráficos, medidas e caderno.
- Elementos visuais com aparência de adesivos selecionados individualmente.
- Avatares sobrepostos representam as equipes de três a quatro estudantes.
- Evitar imagens de banco genéricas, neon, cyberpunk, gradientes e excesso de elementos decorativos.

## 6. Movimento e acessibilidade

- Hover e clique: 120–180 ms.
- Transições de tela: 220–280 ms, deslocamento máximo de 8 px.
- Sem animação decorativa contínua.
- Respeitar `prefers-reduced-motion`.
- Contraste WCAG AA, navegação por teclado e informação nunca dependente apenas de cor.
