import { Link } from "react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { useOpcoes } from "../../../hooks/useOpcoes";
import styles from "./Footer.module.css";

const colunas = [
  {
    titulo: "Institucional",
    links: [
      { label: "Quem somos", to: "/quem-somos" },
      { label: "Transparência", to: "/transparencia" },
    ],
  },
  {
    titulo: "Projetos",
    links: [
      { label: "HIV/AIDS — Prevenção", to: "/projetos" },
      { label: "Creche IBCM", to: "/projetos" },
      { label: "CPDD — Casarão", to: "/projetos" },
      { label: "Ver todos", to: "/projetos" },
    ],
  },
  {
    titulo: "Apoie",
    links: [
      { label: "Doe agora", to: "/transparencia" },
      { label: "Doação recorrente", to: "/transparencia" },
      { label: "Parcerias", to: "/transparencia" },
    ],
  },
];

export function Footer() {
  const { data: opcoes } = useOpcoes();

  const endereco = opcoes?.endereco || (
    <>
      Rua Santa Clara do Desterro, 85 - Nazaré,
      <br /> Salvador - BA, 41280-300
    </>
  );
  const email = opcoes?.email || "ibcm33@terra.com.br";
  const telefone = opcoes?.telefone || "(71) 3450-9759";
  const cnpj = opcoes?.cnpj || "CNPJ 00.584.568/0001-05";
  const instagramUrl =
    opcoes?.instagram_url || "https://www.instagram.com/instituicaoibcm/";
  const facebookUrl =
    opcoes?.facebook_url || "https://www.facebook.com/instituicaoibcm";

  const redesSociais = [
    { Icon: Facebook, label: "Facebook", href: facebookUrl },
    { Icon: Instagram, label: "Instagram", href: instagramUrl },
  ];

  const contatos = [
    { Icon: MapPin, text: endereco },
    { Icon: Mail, text: email },
    { Icon: Phone, text: telefone },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <img
          style={{ width: 50, height: "100%" }}
          src="/marca/ibcm_rodape.png"
          alt="Logo IBCM"
        />
        <Link to="/" className={styles.brandLink}>
          <span className={styles.brandName}>IBCM</span>
          <p style={{ color: "#FFF", opacity: .65 }}>
            Instituto Beneficente Conceição Macedo
          </p>
        </Link>
      </div>

      {/* Top row */}
      <div className={styles.topRow}>

        {/* Links por seção */}
        <div className={styles.linksGrid}>
          {colunas.map((col) => (
            <div key={col.titulo} className={styles.linkCol}>
              <span className={styles.linkColTitle}>{col.titulo}</span>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={styles.linkColItem}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Contato */}
        <div className={styles.contactCol}>
          <span className={styles.contactColTitle}>Contato</span>
          {contatos.map(({ Icon, text }) => (
            <div key={text} className={styles.contactItem}>
              <Icon size={14} color="var(--terra)" style={{ flexShrink: 0 }} />
              <span className={styles.contactText}>{text}</span>
            </div>
          ))}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9078711167813!2d-38.5071334!3d-12.9777441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7161ae4661d6f27%3A0x2b4a5bc92b680e1d!2sInstitui%C3%A7%C3%A3o%20Assistencial%20Beneficente%20Concei%C3%A7%C3%A3o%20Macedo!5e0!3m2!1spt-BR!2sbr!4v1778709945409!5m2!1spt-BR!2sbr"
            style={{ width: 250, height: 75, borderRadius: 5 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className={styles.socialRow}>
            {redesSociais.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Rodapé final */}
      <div className={styles.bottomRow}>
        <span className={styles.bottomText}>
          © {new Date().getFullYear()} IBCM — Instituto Beneficente Conceição
          Macedo · CNPJ {cnpj}
        </span>
        <span className={styles.bottomText}>
          Feito com cuidado em Salvador, Bahia
        </span>
      </div>
    </footer>
  );
}
