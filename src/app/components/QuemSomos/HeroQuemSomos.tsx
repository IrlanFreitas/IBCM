import { motion } from 'motion/react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback'
import styles from './HeroQuemSomos.module.css'

// TODO: quando WP estiver pronto, receber `opcoes` como prop ou usar useOpcoes()
// Os campos `fundadora_imagem` e `hero_titulo` / `hero_subtitulo` virão de lá

const ease = [0.22, 1, 0.36, 1] as const

export function HeroQuemSomos() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow color="var(--terra)">Quem somos</Eyebrow>
          <h1 className={styles.title}>
            Uma história de{' '}
            <em className={styles.titleAccent}>resistência</em>,{' '}
            dignidade e cuidado
          </h1>
          <p className={styles.lead}>
            Fundado em 1986 por Maria Conceição Macedo dos Santos, o IBCM
            nasceu da urgência de cuidar de quem o sistema ignorava. Hoje somos
            referência em saúde, educação e defesa de direitos para populações
            historicamente marginalizadas em Salvador, Bahia.
          </p>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.18 }}
        >
          <div className={styles.decorDot} />
          <div className={styles.imageFrame}>
            {/* TODO: substituir por `opcoes?.fundadora_imagem?.url` quando WP estiver configurado */}
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=70"
              alt="Maria Conceição Macedo dos Santos, fundadora do IBCM"
              className={styles.image}
            />
          </div>
          <div className={styles.imageBadge}>
            <span className={styles.badgeYear}>1986</span>
            <span className={styles.badgeLabel}>Anos cuidando de quem precisa</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
