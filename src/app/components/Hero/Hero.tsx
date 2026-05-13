import { motion } from 'motion/react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import styles from './Hero.module.css'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className={styles.section}>
      {/* Imagem de fundo */}
      <div className={styles.bg} />

      {/* Gradient overlay */}
      <div className={styles.overlay} />

      {/* Conteúdo */}
      <div className={styles.content}>
        {/* TODO: reativar badge "Desde 1986" após decisão de design
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className={styles.badge}
        >
          <Heart size={12} color="white" fill="white" />
          <span className={styles.badgeText}>Desde 1986</span>
        </motion.div> */}

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          <Eyebrow color="var(--ocre)">Desde 1986 Salvador, Bahia</Eyebrow>
        </motion.div>

        {/* Título */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          38 anos <br />
          cuidando de{' '}<br />
          <span className={styles.titleHighlight}>quem precisa</span>
        </motion.h1>

        {/* Lead */}
        <motion.p
          className={styles.lead}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.38 }}
        >
          Acolhimento, moradia, educação e defesa de direitos para pessoas que vivem com HIV/AIDS e grupos historicamente marginalizados.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.56 }}
        >
          <Link to="/doe-agora" className={styles.ctaPrimary}>
            Faça uma doação
          </Link>

          <Link to="/quem-somos" className={styles.ctaSecondary}>
            Conheça o IBCM
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
