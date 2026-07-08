import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useCampanhas } from "../../../hooks/useCampanhas";
import type { WPCampanha } from "../../../types/cms";
import styles from "./Hero.module.css";

const ease = [0.22, 1, 0.36, 1] as const;
const SLIDE_DURATION = 15000;
const MAX_SLIDES = 3;

interface HeroSlide {
  tipo: "imagem" | "youtube" | "video";
  imagem?: string;
  imagemAlt?: string;
  youtubeId?: string;
  videoUrl?: string;
  link?: string;
  linkLabel?: string;
}

const STATIC_SLIDES: HeroSlide[] = [
  {
    tipo: "imagem",
    imagem:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&auto=format&fit=crop&q=80",
    imagemAlt: "IBCM — Cuidado e acolhimento em Salvador",
    link: "/causas",
    linkLabel: "Conheça nossas causas",
  },
  {
    // Vídeo YouTube: substitua o ID pelo vídeo da campanha desejada
    tipo: "youtube",
    youtubeId: "1-sXoLc6l34",
    link: "/doe-agora",
    linkLabel: "Apoie essa causa",
  },
  {
    // Vídeo hospedado no WordPress: substitua pela URL real após upload
    tipo: "video",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
];

function wpToSlide(wp: WPCampanha): HeroSlide {
  return {
    tipo: wp.acf.tipo,
    imagem: wp.acf.imagem?.url,
    imagemAlt: wp.acf.imagem?.alt,
    youtubeId: wp.acf.youtube_id || undefined,
    videoUrl: wp.acf.video_url || undefined,
    link: wp.acf.link || undefined,
    linkLabel: wp.acf.link_label || "Saiba mais",
  };
}

function SlideMedia({ slide, muted }: { slide: HeroSlide; muted: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sincroniza mute com o elemento <video>
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  // Sincroniza mute com o iframe do YouTube via postMessage
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const cmd = JSON.stringify({
      event: "command",
      func: muted ? "mute" : "unMute",
      args: [],
    });
    iframe.contentWindow?.postMessage(cmd, "*");
  }, [muted]);

  if (slide.tipo === "youtube" && slide.youtubeId) {
    return (
      <iframe
        ref={iframeRef}
        className={styles.bgIframe}
        src={`https://www.youtube-nocookie.com/embed/${slide.youtubeId}?autoplay=1&muted=1&loop=1&playlist=${slide.youtubeId}&controls=0&rel=0&modestbranding=1&enablejsapi=1`}
        allow="autoplay; encrypted-media"
        title="Vídeo de fundo"
        aria-hidden="true"
        tabIndex={-1}
        onLoad={() => {
          // Aplica estado atual de mute assim que o player estiver pronto
          setTimeout(() => {
            iframeRef.current?.contentWindow?.postMessage(
              JSON.stringify({
                event: "command",
                func: muted ? "mute" : "unMute",
                args: [],
              }),
              "*",
            );
          }, 800);
        }}
      />
    );
  }

  if (slide.tipo === "video" && slide.videoUrl) {
    return (
      <video
        ref={videoRef}
        className={styles.bgVideo}
        src={slide.videoUrl}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={styles.bg}
      style={{ backgroundImage: `url("${slide.imagem}")` }}
      role="img"
      aria-label={slide.imagemAlt}
    />
  );
}

export function Hero() {
  const { data: campanhas } = useCampanhas();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const touchStartX = useRef<number | null>(null);

  console.log(campanhas);

  const rawSlides = campanhas?.filter((c) => c.acf.ativo) ?? [];
  const slides: HeroSlide[] =
    rawSlides.length > 0
      ? rawSlides.slice(0, MAX_SLIDES).map(wpToSlide)
      : STATIC_SLIDES;

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 40) {
        if (delta > 0) next();
        else prev();
      }
      touchStartX.current = null;
    },
    [next, prev],
  );

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [paused, next, slides.length]);

  const safeIndex = current >= slides.length ? 0 : current;
  const slide = slides[safeIndex];
  const hasAudio = slide.tipo === "youtube" || slide.tipo === "video";

  return (
    <section
      className={styles.section}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fundo em carrossel */}
      <AnimatePresence mode="sync">
        <motion.div
          key={safeIndex}
          className={styles.slideWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <SlideMedia slide={slide} muted={muted} />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className={styles.overlay} />

      {/* Conteúdo */}
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          <div className={styles.wrapper}>
            <span className={styles.text} style={{ color: "var(--ocre)" }}>
              Desde 1986
            </span>
            <div
              className={styles.line}
              style={{ background: "var(--ocre)" }}
            />
            <span className={styles.text} style={{ color: "var(--ocre)" }}>
              Salvador, Bahia
            </span>
          </div>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          Solidariedade sim.
          <br />
          <span className={styles.titleHighlight}>Preconceito, não.</span>
        </motion.h1>

        <motion.p
          className={styles.lead}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.38 }}
        >
          Há 40 anos, a IBCM acolhe, protege e transforma a vida de crianças,
          mulheres e famílias em situação de vulnerabilidade, com atuação
          histórica no cuidado às pessoas que vivem e convivem com HIV.
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.56 }}
        >
          <Link to="/doe-agora" className={styles.ctaPrimary}>
            Faça uma doação
          </Link>
          <Link to="/quem-somos" className={styles.ctaSecondary}>
            Conheça a IBCM
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Área do link de campanha — altura reservada para não deslocar o layout */}
        <div className={styles.campaignArea}>
          <AnimatePresence mode="wait">
            {slide.link && (
              <motion.div
                key={`campaign-${safeIndex}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease }}
              >
                <a
                  href={slide.link}
                  className={styles.ctaCampaign}
                  target={slide.link.startsWith("http") ? "_blank" : undefined}
                  rel={
                    slide.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {slide.linkLabel ?? "Saiba mais"}
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Botão de som — visível apenas em slides de vídeo */}
      <AnimatePresence>
        {hasAudio && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3 }}
            className={styles.muteBtn}
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Ativar som" : "Desativar som"}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Indicadores de slide */}
      {slides.length > 1 && (
        <div className={styles.dotsBar} aria-label="Navegação do carrossel">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === safeIndex ? styles.dotActive : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Ir para slide ${i + 1}`}
              aria-current={i === safeIndex ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
