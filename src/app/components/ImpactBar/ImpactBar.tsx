import { motion } from 'motion/react'
import { useOpcoes } from '../../../hooks/useOpcoes'
import styles from './ImpactBar.module.css'

const ease = [0.22, 1, 0.36, 1] as const

const STATIC_STATS = [
  { numero: '+38', label: 'Anos de atuação' },
  { numero: '+15.000', label: 'Jovens empregados' },
  { numero: '+2.400', label: 'Crianças atendidas' },
  { numero: '29', label: 'Casas de apoio' },
]

export function ImpactBar() {
  const { data: opcoes } = useOpcoes()
  const stats = opcoes?.stats?.length ? opcoes.stats : STATIC_STATS

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            className={styles.statItem}
          >
            <span className={styles.statNumber}>{stat.numero}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
