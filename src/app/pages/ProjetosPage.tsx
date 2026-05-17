import { PageBanner } from '../components/PageBanner/PageBanner'
import { ProjetosList } from '../components/Projetos/ProjetosList'
import { DoacaoBanner } from '../components/Projetos/DoacaoBanner'
// import { useProjetos } from '../../hooks/useProjetos'
import type { Projeto } from '../components/Projetos/ProjetosList'
// import type { WPProjeto } from '../../types/cms'

const STATIC_PROJETOS: Projeto[] = [
  {
    titulo: 'HIV/AIDS — Prevenção e acolhimento',
    tag: 'Saúde',
    tagColor: 'var(--terra)',
    cor: 'var(--terra)',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&auto=format&fit=crop&q=80',
    descricao:
      'Desde 1986, é a primeira e principal missão do IBCM. Oferecemos testagem rápida, distribuição de preservativos, orientação sobre PrEP e PEP, acompanhamento terapêutico e suporte emocional para pessoas vivendo com HIV/AIDS.',
    impacto:
      'Criado em 1986, atendemos mais de 60 mil pessoas. Hoje realizamos uma média de 660 testagens por mês e distribuímos 15 mil preservativos mensalmente.',
    bullets: [
      'Testagem rápida gratuita e sigilosa',
      'Distribuição de insumos de prevenção (preservativos, gel lubrificante)',
      'Orientação sobre PrEP (Profilaxia Pré-Exposição) e PEP (Profilaxia Pós-Exposição)',
      'Grupos de apoio e suporte psicológico',
      'Acompanhamento de adesão ao tratamento antirretroviral',
      'Ronda Noturna: atendimento a profissionais do sexo e população de rua',
    ],
  },
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
  {
    titulo: 'Casas de Apoio',
    tag: 'Acolhimento',
    tagColor: 'var(--terra)',
    cor: 'var(--terra)',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200&auto=format&fit=crop&q=80',
    badge: '29 casas · Salvador',
    descricao:
      'Rede de moradia temporária e permanente para pessoas vivendo com HIV/AIDS e suas famílias em situação de vulnerabilidade. Oferecemos abrigo seguro, alimentação, cuidados de saúde e acompanhamento para a reintegração social.',
    impacto:
      'São 29 casas ativas em Salvador. Cada casa acolhe em média 8 pessoas, garantindo moradia digna, alimentação e cuidados diários para quem mais precisa.',
    bullets: [
      'Moradia temporária e permanente em ambiente seguro',
      'Três refeições diárias balanceadas',
      'Distribuição e acompanhamento de medicação ARV',
      'Suporte jurídico para regularização de documentos',
      'Preparação para a vida independente e autônoma',
      'Visitas domiciliares e acompanhamento contínuo',
    ],
  },
]

// function wpToCard(wp: WPProjeto): Projeto {
//   return {
//     titulo: wp.title.rendered,
//     tag: wp.acf.tag,
//     tagColor: wp.acf.tagcolor,
//     cor: wp.acf.tagcolor,
//     image: wp.acf.imagemprincipal ?? '',
//     descricao: wp.acf.descricaocompleta || wp.acf.descricaocurta,
//     bullets: wp.acf.bullets ?? [],
//   }
// }

export function ProjetosPage() {
  // TODO: const { data: wpProjetos } = useProjetos()
  // const projetos = wpProjetos?.map(wpToCard) ?? STATIC_PROJETOS
  const projetos = STATIC_PROJETOS

  return (
    <>
      <PageBanner
        eyebrow="Causas e projetos"
        eyebrowColor="var(--ocre)"
        title={
          <>
            Cuidado que transforma,{' '}
            <br />
            <em style={{ color: 'var(--ocre)', fontStyle: 'normal' }}>
              impacto que dura
            </em>
          </>
        }
        lead="Cada projeto da IBCM combina acolhimento imediato com transformação de longo prazo. Não fazemos assistencialismo, aqui construímos autonomia, dignidade e futuro."
        ariaLabel="Título da página Projetos e Causas"
      />

      <ProjetosList projetos={projetos} />

      <DoacaoBanner />
    </>
  )
}
