// import { Link } from "react-router";
import styles from "./InfiniteCarousel.module.css";

const companies = [
  { image: "/parceiros/Cencosud.png" },
  { image: "/parceiros/CriancaEsperanca.jpg" },
  { image: "/parceiros/FundacaoSalvadorArena.png" },
  { image: "/parceiros/GSK.png" },
  { image: "/parceiros/InstitutoLugardeFaz.jpg" },
  { image: "/parceiros/SECSALVADOR.jpg" },
  { image: "/parceiros/SJDH.jpg" },
  { image: "/parceiros/SPMJ.png" },
  { image: "/parceiros/UNESCO.webp" },
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
                {/* <span className={styles.logoAbbr}>{company.abbr}</span>
                <span className={styles.logoName}>{company.name}</span> */}
                <img
                  src={company.image}
                  alt="parceiro"
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <a href="https://wa.me/557134509759?text=Adoraria%20ser%20um%20parceiro!" target="_blank" className={styles.cta}>
        Quero ser um parceiro
      </a>
    </section>
  );
}
