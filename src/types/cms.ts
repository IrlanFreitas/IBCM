export interface WPNoticia {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>
  }
}

export interface WPProjeto {
  id: number
  slug: string
  title: { rendered: string }
  acf: {
    tag: string
    tagcolor: string
    descricaocurta: string
    descricaocompleta: string
    impacto: string
    bullets: Array<{ texto: string }>
    imagemprincipal: { url: string; alt: string } | null
    numeros: string
    ativo: boolean
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>
  }
}

export interface WPDepoimento {
  id: number
  acf: {
    texto: string
    nome: string
    papel: string
    cor: string
    cor_light: string
    ativo: boolean
  }
}

export interface WPTimelineEvent {
  id: number
  title: { rendered: string }
  acf: {
    ano: number
    descricao: string
    cor: string
  }
}

export interface WPRelatorio {
  id: number
  title: { rendered: string }
  acf: {
    ano: number
    arquivo_pdf: { url: string } | null
    tamanho: string
    tipo: 'anual' | 'auditoria' | 'financeiro'
  }
}

export interface WPOpcoes {
  hero_titulo: string
  hero_subtitulo: string
  hero_imagem: { url: string } | null
  stats: Array<{
    icon: null
    numero: string
    label: string
  }>
  valores_doacao: Array<{
    valor: number
    impactos: Array<{ texto: string }>
  }>
  endereco: string
  email: string
  telefone: string
  cnpj: string
  instagram_url: string
  facebook_url: string
  linkedin_url: string
  missao: string
  visao: string
  valores: string
  texto_intro: string
  certificacoes: Array<{
    nome: string
    descricao: string
    ano: number
    cor: string
  }>
  fundadora_nome?: string
  fundadora_subtitulo?: string
  fundadora_bio?: string
  fundadora_imagem?: { url: string; alt: string } | null
  quem_somos_stats?: Array<{ numero: string; label: string }>
  galeria_quem_somos?: Array<{
    url: string
    alt: string
    legenda: string
    projeto: string
  }>
}
