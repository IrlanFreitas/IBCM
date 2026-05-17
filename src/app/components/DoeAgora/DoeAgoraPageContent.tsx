import { useState } from 'react'
import { Heart, Shield, Lock, Check, Activity, Home, Users, Minus } from 'lucide-react'
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback'
import { useOpcoes } from '../../../hooks/useOpcoes'
import styles from './DoeAgoraPageContent.module.css'

const STATIC_VALORES = [
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
      'Aluguel parcial de casa de apoio',
      '2 crianças na creche por 1 dia',
      'Medicação básica mensal',
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

const STATIC_STATS = [
  { icon: Activity, numero: '12.450', label: 'Testes de HIV/ST' },
  { icon: Heart,    numero: '2.800',  label: 'Atendimentos Psicológicos' },
  { icon: Home,     numero: '450',    label: 'Famílias Amparadas' },
  { icon: Users,    numero: '800',    label: 'Ações na Ronda Noturna' },
]

export function DoeAgoraPageContent() {
  const { data: opcoes } = useOpcoes()
  const [mensal, setMensal] = useState(true)
  const [valorSelecionado, setValorSelecionado] = useState(50)
  const [valorCustom, setValorCustom] = useState('')

  const valores = opcoes?.valores_doacao?.length
    ? opcoes.valores_doacao.map((v) => ({
        valor: v.valor,
        impacto: v.impactos.map((i) => i.texto),
      }))
    : STATIC_VALORES

  const valorAtual = valorSelecionado || Number(valorCustom) || 50
  const itemSelecionado = valores.find((v) => v.valor === valorSelecionado)

  return (
    <section className={styles.section}>
      <div className={styles.layout}>

        {/* ── Coluna do formulário ── */}
        <div className={styles.formCol}>
          <div className={styles.formCard}>

            {/* Toggle */}
            <div className={styles.toggle}>
              {[
                { label: 'Doação mensal', value: true },
                { label: 'Doação única', value: false },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setMensal(opt.value)}
                  className={styles.toggleBtn}
                  style={{
                    background: mensal === opt.value ? 'var(--white)' : 'transparent',
                    color: mensal === opt.value ? 'var(--ink)' : 'var(--ink-40)',
                    boxShadow: mensal === opt.value ? '0 1px 6px rgba(28,25,23,0.08)' : 'none',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Info box mensal */}
            {mensal && (
              <div className={styles.infoBox}>
                <Heart size={18} fill="var(--musgo)" color="var(--musgo)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <span className={styles.infoTitle}>Doações mensais garantem nossa continuidade. </span>
                  <span className={styles.infoText}>
                    Com previsibilidade financeira, mantemos e ampliamos os programas ao longo do ano.
                  </span>
                </div>
              </div>
            )}

            {/* Cards de valor */}
            <div className={styles.valoresGrid}>
              {valores.map((v) => {
                const ativo = valorSelecionado === v.valor && !valorCustom
                return (
                  <button
                    key={v.valor}
                    onClick={() => { setValorSelecionado(v.valor); setValorCustom('') }}
                    className={styles.valorBtn}
                    style={{
                      color: ativo ? 'var(--terra)' : 'var(--ink)',
                      background: ativo ? 'var(--terra-light)' : 'var(--white)',
                      border: ativo ? '1.5px solid var(--terra)' : '1.5px solid var(--ink-12)',
                      boxShadow: ativo ? '0 0 0 3px rgba(193,68,14,0.10)' : 'none',
                    }}
                  >
                    R$ {v.valor}
                    {mensal && <span className={styles.valorSuffix}>/mês</span>}
                  </button>
                )
              })}
            </div>

            {/* Impacto */}
            {itemSelecionado && (
              <div className={styles.impacto}>
                <p className={styles.impactoLabel}>
                  Com R$ {itemSelecionado.valor}/{mensal ? 'mês' : 'vez'} você financia:
                </p>
                <ul className={styles.impactoList}>
                  {itemSelecionado.impacto.map((item) => (
                    <li key={item} className={styles.impactoItem}>
                      <Check size={14} color="var(--terra)" style={{ flexShrink: 0, marginTop: 1 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Valor customizado */}
            <p className={styles.outroValorLabel}>Ou informe outro valor (R$)</p>
            <div
              className={styles.customValueWrapper}
              style={{ borderColor: valorCustom ? 'var(--terra)' : 'transparent' }}
            >
              <span className={styles.customValuePrefix}>R$</span>
              <input
                type="number"
                placeholder="Ex: 75"
                value={valorCustom}
                onChange={(e) => { setValorCustom(e.target.value); setValorSelecionado(0) }}
                className={styles.customValueInput}
              />
            </div>

            {/* CTA */}
            <button className={styles.ctaBtn}>
              <Heart size={16} fill="white" />
              Doe R$ {valorAtual}{mensal ? ' / mês' : ''}
            </button>

            {/* Badges */}
            <div className={styles.badgesRow}>
              <div className={styles.badge}>
                <Lock size={12} color="var(--ink-40)" />
                <span className={styles.badgeText}>Pagamento seguro</span>
              </div>
              <div className={styles.badge}>
                <Shield size={12} color="var(--ink-40)" />
                <span className={styles.badgeText}>SSL certificado</span>
              </div>
              <span className={styles.badgeText}>Pix · Cartão · Boleto</span>
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className={styles.sidebar}>

          {/* Card stats */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardHeader}>
              <span className={styles.sideCardTitle}>Com você, salvamos vidas!</span>
              <button className={styles.sideCardBtn} aria-label="Recolher" tabIndex={-1}>
                <Minus size={14} />
              </button>
            </div>
            <div className={styles.statsList}>
              {STATIC_STATS.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className={styles.statItem}>
                    <div className={styles.statIcon}>
                      <Icon size={16} color="var(--terra)" strokeWidth={1.75} />
                    </div>
                    <div className={styles.statBody}>
                      <span className={styles.statNumber}>{stat.numero}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Card IBCM+ */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardHeader}>
              <span className={styles.sideCardTitle}>IBCM+</span>
              <button className={styles.sideCardBtn} aria-label="Recolher" tabIndex={-1}>
                <Minus size={14} />
              </button>
            </div>
            <div className={styles.ibcmImageWrapper}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=600&auto=format&fit=crop&q=70"
                alt="Mãe e criança atendidas pelo IBCM"
                className={styles.ibcmImage}
              />
              <span className={styles.ibcmBadge}>Mais carinho</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
