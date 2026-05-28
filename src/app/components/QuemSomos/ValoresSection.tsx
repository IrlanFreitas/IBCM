import { motion } from 'motion/react'
import { HeartHandshake, Scale, Search, Sprout } from 'lucide-react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import styles from './ValoresSection.module.css'

const ease = [0.22, 1, 0.36, 1] as const

const STATIC_VALORES = [
  {
    id: 1,
    titulo: 'Acolhimento',
    descricao: 'Ninguém é rejeitado. O cuidado é incondicional e sem julgamento.',
    icon: HeartHandshake,
  },
  {
    id: 2,
    titulo: 'Equidade',
    descricao: 'Defendemos direitos, não distribuímos pena. Toda pessoa é inteira.',
    icon: Scale,
  },
  {
    id: 3,
    titulo: 'Transparência',
    descricao: 'Cada recurso tem destino claro. Prestamos contas com rigor.',
    icon: Search,
  },
  {
    id: 4,
    titulo: 'Autonomia',
    descricao: 'Existimos para criar condições para que as pessoas não precisem mais de nós.',
    icon: Sprout,
  },
]

export function ValoresSection() {
  const valores = STATIC_VALORES

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
          <Eyebrow color="var(--terra)">Nossos valores</Eyebrow>
          <h2 className={styles.title}>O que nos move todos os dias</h2>
        </motion.header>

        <div className={styles.grid}>
          {valores.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                className={styles.card}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, ease, delay: i * 0.1 }}
              >
                <Icon size={22} color="var(--terra)" strokeWidth={1.75} />
                <h3 className={styles.cardTitle}>{item.titulo}</h3>
                <p className={styles.cardDesc}>{item.descricao}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
