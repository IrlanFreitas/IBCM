import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Heart, Menu, X } from 'lucide-react'
import styles from './Navigation.module.css'

const links = [
  { label: 'Quem somos', to: '/quem-somos' },
  { label: 'Projetos e causas', to: '/projetos' },
  { label: 'Notícias', to: '/noticias' },
  { label: 'Transparência', to: '/transparencia' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  useEffect(() => {
    setDrawerOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.headerInner}>
          {/* Logo desktop */}
          <Link to="/" className={styles.logoDesktop}>
            <img style={{ width: 120 }} src="/marca/Logo_IBCM.png" alt="Logo IBCM" />
          </Link>

          {/* Logo mobile */}
          <span className={styles.logoMobile}>
            <h1 className={styles.logoMobileTitle}>IBCM</h1>
            <p className={styles.logoMobileSubtitle}>Instituto Beneficente Conceição Macedo</p>
          </span>

          {/* Links desktop */}
          <div className={styles.linksDesktop}>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={styles.navLink}
                style={{
                  color: location.pathname === link.to ? 'var(--terra)' : 'var(--ink-70)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    location.pathname === link.to ? 'var(--terra)' : 'var(--ink-70)')
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA desktop */}
          <div className={styles.ctaDesktop}>
            <Link to="/doe-agora" className={styles.ctaLink}>
              Doe agora
              <Heart size={16} fill="white" style={{ margin: 'auto' }} />
            </Link>
          </div>

          {/* Hamburguer mobile */}
          <button
            className={styles.hamburger}
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {drawerOpen && (
        <div className={styles.overlay} onClick={() => setDrawerOpen(false)} />
      )}

      {/* Drawer */}
      <div
        className={styles.drawer}
        style={{ transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className={styles.drawerHeader}>
          <span />
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Fechar menu"
            className={styles.drawerCloseBtn}
          >
            <X size={22} />
          </button>
        </div>

        <div className={styles.drawerLinks}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={styles.drawerLink}
              style={{
                color: location.pathname === link.to ? 'var(--terra)' : 'var(--ink)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/doe-agora" className={styles.drawerCta}>
          Doe agora
        </Link>
      </div>
    </>
  )
}
