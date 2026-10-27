'use client';

import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { acceptsCER, acceptsLimitation, SESSION_PREFIX, validSavedValue } from '@/lib/activity';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  Download,
  FlaskConical,
  Gauge,
  Lightbulb,
  LockKeyhole,
  MessageSquareText,
  Orbit,
  RotateCcw,
  Ruler,
  ShieldAlert,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

type Phase = 'intro' | 'briefing' | 'pretest' | 'map' | 'mission' | 'debrief' | 'posttest' | 'results';
type Question = {
  id: string;
  label: string;
  prompt: string;
  options?: string[];
  correct?: number;
  success: string;
  error: string;
  hints: [string, string];
  kind?: 'text';
  validate?: (value: string) => boolean;
  placeholder?: string;
};
type Mission = {
  title: string;
  short: string;
  subtitle: string;
  fragment: string;
  icon: LucideIcon;
  context: React.ReactNode;
  questions: Question[];
};

const measurements = ['4,11', '4,13', '4,12', '4,11', '4,11', '4,14', '4,12', '4,11', '4,10', '4,12'];

function useSavedState<T>(key: string, initial: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(initial);
  const [loaded, setLoaded] = useState(false);
  const initialRef = useRef(initial);
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = localStorage.getItem(SESSION_PREFIX + key);
        if (saved !== null) {
          const parsed: unknown = JSON.parse(saved);
          if (validSavedValue(key, parsed, initialRef.current)) setValue(parsed as T);
        }
      } catch { /* Storage may be blocked; the current session remains usable. */ }
      setLoaded(true);
    });
  }, [key]);
  useEffect(() => {
    if (loaded) {
      try { localStorage.setItem(SESSION_PREFIX + key, JSON.stringify(value)); } catch { /* Export remains available. */ }
    }
  }, [key, value, loaded]);
  return [value, setValue];
}

function DataTable({ rows, caption }: { rows: string[][]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-background/40">
      <table className="w-full min-w-[430px] border-collapse text-center text-xs">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.join('-')} className={rowIndex === 0 ? 'bg-secondary' : ''}>
              {row.map((cell, cellIndex) => (
                <th
                  key={`${cell}-${cellIndex}`}
                  scope={cellIndex === 0 ? 'row' : undefined}
                  className={`border-b border-r border-border px-3 py-2 last:border-r-0 ${cellIndex === 0 || rowIndex === 0 ? 'font-bold text-foreground' : 'font-mono font-medium text-muted-foreground'}`}
                >
                  {cell}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SabotagedGraph() {
  return (
    <figure className="rounded-xl border border-destructive/25 bg-destructive/5 p-3">
      <svg viewBox="0 0 420 170" role="img" aria-labelledby="graph-title graph-desc" className="h-auto w-full">
        <title id="graph-title">Gráfico sabotado de tempo por distância</title>
        <desc id="graph-desc">O eixo horizontal mostra distância sem unidade, o vertical mostra tempo sem unidade, a escala é irregular e os pontos foram ligados um a um.</desc>
        <path d="M46 14v120h350" fill="none" stroke="currentColor" strokeWidth="2" opacity=".5" />
        <text x="210" y="160" fill="currentColor" fontSize="12" textAnchor="middle">distância ?</text>
        <text x="14" y="78" fill="currentColor" fontSize="12" textAnchor="middle" transform="rotate(-90 14 78)">tempo ?</text>
        <polyline points="68,118 120,102 181,91 238,63 334,48 375,25" fill="none" stroke="var(--accent)" strokeWidth="3" />
        {[['68','118'],['120','102'],['181','91'],['238','63'],['334','48'],['375','25']].map(([x,y]) => <circle key={x} cx={x} cy={y} r="4" fill="var(--primary)" />)}
        <path d="M68 134v5m70-5v5m37-5v5m112-5v5m88-5v5" stroke="currentColor" opacity=".35" />
      </svg>
      <figcaption className="mt-2 text-xs text-muted-foreground">
        Diagnóstico: eixos invertidos para “distância em função do tempo”, unidades ausentes, escala irregular e ligação ponto a ponto.
      </figcaption>
    </figure>
  );
}

const missions: Mission[] = [
  {
    title: 'Medidas sob suspeita',
    short: 'Medidas',
    subtitle: 'Recupere o valor medido e sua incerteza.',
    fragment: 'MEDIDA CONFIÁVEL',
    icon: Ruler,
    context: (
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Amostra recuperada · comprimento em cm</p>
        <div className="flex flex-wrap gap-2">
          {measurements.map((value, index) => <code key={`${value}-${index}`} className="rounded-md border border-border bg-secondary px-2 py-1 text-xs">{value}</code>)}
        </div>
        <p className="text-xs text-muted-foreground">Dados didáticos · instrumento digital com resolução de 0,01 cm. Neste desafio de escrita, adote a incerteza combinada já arredondada u_c = 0,01 cm. Resolução e incerteza não são sinônimos.</p>
      </div>
    ),
    questions: [
      {
        id: '1.1', label: 'O valor central', prompt: 'Qual média representa melhor o conjunto?',
        options: ['4,10 cm', '4,12 cm', '4,14 cm', '41,17 cm'], correct: 1,
        success: 'A média usa todas as medições e fornece uma estimativa do valor central.',
        error: 'Não escolha o menor, o maior ou a soma. Some as dez medidas e divida por dez.',
        hints: ['Há dez medições; a média é a soma dividida por 10.', 'A soma é 41,17 cm. Divida por 10 e arredonde de modo coerente.'],
      },
      {
        id: '1.2', label: 'Erro ou incerteza?', prompt: 'Por que as medidas não são idênticas?',
        options: ['Uma leitura é verdadeira e as demais estão erradas.', 'Há variações fortuitas e limitações do instrumento e do procedimento.', 'O comprimento muda sempre que é medido.', 'A resolução do instrumento elimina qualquer variação.'], correct: 1,
        success: 'A dispersão das leituras ajuda a avaliar a incerteza; ela não significa automaticamente erro grosseiro.',
        error: 'Sem conhecer o valor verdadeiro, não se calcula o erro de cada leitura. Procure a explicação que reconhece variações e limitações.',
        hints: ['Pense no que pode variar mesmo quando o objeto permanece igual.', 'Repetição, resolução e procedimento afetam as leituras.'],
      },
      {
        id: '1.3', label: 'Tipos A e B', prompt: 'Qual associação está correta?',
        options: ['Repetição estatística → A; resolução/especificação do instrumento → B', 'Repetição estatística → B; resolução do instrumento → A', 'As duas fontes são sempre tipo A', 'As duas fontes são sempre tipo B'], correct: 0,
        success: 'Tipo A depende das observações repetidas; tipo B utiliza informação externa ou instrumental.',
        error: 'Identifique qual fonte vem da análise estatística das leituras e qual vem do instrumento.',
        hints: ['Tipo A: avaliação estatística de observações repetidas.', 'Tipo B: resolução, certificado ou especificação instrumental.'],
      },
      {
        id: '1.4', label: 'Resultado final', prompt: 'Adotando u_c = 0,01 cm para este desafio, qual escrita apresenta valor, incerteza e unidade de modo coerente?',
        options: ['4,12 cm', '(4,120 ± 0,01) cm', '(4,12 ± 0,01) cm', '(4,12 ± 1) cm'], correct: 2,
        success: 'Valor central e incerteza terminam na mesma casa decimal.',
        error: 'Inclua a incerteza, a unidade e mantenha valor e incerteza na mesma casa decimal.',
        hints: ['Use a incerteza combinada de 0,01 cm fornecida no enunciado.', 'Use o formato (valor ± incerteza) unidade.'],
      },
    ],
  },
  {
    title: 'O gráfico sabotado',
    short: 'Gráficos',
    subtitle: 'Reorganize e interprete uma representação corrompida.',
    fragment: 'GRÁFICO LEGÍVEL',
    icon: BarChart3,
    context: <SabotagedGraph />,
    questions: [
      {
        id: '2.1', label: 'Eixos', prompt: 'Para distância em função do tempo, onde ficam as variáveis?',
        options: ['Distância no horizontal; tempo no vertical.', 'Tempo no horizontal; distância no vertical.', 'As duas no eixo horizontal.', 'A ordem não importa.'], correct: 1,
        success: 'O tempo é a variável independente; a distância responde ao tempo.',
        error: '“Distância em função do tempo” significa que o tempo organiza o eixo horizontal.',
        hints: ['A variável independente costuma ficar no eixo x.', 'Leia d(t): distância depende do tempo.'],
      },
      {
        id: '2.2', label: 'Elementos essenciais', prompt: 'Qual conjunto torna o gráfico cientificamente legível?',
        options: ['Título e cores decorativas.', 'Título, grandezas, unidades, escala regular, pontos e ajuste coerente.', 'Apenas uma legenda e muitos efeitos visuais.', 'Somente a equação final.'], correct: 1,
        success: 'O gráfico precisa ser compreensível sem depender do texto ao redor.',
        error: 'Procure o conjunto que permite identificar variáveis, unidades, dados e tendência.',
        hints: ['Um leitor deve entender o que foi medido e em qual unidade.', 'Dados experimentais e linha de ajuste exercem funções diferentes.'],
      },
      {
        id: '2.3', label: 'Gráfico não é trajetória', prompt: 'Uma curva em distância × tempo significa que o carrinho percorreu uma pista curva?',
        options: ['Sim, a curva copia o formato da pista.', 'Não; representa a relação entre as grandezas.', 'Sim, desde que o eixo vertical seja distância.', 'Não; gráficos não contêm informação física.'], correct: 1,
        success: 'A forma do gráfico representa a relação entre grandezas, não o desenho do caminho.',
        error: 'Não leia o gráfico como fotografia. Observe o que cada eixo representa.',
        hints: ['Pergunte: o que muda quando o tempo aumenta?', 'A curva descreve uma relação matemática entre variáveis.'],
      },
      {
        id: '2.4', label: 'Ajuste', prompt: 'O que deve representar a tendência dos dados?',
        options: ['Segmentos ligando cada ponto na ordem de coleta.', 'Uma reta ou curva de ajuste coerente com o modelo.', 'Uma curva escolhida apenas por ficar bonita.', 'A maior distância medida.'], correct: 1,
        success: 'A linha de ajuste resume a tendência e permite interpretar parâmetros.',
        error: 'Ligar ponto a ponto destaca oscilações; o ajuste deve expressar o modelo testado.',
        hints: ['O objetivo é representar uma tendência, não contornar cada ponto.', 'O formato do ajuste deve conversar com o modelo físico.'],
      },
    ],
  },
  {
    title: 'O carrinho constante',
    short: 'MRU',
    subtitle: 'Interprete o ajuste linear e seus parâmetros.',
    fragment: 'VELOCIDADE ≈ 1,03 m/s',
    icon: Gauge,
    context: (
      <div className="space-y-3">
        <DataTable caption="Dados de tempo e distância do carrinho" rows={[
          ['t (s)', '0,10', '0,20', '0,30', '0,40', '0,50'],
          ['d (m)', '0,51', '0,59', '0,72', '0,80', '0,92'],
        ]} />
        <p className="rounded-lg bg-secondary px-3 py-2 font-mono text-xs text-primary">d = 1,03t + 0,399 · R² = 0,9945</p>
      </div>
    ),
    questions: [
      {
        id: '3.1', label: 'Modelo', prompt: 'Os dados são compatíveis com MRU?',
        options: ['Sim, aproximadamente, pois d varia linearmente com t.', 'Não, pois nenhum ponto cai exatamente na reta.', 'Sim, apenas porque R² tem quatro casas decimais.', 'Não, pois a posição inicial não é zero.'], correct: 0,
        success: 'Dados experimentais não precisam ficar exatamente sobre a reta para sustentar um modelo aproximado.',
        error: 'Considere a tendência linear, a constância aproximada da inclinação e a natureza experimental dos dados.',
        hints: ['No MRU, d varia linearmente com t.', 'Pequenas dispersões não anulam automaticamente o modelo.'],
      },
      {
        id: '3.2', label: 'Inclinação', prompt: 'O que representa 1,03 na equação?',
        options: ['Tempo total de 1,03 s.', 'Velocidade aproximada de 1,03 m/s.', 'Posição inicial de 1,03 m.', 'Aceleração de 1,03 m/s².'], correct: 1,
        success: 'A inclinação é Δd/Δt e representa a velocidade, com unidade m/s.',
        error: 'Calcule a unidade da inclinação: distância dividida por tempo.',
        hints: ['Inclinação = variação vertical ÷ variação horizontal.', 'Em d × t, isso produz m/s.'],
      },
      {
        id: '3.3', label: 'Intercepto', prompt: 'O que representa 0,399 m?',
        options: ['Velocidade do carrinho.', 'Aceleração média.', 'Posição estimada para t = 0.', 'Erro percentual do ajuste.'], correct: 2,
        success: 'O intercepto informa onde a reta cruza o eixo da distância.',
        error: 'Substitua t = 0 na equação do ajuste e observe o valor de d.',
        hints: ['Intercepto é o termo independente da equação.', 'Em d = vt + d₀, ele corresponde a d₀.'],
      },
      {
        id: '3.4', label: 'R²', prompt: 'R² próximo de 1 prova que o movimento é MRU?',
        options: ['Sim; R² alto prova qualquer modelo.', 'Não; indica bom ajuste, mas exige coerência física e análise das condições.', 'Sim; unidades e incertezas deixam de importar.', 'Não; R² nunca tem utilidade.'], correct: 1,
        success: 'Bom ajuste estatístico apoia a análise, mas não substitui interpretação física.',
        error: 'Um indicador estatístico não verifica sozinho unidades, condições ou mecanismo físico.',
        hints: ['Pergunte o que R² mede — e o que ele não mede.', 'Ajuste estatístico e validade física são avaliações complementares.'],
      },
    ],
  },
  {
    title: 'A curva escondida',
    short: 'MRUV',
    subtitle: 'Linearize os dados e encontre a aceleração.',
    fragment: 'ACELERAÇÃO ≈ 0,40 m/s²',
    icon: Activity,
    context: (
      <DataTable caption="Dados de tempo, tempo ao quadrado e distância" rows={[
        ['t (s)', '0,00', '0,50', '1,00', '1,50', '2,00'],
        ['t² (s²)', '0,00', '0,25', '1,00', '2,25', '4,00'],
        ['d (m)', '0,00', '0,05', '0,20', '0,45', '0,80'],
      ]} />
    ),
    questions: [
      {
        id: '4.1', label: 'Forma original', prompt: 'Qual forma se espera em d × t?',
        options: ['Uma reta horizontal.', 'Uma parábola, para aceleração constante e partida do repouso.', 'Uma circunferência.', 'Uma reta de inclinação zero.'], correct: 1,
        success: 'No MRUV, a posição contém um termo proporcional a t².',
        error: 'Considere d = d₀ + v₀t + (a/2)t² e a partida aproximadamente do repouso.',
        hints: ['Há um termo quadrático na equação horária.', 'Uma grandeza proporcional a t² produz uma parábola quando colocada contra t.'],
      },
      {
        id: '4.2', label: 'Linearização', prompt: 'Qual transformação produz uma reta?',
        options: ['Representar d em função de t².', 'Representar t em função de d².', 'Apagar os pontos extremos.', 'Trocar metros por centímetros.'], correct: 0,
        success: 'A linearização transforma a relação quadrática em d = αt² + β.',
        error: 'Procure uma nova variável que torne proporcional o termo quadrático.',
        hints: ['Os dados já fornecem uma coluna t².', 'Compare d com t²: 0,20 × t² reproduz as distâncias.'],
      },
      {
        id: '4.3', label: 'Coeficiente', prompt: 'A reta linearizada é d = 0,20t². Qual é a aceleração?',
        options: ['0,10 m/s²', '0,20 m/s²', '0,40 m/s²', '2,00 m/s²'], correct: 2,
        success: 'Como d = (a/2)t², temos a/2 = 0,20 e a = 0,40 m/s².',
        error: 'Compare o coeficiente 0,20 com a/2, não diretamente com a.',
        hints: ['No repouso e com d₀ ≈ 0: d = (a/2)t².', 'Multiplique o coeficiente angular por 2.'],
      },
      {
        id: '4.4', label: 'Evidência', prompt: 'A reta em d × t² sustenta qual conclusão?',
        options: ['Prova absoluta de qualquer movimento.', 'Compatibilidade com aceleração aproximadamente constante nas condições consideradas.', 'Movimento circular uniforme.', 'Ausência total de incerteza.'], correct: 1,
        success: 'A linguagem “compatível” reconhece a força e o limite da evidência experimental.',
        error: 'Uma reta em d × t² apoia o modelo de aceleração constante, mas não constitui prova absoluta.',
        hints: ['Use linguagem proporcional à evidência disponível.', 'Considere o modelo testado e as condições do experimento.'],
      },
    ],
  },
  {
    title: 'O parecer científico',
    short: 'Parecer',
    subtitle: 'Transforme resultados em uma conclusão defensável.',
    fragment: 'EVIDÊNCIA ANTES DA CONCLUSÃO',
    icon: FileCheck2,
    context: (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-destructive/25 bg-destructive/5 p-4">
          <Badge variant="destructive">Relatório A</Badge>
          <p className="mt-3 text-sm leading-6">“O carrinho está em MRU porque o gráfico ficou bonito e o R² foi alto.”</p>
        </div>
        <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
          <Badge>Relatório B</Badge>
          <p className="mt-3 text-sm leading-6">“Os dados de d em função de t apresentam tendência linear, inclinação 1,03 m/s e R² = 0,9945. Considerando as incertezas e o trilho aproximadamente horizontal, o resultado é compatível com MRU.”</p>
        </div>
      </div>
    ),
    questions: [
      {
        id: '5.1', label: 'Escolha da conclusão', prompt: 'Qual relatório apresenta uma conclusão científica mais defensável?',
        options: ['Relatório A', 'Relatório B'], correct: 1,
        success: 'O Relatório B relaciona afirmação, evidência numérica e raciocínio; aparência não é evidência.',
        error: 'Procure o texto que explicita dados, parâmetro, condição e linguagem proporcional à evidência.',
        hints: ['Uma conclusão científica precisa citar evidências.', '“Ficou bonito” não informa o que os dados mostram.'],
      },
      {
        id: '5.2', label: 'Limitação', prompt: 'Registre uma limitação plausível deste experimento.', kind: 'text',
        validate: acceptsLimitation,
        placeholder: 'Ex.: O atrito residual pode...',
        success: 'Registro recebido com uma condição experimental identificável. A professora avaliará se a limitação é pertinente e bem explicada.',
        error: 'Tente citar uma condição concreta: atrito, desnível, resolução, sensores, quantidade de medidas ou erro de zero.',
        hints: ['Observe o trilho, o instrumento e a quantidade de dados.', 'Exemplos aceitos incluem atrito residual e resolução do sensor.'],
      },
      {
        id: '5.3', label: 'CER', prompt: 'Escreva uma conclusão com afirmação, evidência numérica e raciocínio físico.', kind: 'text',
        validate: acceptsCER,
        placeholder: 'Afirmação: ... Evidência: ... Raciocínio: ...',
        success: 'Registro recebido com sinais de modelo, evidência numérica e ligação explicativa. A checagem automática é estrutural; a correção física será avaliada pela professora.',
        error: 'Cite MRU, a inclinação 1,03 m/s ou R² = 0,9945, e explique a tendência linear usando uma ligação como “porque”. Escreva pelo menos 70 caracteres.',
        hints: ['Use a estrutura: “Os dados são compatíveis com... porque...”', 'Você pode citar inclinação 1,03 m/s, tendência linear e R² = 0,9945.'],
      },
    ],
  },
];

const diagnosticQuestions = [
  { q: 'Em medidas repetidas, o que sustenta a avaliação tipo A?', o: ['A resolução indicada pelo fabricante', 'A análise estatística das observações', 'A unidade escolhida', 'O maior valor'], c: 1 },
  { q: 'Em distância em função do tempo, qual variável fica no eixo horizontal?', o: ['Distância', 'Velocidade', 'Tempo', 'Aceleração'], c: 2 },
  { q: 'A forma de um gráfico posição × tempo desenha a trajetória do objeto?', o: ['Sempre', 'Somente no MRU', 'Não; mostra a relação entre grandezas', 'Somente se houver curva'], c: 2 },
  { q: 'O que representa a inclinação em d × t no MRU?', o: ['A velocidade', 'A aceleração', 'O tempo inicial', 'O R²'], c: 0 },
  { q: 'Por que representar d em função de t² no MRUV que parte do repouso?', o: ['Para eliminar unidades', 'Para produzir uma relação linear', 'Para aumentar o R² automaticamente', 'Para desenhar a pista'], c: 1 },
  { q: 'R² = 0,99 é suficiente para provar um modelo físico?', o: ['Sim', 'Não; também é necessária coerência física', 'Sim, se houver cinco pontos', 'Não; R² nunca serve'], c: 1 },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="instrument-logo grid size-10 place-items-center"><Orbit aria-hidden="true" className="relative z-10 size-5" /></span>
      <div>
        <p className="font-heading text-lg font-bold leading-none tracking-tight">LabMotion</p>
        <p className="mt-1 text-[11px] font-medium text-muted-foreground">Do dado à lei física</p>
      </div>
    </div>
  );
}

function AppHeader({ recovered, evidence, onReset }: { recovered: number; evidence: number; onReset: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-8">
        <Logo />
        <div className="hidden min-w-52 sm:block">
          <Progress value={recovered * 20}>
            <ProgressLabel className="text-xs">Relatório recuperado</ProgressLabel>
            <ProgressValue className="text-xs">{() => `${recovered * 20}%`}</ProgressValue>
          </Progress>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="h-7 border-primary/25 bg-primary/5 text-primary">{evidence} evidências</Badge>
          <Button variant="ghost" size="icon" onClick={onReset} aria-label="Reiniciar investigação" title="Reiniciar investigação"><RotateCcw /></Button>
        </div>
      </div>
    </header>
  );
}

function Intro({ onNext }: { onNext: () => void }) {
  return (
    <main className="lab-grid min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Logo />
        <div className="hidden items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs text-muted-foreground backdrop-blur sm:flex"><span className="status-dot" /> Sistema em modo de investigação</div>
      </header>
      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-14 pt-8 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:pb-20 lg:pt-14">
        <div className="max-w-2xl">
          <div className="serial-label mb-6"><span className="sticker-badge"><Sparkles className="size-3.5" /></span> Produto educacional · LM-02</div>
          <h1 className="font-heading text-4xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-6xl">O laboratório <strong className="font-bold">perdeu</strong> a sua <span className="text-gradient font-semibold">lei física.</span></h1>
          <p className="mt-4 text-xs text-muted-foreground">Dados didáticos para revisão. O progresso permanece neste navegador quando o armazenamento local está disponível.</p><p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Os dados continuam intactos, mas medidas, gráficos e conclusões foram corrompidos. Sua equipe tem cinco missões para restaurar o relatório LM-02.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="h-12 px-5 text-sm font-bold" onClick={onNext}>Iniciar investigação <ArrowRight /></Button>
            <div className="flex items-center gap-3"><div className="avatar-stack" aria-hidden="true"><span>A</span><span>B</span><span>C</span><span>+1</span></div><span className="text-xs leading-5 text-muted-foreground">35 min de jogo<br />3–4 participantes por equipe</span></div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-5 -z-10 rounded-[32px] border-2 border-foreground bg-secondary" />
          <div className="instrument-shell overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3"><span className="instrument-logo grid size-9 place-items-center"><FlaskConical className="relative z-10 size-4" /></span><div><p className="font-heading text-base font-bold">Painel de controle</p><p className="text-xs text-muted-foreground">Relatório LM-02 · 5 módulos</p></div></div>
              <span className="rounded-full border border-foreground bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">Corrompido</span>
            </div>
            <div className="brass-rule mx-5 mt-1" /><div className="space-y-2 p-4 sm:p-5">
              {missions.map((mission, index) => { const Icon = mission.icon; return <div key={mission.title} className="flex items-center gap-3 rounded-2xl border border-border bg-background/45 p-3.5 opacity-70"><span className="grid size-10 place-items-center rounded-full border border-foreground bg-secondary text-foreground"><Icon className="size-4" /></span><span className="min-w-0 flex-1"><span className="block text-[11px] font-semibold text-muted-foreground">Missão {index + 1}</span><span className="block truncate text-sm font-semibold">{mission.title}</span></span><LockKeyhole className="size-3.5 text-muted-foreground" /></div>; })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Briefing({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const roles = [['Dados', 'confere valores, unidades e cálculos'], ['Gráficos', 'confere eixos, escalas e ajustes'], ['Relator', 'registra hipóteses e justificativas'], ['Navegador', 'controla o jogo e comunica a conclusão']];
  const rules = ['Discutam antes de responder.', 'Registrem uma justificativa por missão.', 'Cada missão oferece até duas pistas.', 'O erro gera feedback e uma nova tentativa.', 'A pontuação considera interpretação, não velocidade.'];
  return (
    <main className="lab-grid min-h-screen px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Logo />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
          <section className="panel p-6 sm:p-8">
            <Badge variant="destructive"><ShieldAlert /> Alerta LM-02</Badge>
            <h1 className="mt-5 font-heading text-3xl font-black tracking-tight sm:text-4xl">Apenas uma análise baseada em evidências poderá restaurá-lo.</h1>
            <p className="mt-4 leading-7 text-muted-foreground">O sistema detectou medidas sem incerteza, gráfico inadequado e interpretação incompatível com os dados do carrinho.</p>
            <h2 className="mt-8 text-sm font-bold uppercase tracking-[.14em] text-primary">Papéis da equipe</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {roles.map(([role, desc]) => <div key={role} className="rounded-xl border border-border bg-background/40 p-3"><p className="text-sm font-bold">{role}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{desc}</p></div>)}
            </div>
          </section>
          <section className="panel p-6 sm:p-8">
            <div className="flex items-center gap-2"><Users className="size-5 text-accent" /><h2 className="font-heading text-xl font-bold">Protocolo de investigação</h2></div>
            <ol className="mt-5 space-y-4">
              {rules.map((rule, index) => <li key={rule} className="flex gap-3 text-sm leading-6"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary font-mono text-xs font-bold text-primary">{index + 1}</span><span>{rule}</span></li>)}
            </ol>
            <Alert className="mt-6 border-accent/25 bg-accent/5"><BrainCircuit className="text-accent" /><AlertTitle>Antes do jogo</AlertTitle><AlertDescription>O diagnóstico digital registra uma resposta da equipe por questão. Para avaliar cada estudante, use o pré e pós-teste individual do manual.</AlertDescription></Alert>
            <div className="mt-7 flex gap-3"><Button variant="outline" onClick={onBack}><ArrowLeft /> Voltar</Button><Button className="ml-auto" onClick={onNext}>Aceitar missão <ArrowRight /></Button></div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Diagnostic({ mode, answers, setAnswers, onSubmit }: { mode: 'pré' | 'pós'; answers: number[]; setAnswers: (v: number[]) => void; onSubmit: () => void }) {
  const complete = answers.every((answer) => answer >= 0);
  return (
    <main className="lab-grid min-h-screen px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Logo />
        <section className="panel mt-10 p-6 sm:p-8">
          <Badge variant="outline"><ClipboardCheck /> {mode === 'pré' ? 'Diagnóstico inicial' : 'Diagnóstico final'}</Badge>
          <h1 className="mt-4 font-heading text-3xl font-black">{mode === 'pré' ? 'Registre seu ponto de partida' : 'Verifique o que mudou'}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Registrem a resposta consensual da equipe. {mode === 'pré' ? 'O resultado será comparado somente ao final.' : 'Use agora o que você aprendeu nas missões.'}</p>
          <div className="mt-8 space-y-6">
            {diagnosticQuestions.map((item, qIndex) => (
              <fieldset key={item.q} className="rounded-xl border border-border bg-background/35 p-4">
                <legend className="px-1 text-sm font-bold"><span className="mr-2 font-mono text-primary">{qIndex + 1}.</span>{item.q}</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {item.o.map((option, oIndex) => <label key={option} className={`flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-sm transition ${answers[qIndex] === oIndex ? 'border-primary/60 bg-primary/10' : 'border-border bg-card/45 hover:border-primary/30'}`}><input type="radio" name={`${mode}-${qIndex}`} checked={answers[qIndex] === oIndex} onChange={() => { const next = [...answers]; next[qIndex] = oIndex; setAnswers(next); }} className="mt-1 accent-[var(--primary)]" /><span>{option}</span></label>)}
                </div>
              </fieldset>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between gap-4"><p className="text-xs text-muted-foreground">{answers.filter((a) => a >= 0).length} de 6 respondidas</p><Button disabled={!complete} onClick={onSubmit}>{mode === 'pré' ? 'Entrar no laboratório' : 'Comparar resultados'} <ArrowRight /></Button></div>
        </section>
      </div>
    </main>
  );
}

function MissionMap({ recovered, evidence, hints, onEnter, onReset, onDebrief }: { recovered: number; evidence: number; hints: number[]; onEnter: (i: number) => void; onReset: () => void; onDebrief: () => void }) {
  return (
    <main className="lab-grid min-h-screen"><AppHeader recovered={recovered} evidence={evidence} onReset={onReset} />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><Badge variant="outline"><FlaskConical /> Mapa do laboratório</Badge><h1 className="mt-4 font-heading text-3xl font-black tracking-tight sm:text-4xl">Restaure o relatório em sequência.</h1><p className="mt-2 text-sm text-muted-foreground">O próximo módulo é liberado quando a equipe registra sua justificativa.</p></div><Badge variant={recovered === 5 ? 'default' : 'destructive'} className="h-7">{recovered === 5 ? 'Restaurado' : 'Corrompido'}</Badge></div>
        <div className="mt-8 grid gap-3">
          {missions.map((mission, index) => { const Icon = mission.icon; const done = index < recovered; const open = index === recovered; return (
            <button key={mission.title} type="button" disabled={!open} onClick={() => onEnter(index)} className={`group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border p-4 text-left transition sm:p-5 ${done ? 'border-primary/20 bg-primary/5' : open ? 'border-primary/40 bg-card hover:-translate-y-0.5 hover:border-primary/70' : 'border-border bg-card/35 opacity-48'}`}>
              <span className={`grid size-12 place-items-center rounded-xl ${done || open ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{done ? <Check className="size-5" /> : <Icon className="size-5" />}</span>
              <span><span className="text-[10px] font-bold uppercase tracking-[.15em] text-muted-foreground">Missão {index + 1} · {mission.short}</span><span className="mt-1 block font-heading text-lg font-bold">{mission.title}</span><span className="mt-1 block text-xs text-muted-foreground">{done ? `Fragmento: ${mission.fragment}` : mission.subtitle}</span></span>
              <span className="flex items-center gap-3">{hints[index] > 0 && <Badge variant="outline" className="hidden sm:inline-flex">{hints[index]} pista{hints[index] > 1 ? 's' : ''}</Badge>}{done ? <CheckCircle2 className="size-5 text-primary" /> : open ? <ChevronRight className="size-5 text-primary transition-transform group-hover:translate-x-1" /> : <LockKeyhole className="size-4 text-muted-foreground" />}</span>
            </button>
          ); })}
        </div>
        {recovered === 5 && <div className="mt-7 flex justify-end"><Button size="lg" onClick={onDebrief}>Iniciar debriefing <MessageSquareText /></Button></div>}
      </div>
    </main>
  );
}

function MissionScreen({ missionIndex, questionIndex, evidence, recovered, hintsUsed, selected, text, result, reflection, onSelect, onText, onCheck, onHint, onContinue, onReflection, onFinish, onMap, onReset }: {
  missionIndex: number; questionIndex: number; evidence: number; recovered: number; hintsUsed: number; selected: number | null; text: string; result: 'correct' | 'wrong' | null; reflection: boolean; onSelect: (i: number) => void; onText: (v: string) => void; onCheck: () => void; onHint: () => void; onContinue: () => void; onReflection: (v: string) => void; onFinish: () => void; onMap: () => void; onReset: () => void;
}) {
  const mission = missions[missionIndex]; const q = mission.questions[questionIndex]; const Icon = mission.icon; const answerReady = q.kind === 'text' ? text.trim().length > 0 : selected !== null;
  return (
    <main className="lab-grid min-h-screen"><AppHeader recovered={recovered} evidence={evidence} onReset={onReset} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-9">
        <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="panel h-fit p-4 lg:sticky lg:top-24">
            <Button variant="ghost" size="sm" onClick={onMap}><ArrowLeft /> Mapa</Button>
            <div className="mt-4 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground"><Icon className="size-5" /></span><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">Missão {missionIndex + 1}</p><p className="font-heading font-bold">{mission.short}</p></div></div>
            <div className="mt-5 space-y-2">{mission.questions.map((item, index) => <div key={item.id} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${index < questionIndex || reflection ? 'text-primary' : index === questionIndex ? 'bg-secondary font-bold text-foreground' : 'text-muted-foreground'}`}>{index < questionIndex || reflection ? <CheckCircle2 className="size-3.5" /> : <span className="grid size-4 place-items-center rounded-full border border-current font-mono text-[9px]">{index + 1}</span>}<span className="truncate">{item.label}</span></div>)}</div>
            <div className="mt-5 rounded-xl border border-border bg-background/35 p-3"><div className="flex justify-between text-xs"><span className="text-muted-foreground">Pistas usadas</span><strong>{hintsUsed}/2</strong></div><div className="mt-2 flex gap-1">{[0, 1].map((i) => <span key={i} className={`h-1.5 flex-1 rounded-full ${i < hintsUsed ? 'bg-accent' : 'bg-secondary'}`} />)}</div></div>
          </aside>

          <section className="panel overflow-hidden">
            <div className="border-b border-border bg-card/70 p-5 sm:p-7"><Badge variant="outline">Dados didáticos da missão</Badge><div className="data-sheet mt-4">{mission.context}</div></div>
            {!reflection ? <div className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-semibold text-primary">Desafio {q.id}</p><h1 className="mt-1 font-heading text-2xl font-black tracking-tight">{q.label}</h1></div><Badge variant="secondary">{questionIndex + 1} / {mission.questions.length}</Badge></div>
              <p className="mt-5 max-w-3xl text-base font-semibold leading-7 sm:text-lg">{q.prompt}</p>
              {q.kind === 'text' ? <Textarea value={text} onChange={(event) => onText(event.target.value)} placeholder={q.placeholder} className="mt-5 min-h-32 border-border bg-background/55 p-4 leading-6" disabled={result === 'correct'} /> : <div className="mt-5 grid gap-3">{q.options?.map((option, index) => <button key={option} type="button" disabled={result === 'correct'} aria-pressed={selected === index} onClick={() => onSelect(index)} className={`option-card flex items-start gap-3 rounded-xl border p-4 text-left text-sm leading-6 ${selected === index ? 'selected' : ''}`}><span className="grid size-6 shrink-0 place-items-center rounded-full border border-current font-mono text-xs font-bold">{String.fromCharCode(65 + index)}</span><span>{option}</span></button>)}</div>}
              {result && <Alert className={`mt-5 ${result === 'correct' ? 'border-primary/30 bg-primary/8' : 'border-destructive/30 bg-destructive/8'}`} variant={result === 'wrong' ? 'destructive' : 'default'}>{result === 'correct' ? <CheckCircle2 className="text-primary" /> : <X />}<AlertTitle>{result === 'correct' ? 'Registro aceito' : 'Revise a resposta e tente novamente'}</AlertTitle><AlertDescription>{result === 'correct' ? q.success : q.error}</AlertDescription></Alert>}
              <div className="mt-6 flex flex-wrap items-center gap-3"><Button variant="outline" disabled={hintsUsed >= 2 || result === 'correct'} onClick={onHint}><Lightbulb className="text-accent" /> {hintsUsed >= 2 ? 'Pistas esgotadas' : 'Solicitar pista'}</Button><div className="ml-auto">{result === 'correct' ? <Button onClick={onContinue}>{questionIndex === mission.questions.length - 1 ? 'Registrar justificativa' : 'Próximo desafio'} <ArrowRight /></Button> : <Button disabled={!answerReady} onClick={onCheck}>Verificar resposta <ChevronRight /></Button>}</div></div>
            </div> : <div className="p-5 sm:p-8">
              <Badge><CheckCircle2 /> Missão resolvida</Badge><h1 className="mt-4 font-heading text-3xl font-black">Fragmento recuperado</h1><div className="mt-5 rounded-2xl border border-primary/30 bg-primary/8 p-5 text-center font-mono text-lg font-black tracking-[.08em] text-primary">{mission.fragment}</div>
              <label htmlFor="mission-reflection" className="mt-7 block text-sm font-bold">Justificativa da equipe</label><p className="mt-1 text-xs text-muted-foreground">Em duas ou três frases, registrem a evidência mais importante e o que ela permitiu concluir.</p><Textarea id="mission-reflection" value={text} onChange={(event) => onReflection(event.target.value)} placeholder="A principal evidência foi... Isso permite concluir que..." className="mt-3 min-h-28 bg-background/55 p-4" />
              <div className="mt-5 flex justify-end"><Button disabled={text.trim().length < 35} onClick={onFinish}>Salvar fragmento e voltar ao mapa <ArrowRight /></Button></div>
            </div>}
          </section>
        </div>
      </div>
    </main>
  );
}

function Debrief({ responses, setResponses, onNext, recovered, evidence, onReset }: { responses: string[]; setResponses: (v: string[]) => void; onNext: () => void; recovered: number; evidence: number; onReset: () => void }) {
  const prompts = ['Qual resposta inicial vocês mudariam agora?', 'Em qual missão o erro foi mais produtivo?', 'Que evidência permitiu diferenciar MRU de MRUV?', 'Por que R² próximo de 1 não basta?', 'Como as incertezas alteram a linguagem da conclusão?'];
  return <main className="lab-grid min-h-screen"><AppHeader recovered={recovered} evidence={evidence} onReset={onReset} /><div className="mx-auto max-w-4xl px-5 py-10 sm:px-8"><section className="panel p-6 sm:p-8"><Badge><MessageSquareText /> Debriefing</Badge><h1 className="mt-4 font-heading text-3xl font-black">O erro também produz evidência.</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Escolham ao menos duas perguntas para discutir. Registrem uma síntese breve antes do pós-teste.</p><div className="mt-7 space-y-4">{prompts.map((prompt, index) => <label key={prompt} className="block rounded-xl border border-border bg-background/35 p-4"><span className="text-sm font-bold"><span className="mr-2 font-mono text-primary">{index + 1}.</span>{prompt}</span><Textarea value={responses[index]} onChange={(event) => { const next = [...responses]; next[index] = event.target.value; setResponses(next); }} className="mt-3 min-h-20 bg-card/50" placeholder="Síntese da equipe..." /></label>)}</div><div className="mt-7 flex justify-end"><Button disabled={responses.filter((r) => r.trim().length >= 20).length < 2} onClick={onNext}>Responder pós-teste <ArrowRight /></Button></div></section></div></main>;
}

function Results({ pre, post, evidence, hints, onReset, onExport }: { pre: number[]; post: number[]; evidence: number; hints: number[]; onReset: () => void; onExport: () => void }) {
  const preScore = pre.reduce((sum, answer, index) => sum + Number(answer === diagnosticQuestions[index].c), 0); const postScore = post.reduce((sum, answer, index) => sum + Number(answer === diagnosticQuestions[index].c), 0); const gain = postScore - preScore;
  return <main className="lab-grid min-h-screen px-5 py-10 sm:px-8"><div className="mx-auto max-w-5xl"><Logo /><section className="panel mt-10 overflow-hidden"><div className="border-b-2 border-foreground bg-accent p-6 text-center sm:p-10"><span className="mx-auto grid size-16 place-items-center rounded-full border-2 border-foreground bg-primary text-primary-foreground"><FileCheck2 className="size-8" /></span><Badge className="mt-5">Relatório LM-02 restaurado</Badge><h1 className="mt-4 font-heading text-3xl font-black sm:text-5xl">Do dado à lei física.</h1><p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">A equipe verificou medidas, reconstruiu representações, testou modelos e justificou conclusões com evidências.</p></div><div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8"><div className="result-card"><p className="result-label">Diagnóstico inicial</p><p className="result-value">{preScore}<span>/6</span></p></div><div className="result-card border-primary/30"><p className="result-label">Diagnóstico final</p><p className="result-value text-primary">{postScore}<span>/6</span></p></div><div className="result-card"><p className="result-label">Ganho observado</p><p className={`result-value ${gain >= 0 ? 'text-accent' : 'text-destructive'}`}>{gain > 0 ? '+' : ''}{gain}<span> ponto{Math.abs(gain) === 1 ? '' : 's'}</span></p></div></div><div className="border-t border-border p-6 sm:p-8"><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-border bg-background/35 p-4"><p className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Evidências acumuladas</p><p className="mt-2 font-heading text-3xl font-black">{evidence}</p><p className="mt-1 text-xs text-muted-foreground">Acerto inicial: 10 pontos; após erro: 6. Registro da missão: 15. Máximo: 265. Textos exigem revisão docente.</p></div><div className="rounded-xl border border-border bg-background/35 p-4"><p className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Apoio solicitado</p><p className="mt-2 font-heading text-3xl font-black">{hints.reduce((a,b) => a+b,0)} <span className="text-sm text-muted-foreground">pistas</span></p><p className="mt-1 text-xs text-muted-foreground">Pistas fazem parte da aprendizagem e não eliminam a equipe.</p></div></div><div className="mt-7 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-muted-foreground">Comparação descritiva da equipe; não demonstra eficácia causal. Discutam os erros com a professora.</p><div className="flex flex-wrap gap-3"><Button onClick={onExport}><Download /> Exportar registro da equipe</Button><Button variant="outline" onClick={onReset}><RotateCcw /> Iniciar nova equipe</Button></div></div></div></section></div></main>;
}

export default function Home() {
  const [phase, setPhase] = useSavedState<Phase>('phase', 'intro'); const [recovered, setRecovered] = useSavedState('recovered', 0); const [evidence, setEvidence] = useSavedState('evidence', 0); const [missionIndex, setMissionIndex] = useSavedState('missionIndex', 0); const [questionIndex, setQuestionIndex] = useSavedState('questionIndex', 0); const [selected, setSelected] = useSavedState<number | null>('selected', null); const [text, setText] = useSavedState('text', ''); const [result, setResult] = useSavedState<'correct' | 'wrong' | null>('result', null); const [hadError, setHadError] = useSavedState('hadError', false); const [hints, setHints] = useSavedState('hints', [0,0,0,0,0]); const [hintText, setHintText] = useSavedState('hintText', ''); const [reflection, setReflection] = useSavedState('reflection', false); const [pre, setPre] = useSavedState('pre', [-1,-1,-1,-1,-1,-1]); const [post, setPost] = useSavedState('post', [-1,-1,-1,-1,-1,-1]); const [debrief, setDebrief] = useSavedState('debrief', ['','','','','']);
  const [justifications, setJustifications] = useSavedState('justifications', ['','','','','']);
  const [writtenAnswers, setWrittenAnswers] = useSavedState('writtenAnswers', ['','']);
  const currentQuestion = useMemo(() => missions[missionIndex].questions[questionIndex], [missionIndex, questionIndex]);
  const resetQuestion = () => { setSelected(null); setText(''); setResult(null); setHadError(false); setHintText(''); };
  const resetAll = () => { if (!window.confirm('Iniciar nova equipe apaga o progresso deste navegador. Exporte o registro final antes de continuar.')) return; setPhase('intro'); setRecovered(0); setEvidence(0); setMissionIndex(0); setQuestionIndex(0); resetQuestion(); setHints([0,0,0,0,0]); setReflection(false); setPre([-1,-1,-1,-1,-1,-1]); setPost([-1,-1,-1,-1,-1,-1]); setDebrief(['','','','','']); setJustifications(['','','','','']); setWrittenAnswers(['','']); };
  const checkAnswer = () => { if (result === 'correct') return; const correct = currentQuestion.kind === 'text' ? Boolean(currentQuestion.validate?.(text)) : selected === currentQuestion.correct; if (correct) { setResult('correct'); setEvidence((value) => value + (hadError ? 6 : 10)); if (currentQuestion.kind === 'text') { const next = [...writtenAnswers]; next[questionIndex - 1] = text; setWrittenAnswers(next); } } else { setResult('wrong'); setHadError(true); } };
  const showHint = () => { if (hints[missionIndex] >= 2) return; const index = hints[missionIndex]; setHintText(currentQuestion.hints[index]); const next = [...hints]; next[missionIndex] += 1; setHints(next); };
  const continueQuestion = () => { if (questionIndex < missions[missionIndex].questions.length - 1) { setQuestionIndex((value) => value + 1); resetQuestion(); } else { setReflection(true); resetQuestion(); } };
  const finishMission = () => { if (!reflection || missionIndex !== recovered || text.trim().length < 35) return; const next = [...justifications]; next[missionIndex] = text; setJustifications(next); setEvidence((value) => value + 15); setRecovered((value) => value + 1); setReflection(false); setPhase('map'); resetQuestion(); };
  const exportRecord = () => {
    const record = { produto: 'LabMotion', versao: '2.0', unidade: 'equipe', dados: 'Conjuntos didáticos; não representam uma aplicação real', exportadoEm: new Date().toISOString(), diagnosticoInicial: pre, diagnosticoFinal: post, gabaritoDiagnostico: diagnosticQuestions.map((q) => q.c), indicesDasAlternativas: 'Começam em zero', pontuacaoLudica: evidence, maximo: 265, pistasPorMissao: hints, justificativas: justifications, limitacao: writtenAnswers[0], conclusaoCER: writtenAnswers[1], debriefing: debrief, revisaoDocente: 'Argumentos e limitações exigem avaliação humana; ganho descritivo não demonstra eficácia causal.' };
    const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = 'LabMotion_registro_equipe.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (phase === 'intro') return <Intro onNext={() => setPhase('briefing')} />;
  if (phase === 'briefing') return <Briefing onBack={() => setPhase('intro')} onNext={() => setPhase('pretest')} />;
  if (phase === 'pretest') return <Diagnostic mode="pré" answers={pre} setAnswers={setPre} onSubmit={() => setPhase('map')} />;
  if (phase === 'map') return <MissionMap recovered={recovered} evidence={evidence} hints={hints} onEnter={(index) => { if (index !== missionIndex) { setMissionIndex(index); setQuestionIndex(0); setReflection(false); resetQuestion(); } setPhase('mission'); }} onReset={resetAll} onDebrief={() => setPhase('debrief')} />;
  if (phase === 'mission') return <><MissionScreen missionIndex={missionIndex} questionIndex={questionIndex} evidence={evidence} recovered={recovered} hintsUsed={hints[missionIndex]} selected={selected} text={text} result={result} reflection={reflection} onSelect={(index) => { setSelected(index); if (result === 'wrong') setResult(null); }} onText={(value) => { setText(value); if (result === 'wrong') setResult(null); }} onCheck={checkAnswer} onHint={showHint} onContinue={continueQuestion} onReflection={setText} onFinish={finishMission} onMap={() => setPhase('map')} onReset={resetAll} />{hintText && <div className="fixed bottom-4 left-1/2 z-50 w-[min(560px,calc(100%-32px))] -translate-x-1/2 rounded-2xl border-2 border-foreground bg-accent p-4" role="status"><div className="flex gap-3"><Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" /><div><p className="text-xs font-bold uppercase tracking-[.12em] text-primary">Pista da LIA</p><p className="mt-1 text-sm leading-6">{hintText}</p></div><button type="button" className="ml-auto self-start text-muted-foreground hover:text-foreground" onClick={() => setHintText('')} aria-label="Fechar pista"><X className="size-4" /></button></div></div>}</>;
  if (phase === 'debrief') return <Debrief responses={debrief} setResponses={setDebrief} onNext={() => setPhase('posttest')} recovered={recovered} evidence={evidence} onReset={resetAll} />;
  if (phase === 'posttest') return <Diagnostic mode="pós" answers={post} setAnswers={setPost} onSubmit={() => setPhase('results')} />;
  return <Results pre={pre} post={post} evidence={evidence} hints={hints} onReset={resetAll} onExport={exportRecord} />;
}


