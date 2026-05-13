import { Link } from 'react-router'
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { useOpcoes } from '../../../hooks/useOpcoes'
import styles from './Footer.module.css'

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
    <footer className={styles.footer}>
      {/* Top row */}
      <div className={styles.topRow}>
        {/* Logo + contato */}
        <div className={styles.brandCol}>
          <Link to="/" className={styles.brandLink}>
            <span className={styles.brandName}>IBCM</span>
          </Link>

          <p className={styles.brandTagline}>
            Instituto Beneficente Conceição Macedo — 38 anos de cuidado e resistência em Salvador.
          </p>

          {/* Redes sociais */}
          <div className={styles.socialRow}>
            {redesSociais.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links por seção */}
        <div className={styles.linksGrid}>
          {colunas.map((col) => (
            <div key={col.titulo} className={styles.linkCol}>
              <span className={styles.linkColTitle}>{col.titulo}</span>
              {col.links.map((link) => (
                <Link key={link.label} to={link.to} className={styles.linkColItem}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Contato */}
        <div className={styles.contactCol}>
          <span className={styles.contactColTitle}>Contato</span>
          {contatos.map(({ Icon, text }) => (
            <div key={text} className={styles.contactItem}>
              <Icon size={14} color="var(--terra)" style={{ flexShrink: 0 }} />
              <span className={styles.contactText}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé final */}
      <div className={styles.bottomRow}>
        <span className={styles.bottomText}>
          © {new Date().getFullYear()} IBCM — Instituto Beneficente Conceição Macedo · CNPJ {cnpj}
        </span>
        <span className={styles.bottomText}>
          Feito com cuidado em Salvador, Bahia
        </span>
      </div>
    </footer>
  )
}
