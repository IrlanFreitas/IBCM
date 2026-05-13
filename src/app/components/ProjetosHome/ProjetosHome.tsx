import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback'
import styles from './ProjetosHome.module.css'

// TODO: descomentar e integrar quando WordPress estiver disponível
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { useProjetos } from '../../../hooks/useProjetos'
// import type { WPProjeto } from '../../../types/cms'

const ease = [0.22, 1, 0.36, 1] as const

const STATIC_PROJETOS = [
  {
    id: 1,
    titulo: 'HIV/AIDS — Prevenção e acolhimento',
    tag: 'Saúde',
    tagColor: 'var(--terra)',
    gradient: 'linear-gradient(90deg, var(--terra) 0%, var(--terra-mid) 100%)',
    descricao:
      'Atendimento integral às pessoas vivendo com HIV/AIDS: medicação, suporte emocional, orientação jurídica e casas de apoio.',
    badge: null as string | null,
    image:
      'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    titulo: 'Creche IBCM',
    tag: 'Educação',
    tagColor: 'var(--musgo)',
    gradient: 'linear-gradient(90deg, var(--musgo) 0%, var(--musgo-light) 100%)',
    descricao:
      'Educação infantil de qualidade para crianças em situação de vulnerabilidade, com cuidado integral e estímulo ao desenvolvimento.',
    badge: '88 crianças · turno integral' as string | null,
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    titulo: 'CPDD — Casarão da Diversidade',
    tag: 'Diversidade',
    tagColor: 'var(--ocre)',
    gradient: 'linear-gradient(90deg, var(--ocre) 0%, var(--ocre-light) 100%)',
    descricao:
      'Centro de referência LGBTQIA+ que oferece suporte jurídico, psicológico, cultural e de geração de renda.',
    badge: null as string | null,
    image:
      'https://images.unsplash.com/photo-1573152143286-0c422b4d2175?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    titulo: 'Adolescente Aprendiz',
    tag: 'Trabalho',
    tagColor: 'var(--ink)',
    gradient: 'linear-gradient(90deg, var(--ink) 0%, var(--ink-40) 100%)',
    descricao:
      'Programa de formação profissional e inserção no mercado de trabalho para jovens de 14 a 22 anos em vulnerabilidade social.',
    badge: '+15.000 formados' as string | null,
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80',
  },
]

type CardData = (typeof STATIC_PROJETOS)[0]

// TODO: descomentar quando integração com WordPress estiver disponível
// function wpToCard(wp: WPProjeto): CardData {
//   const media = wp._embedded?.['wp:featuredmedia']?.[0]
//   const imagemUrl = wp.acf.imagemprincipal?.url ?? media?.source_url ?? ''
//   return {
//     id: wp.id,
//     titulo: wp.title.rendered,
//     tag: wp.acf.tag,
//     tagColor: wp.acf.tagcolor,
//     descricao: wp.acf.descricaocurta,
//     image: imagemUrl,
//   }
// }

function ProjetoCard({ projeto, index }: { projeto: CardData; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.card}
      style={{
        background: 'var(--white)',
        border: '1px solid var(--ink-10)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 16px 40px rgba(28, 25, 23, 0.10)'
          : '0 1px 4px rgba(28,25,23,0.04)',
        transition: 'transform 300ms ease, box-shadow 300ms ease',
        cursor: 'pointer',
      }}
    >
      {/* Imagem 16:9 */}
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
        <ImageWithFallback
          src={projeto.image}
          alt={projeto.titulo}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 500ms ease',
          }}
        />
      </div>

      {/* Faixa colorida */}
      <div style={{ height: '3px', background: projeto.gradient, flexShrink: 0 }} />

      {/* Conteúdo */}
      <div className={styles.cardContent}>
        <div className={styles.cardTagRow}>
          <span className={styles.cardTag} style={{ color: projeto.tagColor }}>
            {projeto.tag}
          </span>
          {projeto.badge && (
            <span className={styles.cardBadge}>{projeto.badge}</span>
          )}
        </div>

        <h3 className={styles.cardTitle}>{projeto.titulo}</h3>

        <p className={styles.cardDesc}>{projeto.descricao}</p>
      </div>
    </motion.div>
  )
}

export function ProjetosHome() {
  // TODO: descomentar quando integração com WordPress estiver disponível
  // const { data: wpProjetos } = useProjetos()
  // const projetos = wpProjetos?.filter((p) => p.acf.ativo).slice(0, 4).map(wpToCard) ?? STATIC_PROJETOS
  const projetos = STATIC_PROJETOS

  return (
    <section className={styles.section}>
      {/* Cabeçalho */}
      <div className={styles.header}>
        <div>
          <Eyebrow>Projetos e causas</Eyebrow>
          <h2 className={styles.title}>
            O que fazemos{' '}
            <span className={styles.titleHighlight}>na prática</span>
          </h2>
          <p className={styles.subtitle}>
            Projetos que combinam cuidado imediato com transformação de longo
            prazo — todos integrados em um mesmo ecossistema de suporte.
          </p>
        </div>
      </div>

      {/* Grid de cards */}
      <div className={styles.grid}>
        {projetos.map((projeto, i) => (
          <ProjetoCard key={projeto.id} projeto={projeto} index={i} />
        ))}
      </div>

      {/* Link ver todos */}
      <Link to="/projetos" className={styles.viewAllLink}>
        Ver todos os projetos
        <ArrowRight size={16} />
      </Link>
    </section>
  )
}
