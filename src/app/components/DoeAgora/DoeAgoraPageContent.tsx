import { motion } from "motion/react";
import {
  Heart,
  Shield,
  Lock,
  Check,
  Activity,
  Home,
  Users,
  Minus,
} from "lucide-react";
import { ImageWithFallback } from "../ImageWithFallback/ImageWithFallback";
import styles from "./DoeAgoraPageContent.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const STATIC_VALORES = [
  {
    valor: 25,
    impacto: [
      "5 refeições por semana para uma criança",
      "Suporte nutricional em tratamento HIV",
      "Kit higiene mensal básico",
    ],
    link: "https://doa.re/3Bzm",
  },
  {
    valor: 50,
    impacto: [
      "Contribui com o aluguel de uma casa de apoio",
      "Garante 2 crianças na creche por 1 semana",
      "Material didático para turma",
    ],
    link: "https://doa.re/4RoI",
  },
  {
    valor: 100,
    impacto: [
      "Cobre tratamento ARV de 1 paciente",
      "1 semana de atendimento integral a uma família",
      "Apoio psicológico mensal",
    ],
    link: "https://doa.re/LXFK",
  },
  {
    valor: 200,
    impacto: [
      "1 mês de alimentação para 2 crianças",
      "Materiais pedagógicos completos",
      "Cobre consultas médicas mensais",
    ],
    link: "https://doa.re/kaVW",
  },
];

const STATIC_STATS = [
  { icon: Activity, numero: "12.450", label: "Testes de HIV/ST" },
  { icon: Heart, numero: "2.800", label: "Atendimentos Psicológicos" },
  { icon: Home, numero: "450", label: "Famílias Amparadas" },
  { icon: Users, numero: "800", label: "Ações na Ronda Noturna" },
];

export function DoeAgoraPageContent() {
  return (
    <section className={styles.section}>

      <div className={styles.layout}>
        {/* ── Coluna do formulário ── */}
        <div className={styles.formCol}>
          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >

            <div className={styles.infoBox}>
              <Heart
                size={18}
                fill="var(--musgo)"
                color="var(--musgo)"
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <span className={styles.infoTitle}>
                  Doações mensais garantem nossa continuidade.{" "}
                </span>
                <span className={styles.infoText}>
                  Com previsibilidade financeira, mantemos e ampliamos os
                  programas ao longo do ano.
                </span>
              </div>
            </div>

            {/* Cards de valor */}
            <div className={styles.valoresGrid}>
              {STATIC_VALORES.map((v, i) => (
                <motion.a
                  key={v.valor}
                  href={v.link}
                  className={styles.valorCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                >
                  <span className={styles.valorCardTitle}>R$ {v.valor}</span>

                  <div className={styles.valorCardImpacto}>
                    <p className={styles.impactoLabel}>
                      Esse valor financia:
                    </p>
                    <ul className={styles.impactoList}>
                      {v.impacto.map((item) => (
                        <li key={item} className={styles.impactoItem}>
                          <Check
                            size={14}
                            color="var(--terra)"
                            style={{ flexShrink: 0, marginTop: 1 }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* CTA */}
            <a
              className={styles.ctaBtn}
              href="https://doa.re/dEy9"
              target="_blank"
            >
              <Heart size={16} fill="white" />
              Doe outro valor
            </a>

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
          </motion.div>
        </div>

        {/* ── Sidebar ── */}
        <div className={styles.sidebar}>
          {/* Card stats */}
          <motion.div
            className={styles.sideCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
          >
            <div className={styles.sideCardHeader}>
              <span className={styles.sideCardTitle}>
                Com você, salvamos vidas!
              </span>
              <button
                className={styles.sideCardBtn}
                aria-label="Recolher"
                tabIndex={-1}
              >
                <Minus size={14} />
              </button>
            </div>
            <div className={styles.statsList}>
              {STATIC_STATS.map((stat) => {
                const Icon = stat.icon;
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
                );
              })}
            </div>
          </motion.div>

          {/* Card IBCM+ */}
          <motion.div
            className={styles.sideCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            <div className={styles.sideCardHeader}>
              <span className={styles.sideCardTitle}>IBCM+</span>
              <button
                className={styles.sideCardBtn}
                aria-label="Recolher"
                tabIndex={-1}
              >
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
          </motion.div>
        </div>
      </div>
      {/* Divisor */}
      <div className={styles.pixDivider}>
        <div className={styles.pixDividerLine} />
        <span className={styles.pixDividerText}>ou doe diretamente no pix</span>
        <div className={styles.pixDividerLine} />
      </div>
      <div className={styles.pixWrapper}>
        <motion.div
          className={styles.pixCard}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <div className={styles.pixInfo}>
            <span className={styles.pixEyebrow}>Pix · doação direta</span>
            <p className={styles.pixTitle}>Doe agora pelo Pix</p>
            <p className={styles.pixDesc}>
              Escaneie o código com o app do seu banco e confirme o valor que
              desejar. Sua doação chega integralmente ao IBCM.
            </p>
            <div className={styles.pixMeta}>
              <div className={styles.pixMetaRow}>
                <span className={styles.pixMetaLabel}>Beneficiário</span>
                <span className={styles.pixMetaValue}>
                  Instituto Beneficente Conceição Macedo
                </span>
              </div>
              <div className={styles.pixMetaRow}>
                <span className={styles.pixMetaLabel}>CNPJ</span>
                <span className={styles.pixMetaValue}>00.584.568/0001-05</span>
              </div>
              <div className={styles.pixMetaRow}>
                <span className={styles.pixMetaLabel}>Chave Pix</span>
                <span className={styles.pixMetaValue}>ibcm33@terra.com.br</span>
              </div>
            </div>
          </div>

          <div className={styles.pixQrCol}>
            <img
              src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-9%2F669%2F595669%2FMWRYHBol%2F6aeb5d4994f142218e4bd5f4d6b74034&methods=resize%2C1500%2C5000"
              alt="QR Code para doação via Pix ao IBCM"
              className={styles.pixQrImg}
              width={180}
              height={180}
            />
            <span className={styles.pixQrLabel}>
              Aponte a câmera do celular
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
