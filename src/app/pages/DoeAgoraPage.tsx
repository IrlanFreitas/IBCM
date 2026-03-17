import { motion } from 'motion/react'
import { Eyebrow } from '../components/Eyebrow'
import { DoeAgora } from '../components/DoeAgora'
import { ImpactBar } from '../components/ImpactBar'

const ease = [0.22, 1, 0.36, 1] as const

export function DoeAgoraPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'var(--ink)',
          padding: 'clamp(48px, 8vw, 96px) clamp(16px, 5vw, 60px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{ maxWidth: '600px' }}
        >
          <Eyebrow color="var(--ocre)">Doe agora</Eyebrow>
          <h1
            style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(36px, 8vw, 68px)',
              fontWeight: 500,
              lineHeight: 1.08,
              color: 'var(--white)',
              marginBottom: '20px',
            }}
          >
            Seu apoio salva{' '}
            <em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>vidas reais</em>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: 'clamp(14px, 2vw, 16px)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            Cada doação é destinada diretamente aos programas de saúde, educação e acolhimento.
            Publicamos relatórios mensais com transparência total sobre o uso dos recursos.
          </p>
        </motion.div>
      </section>

      <ImpactBar />
      <DoeAgora />
    </>
  )
}
