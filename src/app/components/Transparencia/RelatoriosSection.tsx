import { motion } from 'motion/react'
import { Download, FileX } from 'lucide-react'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback'
import { useRelatorios } from '../../../hooks/useRelatorios'
import type { WPRelatorio } from '../../../types/cms'
import styles from './RelatoriosSection.module.css'

const ease = [0.22, 1, 0.36, 1] as const

const TIPO_LABEL: Record<string, string> = {
  anual: 'Relatório Anual',
  auditoria: 'Auditoria',
  financeiro: 'Financeiro',
}

interface CardData {
  id: number
  titulo: string
  ano: number
  tipo: string
  banner: string
  arquivoUrl: string | null
  arquivoNome: string | null
}

const STATIC_RELATORIOS: CardData[] = [
  {
    id: 1,
    titulo: 'Relatório Anual de Atividades',
    ano: 2024,
    tipo: 'Relatório Anual',
    banner:
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&auto=format&fit=crop&q=70',
    arquivoUrl: null,
    arquivoNome: null,
  },
  {
    id: 2,
    titulo: 'Balanço e Auditoria Independente',
    ano: 2024,
    tipo: 'Auditoria',
    banner:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=70',
    arquivoUrl: null,
    arquivoNome: null,
  },
]

function wpToCard(wp: WPRelatorio): CardData {
  const media = wp._embedded?.['wp:featuredmedia']?.[0]
  return {
    id: wp.id,
    titulo: wp.title.rendered,
    ano: wp.acf.ano,
    tipo: TIPO_LABEL[wp.acf.tipo] ?? wp.acf.tipo,
    banner: media?.source_url ?? '',
    arquivoUrl: wp.acf.arquivo_pdf?.url ?? null,
    arquivoNome: wp.acf.arquivo_pdf?.filename ?? null,
  }
}

export function RelatoriosSection() {
  const { data: wpRelatorios } = useRelatorios()
  const relatorios = wpRelatorios?.length
    ? wpRelatorios.map(wpToCard)
    : STATIC_RELATORIOS

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow color="var(--terra)">Relatórios</Eyebrow>
          <h2 className={styles.title}>Relatórios e prestações de contas</h2>
        </motion.header>

        <div className={styles.grid}>
          {relatorios.map((relatorio, i) => (
            <motion.div
              key={relatorio.id}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            >
              <div className={styles.banner}>
                <ImageWithFallback
                  src={relatorio.banner}
                  alt={relatorio.titulo}
                  className={styles.bannerImg}
                />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardTagRow}>
                  <span className={styles.cardTag}>{relatorio.tipo}</span>
                  <span className={styles.cardAno}>{relatorio.ano}</span>
                </div>

                <h3 className={styles.cardTitle}>{relatorio.titulo}</h3>

                {relatorio.arquivoUrl ? (
                  <a
                    href={relatorio.arquivoUrl}
                    download={relatorio.arquivoNome ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadBtn}
                  >
                    <Download size={15} />
                    Baixar PDF
                  </a>
                ) : (
                  <span className={styles.downloadBtnDisabled}>
                    <FileX size={15} />
                    Arquivo indisponível
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
