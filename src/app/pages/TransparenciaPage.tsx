import { motion } from 'motion/react'
import { FileText, Download, CheckCircle, Award } from 'lucide-react'
import { Eyebrow } from '../components/Eyebrow'

const ease = [0.22, 1, 0.36, 1] as const

const relatorios = [
  { ano: 2023, titulo: 'Relatório Anual 2023', tipo: 'PDF', tamanho: '2.4 MB' },
  { ano: 2022, titulo: 'Relatório Anual 2022', tipo: 'PDF', tamanho: '2.1 MB' },
  { ano: 2021, titulo: 'Relatório Anual 2021', tipo: 'PDF', tamanho: '1.8 MB' },
  { ano: 2020, titulo: 'Relatório Anual 2020', tipo: 'PDF', tamanho: '1.6 MB' },
]

const certificacoes = [
  { titulo: 'OSCIP', descricao: 'Organização da Sociedade Civil de Interesse Público', cor: 'var(--terra)' },
  { titulo: 'CNAS', descricao: 'Conselho Nacional de Assistência Social — Certificado', cor: 'var(--musgo)' },
  { titulo: 'ISO 9001', descricao: 'Gestão da qualidade em processos assistenciais', cor: 'var(--ocre)' },
  { titulo: 'Auditada', descricao: 'Auditoria independente realizada anualmente', cor: 'var(--ink)' },
]

export function TransparenciaPage() {
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
          <Eyebrow color="var(--ocre)">Transparência</Eyebrow>
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
            Confiança que se{' '}
            <em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>constrói</em> com dados
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: 'clamp(14px, 2vw, 16px)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            Publicamos todos os nossos relatórios financeiros, prestações de contas e
            certificações. Nossos doadores merecem saber exatamente como seu dinheiro é usado.
          </p>
        </motion.div>
      </section>

      {/* Certificações */}
      <section
        style={{
          background: 'var(--white)',
          padding: 'clamp(48px, 7vw, 80px) clamp(16px, 5vw, 60px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: '40px' }}
        >
          <Eyebrow>Certificações</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            Reconhecimentos e acreditações
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificacoes.map((cert, i) => (
            <motion.div
              key={cert.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              style={{
                background: 'var(--creme)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                borderTop: `3px solid ${cert.cor}`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Award size={18} color={cert.cor} />
                <span
                  style={{
                    fontFamily: 'var(--font-garamond)',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: cert.cor,
                  }}
                >
                  {cert.titulo}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: 'var(--ink-70)',
                }}
              >
                {cert.descricao}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Relatórios */}
      <section
        style={{
          background: 'var(--creme)',
          padding: 'clamp(48px, 7vw, 80px) clamp(16px, 5vw, 60px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: '32px' }}
        >
          <Eyebrow>Prestação de contas</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            Relatórios anuais
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {relatorios.map((rel, i) => (
            <motion.div
              key={rel.ano}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="flex items-center justify-between"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--ink-10)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 20px',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--terra-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FileText size={18} color="var(--terra)" />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-jakarta)',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      marginBottom: '2px',
                    }}
                  >
                    {rel.titulo}
                  </p>
                  <p style={{ fontFamily: 'var(--font-jakarta)', fontSize: '12px', color: 'var(--ink-40)' }}>
                    {rel.tipo} · {rel.tamanho}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <CheckCircle size={14} color="var(--musgo)" />
                  <span style={{ fontFamily: 'var(--font-jakarta)', fontSize: '12px', color: 'var(--musgo)' }}>
                    Auditado
                  </span>
                </div>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--terra)',
                    background: 'var(--terra-light)',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    transition: 'background 200ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--terra-mid)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--terra-light)')}
                >
                  <Download size={14} />
                  Baixar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
