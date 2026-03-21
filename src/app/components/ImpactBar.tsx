import { motion } from 'motion/react'
import { useOpcoes } from '../../hooks/useOpcoes'

const ease = [0.22, 1, 0.36, 1] as const

const STATIC_STATS = [
  { numero: '+38', label: 'Anos de atuação' },
  { numero: '+15k', label: 'Jovens aprendizes' },
  { numero: '+2.4k', label: 'Crianças atendidas' },
  { numero: '29', label: 'Casas de apoio' },
]

export function ImpactBar() {
  const { data: opcoes } = useOpcoes()
  const stats = opcoes?.stats?.length ? opcoes.stats : STATIC_STATS

  return (
    <section style={{ background: 'var(--musgo)' }}>
      <div
        className="grid grid-cols-2 lg:grid-cols-4"
        style={{ padding: 'clamp(32px, 5vw, 52px) clamp(16px, 5vw, 60px)' }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            className="flex flex-col items-center text-center gap-2 py-6 sm:py-8"
            style={{
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-garamond)',
                fontSize: 'clamp(36px, 5vw, 52px)',
                fontWeight: 500,
                color: 'var(--white)',
                lineHeight: 1,
              }}
            >
              {stat.numero}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: 'clamp(9px, 1.2vw, 11px)',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
