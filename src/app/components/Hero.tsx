import { motion } from 'motion/react'
import { Link } from 'react-router'
import { ArrowRight, Heart } from 'lucide-react'
import { Eyebrow } from './Eyebrow'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        height: 'clamp(600px, 75svh, 800px)',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Imagem de fundo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'url(https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(35%)',
          opacity: 0.35,
          zIndex: 0,
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(165deg, rgba(28,25,23,0.5) 0%, rgba(28,25,23,0.9) 55%, rgba(193,68,14,0.18) 100%)',
          zIndex: 1,
        }}
      />

      {/* Conteúdo */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          padding: 'clamp(32px, 5vw, 80px) clamp(16px, 5vw, 60px)',
          paddingBottom: 'clamp(40px, 6vw, 88px)',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            marginBottom: '20px',
          }}
        >
          <Heart size={12} color="white" fill="white" />
          <span
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            Desde 1986
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          <Eyebrow color="var(--ocre)">Salvador, Bahia</Eyebrow>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-garamond)',
            fontSize: 'clamp(40px, 11vw, 82px)',
            fontWeight: 500,
            lineHeight: 1.05,
            color: 'var(--white)',
            maxWidth: '720px',
            marginBottom: '20px',
          }}
        >
          38 anos cuidando de{' '}
          <em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>quem precisa</em>
        </motion.h1>

        {/* Lead */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.38 }}
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: 'clamp(14px, 2vw, 17px)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.72)',
            maxWidth: '520px',
            marginBottom: '32px',
          }}
        >
          O IBCM oferece acolhimento, saúde, educação e defesa de direitos para pessoas
          que vivem com HIV/AIDS e comunidades historicamente marginalizadas em Salvador.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.56 }}
          className="flex flex-col sm:flex-row gap-3"
          style={{ maxWidth: '420px' }}
        >
          <Link
            to="/doe-agora"
            className="flex items-center justify-center gap-2"
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--white)',
              background: 'var(--terra)',
              borderRadius: 'var(--radius-full)',
              padding: '14px 28px',
              textDecoration: 'none',
              transition: 'background 200ms',
              flex: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--terra-dark)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--terra)')}
          >
            <Heart size={16} />
            Doe agora
          </Link>

          <Link
            to="/quem-somos"
            className="flex items-center justify-center gap-2"
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--white)',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 'var(--radius-full)',
              padding: '14px 28px',
              textDecoration: 'none',
              transition: 'background 200ms',
              flex: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
          >
            Nossa história
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
