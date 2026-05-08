import { Hero } from '../components/Hero'
import { ImpactBar } from '../components/ImpactBar'
import { QuemSomosHome } from '../components/QuemSomosHome'
import { ProjetosHome } from '../components/ProjetosHome'
import { Depoimentos } from '../components/Depoimentos'
import { DoeAgora } from '../components/DoeAgora'
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
