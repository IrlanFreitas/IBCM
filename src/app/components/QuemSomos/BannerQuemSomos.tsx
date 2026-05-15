import { motion } from 'motion/react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import styles from './BannerQuemSomos.module.css'

const ease = [0.22, 1, 0.36, 1] as const

export function BannerQuemSomos() {
  return (
    <section className={styles.section} aria-label="Título da página Quem Somos">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Eyebrow color="var(--ocre)">Quem somos</Eyebrow>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.18 }}
        >
          Uma história de{' '}
          <em className={styles.titleAccent}>resistência</em>,{' '}
          dignidade e cuidado
        </motion.h1>

        <motion.p
          className={styles.lead}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.36 }}
        >
          Desde 1986, a IBCM existe para uma missão simples e revolucionária:
          não abandonar quem mais precisa. Fundada por Maria Conceição Macedo
          em plena crise de HIV/AIDS, hoje somos referência nacional em direitos
          humanos, saúde, educação e inclusão social.
        </motion.p>
      </div>
    </section>
  )
}
