import { PageBanner } from '../PageBanner/PageBanner'

export function BannerQuemSomos() {
  return (
    <PageBanner
      eyebrow="Quem somos"
      eyebrowColor="var(--ocre)"
      title={
        <>
          Uma história de{' '}
          <em style={{ color: 'var(--ocre)', fontStyle: 'italic' }}>resistência</em>,{' '}
          dignidade e cuidado
        </>
      }
      lead="Desde 1986, a IBCM existe para uma missão simples e revolucionária: não abandonar quem mais precisa. Fundada por Maria Conceição Macedo em plena crise de HIV/AIDS, hoje somos referência nacional em direitos humanos, saúde, educação e inclusão social."
      ariaLabel="Título da página Quem Somos"
    />
  )
}
