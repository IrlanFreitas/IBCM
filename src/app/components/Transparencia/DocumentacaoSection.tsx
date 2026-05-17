import { motion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import styles from './DocumentacaoSection.module.css'

const ease = [0.22, 1, 0.36, 1] as const

interface Documento {
  titulo: string
  descricao: string
  url: string | null
}

const STATIC_DOCUMENTOS: Documento[] = [
  {
    titulo: 'Estatuto Social',
    descricao: 'Documento que define a estrutura, objetivos e funcionamento da IBCM.',
    url: null,
  },
  {
    titulo: 'Ata de Fundação',
    descricao: 'Documento histórico que registra a fundação da instituição em 1986.',
    url: null,
  },
  {
    titulo: 'CNPJ e Certidões',
    descricao: 'CNPJ, certidão negativa de débitos e demais certidões atualizadas.',
    url: null,
  },
  {
    titulo: 'Composição da Diretoria',
    descricao: 'Lista atualizada dos membros da diretoria e do conselho fiscal.',
    url: null,
  },
]

// TODO: buscar de opcoes?.documentos quando WP estiver pronto

export function DocumentacaoSection() {
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
          <Eyebrow color="var(--terra)">Documentação</Eyebrow>
          <h2 className={styles.title}>Documentos institucionais</h2>
        </motion.header>

        <div className={styles.grid}>
          {STATIC_DOCUMENTOS.map((doc, i) => {
            const Tag = doc.url ? 'a' : 'div'
            const linkProps = doc.url
              ? { href: doc.url, target: '_blank', rel: 'noopener noreferrer' }
              : {}

            return (
              <motion.div
                key={doc.titulo}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              >
                <Tag className={styles.card} {...linkProps}>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{doc.titulo}</h3>
                    <p className={styles.cardDesc}>{doc.descricao}</p>
                  </div>
                  <ExternalLink
                    size={18}
                    className={styles.linkIcon}
                    aria-hidden="true"
                  />
                </Tag>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
