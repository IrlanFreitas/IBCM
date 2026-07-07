import { Users, Heart, Building2, Award } from 'lucide-react'
import { BannerQuemSomos } from '../components/QuemSomos/BannerQuemSomos'
import { FundadoraSection } from '../components/QuemSomos/FundadoraSection'
import { TrajetoriaSection } from '../components/QuemSomos/TrajetoriaSection'
import { TimelineSection } from '../components/QuemSomos/TimelineSection'
import { QuemFazSection } from '../components/QuemSomos/QuemFazSection'
import { GoverancaSection } from '../components/QuemSomos/GoverancaSection'
import { MissaoSection } from '../components/QuemSomos/MissaoSection'
import { ReconhecimentoSection } from '../components/QuemSomos/ReconhecimentoSection'
import { GaleriaSection } from '../components/QuemSomos/GaleriaSection'
import { ValoresSection } from '../components/QuemSomos/ValoresSection'
import { ImpactBar, type ImpactStat } from '../components/ImpactBar/ImpactBar'

// TODO: quando campo `quem_somos_stats` for criado no ACF, receber via useOpcoes()

const QS_STATS: ImpactStat[] = [
  { numero: '120+', label: 'Colaboradores diretos', icon: <Users size={28} strokeWidth={1.5} /> },
  { numero: '85', label: 'Voluntários ativos', icon: <Heart size={28} strokeWidth={1.5} /> },
  { numero: '5', label: 'Unidades de atendimento', icon: <Building2 size={28} strokeWidth={1.5} /> },
  { numero: '12', label: 'Prêmios e reconhecimentos', icon: <Award size={28} strokeWidth={1.5} /> },
]

export function QuemSomosPage() {
  return (
    <main>
      <BannerQuemSomos />
      <FundadoraSection />
      <TrajetoriaSection />
      <TimelineSection />
      <QuemFazSection />
      <GoverancaSection />
      <MissaoSection />
      <ReconhecimentoSection />
      {/* <GaleriaSection />
      <ImpactBar variant="quem-somos" stats={QS_STATS} />
      <ValoresSection /> */}
    </main>
  )
}
