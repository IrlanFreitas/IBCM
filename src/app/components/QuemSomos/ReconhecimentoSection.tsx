import { motion } from "motion/react";
import { Eyebrow } from "../Eyebrow/Eyebrow";
import styles from "./ReconhecimentoSection.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export function ReconhecimentoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow color="rgba(255,255,255,0.5)">Reconhecimento</Eyebrow>
          <h2 className={styles.title}>Reconhecimento e confiança</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          <p className={styles.body}>
            Ao longo de sua história, a IBCM conquistou reconhecimento por sua
            atuação no enfrentamento ao HIV/aids, no acolhimento social, na
            proteção de crianças e adolescentes, na formação de jovens e na
            defesa de direitos humanos.
          </p>
          <p className={styles.body}>
            A instituição participa de fóruns, conselhos e redes de proteção
            social, além de construir parcerias com organizações públicas,
            privadas e da sociedade civil.
          </p>
          <p className={styles.closing}>
            Cada doação, parceria e gesto de solidariedade fortalece um trabalho
            real, contínuo e profundamente comprometido com quem mais precisa.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
