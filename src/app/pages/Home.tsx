import { Hero } from '../components/Hero'
import { ImpactBar } from '../components/ImpactBar'
import { QuemSomosHome } from '../components/QuemSomosHome'
import { ProjetosHome } from '../components/ProjetosHome'
import { Depoimentos } from '../components/Depoimentos'
import { DoeAgora } from '../components/DoeAgora'

export function Home() {
  return (
    <>
      <Hero />
      <ImpactBar />
      <QuemSomosHome />
      <ProjetosHome />
      <Depoimentos />
      <DoeAgora />
    </>
  )
}
