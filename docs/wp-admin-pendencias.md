# Pendências — Configuração WP Admin (Local by Flywheel)

> **Contexto:** O site está usando WordPress local via **Local app** (sem Docker).
> Acesse o WP Admin pelo endereço que o Local app exibir (ex: `http://ibcm-cms.local/wp-admin`).
> Após cada configuração, atualize `VITE_WP_API_URL` no arquivo `.env.local` com o domínio correto.

---

## 1. Plugins a Instalar

Acesse **WP Admin → Plugins → Adicionar Novo** e instale/ative:

| Plugin | Obrigatório | Como instalar |
|---|---|---|
| **Advanced Custom Fields (ACF)** | Sim | Buscar "Advanced Custom Fields" por Elliot Condon |
| **ACF to REST API** | Sim | Buscar "ACF to REST API" por airesvsg |
| **WPGraphQL** | Opcional (Fase 5) | Buscar "WPGraphQL" por WPGraphQL |
| **WPGraphQL for ACF** | Opcional (Fase 5) | Instalar após WPGraphQL |

> **Alternativa via WP-CLI** (pelo terminal do Local app):
> ```bash
> wp plugin install advanced-custom-fields acf-to-rest-api --activate
> ```

---

## 2. Custom Post Types (CPTs)

Adicionar o código abaixo no `functions.php` do tema ativo (ou criar um plugin customizado):

**Caminho no Local app:** `~/Local Sites/ibcm-cms/app/public/wp-content/themes/SEU-TEMA/functions.php`

```php
<?php
// ─── CPTs IBCM ──────────────────────────────────────────────────────────────

function ibcm_register_post_types() {

  // Projetos
  register_post_type('projeto', [
    'labels'              => ['name' => 'Projetos', 'singular_name' => 'Projeto'],
    'public'              => true,
    'show_in_rest'        => true,
    'supports'            => ['title', 'editor', 'thumbnail', 'custom-fields'],
    'menu_icon'           => 'dashicons-heart',
    'show_in_graphql'     => true,
    'graphql_single_name' => 'projeto',
    'graphql_plural_name' => 'projetos',
  ]);

  // Depoimentos
  register_post_type('depoimento', [
    'labels'              => ['name' => 'Depoimentos', 'singular_name' => 'Depoimento'],
    'public'              => true,
    'show_in_rest'        => true,
    'supports'            => ['title', 'editor', 'custom-fields'],
    'menu_icon'           => 'dashicons-format-quote',
    'show_in_graphql'     => true,
    'graphql_single_name' => 'depoimento',
    'graphql_plural_name' => 'depoimentos',
  ]);

  // Timeline
  register_post_type('timeline_event', [
    'labels'              => ['name' => 'Timeline', 'singular_name' => 'Evento'],
    'public'              => true,
    'show_in_rest'        => true,
    'supports'            => ['title', 'editor', 'custom-fields'],
    'menu_icon'           => 'dashicons-calendar',
    'show_in_graphql'     => true,
    'graphql_single_name' => 'timelineEvent',
    'graphql_plural_name' => 'timelineEvents',
  ]);

  // Relatórios
  register_post_type('relatorio', [
    'labels'              => ['name' => 'Relatórios', 'singular_name' => 'Relatório'],
    'public'              => true,
    'show_in_rest'        => true,
    'supports'            => ['title', 'custom-fields'],
    'menu_icon'           => 'dashicons-media-document',
    'show_in_graphql'     => true,
    'graphql_single_name' => 'relatorio',
    'graphql_plural_name' => 'relatorios',
  ]);
}
add_action('init', 'ibcm_register_post_types');
```

---

## 3. CORS (obrigatório para o React acessar a API)

Adicionar também no `functions.php`:

```php
// ─── CORS ────────────────────────────────────────────────────────────────────

function ibcm_add_cors_headers() {
  $allowed_origins = [
    'http://localhost:5173',   // Vite dev server
    'http://localhost:4173',   // Vite preview
    'https://ibcm.org.br',    // Produção (adicionar quando deployar)
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

---

## 4. Bloquear Escrita na REST API (segurança)

Adicionar no `functions.php`:

```php
// ─── Bloquear escrita REST para não autenticados ─────────────────────────────

function ibcm_restrict_rest_write( $result, $server, $request ) {
  if ( in_array( $request->get_method(), ['POST', 'PUT', 'PATCH', 'DELETE'] ) ) {
    if ( ! is_user_logged_in() ) {
      return new WP_Error(
        'rest_forbidden',
        'Escrita não permitida.',
        ['status' => 403]
      );
    }
  }
  return $result;
}
add_filter( 'rest_pre_dispatch', 'ibcm_restrict_rest_write', 10, 3 );
```

---

## 5. ACF Options Page (Configurações Globais)

Adicionar no `functions.php` após instalar o ACF:

```php
// ─── ACF Options Page ────────────────────────────────────────────────────────

add_action('acf/init', function () {
  if ( function_exists('acf_add_options_page') ) {
    acf_add_options_page([
      'page_title' => 'Configurações IBCM',
      'menu_title' => 'Config. IBCM',
      'menu_slug'  => 'ibcm-config',
      'capability' => 'manage_options',
      'position'   => 2,
    ]);
  }
});
```

---

## 6. Campos ACF a Criar

Acesse **WP Admin → Custom Fields → Adicionar Novo** para cada grupo abaixo.

### 6.1 Grupo: `Projeto Fields` → aplicar ao CPT `projeto`

| Nome do campo | Slug (key) | Tipo |
|---|---|---|
| Tag | `tag` | Texto |
| Cor da Tag | `tag_color` | Texto (ex: `#C1440E` ou `var(--terra)`) |
| Gradient | `gradient` | Texto (CSS gradient completo) |
| Badge | `badge` | Texto (opcional, ex: "88 crianças") |
| Descrição curta | `descricao_curta` | Área de texto |
| Descrição completa | `descricao_completa` | WYSIWYG |
| Imagem principal | `imagem_principal` | Imagem (retornar: Array de URL) |
| Números | `numeros` | Repeater |
| → Valor | `valor` | Texto |
| → Label | `label` | Texto |
| Ordem | `ordem` | Número |
| Ativo | `ativo` | Verdadeiro/Falso (padrão: true) |

### 6.2 Grupo: `Depoimento Fields` → aplicar ao CPT `depoimento`

| Nome do campo | Slug | Tipo |
|---|---|---|
| Texto | `texto` | Área de texto |
| Nome | `nome` | Texto (ex: "Maria S.") |
| Papel | `papel` | Texto (ex: "Beneficiária — há 12 anos") |
| Cor | `cor` | Texto (ex: `var(--terra)`) |
| Cor clara | `cor_light` | Texto (ex: `var(--terra-light)`) |
| Ativo | `ativo` | Verdadeiro/Falso |

### 6.3 Grupo: `Timeline Fields` → aplicar ao CPT `timeline_event`

| Nome do campo | Slug | Tipo |
|---|---|---|
| Ano | `ano` | Número |
| Descrição | `descricao` | Área de texto |
| Cor | `cor` | Texto (ex: `var(--terra)`) |

### 6.4 Grupo: `Relatório Fields` → aplicar ao CPT `relatorio`

| Nome do campo | Slug | Tipo |
|---|---|---|
| Ano | `ano` | Número |
| Arquivo PDF | `arquivo_pdf` | Arquivo (retornar: Array de URL) |
| Tamanho | `tamanho` | Texto (ex: "2.4 MB") |
| Tipo | `tipo` | Seleção: `anual`, `auditoria`, `financeiro` |

### 6.5 Grupo: `Config. IBCM` → aplicar à Options Page `ibcm-config`

**Subgrupo: Hero**

| Nome do campo | Slug | Tipo |
|---|---|---|
| Título do hero | `hero_titulo` | Texto |
| Subtítulo | `hero_subtitulo` | Texto |
| Imagem do hero | `hero_imagem` | Imagem (retornar: Array de URL) |

**Subgrupo: Stats (ImpactBar)**

| Nome do campo | Slug | Tipo |
|---|---|---|
| Estatísticas | `stats` | Repeater |
| → Número | `numero` | Texto (ex: "+38") |
| → Label | `label` | Texto (ex: "Anos de atuação") |

**Subgrupo: Tiers de Doação**

| Nome do campo | Slug | Tipo |
|---|---|---|
| Valores de doação | `valores_doacao` | Repeater |
| → Valor | `valor` | Número |
| → Impactos | `impactos` | Repeater |
| → → Texto | `texto` | Texto |

**Subgrupo: Contato / Footer**

| Nome do campo | Slug | Tipo |
|---|---|---|
| Endereço | `endereco` | Texto |
| Email | `email` | Email |
| Telefone | `telefone` | Texto |
| CNPJ | `cnpj` | Texto |
| Instagram URL | `instagram_url` | URL |
| Facebook URL | `facebook_url` | URL |
| LinkedIn URL | `linkedin_url` | URL |

**Subgrupo: Quem Somos**

| Nome do campo | Slug | Tipo |
|---|---|---|
| Missão | `missao` | Área de texto |
| Visão | `visao` | Área de texto |
| Valores | `valores` | Área de texto |
| Texto intro | `texto_intro` | WYSIWYG |

**Subgrupo: Certificações**

| Nome do campo | Slug | Tipo |
|---|---|---|
| Certificações | `certificacoes` | Repeater |
| → Nome | `nome` | Texto (ex: "OSCIP") |
| → Descrição | `descricao` | Texto |
| → Ano | `ano` | Número |
| → Cor | `cor` | Texto (ex: `var(--terra)`) |

---

## 7. Conteúdo Inicial a Migrar

Após criar os campos, inserir o conteúdo atual (que está hardcoded no React) no WP Admin:

### 7.1 Projetos (WP Admin → Projetos → Adicionar Novo)

| Título | Tag | Cor | Ordem |
|---|---|---|---|
| HIV/AIDS — Prevenção e acolhimento | Saúde | `#C1440E` | 1 |
| Creche IBCM | Educação | `#3A5C3B` | 2 |
| CPDD — Casarão da Diversidade | Diversidade | `#B87820` | 3 |
| Adolescente Aprendiz | Trabalho | `#1C1917` | 4 |

### 7.2 Depoimentos (WP Admin → Depoimentos → Adicionar Novo)

| Nome | Papel | Cor |
|---|---|---|
| Maria S. | Beneficiária — usuária há 12 anos | `var(--terra)` |
| Roberto A. | Voluntário — 5 anos de dedicação | `var(--musgo)` |

### 7.3 Timeline (WP Admin → Timeline → Adicionar Novo)

| Título | Ano | Cor |
|---|---|---|
| Fundação do IBCM | 1986 | `var(--terra)` |
| Primeira casa de apoio | 1988 | `var(--ocre)` |
| Programa Jovem Aprendiz | 1992 | `var(--musgo)` |
| Creche IBCM | 1995 | `var(--terra)` |
| CPDD — Casarão da Diversidade | 2003 | `var(--ocre)` |
| Ronda Noturna | 2010 | `var(--musgo)` |
| 38 anos de história | 2024 | `var(--terra)` |

### 7.4 Relatórios (WP Admin → Relatórios → Adicionar Novo)

| Título | Ano | Tipo | Tamanho |
|---|---|---|---|
| Relatório Anual 2023 | 2023 | anual | (fazer upload do PDF) |
| Relatório Anual 2022 | 2022 | anual | (fazer upload do PDF) |
| Relatório Anual 2021 | 2021 | anual | (fazer upload do PDF) |
| Relatório Anual 2020 | 2020 | anual | (fazer upload do PDF) |

### 7.5 Opções Globais (WP Admin → Config. IBCM)

Preencher os campos conforme os valores atuais do site:

- **Stats:** +38 / Anos de atuação · +15k / Jovens aprendizes · +2.4k / Crianças atendidas · 29 / Casas de apoio
- **Contato:** Salvador, Bahia · contato@ibcm.org.br · (71) 3000-0000 · CNPJ real
- **Missão/Visão/Valores:** textos da `QuemSomosPage.tsx` atual
- **Valores de doação:** R$30, R$50, R$100, R$200 com os itens de impacto listados em `DoeAgora.tsx`

---

## 8. Verificação

Depois de configurar tudo, testar os endpoints no browser ou com curl:

```bash
# Projetos
curl http://ibcm-cms.local/wp-json/wp/v2/projeto | jq '.[0].acf'

# Depoimentos
curl http://ibcm-cms.local/wp-json/wp/v2/depoimento | jq '.[0].acf'

# Timeline
curl http://ibcm-cms.local/wp-json/wp/v2/timeline_event | jq '.[0].acf'

# Relatórios
curl http://ibcm-cms.local/wp-json/wp/v2/relatorio | jq '.[0].acf'

# Opções globais
curl http://ibcm-cms.local/wp-json/acf/v3/options/options | jq '.acf.stats'
```

Se os endpoints responderem com os campos ACF, iniciar o React com:

```bash
npm run dev
```

Abrir `http://localhost:5173` — os dados do WP devem aparecer no lugar dos dados estáticos.

---

## 9. Domínio do Local app

Atualizar `.env.local` com o domínio exato do site criado no Local:

```bash
# .env.local
VITE_WP_API_URL=http://SEU-SITE.local
```

O domínio é configurável no Local app em **Site Domain** (Settings do site).
Por padrão costuma ser `nome-do-site.local`.
