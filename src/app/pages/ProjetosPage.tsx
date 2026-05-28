import { PageBanner } from '../components/PageBanner/PageBanner'
import { ProjetosList } from '../components/Projetos/ProjetosList'
import { DoacaoBanner } from '../components/Projetos/DoacaoBanner'
import { useProjetos } from '../../hooks/useProjetos'
import type { Projeto } from '../components/Projetos/ProjetosList'
import type { WPProjeto } from '../../types/cms'

const STATIC_PROJETOS: Projeto[] = [
  {
    titulo: 'Creche IBCM',
    tag: 'Educação',
    tagColor: 'var(--musgo)',
    cor: 'var(--musgo)',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&auto=format&fit=crop&q=80',
    badge: '88 crianças · turno integral',
    descricao:
      'A Creche IBCM atende crianças de 6 meses a 5 anos, muitas delas vivendo com HIV ou filhas de mães soropositivas. O cuidado vai além da educação infantil: inclui cinco refeições diárias balanceadas, acompanhamento médico especializado e suporte às famílias.',
    impacto:
      'Mais de 2.400 crianças já passaram pela creche em 26 anos. Hoje atendemos 88 crianças em turno integral, com taxa zero de abandono escolar.',
    bullets: [
      'Educação infantil de qualidade com pedagogia especializada',
      'Cinco refeições diárias balanceadas nutricionalmente',
      'Acompanhamento médico e de enfermagem in loco',
      'Controle e administração de medicação antirretroviral',
      'Atividades lúdico-terapêuticas e arte-educação',
      'Suporte psicossocial às famílias',
    ],
  },
  {
    titulo: 'CPDD — Casarão da Diversidade',
    tag: 'Diversidade',
    tagColor: 'var(--ocre)',
    cor: 'var(--ocre)',
    image: 'https://images.unsplash.com/photo-1573152143286-0c422b4d2175?w=1200&auto=format&fit=crop&q=80',
    descricao:
      'Centro de referência para a população LGBTQIA+ de Salvador, com atendimento jurídico, psicológico, cultural e de geração de renda. Espaço seguro e ponto de articulação de políticas públicas inclusivas em parceria com o Governo da Bahia.',
    impacto:
      'Assumimos a gestão do Casarão em 2018. Hoje realizamos mais de 1.200 atendimentos por ano e somos referência estadual em direitos da diversidade.',
    bullets: [
      'Atendimento jurídico gratuito para casos de discriminação',
      'Acompanhamento psicológico individual e em grupo',
      'Programas culturais e de formação profissional',
      'Geração de renda e empreendedorismo',
      'Articulação de políticas públicas inclusivas',
      'Espaço seguro para acolhimento e convivência',
    ],
  },
  {
    titulo: 'Adolescente Aprendiz',
    tag: 'Trabalho',
    tagColor: 'var(--ink)',
    cor: 'var(--ink)',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80',
    badge: '14 a 22 anos · desde 1992',
    descricao:
      'Programa de qualificação profissional e inserção no mercado de trabalho para jovens em situação de vulnerabilidade social. Em parceria com empresas locais, garantimos formação técnica, comportamental e colocação profissional.',
    impacto:
      'Desde 1992, mais de 15 mil jovens foram inseridos no mercado formal de trabalho. O programa mantém taxa de empregabilidade superior a 70% após a conclusão.',
    bullets: [
      'Formação técnica e comportamental certificada',
      'Parceria com empresas de Salvador e região metropolitana',
      'Acompanhamento durante e após o contrato de aprendizagem',
      'Orientação vocacional e planejamento de carreira',
      'Suporte psicossocial ao jovem e sua família',
      'Conexão com oportunidades de emprego efetivo',
    ],
  },
]

function wpToProjeto(wp: WPProjeto): Projeto {
  const media = wp._embedded?.['wp:featuredmedia']?.[0]
  const image = wp.acf.imagemprincipal?.url ?? media?.source_url ?? ''

  return {
    titulo: wp.title.rendered,
    tag: wp.acf.tag,
    tagColor: wp.acf.tagcolor,
    cor: wp.acf.tagcolor,
    image,
    badge: wp.acf.numeros || undefined,
    descricao: wp.acf.descricaocompleta || wp.acf.descricaocurta,
    impacto: wp.acf.impacto ?? '',
    bullets: (wp.acf.bullets ?? '').split('\n').map(line => line.trim()),
  }
}

export function ProjetosPage() {
  const { data: wpProjetos } = useProjetos()
  const projetos = wpProjetos?.filter((p) => p.acf.ativo).map(wpToProjeto) ?? STATIC_PROJETOS

  return (
    <>
      <PageBanner
        eyebrow="Projetos"
        eyebrowColor="var(--musgo)"
        title={
          <>
            Programas que constroem{' '}
            <br />
            <em style={{ color: 'var(--musgo)', fontStyle: 'normal' }}>
              autonomia e futuro
            </em>
          </>
        }
        lead="Nossos projetos transformam vidas por meio de educação, qualificação profissional e inclusão. Cada programa combina atendimento imediato com desenvolvimento de longo prazo."
        ariaLabel="Título da página Projetos"
      />

      <ProjetosList projetos={projetos} />

      <DoacaoBanner />
    </>
  )
}
