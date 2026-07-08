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
        <h2 className={styles.title}>Apoie nossos projetos</h2>
        <p className={styles.lead}>
          Cada projeto da IBCM responde a uma necessidade real:{" "}
          <strong>
            comida, moradia, saúde, educação, trabalho, convivência, proteção e
            direitos.{" "}
          </strong>
          Com a sua doação, esse cuidado continua chegando a quem mais precisa.
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          <Link to="/doe-agora" className={styles.cta}>
            Doe agora
          </Link>
          <Link to="/doe-agora" className={styles.cta2}>
            Seja um parceiro
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
