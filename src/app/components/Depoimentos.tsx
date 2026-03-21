import { motion } from 'motion/react'
import { Eyebrow } from './Eyebrow'
import { useDepoimentos } from '../../hooks/useDepoimentos'

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
  const { data: wpDepoimentos } = useDepoimentos()

  const depoimentos = wpDepoimentos?.filter((d) => d.acf.ativo).map((d) => ({
    texto: d.acf.texto,
    nome: d.acf.nome,
    papel: d.acf.papel,
    inicial: d.acf.nome.charAt(0).toUpperCase(),
    cor: d.acf.cor,
  })) ?? STATIC_DEPOIMENTOS

  return (
    <section style={{ background: 'var(--ink)', padding: 'clamp(48px, 7vw, 104px) clamp(16px, 5vw, 60px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease }}
        className="mb-10"
      >
        <Eyebrow color="var(--ocre)">Depoimentos</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--font-garamond)',
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 500,
            color: 'var(--white)',
            lineHeight: 1.15,
            maxWidth: '480px',
          }}
        >
          Histórias que nos movem a seguir
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {depoimentos.map((dep, i) => (
          <motion.div
            key={dep.nome}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease, delay: i * 0.15 }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(24px, 3vw, 36px)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-garamond)',
                fontSize: '80px',
                lineHeight: 0.8,
                fontStyle: 'italic',
                color: dep.cor,
                opacity: 0.35,
                marginBottom: '12px',
                userSelect: 'none',
              }}
            >
              "
            </div>

            <p
              style={{
                fontFamily: 'var(--font-garamond)',
                fontSize: 'clamp(16px, 2vw, 18px)',
                fontStyle: 'italic',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.82)',
                marginBottom: '24px',
              }}
            >
              {dep.texto}
            </p>

            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: dep.cor,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-garamond)',
                    fontSize: '18px',
                    fontWeight: 500,
                    color: 'var(--white)',
                  }}
                >
                  {dep.inicial}
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--white)',
                  }}
                >
                  {dep.nome}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.45)',
                  }}
                >
                  {dep.papel}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
