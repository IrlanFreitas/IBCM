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
    tag_color?: string
    tagcolor?: string
    descricao_curta?: string
    descricaocurta?: string
    descricao_completa?: string
    descricaocompleta?: string
    impacto: string
    bullets: string
    imagemprincipal: { url: string; alt: string } | null
    numeros: string
    ativo: boolean
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>
  }
}

// Mesmo shape que WPProjeto — custom post type separado no WordPress (causa)
export interface WPCausa {
  id: number
  slug: string
  title: { rendered: string }
  acf: {
    tag: string
    tagcolor: string
    descricaocurta: string
    descricaocompleta: string
    impacto: string
    bullets: string
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

export interface WPHeroSlide {
  tipo: 'imagem' | 'youtube' | 'video'
  imagem: { url: string; alt: string } | null
  youtube_id: string
  video_url: string
  link: string
  link_label: string
  ativo: boolean
}

export interface WPMediaAttachment {
  id: number
  source_url: string
  alt_text: string
}

// CPT "campanha" — slides gerenciados via WP Admin → Campanhas (Hero)
export interface WPCampanha {
  id: number
  title: { rendered: string }
  menu_order: number
  acf: {
    tipo: 'imagem' | 'youtube' | 'video'
    imagem: { url: string; alt: string } | null
    youtube_id: string
    video_url: string
    link: string
    link_label: string
    ativo: boolean
  }
}

// Shape bruto do WP antes de resolver IDs de mídia
export interface RawWPCampanha extends Omit<WPCampanha, 'acf'> {
  acf: {
    tipo: 'imagem' | 'youtube' | 'video'
    imagem: number | { url: string; alt: string } | null | false
    youtube_id: string
    video_url: number | string | null | false
    link: string
    link_label: string
    ativo: boolean
  }
}

export interface WPOpcoes {
  hero_titulo: string
  hero_subtitulo: string
  hero_imagem: { url: string } | null
  hero_slides?: WPHeroSlide[]
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

// CPT "quem_somos_midia" — endpoint: GET /wp-json/wp/v2/quem_somos_midia?status=publish&per_page=1
// O frontend usa apenas o primeiro item publicado.
export interface WPQuemSomosMidia {
  id: number
  title: { rendered: string }
  acf: {
    tipo: 'imagem' | 'youtube' | 'video'
    imagem: { url: string; alt: string } | null
    youtube_id: string
    video_url: string
    poster: { url: string; alt: string } | null
  }
}

export interface RawWPQuemSomosMidia extends Omit<WPQuemSomosMidia, 'acf'> {
  acf: {
    tipo: 'imagem' | 'youtube' | 'video'
    imagem: number | { url: string; alt: string } | null | false
    youtube_id: string
    video_url: number | string | null | false
    poster: number | { url: string; alt: string } | null | false
  }
}
