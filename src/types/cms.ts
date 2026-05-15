export interface WPProjeto {
  id: number
  title: { rendered: string }
  acf: {
    tag: string
    tagcolor: string
    descricaocurta: string
    descricaocompleta: string
    imagemprincipal: { url: string; alt: string } | null
    numeros: string
    oferecido: string
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
  stats: Array<{ numero: string; label: string }>
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
  // Quem Somos — fundadora
  // TODO: adicionar estes campos no ACF Options do WordPress
  fundadora_nome?: string
  fundadora_subtitulo?: string
  fundadora_bio?: string
  fundadora_imagem?: { url: string; alt: string } | null
  // Quem Somos — stats específicos da página
  quem_somos_stats?: Array<{ numero: string; label: string }>
  // Quem Somos — galeria de fotos
  // TODO: pode vir de custom post type `galeria_quem_somos` ou de options
  galeria_quem_somos?: Array<{
    url: string
    alt: string
    legenda: string
    projeto: string
  }>
}

// TODO: criar custom post type `valor_ibcm` no WP com os campos abaixo
// endpoint: /wp-json/wp/v2/valor_ibcm?per_page=6&order=asc
export interface WPValorCard {
  id: number
  title: { rendered: string }
  acf: {
    descricao: string
    icone: string   // nome do ícone lucide-react
    cor: string     // ex: 'var(--terra)'
    cor_bg: string  // ex: 'var(--terra-light)'
  }
}
