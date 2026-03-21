export interface WPProjeto {
  id: number
  title: { rendered: string }
  acf: {
    tag: string
    tag_color: string
    gradient: string
    descricao_curta: string
    descricao_completa: string
    imagem_principal: { url: string; alt: string } | null
    numeros: Array<{ valor: string; label: string }>
    badge?: string
    ordem: number
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
}
