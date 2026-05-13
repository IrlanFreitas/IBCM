import styles from './Eyebrow.module.css'

interface EyebrowProps {
  children: React.ReactNode
  color?: string
}

export function Eyebrow({ children, color = 'var(--terra)' }: EyebrowProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.line} style={{ background: color }} />
      <span className={styles.text} style={{ color }}>
        {children}
      </span>
    </div>
  )
}
