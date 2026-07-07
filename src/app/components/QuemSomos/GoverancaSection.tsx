import { motion } from "motion/react";
import { Eyebrow } from "../Eyebrow/Eyebrow";
import styles from "./GoverancaSection.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const ESTRUTURA = [
  {
    label: "Instância máxima",
    title: "Assembleia Geral",
    desc: "Órgão deliberativo supremo da instituição.",
    roles: [],
    accentColor: "var(--terra)",
    labelColor: "var(--terra)",
  },
  {
    label: "Diretoria",
    title: "Presidência",
    desc: "Conduz a instituição com apoio das demais instâncias diretivas.",
    roles: ["Presidência", "Vice-presidência", "Secretaria", "Tesouraria"],
    accentColor: "var(--musgo)",
    labelColor: "var(--musgo)",
  },
  {
    label: "Fiscalização",
    title: "Conselho Fiscal",
    desc: "Acompanha a gestão e contribui para a boa aplicação dos recursos.",
    roles: [],
    accentColor: "var(--ocre)",
    labelColor: "var(--ocre)",
  },
];

export function GoverancaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.colLeft}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow color="var(--terra)">Estrutura</Eyebrow>
          <h2 className={styles.title}>Estrutura e governança</h2>
          <p className={styles.intro}>
            A IBCM atua com responsabilidade e transparência. Sua governança é
            composta por instâncias que asseguram decisões coletivas e boa
            aplicação dos recursos.
          </p>
        </motion.div>

        <div className={styles.colRight}>
          {ESTRUTURA.map((item, i) => (
            <motion.div
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.12 }}
            >
              <div
                className={styles.accent}
                style={{ background: item.accentColor }}
              />
              <div className={styles.cardBody}>
                <p
                  className={styles.cardLabel}
                  style={{ color: item.labelColor }}
                >
                  {item.label}
                </p>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
                {item.roles.length > 0 && (
                  <div className={styles.roles}>
                    {item.roles.map((role) => (
                      <span key={role} className={styles.role}>
                        {role}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
