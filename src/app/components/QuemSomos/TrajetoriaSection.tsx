import { motion } from "motion/react";
import { Eyebrow } from "../Eyebrow/Eyebrow";
import styles from "./TrajetoriaSection.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export function TrajetoriaSection() {
  return (
    <section className={styles.section}>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow color="var(--terra)">Trajetória</Eyebrow>

          <p className={styles.lead}>
            Nossa trajetória
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          <p className={styles.body}>O que começou como o gesto de uma pessoa se tornou uma instituição inteira.
            Ao longo de sua história, a IBCM criou projetos, fortaleceu redes e se tornou referência no cuidado a pessoas em situação de vulnerabilidade social, especialmente aquelas que vivem e convivem com HIV/aids.
          </p>
          <p className={styles.body}>
            Sua trajetória é marcada por presença nas ruas, acolhimento de famílias, cuidado com crianças, formação de jovens, defesa de direitos humanos e articulação com parceiros públicos, privados e da sociedade civil.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
