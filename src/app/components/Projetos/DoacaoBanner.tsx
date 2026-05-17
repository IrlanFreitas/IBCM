import { motion } from "motion/react";
import { Link } from "react-router";
import styles from "./DoacaoBanner.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export function DoacaoBanner() {
  return (
    <section className={styles.section} aria-label="Faça uma doação">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease }}
      >
        <h2 className={styles.title}>Faça parte dessa transformação</h2>
        <p className={styles.lead}>
          Cada doação, cada parceria, cada voluntário multiplica o impacto
          desses projetos. Você pode fazer a diferença hoje.
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          <Link to="/doe-agora" className={styles.cta}>
            Doe agora
          </Link>
          <Link to="/doe-agora" className={styles.cta2}>
            Seja voluntário
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
