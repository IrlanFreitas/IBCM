import { type ReactNode } from "react";
import { motion } from "motion/react";
import { CalendarDays, Baby, Home, Sprout } from "lucide-react";
import { useOpcoes } from "../../../hooks/useOpcoes";
import styles from "./ImpactBar.module.css";

export interface ImpactStat {
  numero: string;
  label: string;
  icon: ReactNode | null;
}

interface ImpactBarProps {
  variant?: "home" | "quem-somos";
  stats?: ImpactStat[];
}

const ease = [0.22, 1, 0.36, 1] as const;

const HOME_STATS: ImpactStat[] = [
  {
    numero: "40",
    label: "Anos de atuação",
    icon: <CalendarDays size={28} strokeWidth={1.5} />,
  },
  {
    numero: "89",
    label: "Crianças atendidas na creche",
    icon: <Baby size={28} strokeWidth={1.5} />,
  },
  {
    numero: "250",
    label: "Famílias acompanhadas",
    icon: <Home size={28} strokeWidth={1.5} />,
  },
  {
    numero: "400",
    label: "Jovens inseridos em projetos",
    icon: <Sprout size={28} strokeWidth={1.5} />,
  },
];

export function ImpactBar({
  variant = "home",
  stats: statsProp,
}: ImpactBarProps) {
  const { data: opcoes } = useOpcoes();
  const stats =
    statsProp ?? (opcoes?.stats?.length ? opcoes.stats : HOME_STATS);

  return (
    <section
      className={styles.section}
      data-variant={variant}
      aria-label="Números de impacto"
    >
      <div className={styles.grid}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay: i * 0.12 }}
            className={styles.statItem}
          >
            {stat?.icon !== null && (
              <span className={styles.statIcon} aria-hidden="true">
                {stat?.icon}
              </span>
            )}
            <span className={styles.statNumber}>{stat.numero}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
