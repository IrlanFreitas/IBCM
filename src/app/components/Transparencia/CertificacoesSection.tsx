import { motion } from 'motion/react'
import { Building2, CircleCheck, BarChart2, Lock } from 'lucide-react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import styles from './CertificacoesSection.module.css'

const ease = [0.22, 1, 0.36, 1] as const

const STATIC_CERTIFICACOES = [
  {
    icon: Building2,
    titulo: 'CNAS',
    subtitulo: 'Certificado de Entidade Beneficente',
    descricao: 'Certificação concedida pelo Conselho Nacional de Assistência Social que reconhece a IBCM como entidade beneficente de assistência social.',
  },
  {
    icon: CircleCheck,
    titulo: 'OSCIP',
    subtitulo: 'Org. da Soc. Civil de Interesse Público',
    descricao: 'Qualificação que atesta nosso compromisso com a transparência e a execução de projetos de interesse público.',
  },
  {
    icon: BarChart2,
    titulo: 'Utilidade Pública',
    subtitulo: 'Municipal, estadual e federal',
    descricao: 'Títulos concedidos pelos três níveis de governo, reconhecendo a relevância do nosso trabalho para a sociedade.',
  },
  {
    icon: Lock,
    titulo: 'Auditoria Independente',
    subtitulo: 'Balanço auditado anualmente',
    descricao: 'Auditoria externa realizada anualmente por empresa independente, garantindo a veracidade de nossas contas.',
  },
]

export function CertificacoesSection() {
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
          <Eyebrow color="var(--terra)">Certificações</Eyebrow>
          <h2 className={styles.title}>Reconhecimentos oficiais</h2>
        </motion.header>

        <div className={styles.grid}>
          {STATIC_CERTIFICACOES.map((cert, i) => {
            const Icon = cert.icon
            return (
              <motion.div
                key={cert.titulo}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              >
                <div className={styles.icon}>
                  <Icon size={22} color="var(--musgo)" strokeWidth={1.75} />
                </div>
                <h3 className={styles.cardTitle}>{cert.titulo}</h3>
                <p className={styles.cardSubtitulo}>{cert.subtitulo}</p>
                <p className={styles.cardDesc}>{cert.descricao}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
