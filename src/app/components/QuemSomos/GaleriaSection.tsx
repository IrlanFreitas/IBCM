import { motion } from 'motion/react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback'
import styles from './GaleriaSection.module.css'

// TODO: quando WP estiver pronto, buscar de `opcoes?.galeria_quem_somos`
// ou de custom post type — ver types/cms.ts WPOpcoes.galeria_quem_somos

const ease = [0.22, 1, 0.36, 1] as const

const STATIC_GALERIA = [
  {
    src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&auto=format&fit=crop&q=70',
    alt: 'Atendimento de saúde em uma das casas de apoio do IBCM',
    projeto: 'HIV/AIDS',
    tagline: 'Prevenção e acolhimento desde 1986',
    tagLabel: 'Saúde',
    tagBg: 'var(--terra)',
  },
  {
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&auto=format&fit=crop&q=70',
    alt: 'Crianças em atividade na Creche IBCM',
    projeto: 'Creche IBCM',
    tagline: '86 crianças em turno integral',
    tagLabel: 'Educação',
    tagBg: 'var(--musgo)',
  },
  {
    src: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=700&auto=format&fit=crop&q=70',
    alt: 'Evento cultural no Casarão da Diversidade',
    projeto: 'CPDD',
    tagline: 'Casarão da Diversidade',
    tagLabel: 'Diversidade',
    tagBg: 'var(--ocre)',
  },
  {
    src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&auto=format&fit=crop&q=70',
    alt: 'Jovem aprendiz em formação profissional',
    projeto: 'Casas de Apoio',
    tagline: '29 casas ativas em Salvador',
    tagLabel: 'Trabalho',
    tagBg: 'var(--ink)',
  },
]

export function GaleriaSection() {
  const fotos = STATIC_GALERIA
  // TODO: const { data: opcoes } = useOpcoes()
  // const fotos = opcoes?.galeria_quem_somos ?? STATIC_GALERIA

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow color="var(--musgo)">Nossas instalações</Eyebrow>
          <h2 className={styles.title}>Onde o cuidado acontece</h2>
        </motion.header>

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease, delay: 0.18 }}
        >
          {[fotos.slice(0, 2), fotos.slice(2, 4)].map((row, rowIdx) => (
            <div key={rowIdx} className={styles.row}>
              {row.map((foto) => (
                <div key={foto.projeto} className={styles.cell}>
                  <ImageWithFallback
                    src={foto.src}
                    alt={foto.alt}
                    className={styles.img}
                  />
                  <div className={styles.overlay} aria-hidden="true" />
                  <div className={styles.label}>
                    <span className={styles.labelProjeto}>{foto.projeto}</span>
                    <span className={styles.labelSep}>·</span>
                    <span className={styles.labelTagline}>{foto.tagline}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
