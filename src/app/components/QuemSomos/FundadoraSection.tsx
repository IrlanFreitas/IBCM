import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback'
import styles from './FundadoraSection.module.css'

// TODO: quando WP estiver pronto, receber estes dados de `useOpcoes()`:
//   opcoes.fundadora_nome, opcoes.fundadora_subtitulo,
//   opcoes.fundadora_bio, opcoes.fundadora_imagem?.url

const ease = [0.22, 1, 0.36, 1] as const

const STATIC = {
  nome: 'Maria Conceição Macedo dos Santos',
  subtitulo: 'Fundadora e Diretora Honorária',
  bio1: 'Nascida em Salvador, Maria Conceição dedicou sua vida a construir pontes onde a sociedade erguia muros. Em plena epidemia de HIV/AIDS, quando o estigma era a sentença mais cruel, ela abriu as portas de sua casa e fundou o IBCM.',
  bio2: 'Sua visão foi além do cuidado imediato: ela entendeu que dignidade, educação e trabalho são as ferramentas mais poderosas contra a marginalização. Hoje, o legado de "Mãe Ceição" vive em cada casa de apoio, em cada jovem empregado, em cada criança atendida.',
  citacao: '"Cuidar do outro é o ato mais revolucionário que existe. Porque quando você vê a humanidade em quem o mundo descartou, você muda o mundo."',
}

export function FundadoraSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <div className={styles.imageFrame}>
            {/* TODO: substituir por `opcoes?.fundadora_imagem?.url` */}
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=70"
              alt="Maria Conceição Macedo dos Santos, fundadora do IBCM"
              className={styles.image}
            />
          </div>
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
        >
          <Eyebrow color="var(--terra)">Fundadora</Eyebrow>
          {/* TODO: `opcoes?.fundadora_nome ?? STATIC.nome` */}
          <h2 className={styles.name}>{STATIC.nome}</h2>
          <p className={styles.role}>{STATIC.subtitulo}</p>

          <p className={styles.bio}>{STATIC.bio1}</p>
          <p className={styles.bio}>{STATIC.bio2}</p>

          <blockquote className={styles.quoteBlock}>
            <p className={styles.quoteText}>{STATIC.citacao}</p>
          </blockquote>

          {/* TODO: link para página ou post WP da história completa */}
          <a href="#" className={styles.link}>
            Conheça a história completa <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
