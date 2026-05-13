import { Hero } from '../components/Hero/Hero'
import { ImpactBar } from '../components/ImpactBar/ImpactBar'
import { QuemSomosHome } from '../components/QuemSomosHome/QuemSomosHome'
import { ProjetosHome } from '../components/ProjetosHome/ProjetosHome'
import { Depoimentos } from '../components/Depoimentos/Depoimentos'
import { DoeAgora } from '../components/DoeAgora/DoeAgora'
import InfiniteCarousel from '../components/InfiniteCarousel/InfiniteCarousel'

export function Home() {
  return (
    <>
      <Hero />
      <ImpactBar />
      <QuemSomosHome />
      <ProjetosHome />
      <Depoimentos />
      <DoeAgora />
      <InfiniteCarousel />
    </>
  )
}
