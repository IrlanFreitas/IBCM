export type Noticia = {
  id: number
  slug: string
  data: string
  titulo: string
  imagem: string
  lead: string
  corpo: string[]
}

export const NOTICIAS: Noticia[] = [
  {
    id: 1,
    slug: 'campanha-ampliacao-atendimento-criancas-hiv-salvador',
    data: '17.04.2025',
    titulo: 'Campanha para ampliação do atendimento a crianças que vivem com HIV em Salvador é lançada pela IBCM',
    imagem: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&auto=format&fit=crop&q=80',
    lead: 'O Tem Arte nas Ruas propõe a criação de pontos de arte pública espalhados por Salvador',
    corpo: [
      'A campanha de arrecadação de recursos "Em Nós Laz Para a IBCM" para viabilizar a nova sede da Instituição Beneficente Conceição Macedo (IBCM) foi lançada nesta terça-feira (22), em Salvador (BA). O novo espaço fica no antigo Colégio Emanuel Carneiro Ribeiro, na Lapinha, na capital baiana. O objetivo da mudança é transformar o espaço em um ambiente seguro e com acolhida adequada para continuar e ampliar o atendimento de mais de 500 crianças que vivem e convivem com HIV, além de seus familiares.',
      'Em atividade há 40 anos, a IBCM é referência na defesa dos direitos humanos de pessoas que vivem em situação de vulnerabilidade social e de minorias políticas. A instituição realiza ações de acolhimento social, educação infantil, apoio psicossocial, alimentação, acompanhamento em saúde e fortalecimento de vínculos comunitários.',
      'A instalação precisa de intervenções estruturais para garantir condições adequadas de funcionamento, acessibilidade, segurança e conforto. As doações podem ser feitas através do PIX, por meio do CNPJ da IBCM: 00.384.560/0001-05. Os recursos serão integralmente destinados para as obras de reforma e adequação do espaço.',
      'Confira contatos:\nDoações via PIX: 00.384.560/0001-05\nContato: (71) 3430-9759 | 71 9639-8919',
    ],
  },
  {
    id: 2,
    slug: 'campanha-ampliacao-atendimento-criancas-hiv-salvador-2',
    data: '17.04.2025',
    titulo: 'Campanha para ampliação do atendimento a crianças que vivem com HIV em Salvador é lançada pela IBCM',
    imagem: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&auto=format&fit=crop&q=80',
    lead: 'A IBCM reforça seu compromisso com o cuidado integral de crianças e famílias afetadas pelo HIV/AIDS em Salvador',
    corpo: [
      'A Instituição Beneficente Conceição Macedo lança nova frente de campanha voltada ao fortalecimento dos serviços prestados às crianças que vivem com HIV em Salvador. A iniciativa busca ampliar a capacidade de atendimento e garantir continuidade dos programas de saúde, alimentação e suporte psicossocial.',
      'Com mais de três décadas de atuação, a IBCM atende centenas de famílias em situação de vulnerabilidade, oferecendo desde distribuição de medicamentos antirretrovirais até suporte jurídico e emocional. A campanha reforça a importância do engajamento da sociedade civil na sustentabilidade dessas ações.',
      'As doações podem ser realizadas via PIX ou depósito bancário. Qualquer valor é bem-vindo e faz diferença na vida de uma criança. Acesse o site da instituição ou entre em contato pelo telefone (71) 3430-9759 para mais informações.',
    ],
  },
  {
    id: 3,
    slug: 'campanha-ampliacao-atendimento-criancas-hiv-salvador-3',
    data: '17.04.2025',
    titulo: 'Campanha para ampliação do atendimento a crianças que vivem com HIV em Salvador é lançada pela IBCM',
    imagem: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80',
    lead: 'Terceira etapa da campanha amplia alcance e mobiliza parceiros institucionais',
    corpo: [
      'Na terceira fase da campanha de ampliação do atendimento, a IBCM mobiliza parceiros institucionais e empresas comprometidas com a responsabilidade social para contribuir com a reforma da nova sede.',
      'O projeto prevê a criação de espaços adequados para consultas médicas, oficinas pedagógicas e atendimento psicológico, garantindo condições dignas para as crianças e suas famílias. A estimativa é que as obras sejam concluídas ainda em 2025.',
      'Empresas interessadas em firmar parceria podem entrar em contato com a equipe de captação de recursos da IBCM pelo e-mail contato@ibcm.org.br.',
    ],
  },
  {
    id: 4,
    slug: 'campanha-ampliacao-atendimento-criancas-hiv-salvador-4',
    data: '17.04.2025',
    titulo: 'Campanha para ampliação do atendimento a crianças que vivem com HIV em Salvador é lançada pela IBCM',
    imagem: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&auto=format&fit=crop&q=80',
    lead: 'Quarta etapa da campanha foca em doações recorrentes e engajamento da comunidade',
    corpo: [
      'A quarta etapa da campanha tem como foco a criação de uma base sólida de doadores recorrentes que possam garantir a sustentabilidade financeira da IBCM a longo prazo. A proposta é simples: uma contribuição mensal de qualquer valor garante continuidade dos serviços prestados.',
      'Com uma doação mensal de R$ 30, por exemplo, é possível garantir cinco refeições semanais para uma criança. Já R$ 50 mensais cobrem parte do aluguel de uma das casas de apoio. Cada contribuição, por menor que seja, tem impacto real e mensurável.',
    ],
  },
  {
    id: 5,
    slug: 'campanha-ampliacao-atendimento-criancas-hiv-salvador-5',
    data: '17.04.2025',
    titulo: 'Campanha para ampliação do atendimento a crianças que vivem com HIV em Salvador é lançada pela IBCM',
    imagem: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&auto=format&fit=crop&q=80',
    lead: 'Quinta etapa celebra metas atingidas e anuncia novas fases do projeto',
    corpo: [
      'Com entusiasmo e gratidão, a IBCM celebra o atingimento de 60% da meta de arrecadação da campanha e anuncia as próximas etapas do projeto de ampliação. A mobilização da sociedade baiana tem sido fundamental para o avanço das obras.',
      'O compromisso de cuidar de quem precisa segue firme, e a instituição agradece a cada doador e parceiro que tornou este marco possível. As obras da nova sede seguem em ritmo acelerado.',
    ],
  },
  {
    id: 6,
    slug: 'campanha-ampliacao-atendimento-criancas-hiv-salvador-6',
    data: '17.04.2025',
    titulo: 'Campanha para ampliação do atendimento a crianças que vivem com HIV em Salvador é lançada pela IBCM',
    imagem: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80',
    lead: 'Encerramento da campanha: metas superadas e impacto confirmado',
    corpo: [
      'A IBCM encerra com sucesso sua campanha de arrecadação, com a meta original superada em 15%. Os recursos garantem a conclusão das obras da nova sede e a manutenção dos serviços por mais 12 meses.',
      'O resultado reforça que quando a comunidade se une em torno de uma causa justa, é possível transformar realidades. A instituição reitera seu agradecimento a todos que contribuíram, compartilharam e apoiaram esta jornada.',
    ],
  },
  {
    id: 7,
    slug: 'ibcm-celebra-38-anos-evento-comunidade-salvador',
    data: '10.03.2025',
    titulo: 'IBCM celebra 38 anos de atuação com evento aberto à comunidade em Salvador',
    imagem: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&auto=format&fit=crop&q=80',
    lead: 'Programação especial marca quase quatro décadas de resistência e cuidado em Salvador',
    corpo: [
      'A Instituição Beneficente Conceição Macedo completou 38 anos de fundação e celebrou a data com um evento aberto à comunidade no Centro de Salvador. A programação incluiu apresentações culturais, rodas de conversa e exposição fotográfica sobre a trajetória da ONG.',
      'Fundada em 1986 por Maria Conceição Macedo, a instituição nasceu em um período de grande estigma e desinformação sobre o HIV/AIDS. Em quase quatro décadas, tornou-se referência nacional no acolhimento de pessoas em situação de vulnerabilidade.',
      'O evento contou com a presença de ex-beneficiários, voluntários históricos e representantes do poder público, que reconheceram a importância da IBCM para Salvador e para o país.',
    ],
  },
  {
    id: 8,
    slug: 'creche-ibcm-recebe-doacao-materiais-pedagogicos',
    data: '02.02.2025',
    titulo: 'Creche IBCM recebe doação de materiais pedagógicos de empresas parceiras',
    imagem: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&auto=format&fit=crop&q=80',
    lead: 'Parceria com empresas locais garante material educativo para mais de 80 crianças',
    corpo: [
      'A Creche IBCM recebeu uma doação expressiva de materiais pedagógicos viabilizada pela parceria com cinco empresas de Salvador. Os itens incluem livros, brinquedos educativos, jogos de raciocínio e material de artes para crianças de 0 a 5 anos.',
      'A iniciativa faz parte do programa de responsabilidade social empresarial que a IBCM mantém com o setor privado. As doações garantem que as crianças atendidas tenham acesso a uma educação de qualidade, mesmo em contexto de vulnerabilidade.',
      'A Creche IBCM funciona em turno integral e atende 88 crianças, oferecendo alimentação, estimulação e cuidados de saúde integrados às atividades pedagógicas.',
    ],
  },
  {
    id: 9,
    slug: 'casarao-diversidade-amplia-atendimento-juridico-lgbtqia',
    data: '15.01.2025',
    titulo: 'Casarão da Diversidade amplia atendimento jurídico para população LGBTQIA+',
    imagem: 'https://images.unsplash.com/photo-1573152143286-0c422b4d2175?w=1200&auto=format&fit=crop&q=80',
    lead: 'CPDD passa a oferecer três atendimentos jurídicos semanais com advogados voluntários',
    corpo: [
      'O Centro de Promoção da Diversidade e Direitos (CPDD), conhecido como Casarão da Diversidade, ampliou sua oferta de atendimento jurídico gratuito para a população LGBTQIA+ de Salvador. A partir de fevereiro, serão três sessões semanais com advogados voluntários especializados em direitos humanos.',
      'O serviço atende casos de discriminação, violência doméstica, processos de retificação de nome e gênero, além de questões trabalhistas e previdenciárias que afetam desproporcionalmente a população LGBTQIA+.',
      'O Casarão da Diversidade funciona desde 2003 como espaço seguro e de referência para a comunidade em Salvador, oferecendo também atendimento psicológico, atividades culturais e cursos de geração de renda.',
    ],
  },
]
