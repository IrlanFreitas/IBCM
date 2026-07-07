import { motion } from "motion/react";
import { Eyebrow } from "../Eyebrow/Eyebrow";
import { ImageWithFallback } from "../ImageWithFallback/ImageWithFallback";
import styles from "./FundadoraSection.module.css";

// TODO: quando WP estiver pronto, receber estes dados de `useOpcoes()`:
//   opcoes.fundadora_nome, opcoes.fundadora_bio, opcoes.fundadora_imagem?.url

const ease = [0.22, 1, 0.36, 1] as const;

const STATIC = {
  nome: "Maria Conceição Macedo dos Santos",
  bio1: "No registro, ela é Maria Conceição Macedo dos Santos. Para quem encontrou nela abrigo e afeto, é Tia Conça — ou Mãe Conça. Nascida em Mutuípe, no interior da Bahia, Tia Conça se tornou auxiliar de enfermagem e foi trabalhar no Hospital Geral Roberto Santos, em Salvador. Nos anos 1980, em meio ao início da epidemia de aids, viu pacientes receberem alta sem ter para onde voltar. Muitos haviam sido rejeitados pela própria família. Ela não aceitou esse abandono como destino. Com o pouco que tinha, alugou quartos, abriu portas e começou a acolher pessoas que a sociedade havia recusado.",
  bio2: "Para sustentar esse cuidado, cozinhava e vendia feijoada, caruru, andu e doces. À noite, a Kombi da IBCM cruzava Salvador levando preservativos, comida e escuta a profissionais do sexo, pessoas em situação de rua e outras populações vulnerabilizadas. Tia Conça sempre fez do acolhimento uma prática sem julgamento. Nunca perguntou a crença, a cor, a orientação sexual, a identidade de gênero, a condição de saúde ou a história de quem chegava. Apenas cuidou. Hoje, sua trajetória segue viva na missão da IBCM: estar onde o cuidado mais precisa chegar.",
  citacao:
    "“Quanto mais cedo a gente puder ajudar os necessitados, melhores dias terá a humanidade.” — Tia Conça",
};

export function FundadoraSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow color="var(--terra)">Fundadora</Eyebrow>
          <h2 className={styles.name}>{STATIC.nome}</h2>

          <p className={styles.bio}>{STATIC.bio1}</p>
          <p className={styles.bio}>{STATIC.bio2}</p>

          <blockquote className={styles.quoteBlock}>
            <p className={styles.quoteText}>{STATIC.citacao}</p>
          </blockquote>
        </motion.div>

        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          <div className={styles.imageFrame}>
            {/* TODO: substituir por `opcoes?.fundadora_imagem?.url` */}
            <ImageWithFallback
              src="/imagens/maria_conceicao.png"
              alt="Maria Conceição Macedo dos Santos, fundadora do IBCM"
              className={styles.image}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
