import { motion } from 'motion/react'
import { useOpcoes } from '../../hooks/useOpcoes'
import { BannerQuemSomos } from '../components/QuemSomos/BannerQuemSomos'
import { FundadoraSection } from '../components/QuemSomos/FundadoraSection'
import { TimelineSection } from '../components/QuemSomos/TimelineSection'
import { GaleriaSection } from '../components/QuemSomos/GaleriaSection'
import { ValoresSection } from '../components/QuemSomos/ValoresSection'

// WP: useOpcoes() já busca os stats de /wp-json/acf/v3/options/options
// Quando quem_somos_stats estiver configurado no ACF, ele virá automaticamente

const ease = [0.22, 1, 0.36, 1] as const

const STATIC_STATS = [
  { numero: '+38', label: 'Anos de atuação' },
  { numero: '+15k', label: 'Jovens empregados' },
  { numero: '+2.4k', label: 'Crianças atendidas' },
  { numero: '29', label: 'Casas de apoio' },
]

export function QuemSomosPage() {
  const { data: opcoes } = useOpcoes()
  // TODO: quando campo `quem_somos_stats` for criado no ACF, substituir:
  // const stats = opcoes?.quem_somos_stats ?? STATIC_STATS
  const stats = opcoes?.stats?.length ? opcoes.stats : STATIC_STATS

  return (
    <main>
      <BannerQuemSomos />
      {/* <HeroQuemSomos /> */}
      <FundadoraSection />
      <TimelineSection />
      <GaleriaSection />

      {/* Barra de impacto */}
      <section
        aria-label="Números de impacto"
        style={{
          background: 'var(--musgo)',
          padding: 'clamp(40px, 6vw, 64px) clamp(16px, 5vw, 60px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: 'clamp(24px, 4vw, 48px)',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                minWidth: '100px',
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
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.55)',
                  textAlign: 'center',
                }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <ValoresSection />
    </main>
  )
}
