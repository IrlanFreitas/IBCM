import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Shield, Lock, Check } from "lucide-react";
import { useOpcoes } from "../../../hooks/useOpcoes";
import styles from "./DoeAgora.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const STATIC_VALORES = [
  {
    valor: 30,
    impacto: [
      "5 refeições por semana para uma criança",
      "Suporte nutricional em tratamento HIV",
      "Kit higiene mensal básico",
    ],
  },
  {
    valor: 50,
    impacto: [
      "Contribui com o aluguel de uma casa de apoio",
      "Garante 2 crianças na creche por 1 semana",
      "Material didático para turma",
    ],
  },
  {
    valor: 100,
    impacto: [
      "Cobre tratamento ARV de 1 paciente",
      "1 semana de atendimento integral a uma família",
      "Apoio psicológico mensal",
    ],
  },
  {
    valor: 200,
    impacto: [
      "1 mês de alimentação para 2 crianças",
      "Materiais pedagógicos completos",
      "Cobre consultas médicas mensais",
    ],
  },
];

export function DoeAgora() {
  const { data: opcoes } = useOpcoes();
  const [mensal, setMensal] = useState(true);
  const [valorSelecionado, setValorSelecionado] = useState(50);
  const [valorCustom, setValorCustom] = useState("");

  const valores = opcoes?.valores_doacao?.length
    ? opcoes.valores_doacao.map((v) => ({
        valor: v.valor,
        impacto: v.impactos.map((i) => i.texto),
      }))
    : STATIC_VALORES;

  const valorAtual = valorSelecionado || Number(valorCustom) || 50;
  const itemSelecionado = valores.find((v) => v.valor === valorSelecionado);

  return (
    <section id="doe-agora" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.headingGroup}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <div
            className={styles.text}
            style={{ color: "#C1440E", fontWeight: "bold" }}
          >
            Doe Agora
          </div>
          <h2 className={styles.title}>
            Sua doação transforma{" "}
            <span className={styles.titleHighlight}>vidas</span>
          </h2>
          <p className={styles.subtitle}>
            Cada contribuição vai diretamente para os nossos <br />
            projetos em Salvador.
          </p>
        </motion.div>

        {/* Formulário */}
        <motion.div
          className={styles.formCard}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
        >
          {/* Toggle mensal / única */}
          <div className={styles.toggle}>
            {[
              { label: "Doação mensal", value: true },
              { label: "Doação única", value: false },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => setMensal(opt.value)}
                className={styles.toggleBtn}
                style={{
                  background:
                    mensal === opt.value ? "var(--white)" : "transparent",
                  color: mensal === opt.value ? "var(--ink)" : "var(--ink-40)",
                  boxShadow:
                    mensal === opt.value
                      ? "0 1px 6px rgba(28,25,23,0.08)"
                      : "none",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Info box doação mensal */}
          <div className={styles.infoBox}>
            <Heart size={20} fill="var(--musgo)" color="var(--musgo)" />
            <div>
              <p className={styles.infoTitle}>
                Doações mensais garantem nossa continuidade.
              </p>
              <p className={styles.infoText}>
                Com previsibilidade financeira, mantemos e ampliamos os
                programas ao longo do ano.
              </p>
            </div>
          </div>

          {/* Cards de valor */}
          <div className={styles.valoresGrid}>
            {valores.map((v) => {
              const ativo = valorSelecionado === v.valor && !valorCustom;
              return (
                <button
                  key={v.valor}
                  onClick={() => {
                    setValorSelecionado(v.valor);
                    setValorCustom("");
                  }}
                  className={styles.valorBtn}
                  style={{
                    color: ativo ? "var(--terra)" : "var(--ink)",
                    background: ativo ? "var(--terra-light)" : "white",
                    border: ativo
                      ? "1.5px solid var(--terra)"
                      : "1.5px solid lightgray",
                    boxShadow: ativo
                      ? "0 0 0 3px rgba(193,68,14,0.12)"
                      : "none",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    paddingLeft: 10,
                    fontWeight: "bold",
                    height: 82,
                    // width: "fit-content",
                  }}
                >
                  R$ {v.valor}
                  {mensal && (
                    <span
                      style={{
                        fontSize: 12,
                        width: "fit-content",
                        marginLeft: 0,
                        color: "#A3A3A3",
                      }}
                    >
                      /mês
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Impacto do valor selecionado */}
          {itemSelecionado && (
            <div className={styles.impacto}>
              <p className={styles.impactoLabel}>
                Com R$ {itemSelecionado.valor}/{mensal ? "mês" : "vez"} você
                garante:
              </p>
              <ul className={styles.impactoList}>
                {itemSelecionado.impacto.map((item) => (
                  <li key={item} className={styles.impactoItem}>
                    <span className={styles.impactoBullet}>
                      <Check size={20} color="gray" />
                    </span>
                    <span className={styles.impactoText}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Valor customizado */}
          <p className={styles.outroValor}>Ou informe outro valor (R$)</p>
          <div
            className={styles.customValueWrapper}
            style={{
              border: valorCustom
                ? "1.5px solid var(--terra)"
                : "1.5px solid transparent",
            }}
          >
            <span className={styles.customValuePrefix}>R$</span>
            <input
              type="number"
              placeholder="Outro valor"
              value={valorCustom}
              onChange={(e) => {
                setValorCustom(e.target.value);
                setValorSelecionado(0);
              }}
              className={styles.customValueInput}
            />
          </div>

          {/* CTA */}
          <button className={styles.ctaBtn}>
            <Heart size={16} fill="white" />
            Doar R$ {valorAtual}
            {mensal ? "/mês" : ""}
          </button>

          {/* Badges de segurança */}
          <div className={styles.badgesRow}>
            <div className={styles.badge}>
              <Lock size={12} color="var(--ink-40)" />
              <span className={styles.badgeText}>Seguro</span>
            </div>
            <div className={styles.badge}>
              <Shield size={12} color="var(--ink-40)" />
              <span className={styles.badgeText}>SSL</span>
            </div>
            <span className={styles.badgeText}>Pix · Cartão · Boleto</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
