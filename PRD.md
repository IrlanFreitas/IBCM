# PRD — Integração WordPress CMS no Site IBCM

**Versão:** 1.0
**Data:** 2026-03-20
**Status:** Proposta

---

## 1. Visão Geral

### Contexto

O site IBCM é atualmente um site React/TypeScript 100% estático. Todos os dados institucionais (projetos, depoimentos, timeline histórica, estatísticas de impacto, relatórios anuais, informações de contato) estão **hardcoded em arquivos `.tsx`**, o que exige um desenvolvedor para qualquer atualização de conteúdo.

### Objetivo

Integrar o WordPress como **CMS headless**, permitindo que a equipe da IBCM atualize conteúdo diretamente no painel WordPress Admin sem precisar alterar código-fonte ou fazer deploy.

### O que NÃO muda

- Stack React + TypeScript + Vite
- Design visual, tokens, componentes de layout
- Roteamento com `react-router` v7
- Animações Motion, ícones Lucide
- Hospedagem do frontend (pode continuar em Vercel/Netlify/estático)

---

## 2. Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                   WordPress (Headless CMS)               │
│                                                         │
│  ┌─────────────┐  ┌────────────┐  ┌──────────────────┐ │
│  │  WP Admin   │  │  ACF Plugin│  │  WPGraphQL Plugin │ │
│  │  (edição)   │  │  (campos)  │  │  (GraphQL API)    │ │
│  └─────────────┘  └────────────┘  └──────────────────┘ │
│                                                         │
│  Custom Post Types: projeto · depoimento · timeline_    │
│  event · relatorio                                       │
│  ACF Options: hero · stats · footer · doacao             │
│                                                         │
│  Endpoints:                                             │
│  REST:    /wp-json/wp/v2/*  /wp-json/acf/v3/options/*  │
│  GraphQL: /graphql                                      │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS (somente leitura pública)
                         │ CORS: apenas domínio do frontend
┌────────────────────────▼────────────────────────────────┐
│                   React App (Frontend)                   │
│                                                         │
│  /src/types/cms.ts          ← interfaces TypeScript     │
│  /src/services/             ← clientes fetch/graphql    │
│    wordpress.ts             ← config base               │
│    projetos.ts              ← REST + GraphQL            │
│    depoimentos.ts           ← REST                      │
│    timeline.ts              ← REST                      │
│    opcoes.ts                ← REST (ACF Options)        │
│  /src/hooks/                ← React Query hooks         │
│    useProjetos.ts                                       │
│    useDepoimentos.ts                                    │
│    useTimeline.ts                                       │
│    useOpcoes.ts                                         │
│  .env.local                 ← VITE_WP_API_URL           │
└─────────────────────────────────────────────────────────┘
```

### Fluxo de dados

1. Build do React faz `fetch` para a API WordPress no browser (client-side)
2. WordPress serve JSON via REST ou GraphQL (somente leitura público)
3. React Query faz cache dos dados (staleTime: 5 min), evitando requests redundantes
4. Em produção, considera-se cache de borda (CDN) no WordPress para TTL adicional

---

## 3. WordPress — Configuração

### 3.1 Plugins Necessários

| Plugin | Obrigatório | Finalidade |
|---|---|---|
| **Advanced Custom Fields (ACF)** | Sim | Campos customizados nos CPTs e Options Page |
| **ACF to REST API** | Sim | Expõe campos ACF no endpoint REST |
| **WPGraphQL** | Condicional | Necessário apenas se usar GraphQL |
| **WPGraphQL for ACF** | Condicional | Expõe campos ACF no schema GraphQL |
| **Yoast SEO** | Opcional | Meta tags para SEO |
| **WP Mail SMTP** | Opcional | Para formulário de contato futuro |

> **Recomendação de instalação:** Use o gerenciador de plugins do WP Admin ou WP-CLI:
> ```bash
> wp plugin install advanced-custom-fields acf-to-rest-api wp-graphql --activate
> ```

### 3.2 Custom Post Types (CPTs)

Adicionar no `functions.php` do tema filho (ou em plugin customizado `ibcm-cpts.php`):

```php
<?php
// ibcm-cpts.php — Plugin customizado ou functions.php do tema filho

function ibcm_register_post_types() {

  // CPT: Projetos
  register_post_type('projeto', [
    'labels'      => ['name' => 'Projetos', 'singular_name' => 'Projeto'],
    'public'      => true,
    'show_in_rest' => true,          // habilita REST API
    'show_in_graphql' => true,       // habilita GraphQL (WPGraphQL)
    'graphql_single_name' => 'projeto',
    'graphql_plural_name' => 'projetos',
    'supports'    => ['title', 'editor', 'thumbnail', 'custom-fields'],
    'menu_icon'   => 'dashicons-heart',
  ]);

  // CPT: Depoimentos
  register_post_type('depoimento', [
    'labels'       => ['name' => 'Depoimentos', 'singular_name' => 'Depoimento'],
    'public'       => true,
    'show_in_rest' => true,
    'show_in_graphql' => true,
    'graphql_single_name' => 'depoimento',
    'graphql_plural_name' => 'depoimentos',
    'supports'     => ['title', 'editor', 'custom-fields'],
    'menu_icon'    => 'dashicons-format-quote',
  ]);

  // CPT: Timeline
  register_post_type('timeline_event', [
    'labels'       => ['name' => 'Timeline', 'singular_name' => 'Evento'],
    'public'       => true,
    'show_in_rest' => true,
    'show_in_graphql' => true,
    'graphql_single_name' => 'timelineEvent',
    'graphql_plural_name' => 'timelineEvents',
    'supports'     => ['title', 'editor', 'custom-fields'],
    'menu_icon'    => 'dashicons-calendar',
  ]);

  // CPT: Relatórios
  register_post_type('relatorio', [
    'labels'       => ['name' => 'Relatórios', 'singular_name' => 'Relatório'],
    'public'       => true,
    'show_in_rest' => true,
    'show_in_graphql' => true,
    'graphql_single_name' => 'relatorio',
    'graphql_plural_name' => 'relatorios',
    'supports'     => ['title', 'custom-fields'],
    'menu_icon'    => 'dashicons-media-document',
  ]);
}
add_action('init', 'ibcm_register_post_types');
```

### 3.3 Campos ACF por CPT

#### CPT: `projeto`

| Campo ACF | Tipo | Descrição |
|---|---|---|
| `tag` | Text | Ex: "Saúde", "Educação" |
| `tag_color` | Text | Ex: `var(--terra)` ou valor hex |
| `gradient` | Text | Gradient CSS da faixa decorativa |
| `descricao_curta` | Textarea | Descrição para card na home |
| `descricao_completa` | Wysiwyg | Texto detalhado na página projetos |
| `imagem_principal` | Image | Imagem 16:9, retorna URL |
| `numeros` | Repeater | Array de stats |
| `numeros[].valor` | Text | Ex: "+800" |
| `numeros[].label` | Text | Ex: "Pacientes atendidos/ano" |
| `ordem` | Number | Ordem de exibição |
| `ativo` | True/False | Exibir ou ocultar |

#### CPT: `depoimento`

| Campo ACF | Tipo | Descrição |
|---|---|---|
| `texto` | Textarea | Texto do depoimento |
| `nome` | Text | Nome abreviado (ex: "Maria S.") |
| `papel` | Text | Ex: "Beneficiária — usuária há 12 anos" |
| `cor` | Text | Cor do avatar e destaque |
| `cor_light` | Text | Variante clara da cor |
| `ativo` | True/False | |

#### CPT: `timeline_event`

| Campo ACF | Tipo | Descrição |
|---|---|---|
| `ano` | Number | Ex: 1986 |
| `descricao` | Textarea | |
| `cor` | Text | Cor do circle/card |

#### CPT: `relatorio`

| Campo ACF | Tipo | Descrição |
|---|---|---|
| `ano` | Number | Ex: 2023 |
| `arquivo_pdf` | File | Upload do PDF, retorna URL |
| `tamanho` | Text | Ex: "2.4 MB" |
| `tipo` | Select | "anual", "auditoria", "financeiro" |

#### ACF Options Page — Dados Globais

Registrar a página de opções:

```php
if (function_exists('acf_add_options_page')) {
  acf_add_options_page([
    'page_title' => 'Configurações IBCM',
    'menu_title' => 'Config. IBCM',
    'menu_slug'  => 'ibcm-config',
    'capability' => 'manage_options',
    'position'   => 2,
  ]);
}
```

**Campos de opções globais:**

| Grupo | Campo | Tipo |
|---|---|---|
| **Hero** | `hero_titulo` | Text |
| Hero | `hero_subtitulo` | Text |
| Hero | `hero_imagem` | Image |
| **Stats (ImpactBar)** | `stats` | Repeater |
| Stats | `stats[].numero` | Text |
| Stats | `stats[].label` | Text |
| **Tiers de Doação** | `valores_doacao` | Repeater |
| Doação | `valores_doacao[].valor` | Number |
| Doação | `valores_doacao[].impactos` | Repeater |
| Doação | `valores_doacao[].impactos[].texto` | Text |
| **Contato/Footer** | `endereco` | Text |
| Contato | `email` | Email |
| Contato | `telefone` | Text |
| Contato | `cnpj` | Text |
| Contato | `instagram_url` | URL |
| Contato | `facebook_url` | URL |
| Contato | `linkedin_url` | URL |
| **Quem Somos** | `missao` | Textarea |
| Quem Somos | `visao` | Textarea |
| Quem Somos | `valores` | Textarea |
| Quem Somos | `texto_intro` | Wysiwyg |
| **Certificações** | `certificacoes` | Repeater |
| Certificações | `certificacoes[].nome` | Text |
| Certificações | `certificacoes[].descricao` | Text |
| Certificações | `certificacoes[].ano` | Number |
| Certificações | `certificacoes[].cor` | Text |

---

## 4. Setup Local

### 4.1 Opção A — Docker (Recomendado)

Criar `docker-compose.yml` na raiz do projeto IBCM ou em um diretório separado `../ibcm-wp/`:

```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: mysql:8.0
    volumes:
      - db_data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: ibcm_wp
      MYSQL_USER: wp_user
      MYSQL_PASSWORD: wp_pass

  wordpress:
    image: wordpress:latest
    depends_on:
      - db
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wp_user
      WORDPRESS_DB_PASSWORD: wp_pass
      WORDPRESS_DB_NAME: ibcm_wp
    volumes:
      - ./wp-content:/var/www/html/wp-content

volumes:
  db_data:
```

```bash
# Iniciar
docker compose up -d

# WP Admin disponível em:
# http://localhost:8080/wp-admin
```

**Configurar CORS no WordPress** (em `functions.php` ou plugin custom):

```php
function ibcm_add_cors_headers() {
  $allowed_origins = [
    'http://localhost:5173',   // Vite dev server
    'https://ibcm.org.br',    // Produção
  ];

  $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

  if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: false');
  }

  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    status_header(200);
    exit();
  }
}
add_action('init', 'ibcm_add_cors_headers');
```

**Configurar variáveis de ambiente no React:**

```bash
# .env.local (local — nunca commitar)
VITE_WP_API_URL=http://localhost:8080

# .env.example (commitar — template para o time)
VITE_WP_API_URL=http://localhost:8080
```

### 4.2 Opção B — Local WP (sem Docker)

1. Baixar [Local by Flywheel](https://localwp.com/) (gratuito)
2. Criar novo site `ibcm-cms`
3. Instalar plugins via WP Admin
4. Configurar CORS conforme snippet acima

---

## 5. Deploy em Servidor

### 5.1 WordPress (Backend CMS)

**Hospedagem recomendada para ONG:**

| Opção | Custo | Observações |
|---|---|---|
| **Hostinger** | ~R$15/mês | Cron jobs, SSL gratuito, suporta PHP 8.x |
| **WP Engine** | ~US$25/mês | CDN integrada, backups, ótima performance |
| **Kinsta** | ~US$35/mês | GCP, mais rápido, melhor para tráfego alto |
| **DigitalOcean Droplet** | ~US$12/mês | Controle total, requer configuração manual |

**Configurações essenciais no servidor:**

```nginx
# Nginx: permitir CORS na API WordPress
location ~* /wp-json/ {
    add_header Access-Control-Allow-Origin "https://ibcm.org.br" always;
    add_header Access-Control-Allow-Methods "GET, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type" always;

    if ($request_method = OPTIONS) {
        return 204;
    }
}

location ~* /graphql {
    add_header Access-Control-Allow-Origin "https://ibcm.org.br" always;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type" always;
}
```

**Configurações no `wp-config.php`:**

```php
define('WP_CACHE', true);
define('WP_MEMORY_LIMIT', '256M');

// Desabilitar editor de arquivos no Admin (segurança)
define('DISALLOW_FILE_EDIT', true);

// Forçar HTTPS
define('FORCE_SSL_ADMIN', true);

// URL da API
define('WP_HOME', 'https://cms.ibcm.org.br');
define('WP_SITEURL', 'https://cms.ibcm.org.br');
```

### 5.2 Frontend React

O frontend continua sendo deployado como site estático (Vercel, Netlify, ou servidor Nginx):

```bash
# Build de produção
npm run build

# Variável de ambiente em produção (Vercel/Netlify)
VITE_WP_API_URL=https://cms.ibcm.org.br
```

**Recomendação de domínios:**

```
ibcm.org.br          → Frontend React (Vercel/Netlify)
cms.ibcm.org.br      → WordPress Admin + API
```

---

## 6. Segurança

### 6.1 Princípios Fundamentais

| Risco | Mitigação |
|---|---|
| Exposição de credenciais WP | Frontend apenas lê, nunca escreve. Sem usuário/senha no código |
| CORS aberto | Whitelist explícita de origens (não usar `*`) |
| Endpoints de escrita expostos | Desabilitar POST/PUT/DELETE na API pública |
| Credenciais no código | Usar apenas `VITE_WP_API_URL` sem tokens no frontend |
| Brute force no WP Admin | Plugin de limit de tentativas + 2FA |
| Injeção via ACF | ACF valida tipos; sanitize no `functions.php` se necessário |

### 6.2 Bloquear Escrita na REST API

```php
// Bloquear métodos de escrita para não autenticados
function ibcm_restrict_rest_write( $result, $server, $request ) {
  $method = $request->get_method();

  if ( in_array( $method, ['POST', 'PUT', 'PATCH', 'DELETE'] ) ) {
    if ( ! is_user_logged_in() ) {
      return new WP_Error(
        'rest_forbidden',
        'Escrita não permitida para usuários não autenticados.',
        ['status' => 403]
      );
    }
  }

  return $result;
}
add_filter( 'rest_pre_dispatch', 'ibcm_restrict_rest_write', 10, 3 );
```

### 6.3 Proteger WP Admin

```php
// Limitar IPs com acesso ao wp-admin (opcional, se IP fixo disponível)
// Adicionar no .htaccess:
# <Files wp-login.php>
#   Order deny,allow
#   Deny from all
#   Allow from SEU.IP.AQUI
# </Files>
```

Plugins recomendados para segurança:
- **Wordfence** ou **Solid Security** — firewall + brute force protection
- **WP 2FA** — autenticação de dois fatores para o Admin

### 6.4 Secrets e Variáveis de Ambiente

```bash
# NUNCA commitar:
.env.local          # variáveis de dev com URL real
wp-config.php       # credenciais do banco

# SEMPRE commitar:
.env.example        # template sem valores sensíveis
```

### 6.5 Rate Limiting (Servidor)

```nginx
# Nginx: limitar requests por IP para a API
limit_req_zone $binary_remote_addr zone=wp_api:10m rate=30r/m;

location ~* /wp-json/ {
    limit_req zone=wp_api burst=10 nodelay;
    # ... resto da config
}
```

---

## 7. REST API

A REST API do WordPress está disponível em `/wp-json/wp/v2/`. O plugin ACF to REST API expõe campos customizados no objeto de cada post.

### 7.1 Endpoints por Tipo de Dado

#### Projetos

```
GET /wp-json/wp/v2/projeto?_embed&orderby=meta_value_num&meta_key=ordem&order=asc&per_page=100

// Response (simplificado):
[
  {
    "id": 1,
    "title": { "rendered": "HIV/AIDS — Prevenção e acolhimento" },
    "_embedded": {
      "wp:featuredmedia": [{ "source_url": "https://cms.ibcm.org.br/..." }]
    },
    "acf": {
      "tag": "Saúde",
      "tag_color": "#C1440E",
      "gradient": "linear-gradient(135deg, #C1440E, #9A3309)",
      "descricao_curta": "Atendimento integral...",
      "descricao_completa": "<p>...</p>",
      "numeros": [
        { "valor": "29", "label": "Casas de apoio" },
        { "valor": "+800", "label": "Pacientes atendidos/ano" }
      ],
      "ordem": 1,
      "ativo": true
    }
  }
]
```

#### Depoimentos

```
GET /wp-json/wp/v2/depoimento?per_page=10&orderby=date&order=desc

// Response:
[
  {
    "id": 5,
    "acf": {
      "texto": "O IBCM foi o único lugar...",
      "nome": "Maria S.",
      "papel": "Beneficiária — usuária há 12 anos",
      "cor": "#C1440E",
      "cor_light": "#F5EBE6",
      "ativo": true
    }
  }
]
```

#### Timeline

```
GET /wp-json/wp/v2/timeline_event?orderby=meta_value_num&meta_key=ano&order=asc&per_page=50

// Response:
[
  {
    "id": 10,
    "title": { "rendered": "Fundação do IBCM" },
    "acf": {
      "ano": 1986,
      "descricao": "...",
      "cor": "#C1440E"
    }
  }
]
```

#### Relatórios

```
GET /wp-json/wp/v2/relatorio?orderby=meta_value_num&meta_key=ano&order=desc&per_page=20

// Response:
[
  {
    "id": 20,
    "title": { "rendered": "Relatório Anual 2023" },
    "acf": {
      "ano": 2023,
      "arquivo_pdf": { "url": "https://cms.ibcm.org.br/wp-content/uploads/..." },
      "tamanho": "2.4 MB",
      "tipo": "anual"
    }
  }
]
```

#### Opções Globais (ACF Options)

```
GET /wp-json/acf/v3/options/options

// Response:
{
  "acf": {
    "hero_titulo": "38 anos cuidando de quem precisa",
    "hero_subtitulo": "...",
    "hero_imagem": { "url": "..." },
    "stats": [
      { "numero": "+38", "label": "Anos de atuação" },
      { "numero": "+15k", "label": "Jovens aprendizes" }
    ],
    "valores_doacao": [ ... ],
    "endereco": "Salvador, Bahia",
    "email": "contato@ibcm.org.br",
    "telefone": "(71) 3000-0000",
    "cnpj": "00.000.000/0001-00",
    "missao": "...",
    "visao": "...",
    "valores": "..."
  }
}
```

---

## 8. GraphQL

> Requerido apenas para Projetos (dados aninhados com `numeros[]`). Para o restante, REST é suficiente.

Instalar WPGraphQL + WPGraphQL for ACF. API disponível em `/graphql` (POST).

### 8.1 Query: Todos os Projetos com Números

```graphql
query GetProjetos {
  projetos(
    first: 20
    where: { orderby: { field: META_VALUE, order: ASC } }
  ) {
    nodes {
      id
      title
      featuredImage {
        node {
          sourceUrl(size: LARGE)
          altText
        }
      }
      projetoFields {
        tag
        tagColor
        gradient
        descricaoCurta
        descricaoCompleta
        ativo
        numeros {
          valor
          label
        }
      }
    }
  }
}
```

### 8.2 Query: Opções Globais (ACF Options via GraphQL)

```graphql
query GetOpcoes {
  ibcmConfig {
    stats {
      numero
      label
    }
    valoresDoacao {
      valor
      impactos {
        texto
      }
    }
    contato {
      endereco
      email
      telefone
      cnpj
    }
    hero {
      titulo
      subtitulo
      imagem {
        sourceUrl
      }
    }
  }
}
```

### 8.3 Quando usar REST vs GraphQL

| Situação | Use |
|---|---|
| Dados simples, 1 nível de profundidade | **REST** — menos setup |
| Dados aninhados (Projetos + `numeros[]`) | **GraphQL** — 1 request em vez de N |
| Opções globais (stats, footer, hero) | **REST** — `/acf/v3/options` é simples |
| Time pequeno sem experiência GraphQL | **REST** para tudo — mais simples |
| Performance crítica / dados complexos | **GraphQL** |
| Implementação inicial (MVP) | **REST** para tudo, migrar para GraphQL depois |

**Recomendação prática para IBCM:**
Iniciar com **REST para tudo** (menor complexidade de configuração). Migrar Projetos para GraphQL em uma segunda fase quando o time estiver confortável.

---

## 9. Camada de Serviço — Arquivos a Criar

### 9.1 `src/types/cms.ts`

```typescript
export interface WPProjeto {
  id: number;
  title: { rendered: string };
  acf: {
    tag: string;
    tag_color: string;
    gradient: string;
    descricao_curta: string;
    descricao_completa: string;
    imagem_principal: { url: string; alt: string } | null;
    numeros: Array<{ valor: string; label: string }>;
    ordem: number;
    ativo: boolean;
  };
}

export interface WPDepoimento {
  id: number;
  acf: {
    texto: string;
    nome: string;
    papel: string;
    cor: string;
    cor_light: string;
    ativo: boolean;
  };
}

export interface WPTimelineEvent {
  id: number;
  title: { rendered: string };
  acf: {
    ano: number;
    descricao: string;
    cor: string;
  };
}

export interface WPRelatorio {
  id: number;
  title: { rendered: string };
  acf: {
    ano: number;
    arquivo_pdf: { url: string } | null;
    tamanho: string;
    tipo: 'anual' | 'auditoria' | 'financeiro';
  };
}

export interface WPOpcoes {
  hero_titulo: string;
  hero_subtitulo: string;
  hero_imagem: { url: string } | null;
  stats: Array<{ numero: string; label: string }>;
  valores_doacao: Array<{
    valor: number;
    impactos: Array<{ texto: string }>;
  }>;
  endereco: string;
  email: string;
  telefone: string;
  cnpj: string;
  instagram_url: string;
  facebook_url: string;
  linkedin_url: string;
  missao: string;
  visao: string;
  valores: string;
  texto_intro: string;
  certificacoes: Array<{
    nome: string;
    descricao: string;
    ano: number;
    cor: string;
  }>;
}
```

### 9.2 `src/services/wordpress.ts`

```typescript
const BASE_URL = import.meta.env.VITE_WP_API_URL;

export async function wpFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${path}`);
  }

  return res.json() as Promise<T>;
}
```

### 9.3 `src/services/projetos.ts`

```typescript
import { wpFetch } from './wordpress';
import type { WPProjeto } from '../types/cms';

export async function fetchProjetos(): Promise<WPProjeto[]> {
  return wpFetch<WPProjeto[]>(
    '/wp-json/wp/v2/projeto?per_page=20&orderby=meta_value_num&meta_key=ordem&order=asc'
  );
}
```

### 9.4 `src/services/opcoes.ts`

```typescript
import { wpFetch } from './wordpress';
import type { WPOpcoes } from '../types/cms';

interface ACFOptionsResponse {
  acf: WPOpcoes;
}

export async function fetchOpcoes(): Promise<WPOpcoes> {
  const { acf } = await wpFetch<ACFOptionsResponse>('/wp-json/acf/v3/options/options');
  return acf;
}
```

### 9.5 `src/hooks/useProjetos.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchProjetos } from '../services/projetos';

export function useProjetos() {
  return useQuery({
    queryKey: ['projetos'],
    queryFn: fetchProjetos,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
```

### 9.6 `src/hooks/useOpcoes.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchOpcoes } from '../services/opcoes';

export function useOpcoes() {
  return useQuery({
    queryKey: ['opcoes'],
    queryFn: fetchOpcoes,
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}
```

### 9.7 Setup do React Query em `src/main.tsx`

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Envolver <App /> com <QueryClientProvider client={queryClient}>
```

---

## 10. Componentes Afetados

### Mapeamento Completo

| Componente/Página | Dados do WP | Hook | Loading State |
|---|---|---|---|
| `ImpactBar.tsx` | `opcoes.stats[]` | `useOpcoes` | Skeleton 4 cols |
| `Hero.tsx` | `opcoes.hero_*` | `useOpcoes` | Manter conteúdo estático como fallback |
| `QuemSomosHome.tsx` | `opcoes.texto_intro` | `useOpcoes` | Text placeholder |
| `QuemSomosPage.tsx` | Timeline + missao/visao/valores | `useTimeline` + `useOpcoes` | Skeleton timeline |
| `ProjetosHome.tsx` | `projetos[]` (4 primeiros) | `useProjetos` | 4 skeleton cards |
| `ProjetosPage.tsx` | `projetos[]` (todos) | `useProjetos` | Skeleton list |
| `Depoimentos.tsx` | `depoimentos[]` | `useDepoimentos` | 2 skeleton cards |
| `DoeAgora.tsx` | `opcoes.valores_doacao[]` | `useOpcoes` | Manter preset estático como fallback |
| `Footer.tsx` | `opcoes.endereco/email/telefone` | `useOpcoes` | Manter texto estático como fallback |
| `TransparenciaPage.tsx` | Certificações + `relatorios[]` | `useOpcoes` + `useRelatorios` | Skeleton list |

### Padrão de Migração por Componente

Cada componente segue o mesmo padrão:

```tsx
// ANTES (hardcoded)
const stats = [
  { number: '+38', label: 'Anos de atuação' },
  // ...
];

// DEPOIS (CMS-driven)
import { useOpcoes } from '../../hooks/useOpcoes';

export function ImpactBar() {
  const { data: opcoes, isLoading, isError } = useOpcoes();

  if (isLoading) return <ImpactBarSkeleton />;
  if (isError || !opcoes) return null; // fallback silencioso

  const stats = opcoes.stats;
  // ... restante do JSX sem mudança
}
```

---

## 11. Roadmap de Implementação

### Fase 1 — WordPress Base (Semana 1)

- [ ] Instalar WordPress localmente (Docker)
- [ ] Instalar e configurar plugins (ACF, ACF to REST API)
- [ ] Registrar CPTs (`projeto`, `depoimento`, `timeline_event`, `relatorio`)
- [ ] Criar campos ACF via UI ou JSON export
- [ ] Criar ACF Options Page
- [ ] Configurar CORS no WP
- [ ] Inserir conteúdo inicial (migrar dados hardcoded para WP Admin)

### Fase 2 — Camada de Dados React (Semana 2)

- [ ] Instalar `@tanstack/react-query`
- [ ] Criar `.env.local` e `.env.example`
- [ ] Criar `src/types/cms.ts`
- [ ] Criar `src/services/` (wordpress.ts, projetos.ts, depoimentos.ts, timeline.ts, opcoes.ts, relatorios.ts)
- [ ] Criar `src/hooks/` (useProjetos, useDepoimentos, useTimeline, useOpcoes, useRelatorios)
- [ ] Configurar `QueryClientProvider` em `main.tsx`
- [ ] Testar todos os fetches com `console.log`

### Fase 3 — Migração dos Componentes (Semana 3)

- [ ] `ImpactBar.tsx` → `useOpcoes().stats`
- [ ] `ProjetosHome.tsx` → `useProjetos()`
- [ ] `ProjetosPage.tsx` → `useProjetos()`
- [ ] `Depoimentos.tsx` → `useDepoimentos()`
- [ ] `QuemSomosPage.tsx` → `useTimeline()` + `useOpcoes()`
- [ ] `QuemSomosHome.tsx` → `useOpcoes().texto_intro`
- [ ] `TransparenciaPage.tsx` → `useOpcoes().certificacoes` + `useRelatorios()`
- [ ] `Footer.tsx` → `useOpcoes().(endereco, email, ...)`
- [ ] `DoeAgora.tsx` → `useOpcoes().valores_doacao`
- [ ] `Hero.tsx` → `useOpcoes().hero_*`
- [ ] Adicionar loading skeletons em cada componente

### Fase 4 — Deploy e Segurança (Semana 4)

- [ ] Provisionar servidor WordPress em produção (ex: Hostinger)
- [ ] Configurar subdomínio `cms.ibcm.org.br` + SSL
- [ ] Configurar CORS em produção (whitelist `ibcm.org.br`)
- [ ] Bloquear escrita na REST API para não autenticados
- [ ] Instalar Wordfence + WP 2FA no Admin
- [ ] Configurar variável de ambiente `VITE_WP_API_URL` no Vercel/Netlify
- [ ] Testar build de produção end-to-end
- [ ] Configurar backup automático do banco WordPress

### Fase 5 — GraphQL (Opcional, Semana 5+)

- [ ] Instalar WPGraphQL + WPGraphQL for ACF
- [ ] Instalar `graphql-request` no React
- [ ] Migrar `fetchProjetos` para GraphQL (resolver problema de numeros[])
- [ ] Testar performance vs REST

---

## 12. Dependências a Instalar no Frontend

```bash
npm install @tanstack/react-query

# Opcional, apenas se usar GraphQL:
npm install graphql-request graphql
```

**Atualização do `package.json`:**

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.x",
    "graphql-request": "^6.x"  // opcional
  }
}
```

---

## 13. Verificação e Testes

### Checklist de validação local

```bash
# 1. WordPress rodando
docker compose up -d
# → http://localhost:8080/wp-admin ✓

# 2. Endpoints respondem
curl http://localhost:8080/wp-json/wp/v2/projeto | jq '.[0].acf'
curl http://localhost:8080/wp-json/acf/v3/options/options | jq '.acf.stats'

# 3. CORS correto (sem erro no browser)
# → Abrir DevTools → Network → verificar headers da response

# 4. Frontend carrega dados do WP
npm run dev
# → http://localhost:5173 com dados reais ✓

# 5. Editar no WP Admin → refresh no browser → mudança refletida ✓

# 6. Build sem erros de tipo
npm run build
```

### Cenários de erro a testar

| Cenário | Comportamento esperado |
|---|---|
| WP offline | Componentes exibem fallback silencioso ou skeleton |
| Campo ACF vazio | Componente renderiza sem crash (valores `?? ''`) |
| Imagem inválida | `ImageWithFallback` exibe placeholder Unsplash |
| Network lento | Loading state visível por tempo > 200ms |
