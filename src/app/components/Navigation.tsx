import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Heart, Menu, X } from "lucide-react";

const links = [
  { label: "Quem somos", to: "/quem-somos" },
  { label: "Projetos e causas", to: "/projetos" },
  { label: "Transparência", to: "/transparencia" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(248, 245, 240, 0.95)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: scrolled ? "0 1px 24px rgba(28,25,23,0.08)" : "none",
          transition: "box-shadow 300ms ease",
          borderBottom: scrolled
            ? "1px solid var(--ink-6)"
            : "1px solid transparent",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: "0 clamp(16px, 4vw, 60px)", height: "130px" }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: "var(--font-garamond)",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "var(--ink)",
              textDecoration: "none",
            }}
            className="hidden md:flex"
          >
            <img
              style={{ width: 120 }}
              src="/marca/Logo_IBCM.png"
              alt="Logo IBCM"
            />
          </Link>

          <span className="block md:hidden">
            <h1 style={{ fontWeight: "900" }}>IBCM</h1>
            <p style={{opacity: .7, color: "1C1917"}}>Instituto Beneficente Conceição Macedo</p>
          </span>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontFamily: "var(--font-jakarta)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color:
                    location.pathname === link.to
                      ? "var(--terra)"
                      : "var(--ink-70)",
                  textDecoration: "none",
                  transition: "color 200ms",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--ink)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    location.pathname === link.to
                      ? "var(--terra)"
                      : "var(--ink-70)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:flex">
            <Link
              to="/doe-agora"
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--white)",
                background: "var(--terra)",
                borderRadius: "var(--radius-lg)",
                padding: "10px 22px",
                textDecoration: "none",
                transition: "background 200ms",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--terra-dark)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--terra)")
              }
            >
              Doe agora
              <Heart size={16} fill="white" style={{ margin: "auto" }} />
            </Link>
          </div>

          {/* Hamburguer Mobile */}
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menu"
            style={{
              color: "var(--ink)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 md:hidden"
          style={{
            zIndex: 60,
            background: "rgba(28,25,23,0.5)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full md:hidden flex flex-col"
        style={{
          zIndex: 70,
          width: "min(85vw, 320px)",
          background: "var(--creme)",
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
          padding: "24px 24px 32px",
        }}
      >
        <div className="flex items-center justify-between mb-10">
          <span
            style={{
              fontFamily: "var(--font-garamond)",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "var(--ink)",
            }}
          ></span>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Fechar menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--ink)",
              padding: "4px",
            }}
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "17px",
                fontWeight: 500,
                color:
                  location.pathname === link.to ? "var(--terra)" : "var(--ink)",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid var(--ink-6)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/doe-agora"
          className="flex items-center justify-center"
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--white)",
            background: "var(--terra)",
            borderRadius: "var(--radius-full)",
            padding: "14px 0",
            textDecoration: "none",
            marginTop: "24px",
          }}
        >
          Doe agora
        </Link>
      </div>
    </>
  );
}
