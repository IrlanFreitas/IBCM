import { useParams, Link, useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { ImageWithFallback } from '../components/ImageWithFallback/ImageWithFallback'
import { NOTICIAS } from '../data/noticias'

const ease = [0.22, 1, 0.36, 1] as const

export function NoticiaDetalhePage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const noticia = NOTICIAS.find((n) => n.slug === slug)

  if (!noticia) {
    return (
      <section
        style={{
          background: 'var(--creme)',
          padding: 'clamp(48px, 8vw, 96px) clamp(16px, 5vw, 60px)',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-garamond)',
            fontSize: 'clamp(24px, 4vw, 36px)',
            color: 'var(--ink)',
          }}
        >
          Notícia não encontrada.
        </p>
        <Link
          to="/noticias"
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--terra)',
            textDecoration: 'none',
          }}
        >
          ← Voltar para Notícias
        </Link>
      </section>
    )
  }

  return (
    <section
      style={{
        background: 'var(--creme)',
        padding: '0 0 clamp(48px, 7vw, 96px)',
      }}
    >
      {/* Barra de breadcrumb + voltar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(16px, 3vw, 24px) clamp(16px, 5vw, 60px)',
          borderBottom: '1px solid var(--ink-10)',
          background: 'var(--creme)',
        }}
      >
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <Link
                to="/"
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'var(--ink-40)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-40)')}
              >
                IBCM
              </Link>
            </li>
            <li style={{ color: 'var(--ink-40)', fontSize: '10px' }}>›</li>
            <li>
              <Link
                to="/noticias"
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'var(--ink-40)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-40)')}
              >
                Notícias
              </Link>
            </li>
            <li style={{ color: 'var(--ink-40)', fontSize: '10px' }}>›</li>
            <li
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--ink-40)',
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Detalhe Notícia
            </li>
          </ol>
        </nav>

        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-jakarta)',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--terra)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
            transition: 'color 300ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--terra-dark)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--terra)')}
          aria-label="Voltar"
        >
          <ArrowLeft size={15} />
          Voltar
        </button>
      </div>

      {/* Conteúdo principal */}
      <div
        style={{
          maxWidth: '840px',
          padding: 'clamp(32px, 5vw, 56px) clamp(16px, 5vw, 60px) 0',
        }}
      >
        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{
            fontFamily: 'var(--font-garamond)',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 500,
            lineHeight: 1.15,
            color: 'var(--ink)',
            marginBottom: '16px',
          }}
        >
          {noticia.titulo}
        </motion.h1>

        {/* Data */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--terra)',
            marginBottom: '28px',
            letterSpacing: '0.3px',
          }}
        >
          {noticia.data}
        </motion.p>

        {/* Imagem principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          style={{
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            aspectRatio: '16/9',
            marginBottom: '32px',
            width: '100%',
          }}
        >
          <ImageWithFallback
            src={noticia.imagem}
            alt={noticia.titulo}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Lead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: 'clamp(15px, 2vw, 17px)',
            fontWeight: 600,
            lineHeight: 1.65,
            color: 'var(--ink)',
            marginBottom: '28px',
            paddingBottom: '28px',
            borderBottom: '1px solid var(--ink-10)',
          }}
        >
          {noticia.lead}
        </motion.p>

        {/* Corpo */}
        <div className="flex flex-col gap-5">
          {noticia.corpo.map((paragrafo, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.38 + i * 0.08 }}
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: 'clamp(14px, 1.8vw, 16px)',
                lineHeight: 1.8,
                color: 'var(--ink-70)',
                whiteSpace: 'pre-line',
              }}
            >
              {paragrafo}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
