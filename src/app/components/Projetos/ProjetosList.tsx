import { motion } from "motion/react";
import { ImageWithFallback } from "../ImageWithFallback/ImageWithFallback";
import styles from "./ProjetosList.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export interface Projeto {
  titulo: string;
  tag: string;
  tagColor: string;
  cor: string;
  image: string;
  badge?: string;
  descricao: string;
  impacto: string;
  bullets: string[];
}

interface ProjetosListProps {
  projetos: Projeto[];
}

export function ProjetosList({ projetos }: ProjetosListProps) {
  return (
    <>
      {projetos.map((projeto, i) => (
        <motion.article
          key={projeto.titulo}
          className={styles.item}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease, delay: 0.05 * i }}
        >
          {/* Coluna esquerda: imagem + impacto */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <ImageWithFallback
                src={projeto.image}
                alt={projeto.titulo}
                className={styles.image}
              />
            </div>
            <div className={styles.impactBox}>
              <span className={styles.impactLabel}>Impacto em números</span>
              <p className={styles.impactText}>{projeto.impacto}</p>
            </div>
          </div>

          {/* Coluna direita: conteúdo */}
          <div className={styles.content}>
            <span className={styles.tag} style={{ color: projeto.tagColor }}>
              {projeto.tag}
            </span>

            {projeto.badge && (
              <span className={styles.badge}>{projeto.badge}</span>
            )}

            <h2 className={styles.title}>{projeto.titulo}</h2>

            <p className={styles.desc}>{projeto.descricao}</p>

            <div className={styles.ofertasHeader}>
              <span className={styles.ofertasLabel}>O que oferecemos</span>
              <div className={styles.ofertasLine} aria-hidden="true" />
            </div>

            <ul className={styles.bullets}>
              {projeto.bullets.map((b) => (
                <li key={b} className={styles.bullet}>
                  <span
                    className={styles.bulletDot}
                    style={{ background: projeto.cor }}
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      ))}
    </>
  );
}
