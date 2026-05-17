import { motion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import styles from './ContatoBanner.module.css'

const ease = [0.22, 1, 0.36, 1] as const

export function ContatoBanner() {
  return (
    <section className={styles.section} aria-label="Entre em contato">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease }}
      >
        <h2 className={styles.title}>Tem alguma dúvida?</h2>
        <p className={styles.lead}>
          Nossa equipe está à disposição para responder qualquer pergunta sobre
          nossas contas, projetos ou funcionamento.
        </p>
        <a
          href="mailto:contato@ibcm.org.br"
          className={styles.cta}
        >
          Entre em contato
          <ExternalLink size={15} aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  )
}
