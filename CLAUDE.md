# IBCM — Guia de Desenvolvimento

Site institucional da IBCM (Instituto Beneficente Conceição Macedo), ONG de Salvador especializada em acolhimento, saúde, educação e defesa de direitos para pessoas que vivem com HIV/AIDS e grupos historicamente marginalizados.

---

## Stack Tecnológico

| Camada | Tecnologia |
|---|---|
| Framework | React 18+ com TypeScript |
| Roteamento | `react-router` v7+ (Data Mode Pattern com `RouterProvider`) |
| Estilização | Tailwind CSS v4 |
| Animações | Motion — importar como `import { motion } from 'motion/react'` |
| Ícones | `lucide-react` |

---

## Estrutura de Pastas

```
/src
  /app
    App.tsx              ← usa RouterProvider
    routes.tsx
    /components
      Navigation.tsx
      Hero.tsx
      ImpactBar.tsx      ← Big Numbers
      QuemSomosHome.tsx
      ProjetosHome.tsx
      Depoimentos.tsx
      DoeAgora.tsx
      Footer.tsx
      Eyebrow.tsx        ← componente reutilizável
      /figma
        ImageWithFallback.tsx
    /pages
      Home.tsx
      QuemSomosPage.tsx
      ProjetosPage.tsx
      DoeAgoraPage.tsx
      TransparenciaPage.tsx
    /layouts
      RootLayout.tsx
  /styles
    theme.css
    fonts.css
```

---

## Rotas

```
/               → Home
/quem-somos     → QuemSomosPage (com timeline horizontal)
/projetos       → ProjetosPage
/doe-agora      → DoeAgoraPage
/transparencia  → TransparenciaPage
```

---

## Design Tokens (`/src/styles/theme.css`)

### Paleta de Cores

```css
--terra: #C1440E;                        /* Cor principal — laranja terracota */
--terra-dark: #9A3309;                   /* Hover states */
--terra-light: #F5EBE6;                  /* Backgrounds sutis */
--terra-mid: #E8C4B4;                    /* Variante média */

--ocre: #B87820;                         /* Amarelo mostarda */
--ocre-light: #FBF2E2;                   /* Background claro */

--musgo: #3A5C3B;                        /* Verde escuro */
--musgo-dark: #2A4229;                   /* Variante escura */
--musgo-light: #E5EEE5;                  /* Background claro */

--ink: #1C1917;                          /* Preto quase total */
--ink-70: rgba(28, 25, 23, 0.70);
--ink-40: rgba(28, 25, 23, 0.40);
--ink-12: rgba(28, 25, 23, 0.12);
--ink-10: rgba(28, 25, 23, 0.10);
--ink-6:  rgba(28, 25, 23, 0.06);

--creme: #F8F5F0;                        /* Background principal */
--creme-dark: #EDE8DF;                   /* Variante */
--white: #FFFFFF;
```

### Tipografia

```css
--font-garamond: 'EB Garamond', serif;    /* Títulos */
--font-jakarta:  'Plus Jakarta Sans', sans-serif;  /* Corpo e UI */
```

Importar em `/src/styles/fonts.css` via Google Fonts.

### Border Radius

```css
--radius-sm:   8px;
--radius-md:   14px;
--radius-lg:   20px;
--radius-xl:   28px;
--radius-2xl:  40px;
--radius-full: 999px;
```

---

## Regras de Layout

- **Flexbox exclusivamente** — não usar CSS Grid para layout principal.
- Comportamentos de tamanho: `hug` (baseado em conteúdo) e `fill` (100% do container).

### Paddings Laterais Padrão

```tsx
className="px-4 sm:px-6 md:px-10 lg:px-[60px]"
```

### Padrão de Espaçamento Vertical

```tsx
className="py-12 sm:py-16 md:py-20 lg:py-[104px]"
```

### Grids Responsivos (quando necessário)

```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
```

---

## Tipografia Fluida

Usar `clamp()` para títulos:

| Elemento | Valor |
|---|---|
| H1 Hero | `clamp(40px, 11vw, 82px)` |
| H2 seções | `clamp(28px, 6vw, 52px)` |
| Body | `clamp(14px, 2vw, 17px)` |

### Padrão de Classes Responsivas

```tsx
className="
  text-[14px] sm:text-[15px] md:text-[16px]
  gap-3 sm:gap-4 md:gap-5 lg:gap-6
"
```

---

## Breakpoints Tailwind

| Prefixo | Largura |
|---|---|
| *(mobile)* | padrão |
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |

---

## Animações (Motion)

### Fade Up padrão

```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 28 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
/>
```

### Delays escalonados

```
0.20s → 0.38s → 0.56s → 0.74s
```

### Hover States

| Elemento | Efeito |
|---|---|
| Botões | Mudança de `background-color` |
| Cards | `translateY(-3px)` + sombra |
| Imagens | `scale(1.04)` |
| Links | Mudança de cor |

Duração padrão de transições CSS: `300ms`.

---

## Componentes Reutilizáveis

### `Eyebrow`

```tsx
interface EyebrowProps {
  children: React.ReactNode;
  color?: string;
}

export function Eyebrow({ children, color = 'var(--terra)' }: EyebrowProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div style={{ width: '18px', height: '1.5px', background: color }} />
      <span style={{
        fontFamily: 'var(--font-jakarta)',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        color,
      }}>
        {children}
      </span>
    </div>
  );
}
```

### `ImageWithFallback`

Localizado em `/src/app/components/figma/ImageWithFallback.tsx`. Usar em todas as imagens:

```tsx
<ImageWithFallback
  src="[URL_UNSPLASH]"
  alt="Descrição acessível"
  className="w-full h-full object-cover"
/>
```

### Card de Projeto (padrão)

```tsx
<div
  className="flex flex-col overflow-hidden transition-all duration-300 h-full group"
  style={{
    background: 'var(--white)',
    border: '1px solid var(--ink-10)',
    borderRadius: 'var(--radius-xl)',
    transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 16px 40px rgba(28, 25, 23, 0.08)' : 'none',
  }}
>
  {/* Imagem 16:9 */}
  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
    <ImageWithFallback
      src={imageUrl}
      alt={titulo}
      className="w-full h-full object-cover transition-transform duration-500"
      style={{ transform: isHovered ? 'scale(1.04)' : 'scale(1)' }}
    />
  </div>

  {/* Faixa colorida */}
  <div style={{ height: '3px', background: gradient }} />

  {/* Conteúdo */}
  <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
    <div style={{ fontFamily: 'var(--font-jakarta)', fontSize: '10px', fontWeight: 600, color: tagColor }}>
      {tag}
    </div>
    <h3 style={{ fontFamily: 'var(--font-garamond)', fontSize: 'clamp(18px, 3vw, 21px)', color: 'var(--ink)' }}>
      {titulo}
    </h3>
    <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '15px', color: 'var(--ink-70)' }}>
      {descricao}
    </p>
  </div>
</div>
```

---

## Seções e Componentes — Especificações

### Navigation

**Desktop**
- `position: fixed; top: 0` — sticky
- Background: `rgba(248, 245, 240, 0.95)` + `backdrop-filter: blur(14px)`
- Logo (Garamond, tracking amplo) à esquerda
- Links centralizados: Quem Somos · Projetos e Causas · Transparência
- Botão "Doe agora" (laranja, `--radius-full`) à direita
- Sombra suave ativada ao fazer scroll

**Mobile**
- Ícone `Menu` / `X` do lucide-react
- Drawer lateral da direita: largura `85%`, max `320px`
- Background do drawer: `var(--creme)`
- Overlay escurecido com blur
- Links empilhados verticalmente + CTA no final
- Bloqueia `overflow` do `<body>` quando aberto

---

### Hero

- Altura: `clamp(600px, 75svh, 800px)`
- Background: imagem com `filter: grayscale(35%) opacity(0.25)`
- Overlay: `linear-gradient(165deg, rgba(28,25,23,0.5) 0%, rgba(28,25,23,0.9) 55%, rgba(193,68,14,0.18) 100%)`
- Badge "Desde 1986" (pill branco semi-transparente)
- Eyebrow "Salvador, Bahia" (cor `--ocre`)
- H1: "38 anos cuidando de quem precisa" — "quem precisa" em itálico `--terra`
- 2 botões CTA lado a lado (mobile: empilhados, full-width)

---

### ImpactBar (Big Numbers)

- Background: `var(--musgo)`
- Grid: 2 colunas mobile → 4 colunas desktop
- Números (Garamond, branco): `text-[36px] sm:text-[40px] md:text-[44px]`
- Labels (Jakarta, uppercase, `white/50`): `text-[9px] sm:text-[10px]`
- Gaps: `gap-6 sm:gap-8 lg:gap-16`

| Número | Label |
|---|---|
| +38 | Anos de atuação |
| +15k | Jovens aprendizes |
| +2.4k | Crianças atendidas |
| 29 | Casas de apoio |

---

### QuemSomosHome

- Background: branco
- Eyebrow: "Quem somos"
- Título: "Uma história de **resistência** e cuidado" — *resistência* em itálico `--terra`
- Fonte título: `clamp(28px, 6vw, 52px)`
- Max-width do bloco de texto: `560px`
- Link "Conheça nossa história completa" com seta

---

### ProjetosHome — 4 Cards

| Projeto | Tag | Cor |
|---|---|---|
| HIV/AIDS — Prevenção e acolhimento | Saúde | `--terra` |
| Creche IBCM | Educação | `--musgo` |
| CPDD — Casarão da Diversidade | Diversidade | `--ocre` |
| Adolescente aprendiz | Trabalho | `--ink` |

Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`

---

### Depoimentos

- Background: `var(--ink)`
- 2 cards empilhados
- Aspas decorativas: Garamond itálico, `--terra`, `opacity: 0.35`
- Texto em itálico
- Avatar circular com inicial

| Pessoa | Cor | Papel |
|---|---|---|
| Maria S. | `--terra` | Beneficiária |
| Roberto A. | `--musgo` | Voluntário |

---

### DoeAgora

- Toggle mensal / única
- 4 valores preset com cards selecionáveis (borda `--terra` + glow quando ativo)
- Campo "outro valor" customizado
- Info box verde destacando doações mensais
- Rodapé com badges de segurança e métodos de pagamento

| Valor | O que financia |
|---|---|
| R$ 30/mês | 5 refeições/semana para criança HIV |
| R$ 50/mês | Aluguel casa apoio + 2 crianças creche |
| R$ 100/mês | Tratamento ARV + semana integral família |
| R$ 200/mês | Mês de alimentação de 2 crianças + materiais |

---

### QuemSomosPage — Timeline Horizontal

- Layout horizontal com scroll quando necessário
- Marcos em zig-zag (alternados acima/abaixo da trilha)
- Trilha central com gradientes entre as cores da paleta
- Círculos de ano: `w-12 h-12 sm:w-14 sm:h-14`
- Cards: `min-h-[200px] sm:min-h-[240px] md:min-h-[260px] lg:min-h-[280px]`
- Títulos: `text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px]`
- Line-clamp: 3 linhas mobile, 4 desktop

| Ano | Evento |
|---|---|
| 1986 | Fundação por Maria Conceição Macedo |
| 1988 | Primeira casa de apoio |
| 1992 | Início programa jovem aprendiz |
| 1995 | Creche IBCM |
| 2003 | CPDD — Casarão da Diversidade |
| 2010 | Ronda Noturna |
| 2024 | 38 anos de história |

---

### Footer

- Background: `var(--ink)`
- Grid 4 colunas (mobile: empilhado)
- Seções: Institucional · Projetos · Transparência · Contato
- Logo IBCM + redes sociais + CNPJ + copyright

---

## Acessibilidade

- Usar tags semânticas: `<nav>`, `<section>`, `<article>`, `<main>`
- `alt` descritivo em todas as imagens
- `aria-label` em botões de ícone
- Contraste mínimo WCAG AA
- Focus states visíveis
- Navegação por teclado funcional

---

## Performance

- Lazy loading de imagens
- Code splitting por rota (React.lazy + Suspense)
- Preload das fontes críticas
- Imagens com dimensões explícitas para evitar CLS

---

## Imagens (Unsplash via ImageWithFallback)

| Seção | Busca sugerida |
|---|---|
| Hero | "community care support salvador brazil" |
| HIV/AIDS | "hiv aids awareness prevention" |
| Creche | "children daycare learning" |
| LGBTQ+ | "lgbtq pride diversity" |
| Jovem aprendiz | "young apprentice working" |

---

## Dados de Contato

- **Endereço**: Salvador, Bahia
- **Email**: contato@ibcm.org.br
- **Telefone**: (71) XXXX-XXXX
- **Redes**: Instagram, Facebook, LinkedIn

---

## Dependências (`package.json`)

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router": "^7.1.3",
    "motion": "^11.15.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "typescript": "^5.7.3",
    "tailwindcss": "^4.0.0"
  }
}
```
