import { motion } from 'motion/react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import styles from './PageBanner.module.css'

const ease = [0.22, 1, 0.36, 1] as const

interface PageBannerProps {
  eyebrow: string
  eyebrowColor?: string
  title: React.ReactNode
  lead: string
  ariaLabel?: string
  background?: string
  centered?: boolean
  titleColor?: string
  leadColor?: string
}

export function PageBanner({
  eyebrow,
  eyebrowColor = 'var(--ocre)',
  title,
  lead,
  ariaLabel,
  background,
  centered,
  titleColor,
  leadColor,
}: PageBannerProps) {
  return (
    <section
      className={styles.section}
      aria-label={ariaLabel}
      style={background ? { background } : undefined}
    >
      <div className={`${styles.container}${centered ? ` ${styles.containerCentered}` : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
        </motion.div>

        <motion.h1
          className={styles.title}
          style={titleColor ? { color: titleColor } : undefined}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.18 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className={styles.lead}
          style={leadColor ? { color: leadColor } : undefined}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.36 }}
        >
          {lead}
        </motion.p>
      </div>
    </section>
  )
}
