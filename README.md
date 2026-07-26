<p align="center">
  <img src="public/marca/ogImage.png" alt="IBCM — Instituto Beneficente Conceição Macedo" width="100%" />
</p>

<h1 align="center">IBCM — Instituto Beneficente Conceição Macedo</h1>

<p align="center">
  Site institucional da IBCM, ONG de Salvador (BA) dedicada a acolhimento, saúde, educação e defesa de direitos<br />
  para pessoas que vivem com HIV/AIDS e grupos historicamente marginalizados. 38 anos cuidando de quem precisa.
</p>

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Roteamento | `react-router` v7 (Data Mode / `RouterProvider`) |
| Estilização | Tailwind CSS v4 |
| Animações | `motion` |
| Ícones | `lucide-react` |
| Data fetching | `@tanstack/react-query` |
| CMS | WordPress headless (REST API) |

## Estrutura do projeto

```
/src
  /app
    App.tsx              # RouterProvider
    routes.tsx             # definição de rotas
    /components            # componentes de UI por seção
    /pages                 # páginas roteadas
    /layouts               # RootLayout
    /data
  /hooks                  # hooks de integração com o CMS (WordPress)
  /services               # chamadas HTTP à API WordPress
  /styles                 # theme.css, fonts.css
  /types                  # tipos do CMS
```

## Rotas

```
/                 Home
/quem-somos       Quem Somos (timeline institucional)
/projetos         Projetos e Causas
/causas           Causas
/doe-agora        Doe Agora
/noticias         Notícias
/noticias/:slug   Notícia (detalhe)
/transparencia    Transparência
```

## Como rodar

```bash
npm install
npm run dev
```

Outros scripts:

```bash
npm run build      # build de produção (tsc -b && vite build)
npm run preview    # preview local do build
npm run lint        # eslint
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz com:

```
VITE_WP_API_URL=
```

URL base da API REST do WordPress usada como CMS headless do site.

## Deploy

O site é publicado na Vercel. Detalhes de infraestrutura/VPS estão documentados internamente (não versionados neste repositório).

## Licença

Uso interno — IBCM.
