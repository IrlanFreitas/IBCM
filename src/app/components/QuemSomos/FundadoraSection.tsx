import { motion } from 'motion/react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback'
import styles from './FundadoraSection.module.css'

// TODO: quando WP estiver pronto, receber estes dados de `useOpcoes()`:
//   opcoes.fundadora_nome, opcoes.fundadora_bio, opcoes.fundadora_imagem?.url

const ease = [0.22, 1, 0.36, 1] as const

const STATIC = {
  nome: 'Maria Conceição Macedo dos Santos',
  bio1: 'Em 1986, quando o HIV/AIDS era sinônimo de morte certa e abandono social, Maria Conceição Macedo fez o que ninguém mais estava fazendo: acolheu. Não tinha recursos, estrutura ou plano — tinha compaixão e coragem.',
  bio2: 'O que começou com uma pessoa acolhida em casa virou uma rede de 29 casas de apoio, uma creche, programas de empregabilidade e um centro de defesa de direitos LGBT+. Dona Conceição, como é conhecida, transformou indignação em ação e ação em legado.',
  citacao: '"Não era minha intenção ter um projeto. Eu via aquelas pessoas serem abandonadas e simplesmente não conseguia deixar ir."',
}

export function FundadoraSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow color="var(--terra)">Fundadora</Eyebrow>
          <h2 className={styles.name}>{STATIC.nome}</h2>

          <p className={styles.bio}>{STATIC.bio1}</p>
          <p className={styles.bio}>{STATIC.bio2}</p>

          <blockquote className={styles.quoteBlock}>
            <p className={styles.quoteText}>{STATIC.citacao}</p>
          </blockquote>
        </motion.div>

        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          <div className={styles.imageFrame}>
            {/* TODO: substituir por `opcoes?.fundadora_imagem?.url` */}
            <ImageWithFallback
              src="/imagens/maria_conceicao.png"
              alt="Maria Conceição Macedo dos Santos, fundadora do IBCM"
              className={styles.image}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
