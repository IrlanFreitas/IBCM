import { motion } from "motion/react";
import { Heart, Shield, Lock, Check } from "lucide-react";

import styles from "./DoeAgora.module.css";
import { STATIC_VALORES } from "./DoeAgora.utils";

const ease = [0.22, 1, 0.36, 1] as const;



export function DoeAgora() {
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
            Sua doação{"  "}
            <span className={styles.titleHighlight}>salva vidas</span> todos os
            dias
          </h2>
          <p className={styles.subtitle}>
            Cada contribuição fortalece o cuidado, a alimentação, a educação e a
            proteção de quem mais precisa, em Salvador.
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
                  <p className={styles.impactoLabel}>Esse valor financia:</p>
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
