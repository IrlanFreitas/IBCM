import { Link } from 'react-router'
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { useOpcoes } from '../../hooks/useOpcoes'

const colunas = [
  {
    titulo: 'Institucional',
    links: [
      { label: 'Quem somos', to: '/quem-somos' },
      { label: 'Nossa história', to: '/quem-somos' },
      { label: 'Missão e valores', to: '/quem-somos' },
      { label: 'Equipe', to: '/quem-somos' },
    ],
  },
  {
    titulo: 'Projetos',
    links: [
      { label: 'HIV/AIDS — Prevenção', to: '/projetos' },
      { label: 'Creche IBCM', to: '/projetos' },
      { label: 'CPDD — Casarão', to: '/projetos' },
      { label: 'Adolescente Aprendiz', to: '/projetos' },
    ],
  },
  {
    titulo: 'Transparência',
    links: [
      { label: 'Relatórios anuais', to: '/transparencia' },
      { label: 'Prestação de contas', to: '/transparencia' },
      { label: 'Certificações', to: '/transparencia' },
      { label: 'Auditoria', to: '/transparencia' },
    ],
  },
]

export function Footer() {
  const { data: opcoes } = useOpcoes()

  const endereco = opcoes?.endereco || 'Salvador, Bahia'
  const email = opcoes?.email || 'contato@ibcm.org.br'
  const telefone = opcoes?.telefone || '(71) 3000-0000'
  const cnpj = opcoes?.cnpj || '00.000.000/0001-00'
  const instagramUrl = opcoes?.instagram_url || '#'
  const facebookUrl = opcoes?.facebook_url || '#'
  const linkedinUrl = opcoes?.linkedin_url || '#'

  const redesSociais = [
    { Icon: Instagram, label: 'Instagram', href: instagramUrl },
    { Icon: Facebook, label: 'Facebook', href: facebookUrl },
    { Icon: Linkedin, label: 'LinkedIn', href: linkedinUrl },
  ]

  const contatos = [
    { Icon: MapPin, text: endereco },
    { Icon: Mail, text: email },
    { Icon: Phone, text: telefone },
  ]

  return (
    <footer style={{ background: 'var(--ink)', padding: 'clamp(48px, 7vw, 80px) clamp(16px, 5vw, 60px) 0' }}>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Logo + contato */}
        <div className="flex flex-col gap-6" style={{ minWidth: '220px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: 'var(--font-garamond)',
                fontSize: '26px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: 'var(--white)',
              }}
            >
              IBCM
            </span>
          </Link>

          <p
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '13px',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '220px',
            }}
          >
            Instituto Beneficente Conceição Macedo — 38 anos de cuidado e resistência em Salvador.
          </p>

          {/* Redes sociais */}
          <div className="flex items-center gap-4">
            {redesSociais.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'background 200ms, color 200ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--terra)'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
          {colunas.map((col) => (
            <div key={col.titulo} className="flex flex-col gap-3">
              <span
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  marginBottom: '4px',
                }}
              >
                {col.titulo}
              </span>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    transition: 'color 200ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Contato */}
        <div className="flex flex-col gap-4" style={{ minWidth: '200px' }}>
          <span
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            Contato
          </span>

          {contatos.map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <Icon size={14} color="var(--terra)" style={{ flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-jakarta)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé final */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ padding: '20px 0' }}
      >
        <span style={{ fontFamily: 'var(--font-jakarta)', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
          © {new Date().getFullYear()} IBCM — Instituto Beneficente Conceição Macedo · CNPJ {cnpj}
        </span>
        <span style={{ fontFamily: 'var(--font-jakarta)', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
          Feito com cuidado em Salvador, Bahia
        </span>
      </div>
    </footer>
  )
}
