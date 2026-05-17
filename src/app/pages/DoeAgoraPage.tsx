import { PageBanner } from '../components/PageBanner/PageBanner'
import { DoeAgoraPageContent } from '../components/DoeAgora/DoeAgoraPageContent'
import InfiniteCarousel from '../components/InfiniteCarousel/InfiniteCarousel'

export function DoeAgoraPage() {
  return (
    <>
      <PageBanner
        background="var(--white)"
        eyebrow="Doe agora"
        eyebrowColor="var(--terra)"
        centered
        title={
          <>
            Sua doação transforma{' '}
            <em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>vidas</em>
          </>
        }
        titleColor="var(--ink)"
        lead="Cada contribuição vai diretamente para os nossos projetos em Salvador."
        leadColor="var(--ink-40)"
        ariaLabel="Título da página Doe Agora"
      />
      <DoeAgoraPageContent />
      <InfiniteCarousel />
    </>
  )
}
