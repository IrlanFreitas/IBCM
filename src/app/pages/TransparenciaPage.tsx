import { PageBanner } from '../components/PageBanner/PageBanner'
import { CertificacoesSection } from '../components/Transparencia/CertificacoesSection'
import { DocumentacaoSection } from '../components/Transparencia/DocumentacaoSection'
import { ContatoBanner } from '../components/Transparencia/ContatoBanner'

export function TransparenciaPage() {
  return (
    <>
      <PageBanner
        background="var(--terra)"
        eyebrow="Transparência"
        eyebrowColor="rgba(255, 255, 255, 0.65)"
        title={
          <>
            Você sabe{' '}
            <em style={{ color: 'var(--ocre-light)', fontStyle: 'normal' }}>
              o que fazemos
            </em>
          </>
        }
        lead="Transparência é nosso dever. Prestamos contas com rigor porque a confiança se constrói com clareza, não com promessas. Todos os nossos documentos estão disponíveis aqui."
        ariaLabel="Título da página Transparência"
      />

      <CertificacoesSection />
      <DocumentacaoSection />
      <ContatoBanner />
    </>
  )
}
