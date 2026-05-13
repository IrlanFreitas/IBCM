import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ImageWithFallback } from '../components/ImageWithFallback/ImageWithFallback'
import { NOTICIAS } from '../data/noticias'
import type { Noticia } from '../data/noticias'

const ease = [0.22, 1, 0.36, 1] as const

const INITIAL_COUNT = 6
const LOAD_MORE_COUNT = 3

export function NoticiasPage() {
  const [visivel, setVisivel] = useState(INITIAL_COUNT)

  const noticiasMostradas = NOTICIAS.slice(0, visivel)
  const temMais = visivel < NOTICIAS.length

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'var(--terra)',
          padding: 'clamp(48px, 8vw, 96px) clamp(16px, 5vw, 60px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(48px, 10vw, 82px)',
              fontWeight: 500,
              fontStyle: 'italic',
              lineHeight: 1.08,
              color: 'var(--white)',
              margin: 0,
            }}
          >
            Notícias
          </h1>
        </motion.div>
      </section>

      {/* Grid de notícias */}
      <section
        style={{
          background: 'var(--creme)',
          padding: 'clamp(40px, 6vw, 80px) clamp(16px, 5vw, 60px)',
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {noticiasMostradas.map((noticia, i) => (
            <NoticiaCard key={noticia.id} noticia={noticia} index={i} />
          ))}
        </div>

        {/* Carregar mais */}
        {temMais && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 'clamp(40px, 5vw, 56px)',
            }}
          >
            <button
              onClick={() => setVisivel((v) => v + LOAD_MORE_COUNT)}
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--white)',
                background: 'var(--terra)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '14px 36px',
                cursor: 'pointer',
                transition: 'background 300ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--terra-dark)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--terra)')}
            >
              Carregar mais
            </button>
          </div>
        )}
      </section>
    </>
  )
}

function NoticiaCard({ noticia, index }: { noticia: Noticia; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease, delay: (index % 3) * 0.1 }}
    >
      <Link
        to={`/noticias/${noticia.slug}`}
        style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Imagem */}
        <div
          style={{
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            aspectRatio: '4/3',
            marginBottom: '16px',
          }}
        >
          <ImageWithFallback
            src={noticia.imagem}
            alt={noticia.titulo}
            className="w-full h-full object-cover"
            style={{
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 500ms ease',
            }}
          />
        </div>

        {/* Data */}
        <p
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            color: 'var(--terra)',
            marginBottom: '8px',
          }}
        >
          {noticia.data}
        </p>

        {/* Título */}
        <h2
          style={{
            fontFamily: 'var(--font-garamond)',
            fontSize: 'clamp(17px, 2.5vw, 20px)',
            fontWeight: 500,
            lineHeight: 1.35,
            color: hovered ? 'var(--terra)' : 'var(--ink)',
            transition: 'color 300ms',
            margin: 0,
          }}
        >
          {noticia.titulo}
        </h2>
      </Link>
    </motion.div>
  )
}
