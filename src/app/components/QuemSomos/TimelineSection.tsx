import { motion } from 'motion/react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import { useTimeline } from '../../../hooks/useTimeline'
import styles from './TimelineSection.module.css'

// WP: useTimeline() já está integrado em /wp-json/wp/v2/timeline_event
// Fallback estático abaixo é usado enquanto o WP não estiver disponível

const ease = [0.22, 1, 0.36, 1] as const

const STATIC_TIMELINE = [
  { ano: 1986, titulo: 'Fundação da IBCM', descricao: 'Maria Conceição começa a acolher pessoas com HIV/AIDS abandonadas em Salvador, na época do pânico moral da epidemia.', cor: 'var(--terra)' },
  { ano: 1990, titulo: 'Primeiras casas de apoio', descricao: 'Criação das casas de apoio para famílias inteiras vivendo com HIV, oferecendo moradia, alimentação e dignidade.', cor: 'var(--ocre)' },
  { ano: 1998, titulo: 'Creche IBCM', descricao: 'Inauguração da creche especializada em crianças soropositivas, com alimentação adequada e acompanhamento médico.', cor: 'var(--musgo)' },
  { ano: 2000, titulo: 'Adolescente Aprendiz', descricao: 'Início do programa que já inseriu mais de 15 mil jovens vulneráveis no mercado formal de trabalho.', cor: 'var(--terra)' },
  { ano: 2018, titulo: 'CPDD — Casarão da Diversidade', descricao: 'Assumimos a gestão do Centro de Promoção e Defesa dos Direitos LGBT+ em parceria com o Governo da Bahia.', cor: 'var(--ocre)' },
  { ano: 2026, titulo: '38 anos de resistência', descricao: 'Seguimos firmes, cuidando de quem importa e defendendo direitos humanos em Salvador e na Bahia.', cor: 'var(--musgo)' },
]

export function TimelineSection() {
  const { data: wpTimeline } = useTimeline()

  // const timeline = wpTimeline?.map((ev) => ({
  //   ano: ev.acf.ano,
  //   titulo: ev.title.rendered,
  //   descricao: ev.acf.descricao,
  //   cor: ev.acf.cor || 'var(--terra)',
  // })) ?? STATIC_TIMELINE

  const timeline = STATIC_TIMELINE

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow color="var(--terra)">Nossa trajetória</Eyebrow>
          <h2 className={styles.title}>38 anos transformando vidas</h2>
        </motion.header>

        <ol className={styles.list}>
          {timeline.map((item, i) => (
            <li key={item.ano}>
              <motion.div
                className={styles.item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.07 }}
              >
                <span className={styles.year} aria-label={`Ano ${item.ano}`}>
                  {item.ano}
                </span>

                <div className={styles.body}>
                  <h3 className={styles.eventTitle}>{item.titulo}</h3>
                  <p className={styles.eventDesc}>{item.descricao}</p>
                </div>
              </motion.div>

              {i < timeline.length - 1 && (
                <div className={styles.divider} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
