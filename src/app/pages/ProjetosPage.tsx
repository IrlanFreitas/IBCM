import { motion } from 'motion/react'
import { Eyebrow } from '../components/Eyebrow'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'

const ease = [0.22, 1, 0.36, 1] as const

const projetos = [
  {
    titulo: 'HIV/AIDS — Prevenção e acolhimento',
    tag: 'Saúde',
    tagColor: 'var(--terra)',
    cor: 'var(--terra)',
    corLight: 'var(--terra-light)',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&auto=format&fit=crop&q=80',
    descricao:
      'Atendimento integral às pessoas vivendo com HIV/AIDS em Salvador. O programa cobre distribuição de medicamentos ARV, suporte emocional e psicológico, orientação jurídica e 29 casas de apoio espalhadas pela cidade.',
    numeros: [
      { valor: '29', label: 'Casas de apoio' },
      { valor: '+800', label: 'Pacientes atendidos/ano' },
      { valor: '100%', label: 'Gratuito' },
    ],
  },
  {
    titulo: 'Creche IBCM',
    tag: 'Educação',
    tagColor: 'var(--musgo)',
    cor: 'var(--musgo)',
    corLight: 'var(--musgo-light)',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&auto=format&fit=crop&q=80',
    descricao:
      'Educação infantil de qualidade para crianças de 0 a 5 anos em situação de vulnerabilidade. Turno integral com alimentação, cuidados de saúde, estimulação e atividades pedagógicas voltadas ao desenvolvimento integral.',
    numeros: [
      { valor: '88', label: 'Crianças atendidas' },
      { valor: 'Turno integral', label: 'Funcionamento' },
      { valor: '+2.4k', label: 'Formadas desde 1995' },
    ],
  },
  {
    titulo: 'CPDD — Casarão da Diversidade',
    tag: 'Diversidade',
    tagColor: 'var(--ocre)',
    cor: 'var(--ocre)',
    corLight: 'var(--ocre-light)',
    image: 'https://images.unsplash.com/photo-1573152143286-0c422b4d2175?w=1200&auto=format&fit=crop&q=80',
    descricao:
      'Centro de referência LGBTQIA+ de Salvador com atendimento jurídico, psicológico, cultural e de geração de renda. O Casarão é espaço seguro para a comunidade e ponto de articulação de políticas públicas inclusivas.',
    numeros: [
      { valor: '+1.2k', label: 'Atendimentos/ano' },
      { valor: '5', label: 'Serviços oferecidos' },
      { valor: '2003', label: 'Desde' },
    ],
  },
  {
    titulo: 'Adolescente Aprendiz',
    tag: 'Trabalho',
    tagColor: 'var(--ink)',
    cor: 'var(--ink)',
    corLight: 'var(--ink-6)',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80',
    descricao:
      'Programa de qualificação profissional e inserção no mercado de trabalho para jovens de 14 a 22 anos. Parceria com empresas locais para garantir colocação profissional e renda às famílias.',
    numeros: [
      { valor: '+15k', label: 'Jovens formados' },
      { valor: '14–22', label: 'Faixa etária' },
      { valor: '1992', label: 'Desde' },
    ],
  },
]

export function ProjetosPage() {
  return (
    <>
      {/* Hero */}
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
          style={{ maxWidth: '600px' }}
        >
          <Eyebrow color="var(--ocre)">Projetos e causas</Eyebrow>
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
            Cuidado em todas as{' '}
            <em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>frentes</em>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: 'clamp(14px, 2vw, 16px)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            Quatro programas que atuam de forma integrada para transformar a realidade de
            milhares de pessoas em Salvador.
          </p>
        </motion.div>
      </section>

      {/* Lista de projetos */}
      <section
        style={{
          background: 'var(--creme)',
          padding: 'clamp(48px, 7vw, 80px) clamp(16px, 5vw, 60px)',
        }}
      >
        <div className="flex flex-col gap-16">
          {projetos.map((projeto, i) => (
            <motion.article
              key={projeto.titulo}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
            >
              {/* Imagem */}
              <div
                style={{
                  flex: '0 0 auto',
                  width: '100%',
                  maxWidth: '480px',
                  aspectRatio: '4/3',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                }}
              >
                <ImageWithFallback
                  src={projeto.image}
                  alt={projeto.titulo}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Conteúdo */}
              <div className="flex flex-col flex-1">
                <span
                  style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: projeto.tagColor,
                    marginBottom: '12px',
                  }}
                >
                  {projeto.tag}
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-garamond)',
                    fontSize: 'clamp(24px, 4vw, 36px)',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    color: 'var(--ink)',
                    marginBottom: '16px',
                  }}
                >
                  {projeto.titulo}
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '15px',
                    lineHeight: 1.75,
                    color: 'var(--ink-70)',
                    marginBottom: '24px',
                  }}
                >
                  {projeto.descricao}
                </p>

                {/* Números */}
                <div
                  className="flex gap-6"
                  style={{
                    paddingTop: '20px',
                    borderTop: '1px solid var(--ink-10)',
                  }}
                >
                  {projeto.numeros.map((n) => (
                    <div key={n.label} className="flex flex-col gap-1">
                      <span
                        style={{
                          fontFamily: 'var(--font-garamond)',
                          fontSize: '26px',
                          fontWeight: 500,
                          color: projeto.cor,
                        }}
                      >
                        {n.valor}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-jakarta)',
                          fontSize: '11px',
                          color: 'var(--ink-40)',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {n.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}
