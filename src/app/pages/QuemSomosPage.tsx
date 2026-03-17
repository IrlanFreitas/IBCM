import { motion } from 'motion/react'
import { Eyebrow } from '../components/Eyebrow'

const ease = [0.22, 1, 0.36, 1] as const

const timeline = [
  {
    ano: 1986,
    titulo: 'Fundação do IBCM',
    descricao:
      'Maria Conceição Macedo funda o Instituto em Salvador com a missão de acolher pessoas vivendo com HIV/AIDS num período de enorme estigma social.',
    cor: 'var(--terra)',
  },
  {
    ano: 1988,
    titulo: 'Primeira casa de apoio',
    descricao:
      'Abertura da primeira casa de apoio, oferecendo moradia temporária e cuidados paliativos a pacientes sem rede familiar.',
    cor: 'var(--ocre)',
  },
  {
    ano: 1992,
    titulo: 'Programa Jovem Aprendiz',
    descricao:
      'Início do programa de formação profissional para adolescentes em vulnerabilidade social, que já formou mais de 15.000 jovens.',
    cor: 'var(--musgo)',
  },
  {
    ano: 1995,
    titulo: 'Creche IBCM',
    descricao:
      'Inauguração da creche comunitária que atende crianças de 0 a 5 anos em turno integral, priorizando filhos de pessoas atendidas pelo Instituto.',
    cor: 'var(--terra)',
  },
  {
    ano: 2003,
    titulo: 'CPDD — Casarão da Diversidade',
    descricao:
      'Criação do Centro de Promoção da Diversidade e Direitos Humanos, referência LGBTQIA+ em Salvador com atendimento jurídico, psicológico e cultural.',
    cor: 'var(--ocre)',
  },
  {
    ano: 2010,
    titulo: 'Ronda Noturna',
    descricao:
      'Lançamento do programa de abordagem noturna nas ruas de Salvador, levando saúde, alimentação e cuidados às pessoas em situação de rua.',
    cor: 'var(--musgo)',
  },
  {
    ano: 2024,
    titulo: '38 anos de história',
    descricao:
      'O IBCM celebra quatro décadas de resistência e cuidado, com 29 casas de apoio ativas, mais de 2.400 crianças atendidas e impacto contínuo.',
    cor: 'var(--terra)',
  },
]

export function QuemSomosPage() {
  return (
    <>
      {/* Hero interno */}
      <section
        style={{
          background: 'var(--ink)',
          padding: 'clamp(48px, 8vw, 96px) clamp(16px, 5vw, 60px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{ maxWidth: '640px' }}
        >
          <Eyebrow color="var(--ocre)">Quem somos</Eyebrow>
          <h1
            style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(36px, 8vw, 68px)',
              fontWeight: 500,
              lineHeight: 1.08,
              color: 'var(--white)',
              marginBottom: '20px',
            }}
          >
            Uma organização fundada no{' '}
            <em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>amor</em> e na luta
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: 'clamp(14px, 2vw, 16px)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            Desde 1986, o Instituto Beneficente Conceição Macedo trabalha para garantir
            dignidade, saúde e direitos a quem mais precisa em Salvador, Bahia.
          </p>
        </motion.div>
      </section>

      {/* Missão + Valores */}
      <section
        style={{
          background: 'var(--white)',
          padding: 'clamp(48px, 7vw, 80px) clamp(16px, 5vw, 60px)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              titulo: 'Missão',
              cor: 'var(--terra)',
              texto:
                'Promover o bem-estar integral de pessoas em situação de vulnerabilidade, com foco em saúde, educação, habitação e defesa de direitos.',
            },
            {
              titulo: 'Visão',
              cor: 'var(--musgo)',
              texto:
                'Ser referência nacional em acolhimento humanizado e políticas de inclusão para populações historicamente marginalizadas.',
            },
            {
              titulo: 'Valores',
              cor: 'var(--ocre)',
              texto:
                'Dignidade humana · Solidariedade · Transparência · Resistência · Cuidado integral · Defesa da diversidade',
            },
          ].map((item, i) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: i * 0.12 }}
              style={{
                borderTop: `3px solid ${item.cor}`,
                paddingTop: '20px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-garamond)',
                  fontSize: '24px',
                  fontWeight: 500,
                  color: item.cor,
                  marginBottom: '12px',
                }}
              >
                {item.titulo}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '14px',
                  lineHeight: 1.75,
                  color: 'var(--ink-70)',
                }}
              >
                {item.texto}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section
        style={{
          background: 'var(--creme)',
          padding: 'clamp(48px, 7vw, 80px) 0',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '0 clamp(16px, 5vw, 60px)', marginBottom: '48px' }}>
          <Eyebrow>Nossa trajetória</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            38 anos de história
          </h2>
        </div>

        {/* Timeline horizontal */}
        <div
          style={{
            overflowX: 'auto',
            paddingBottom: '24px',
            cursor: 'grab',
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '0 clamp(16px, 5vw, 60px)',
              minWidth: 'max-content',
            }}
          >
            {timeline.map((item, i) => {
              const acima = i % 2 === 0
              return (
                <div
                  key={item.ano}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 'clamp(200px, 20vw, 260px)',
                    flexShrink: 0,
                  }}
                >
                  {/* Card acima */}
                  <motion.div
                    initial={{ opacity: 0, y: acima ? -20 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                    style={{
                      minHeight: 'clamp(160px, 15vw, 200px)',
                      padding: '16px',
                      background: 'var(--white)',
                      border: '1px solid var(--ink-10)',
                      borderRadius: 'var(--radius-lg)',
                      margin: acima ? '0 8px 16px' : '0 8px',
                      visibility: acima ? 'visible' : 'hidden',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-garamond)',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: item.cor,
                        marginBottom: '8px',
                      }}
                    >
                      {item.ano}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-garamond)',
                        fontSize: '17px',
                        fontWeight: 500,
                        color: 'var(--ink)',
                        lineHeight: 1.25,
                        marginBottom: '8px',
                      }}
                    >
                      {item.titulo}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-jakarta)',
                        fontSize: '12px',
                        lineHeight: 1.6,
                        color: 'var(--ink-70)',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.descricao}
                    </p>
                  </motion.div>

                  {/* Trilha central */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0,
                    }}
                  >
                    {/* Linha antes */}
                    <div
                      style={{
                        width: '100%',
                        height: '2px',
                        background: i === 0
                          ? 'transparent'
                          : `linear-gradient(90deg, ${timeline[i - 1]?.cor ?? item.cor}, ${item.cor})`,
                        position: 'relative',
                      }}
                    />

                    {/* Círculo do ano */}
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: item.cor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        zIndex: 1,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-garamond)',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'white',
                        }}
                      >
                        {item.ano}
                      </span>
                    </div>
                  </div>

                  {/* Card abaixo */}
                  <motion.div
                    initial={{ opacity: 0, y: acima ? -20 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                    style={{
                      minHeight: 'clamp(160px, 15vw, 200px)',
                      padding: '16px',
                      background: 'var(--white)',
                      border: '1px solid var(--ink-10)',
                      borderRadius: 'var(--radius-lg)',
                      margin: !acima ? '16px 8px 0' : '0 8px',
                      visibility: !acima ? 'visible' : 'hidden',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-garamond)',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: item.cor,
                        marginBottom: '8px',
                      }}
                    >
                      {item.ano}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-garamond)',
                        fontSize: '17px',
                        fontWeight: 500,
                        color: 'var(--ink)',
                        lineHeight: 1.25,
                        marginBottom: '8px',
                      }}
                    >
                      {item.titulo}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-jakarta)',
                        fontSize: '12px',
                        lineHeight: 1.6,
                        color: 'var(--ink-70)',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.descricao}
                    </p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
