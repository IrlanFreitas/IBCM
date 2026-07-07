import { motion } from "motion/react";
import { Eyebrow } from "../Eyebrow/Eyebrow";
import styles from "./MissaoSection.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const PILARES = [
  {
    label: "Missão",
    text: "Reduzir vulnerabilidades relacionadas ao HIV/aids; promover prevenção, adesão ao tratamento, segurança alimentar, combate à discriminação, defesa dos direitos humanos e inclusão produtiva de pessoas que vivem e convivem com HIV/aids.",
    accentColor: "var(--terra)",
    labelColor: "var(--terra)",
  },
  {
    label: "Visão",
    text: "Ser reconhecida pela defesa dos direitos humanos, pela proteção de populações vulnerabilizadas e pelo compromisso com uma sociedade mais justa, inclusiva e solidária.",
    accentColor: "var(--musgo-light)",
    labelColor: "var(--musgo-light)",
  },
  {
    label: "Valores",
    text: "Solidariedade, respeito às diversidades, acolhimento sem julgamento, defesa da vida, justiça social, transparência e combate a todas as formas de discriminação.",
    accentColor: "var(--ocre)",
    labelColor: "var(--ocre)",
  },
];

export function MissaoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow color="var(--ocre)">Identidade institucional</Eyebrow>
          <h2 className={styles.title}>Missão, visão e valores</h2>
        </motion.div>

        <div className={styles.grid}>
          {PILARES.map((pilar, i) => (
            <motion.div
              key={pilar.label}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.15 }}
            >
              <div
                className={styles.cardTop}
                style={{ background: pilar.accentColor }}
              />
              <p
                className={styles.cardLabel}
                style={{ color: pilar.labelColor }}
              >
                {pilar.label}
              </p>
              <p className={styles.cardText}>{pilar.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
