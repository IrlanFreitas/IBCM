import { motion } from 'motion/react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import { useOpcoes } from '../../../hooks/useOpcoes'
import { useQuemSomosMidia } from '../../../hooks/useQuemSomosMidia'
import styles from './QuemSomosHome.module.css'

const ease = [0.22, 1, 0.36, 1] as const

const STATIC_TEXTO =
  'Em 1986, Maria Conceição Macedo fundou o IBCM com um propósito simples e urgente: acolher quem a sociedade rejeitava. Numa época em que o estigma do HIV/AIDS isolava famílias inteiras, o Instituto abriu as portas para oferecer dignidade, cuidado e voz a quem mais precisava.'

const STATIC_IMAGEM = '/imagens/gabrielbrito-0042.jpg'
const STATIC_YOUTUBE = '1-sXoLc6l34'

interface MidiaProps {
  tipo?: 'imagem' | 'youtube' | 'video'
  imagem?: string | null
  imagemAlt?: string
  youtubeId?: string
  videoUrl?: string
  poster?: string
}

function MidiaBlock({ tipo = 'youtube', imagem, imagemAlt, youtubeId, videoUrl, poster }: MidiaProps) {
  if (tipo === 'youtube' && youtubeId) {
    return (
      <iframe
        className={styles.media}
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&rel=0&modestbranding=1&controls=0`}
        allow="autoplay; encrypted-media"
        title="Vídeo institucional IBCM"
        loading="lazy"
        aria-hidden="true"
      />
    )
  }

  if (tipo === 'video' && videoUrl) {
    return (
      <video
        className={styles.media}
        src={videoUrl}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    )
  }

  return (
    <img
      className={styles.media}
      src={imagem ?? STATIC_IMAGEM}
      alt={imagemAlt ?? 'Equipe IBCM em ação'}
    />
  )
}

export function QuemSomosHome() {
  const { data: midia } = useQuemSomosMidia()

  const midiaConfig: MidiaProps = {
    tipo: midia?.acf.tipo ?? 'youtube',
    imagem: midia?.acf.imagem?.url,
    imagemAlt: midia?.acf.imagem?.alt,
    youtubeId: midia?.acf.youtube_id ?? STATIC_YOUTUBE,
    videoUrl: midia?.acf.video_url,
    poster: midia?.acf.poster?.url,
  }

  return (
    <section className={styles.section}>
      {/* Bloco de texto */}
      <motion.div
        className={styles.textBlock}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease }}
      >
        <Eyebrow>Quem somos</Eyebrow>

        <h2 className={styles.title}>
          Uma história de{' '}
          <span className={styles.titleHighlight}>resistência</span>{' '}
          e cuidado
        </h2>

        <p className={styles.body}>{STATIC_TEXTO}</p>

        <Link to="/quem-somos" className={styles.link}>
          Conheça nossa história completa
          <ArrowRight size={16} />
        </Link>
      </motion.div>

      {/* Bloco de mídia — imagem, YouTube ou vídeo */}
      <motion.div
        className={styles.mediaBlock}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease, delay: 0.18 }}
      >
        <MidiaBlock {...midiaConfig} />
      </motion.div>
    </section>
  )
}
