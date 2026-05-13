import { motion } from 'motion/react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import styles from './Depoimentos.module.css'

// TODO: descomentar quando integração com WordPress estiver disponível
// import { useDepoimentos } from '../../../hooks/useDepoimentos'

const ease = [0.22, 1, 0.36, 1] as const

const STATIC_DEPOIMENTOS = [
  {
    texto:
      'O IBCM foi o único lugar onde fui tratada como ser humano num momento em que o mundo parecia ter fechado as portas. Eles me deram medicação, moradia e, mais do que tudo, devolveram minha dignidade.',
    nome: 'Maria S.',
    papel: 'Beneficiária — usuária há 12 anos',
    inicial: 'M',
    cor: 'var(--terra)',
  },
  {
    texto:
      'Quando me tornei voluntário aqui, pensei que estaria ajudando o IBCM. Na verdade, foi o IBCM que me ensinou o verdadeiro significado de cuidar do próximo. Cada família atendida muda a gente por dentro.',
    nome: 'Roberto A.',
    papel: 'Voluntário — 5 anos de dedicação',
    inicial: 'R',
    cor: 'var(--musgo)',
  },
]

export function Depoimentos() {
  // TODO: descomentar quando integração com WordPress estiver disponível
  // const { data: wpDepoimentos } = useDepoimentos()
  // const depoimentos = wpDepoimentos?.filter((d) => d.acf.ativo).map((d) => ({
  //   texto: d.acf.texto,
  //   nome: d.acf.nome,
  //   papel: d.acf.papel,
  //   inicial: d.acf.nome.charAt(0).toUpperCase(),
  //   cor: d.acf.cor,
  // })) ?? STATIC_DEPOIMENTOS

  const depoimentos = STATIC_DEPOIMENTOS

  return (
    <section className={styles.section}>
      {/* Cabeçalho */}
      <motion.div
        className={styles.headingGroup}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease }}
      >
        <Eyebrow color="var(--ocre)">Depoimentos</Eyebrow>
        <h2 className={styles.title}>
          Vidas transformadas,{' '}
          <em className={styles.titleHighlight}>histórias reais</em>
        </h2>
        <p className={styles.subtitle}>
          O que verdadeiramente importa: pessoas reais, histórias de dignidade
          recuperada e futuros transformados.
        </p>
      </motion.div>

      {/* Grid de depoimentos */}
      <div className={styles.grid}>
        {depoimentos.map((dep, i) => (
          <motion.div
            key={dep.nome}
            className={styles.card}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease, delay: i * 0.15 }}
          >
            {/* Aspas decorativas */}
            <div className={styles.quote} style={{ color: dep.cor }}>"</div>

            <p className={styles.text}>{dep.texto}</p>

            {/* Autor */}
            <div className={styles.author}>
              <div className={styles.avatar} style={{ background: dep.cor }}>
                <span className={styles.avatarInitial}>{dep.inicial}</span>
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{dep.nome}</span>
                <span className={styles.authorRole}>{dep.papel}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
