import { motion } from 'motion/react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from './Eyebrow'

const ease = [0.22, 1, 0.36, 1] as const

export function QuemSomosHome() {
  return (
    <section style={{ background: 'var(--white)', padding: 'clamp(48px, 7vw, 104px) clamp(16px, 5vw, 60px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease }}
        style={{ maxWidth: '560px' }}
      >
        <Eyebrow>Quem somos</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--font-garamond)',
            fontSize: 'clamp(28px, 6vw, 52px)',
            fontWeight: 500,
            lineHeight: 1.15,
            color: 'var(--ink)',
            marginBottom: '20px',
          }}
        >
          Uma história de{' '}
          <em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>resistência</em> e cuidado
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: 'clamp(14px, 2vw, 16px)',
            lineHeight: 1.75,
            color: 'var(--ink-70)',
            marginBottom: '28px',
          }}
        >
          Em 1986, Maria Conceição Macedo fundou o IBCM com um propósito simples e urgente:
          acolher quem a sociedade rejeitava. Numa época em que o estigma do HIV/AIDS isolava
          famílias inteiras, o Instituto abriu as portas para oferecer dignidade, cuidado e voz
          a quem mais precisava.
        </p>

        <Link
          to="/quem-somos"
          className="flex items-center gap-2"
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--terra)',
            textDecoration: 'none',
            transition: 'gap 200ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.gap = '10px')}
          onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
        >
          Conheça nossa história completa
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  )
}
