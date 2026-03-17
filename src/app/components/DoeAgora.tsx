import { useState } from 'react'
import { motion } from 'motion/react'
import { Heart, Shield, Lock, RefreshCw } from 'lucide-react'
import { Eyebrow } from './Eyebrow'

const ease = [0.22, 1, 0.36, 1] as const

const valores = [
  {
    valor: 30,
    impacto: [
      '5 refeições por semana para uma criança',
      'Suporte nutricional em tratamento HIV',
      'Kit higiene mensal básico',
    ],
  },
  {
    valor: 50,
    impacto: [
      'Contribui com o aluguel de uma casa de apoio',
      'Garante 2 crianças na creche por 1 semana',
      'Material didático para turma',
    ],
  },
  {
    valor: 100,
    impacto: [
      'Cobre tratamento ARV de 1 paciente',
      '1 semana de atendimento integral a uma família',
      'Apoio psicológico mensal',
    ],
  },
  {
    valor: 200,
    impacto: [
      '1 mês de alimentação para 2 crianças',
      'Materiais pedagógicos completos',
      'Cobre consultas médicas mensais',
    ],
  },
]

export function DoeAgora() {
  const [mensal, setMensal] = useState(true)
  const [valorSelecionado, setValorSelecionado] = useState(50)
  const [valorCustom, setValorCustom] = useState('')

  const valorAtual = valorSelecionado || Number(valorCustom) || 50
  const itemSelecionado = valores.find((v) => v.valor === valorSelecionado)

  return (
    <section
      id="doe-agora"
      style={{ background: 'var(--creme-dark)', padding: 'clamp(48px, 7vw, 104px) clamp(16px, 5vw, 60px)' }}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Lado esquerdo */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="flex-1"
        >
          <Eyebrow>Faça a diferença</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 500,
              lineHeight: 1.15,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}
          >
            Cada real transforma uma vida real
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'var(--ink-70)',
              marginBottom: '24px',
            }}
          >
            Sua doação financia diretamente os programas de saúde, educação e acolhimento do
            IBCM. Transparência total: publicamos relatórios mensais de prestação de contas.
          </p>

          {/* Info box mensal */}
          <div
            style={{
              background: 'var(--musgo-light)',
              border: '1px solid rgba(58,92,59,0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            <RefreshCw size={18} color="var(--musgo)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--musgo-dark)',
                  marginBottom: '4px',
                }}
              >
                Doação mensal tem mais impacto
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: 'var(--musgo)',
                }}
              >
                Com uma doação recorrente, conseguimos planejar projetos de longo prazo e
                garantir continuidade no atendimento às famílias.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Formulário */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="flex-1 w-full"
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(24px, 3vw, 36px)',
            border: '1px solid var(--ink-10)',
          }}
        >
          {/* Toggle mensal/única */}
          <div
            className="flex"
            style={{
              background: 'var(--ink-6)',
              borderRadius: 'var(--radius-full)',
              padding: '4px',
              marginBottom: '24px',
            }}
          >
            {[
              { label: 'Mensal', value: true },
              { label: 'Única', value: false },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => setMensal(opt.value)}
                style={{
                  flex: 1,
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '9px 0',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 200ms',
                  background: mensal === opt.value ? 'var(--white)' : 'transparent',
                  color: mensal === opt.value ? 'var(--ink)' : 'var(--ink-40)',
                  boxShadow: mensal === opt.value ? '0 1px 6px rgba(28,25,23,0.08)' : 'none',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Cards de valor */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {valores.map((v) => {
              const ativo = valorSelecionado === v.valor && !valorCustom
              return (
                <button
                  key={v.valor}
                  onClick={() => { setValorSelecionado(v.valor); setValorCustom('') }}
                  style={{
                    fontFamily: 'var(--font-garamond)',
                    fontSize: '22px',
                    fontWeight: 500,
                    color: ativo ? 'var(--terra)' : 'var(--ink)',
                    background: ativo ? 'var(--terra-light)' : 'var(--ink-6)',
                    border: ativo ? '1.5px solid var(--terra)' : '1.5px solid transparent',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 0',
                    cursor: 'pointer',
                    transition: 'all 200ms',
                    boxShadow: ativo ? '0 0 0 3px rgba(193,68,14,0.12)' : 'none',
                  }}
                >
                  R$ {v.valor}
                </button>
              )
            })}
          </div>

          {/* Valor customizado */}
          <div
            className="flex items-center gap-3 mb-5"
            style={{
              background: 'var(--ink-6)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              border: valorCustom ? '1.5px solid var(--terra)' : '1.5px solid transparent',
              transition: 'border 200ms',
            }}
          >
            <span style={{ fontFamily: 'var(--font-jakarta)', fontSize: '14px', color: 'var(--ink-40)' }}>R$</span>
            <input
              type="number"
              placeholder="Outro valor"
              value={valorCustom}
              onChange={(e) => { setValorCustom(e.target.value); setValorSelecionado(0) }}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-jakarta)',
                fontSize: '15px',
                color: 'var(--ink)',
              }}
            />
          </div>

          {/* Impacto */}
          {itemSelecionado && (
            <div
              style={{
                background: 'var(--terra-light)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                marginBottom: '20px',
              }}
            >
              <p style={{ fontFamily: 'var(--font-jakarta)', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '8px' }}>
                Com R$ {itemSelecionado.valor}/{mensal ? 'mês' : 'vez'} você garante:
              </p>
              <ul className="flex flex-col gap-2">
                {itemSelecionado.impacto.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span style={{ color: 'var(--terra)', marginTop: '2px', flexShrink: 0 }}>•</span>
                    <span style={{ fontFamily: 'var(--font-jakarta)', fontSize: '13px', color: 'var(--ink-70)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <button
            className="flex items-center justify-center gap-2 w-full"
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--white)',
              background: 'var(--terra)',
              borderRadius: 'var(--radius-full)',
              padding: '15px 0',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 200ms',
              marginBottom: '16px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--terra-dark)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--terra)')}
          >
            <Heart size={16} fill="white" />
            Doar R$ {valorAtual}{mensal ? '/mês' : ''}
          </button>

          {/* Badges segurança */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <Lock size={12} color="var(--ink-40)" />
              <span style={{ fontFamily: 'var(--font-jakarta)', fontSize: '11px', color: 'var(--ink-40)' }}>Seguro</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield size={12} color="var(--ink-40)" />
              <span style={{ fontFamily: 'var(--font-jakarta)', fontSize: '11px', color: 'var(--ink-40)' }}>SSL</span>
            </div>
            <span style={{ fontFamily: 'var(--font-jakarta)', fontSize: '11px', color: 'var(--ink-40)' }}>Pix · Cartão · Boleto</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
