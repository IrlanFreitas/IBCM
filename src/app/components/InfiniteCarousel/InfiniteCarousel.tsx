import { Link } from "react-router";
import styles from "./InfiniteCarousel.module.css";

const companies = [
  { name: "Vercel", abbr: "▲" },
  { name: "Stripe", abbr: "S/" },
  { name: "Figma", abbr: "◈" },
  { name: "Linear", abbr: "⬡" },
  { name: "Notion", abbr: "N°" },
  { name: "Loom", abbr: "⊙" },
  { name: "Framer", abbr: "⌘" },
  { name: "Supabase", abbr: "⚡" },
  { name: "Planetscale", abbr: "⊛" },
  { name: "Railway", abbr: "◎" },
  { name: "Resend", abbr: "✦" },
  { name: "Clerk", abbr: "◐" },
];

// Duplicate for seamless infinite loop
const allCards = [...companies, ...companies];

export default function InfiniteCarousel() {
  const row1 = allCards;

  return (
    <section className={styles.section} aria-label="Quem apoia o IBCM">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Quem apoia o IBCM</h2>
        <p className={styles.sectionSubtitle}>
          Empresas e instituições que acreditam no nosso trabalho e <br />
          caminham lado a lado conosco para transformar vidas na Bahia.
        </p>
      </div>

      <div className={styles.carouselOuter}>
        {/* Row 1 — forward */}
        <div className={styles.carouselTrackWrapper}>
          <div className={styles.carouselTrack} aria-hidden="true">
            {row1.map((company, i) => (
              <div className={styles.logoCard} key={`r1-${i}`}>
                <span className={styles.logoAbbr}>{company.abbr}</span>
                <span className={styles.logoName}>{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link
        to="/doe-agora"
        className="flex items-center justify-center gap-2"
        style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "15px",
          fontWeight: 600,
          color: "var(--white)",
          background: "var(--terra)",
          borderRadius: "var(--radius-full)",
          padding: "14px 28px",
          textDecoration: "none",
          transition: "background 200ms",
          width: 200,
          margin: 'auto',
          marginTop: 48,
          flex: 1,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--terra-dark)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "var(--terra)")
        }
      >
        Faça uma doação
      </Link>
    </section>
  );
}
