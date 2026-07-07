import { motion } from "motion/react";
import { Eyebrow } from "../Eyebrow/Eyebrow";
import styles from "./QuemFazSection.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const ROLES = [
  "Educadores",
  "Assistentes sociais",
  "Profissionais de saúde",
  "Equipe administrativa",
  "Colaboradores",
  "Voluntários",
  "Parceiros",
];

export function QuemFazSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.col}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow color="var(--terra)">Equipe</Eyebrow>
          <h2 className={styles.title}>Quem faz a IBCM</h2>
        </motion.div>

        <motion.div
          className={styles.col}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.18 }}
        >
          <p className={styles.lead}>
            A IBCM é feita por uma equipe multidisciplinar que une conhecimento
            técnico, compromisso social e afeto.
          </p>
          <p className={styles.body}>
            Educadores, assistentes sociais, profissionais de saúde, equipe
            administrativa, colaboradores, voluntários e parceiros atuam juntos
            para garantir cuidado contínuo às pessoas acompanhadas pela
            instituição.
          </p>

          <div className={styles.tags}>
            {ROLES.map((role) => (
              <span key={role} className={styles.tag}>
                {role}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
