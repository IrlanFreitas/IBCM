# Integração WordPress CMS — Documentação

**Tarefa:** Planejar e documentar a integração do WordPress como CMS headless no site IBCM
**Data:** 2026-03-20
**PRD completo:** [PRD.md](../PRD.md)

---

## Resumo Executivo

O site IBCM é atualmente 100% estático com todos os dados hardcoded em arquivos `.tsx`. Esta integração transforma o WordPress em CMS headless, permitindo que a equipe da ONG atualize conteúdo sem precisar de um desenvolvedor.

---

## Páginas e Componentes Afetados

| Componente | Dado migrado | Hook |
|---|---|---|
| `ImpactBar.tsx` | Stats de impacto (+38, +15k, etc.) | `useOpcoes` |
| `Hero.tsx` | Título, subtítulo, imagem de fundo | `useOpcoes` |
| `QuemSomosHome.tsx` | Texto institucional intro | `useOpcoes` |
| `QuemSomosPage.tsx` | Timeline (7 eventos) + Missão/Visão/Valores | `useTimeline` + `useOpcoes` |
| `ProjetosHome.tsx` | 4 cards de projetos | `useProjetos` |
| `ProjetosPage.tsx` | Projetos com stats aninhadas | `useProjetos` |
| `Depoimentos.tsx` | 2+ depoimentos | `useDepoimentos` |
| `DoeAgora.tsx` | Tiers de doação com impactos | `useOpcoes` |
| `TransparenciaPage.tsx` | Certificações + relatórios anuais (PDF) | `useOpcoes` + `useRelatorios` |
| `Footer.tsx` | Endereço, email, telefone, CNPJ, redes | `useOpcoes` |

---

## Configuração Necessária

### WordPress (CMS)
- **Plugins:** ACF + ACF to REST API (obrigatório) · WPGraphQL (opcional)
- **Custom Post Types:** `projeto`, `depoimento`, `timeline_event`, `relatorio`
- **ACF Options Page:** Hero, Stats, Doação, Contato, Certificações

### React App
- **Nova dependência:** `@tanstack/react-query`
- **Variável de ambiente:** `VITE_WP_API_URL=http://localhost:8080`
- **Novos diretórios:** `src/services/`, `src/hooks/`, `src/types/`

---

## Setup Local (passo a passo)

```bash
# 1. Subir WordPress com Docker
docker compose up -d
# → WP Admin: http://localhost:8080/wp-admin

# 2. Instalar plugins (WP-CLI ou pelo Admin)
wp plugin install advanced-custom-fields acf-to-rest-api --activate

# 3. Configurar CPTs e campos ACF (seguir PRD.md seção 3)

# 4. Criar .env.local no projeto React
echo "VITE_WP_API_URL=http://localhost:8080" > .env.local

# 5. Instalar dependência React
npm install @tanstack/react-query

# 6. Rodar projeto
npm run dev
```

---

## Deploy em Servidor

| Componente | Onde hospedar | Domínio sugerido |
|---|---|---|
| WordPress (CMS) | Hostinger / WP Engine | `cms.ibcm.org.br` |
| React (Frontend) | Vercel / Netlify | `ibcm.org.br` |

**Variável em produção (Vercel/Netlify):**
```
VITE_WP_API_URL=https://cms.ibcm.org.br
```

---

## Segurança

- CORS com whitelist explícita (nunca `*`)
- Bloquear métodos POST/PUT/DELETE na API pública
- `DISALLOW_FILE_EDIT` no `wp-config.php`
- Wordfence + WP 2FA no Admin
- Nenhuma credencial no código frontend
- Rate limiting via Nginx: 30 req/min por IP

---

## REST vs GraphQL — Decisão

| Dados | Abordagem | Por quê |
|---|---|---|
| Stats, timeline, depoimentos, relatórios, opções | **REST** | Simples, linear, sem relações |
| Projetos (com `numeros[]` aninhados) | **GraphQL** | Evita múltiplos requests para dados aninhados |

**Recomendação:** Iniciar com REST para tudo (Fase 1–3). Migrar projetos para GraphQL na Fase 5.

---

## Arquivos Novos a Criar

```
src/
  types/
    cms.ts                  ← Interfaces TypeScript para dados WP
  services/
    wordpress.ts            ← Cliente fetch base
    projetos.ts
    depoimentos.ts
    timeline.ts
    opcoes.ts
    relatorios.ts
  hooks/
    useProjetos.ts
    useDepoimentos.ts
    useTimeline.ts
    useOpcoes.ts
    useRelatorios.ts
.env.example                ← Template de variáveis de ambiente
docker-compose.yml          ← WP local (pasta ../ibcm-wp/)
```

---

## Roadmap

| Fase | Descrição | Duração |
|---|---|---|
| 1 | WordPress base + CPTs + ACF + dados iniciais | Semana 1 |
| 2 | Camada de dados React (services + hooks + types) | Semana 2 |
| 3 | Migração dos 10 componentes (hardcode → fetch) | Semana 3 |
| 4 | Deploy em produção + segurança + backup | Semana 4 |
| 5 | GraphQL para projetos (opcional) | Semana 5+ |

---

## Referências

- [PRD completo com código e exemplos](../PRD.md)
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [WPGraphQL](https://www.wpgraphql.com/)
- [TanStack Query v5](https://tanstack.com/query/latest)
- [WP REST API Handbook](https://developer.wordpress.org/rest-api/)
