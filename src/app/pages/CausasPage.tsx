import { PageBanner } from "../components/PageBanner/PageBanner";
import { ProjetosList } from "../components/Projetos/ProjetosList";
import { DoacaoBanner } from "../components/Projetos/DoacaoBanner";
import { useCausas } from "../../hooks/useCausas";
import type { Projeto } from "../components/Projetos/ProjetosList";
import type { WPCausa } from "../../types/cms";

const STATIC_CAUSAS: Projeto[] = [
  {
    titulo: "HIV/AIDS — Prevenção e acolhimento",
    tag: "Saúde",
    tagColor: "var(--terra)",
    cor: "var(--terra)",
    image:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&auto=format&fit=crop&q=80",
    descricao:
      "Desde 1986, é a primeira e principal missão do IBCM. Oferecemos testagem rápida, distribuição de preservativos, orientação sobre PrEP e PEP, acompanhamento terapêutico e suporte emocional para pessoas vivendo com HIV/AIDS.",
    impacto:
      "Criado em 1986, atendemos mais de 60 mil pessoas. Hoje realizamos uma média de 660 testagens por mês e distribuímos 15 mil preservativos mensalmente.",
    bullets: [
      "Testagem rápida gratuita e sigilosa",
      "Distribuição de insumos de prevenção (preservativos, gel lubrificante)",
      "Orientação sobre PrEP (Profilaxia Pré-Exposição) e PEP (Profilaxia Pós-Exposição)",
      "Grupos de apoio e suporte psicológico",
      "Acompanhamento de adesão ao tratamento antirretroviral",
      "Ronda Noturna: atendimento a profissionais do sexo e população de rua",
    ],
  },
  {
    titulo: "Casas de Apoio",
    tag: "Acolhimento",
    tagColor: "var(--terra)",
    cor: "var(--terra)",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200&auto=format&fit=crop&q=80",
    badge: "29 casas · Salvador",
    descricao:
      "Rede de moradia temporária e permanente para pessoas vivendo com HIV/AIDS e suas famílias em situação de vulnerabilidade. Oferecemos abrigo seguro, alimentação, cuidados de saúde e acompanhamento para a reintegração social.",
    impacto:
      "São 29 casas ativas em Salvador. Cada casa acolhe em média 8 pessoas, garantindo moradia digna, alimentação e cuidados diários para quem mais precisa.",
    bullets: [
      "Moradia temporária e permanente em ambiente seguro",
      "Três refeições diárias balanceadas",
      "Distribuição e acompanhamento de medicação ARV",
      "Suporte jurídico para regularização de documentos",
      "Preparação para a vida independente e autônoma",
      "Visitas domiciliares e acompanhamento contínuo",
    ],
  },
];

function wpToCausa(wp: WPCausa): Projeto {
  const media = wp._embedded?.["wp:featuredmedia"]?.[0];
  const image = wp.acf.imagemprincipal?.url ?? media?.source_url ?? "";

  return {
    titulo: wp.title.rendered,
    tag: wp.acf.tag,
    tagColor: wp.acf.tagcolor,
    cor: wp.acf.tagcolor,
    image,
    badge: wp.acf.numeros || undefined,
    descricao: wp.acf.descricaocompleta || wp.acf.descricaocurta,
  };
}

export function CausasPage() {
  const { data: wpCausas } = useCausas();
  const causas =
    wpCausas?.filter((c) => c.acf.ativo).map(wpToCausa) ?? STATIC_CAUSAS;

  return (
    <>
      <PageBanner
        eyebrow="Causas"
        eyebrowColor="var(--terra)"
        title={
          <>
            Desde o início, <br />
            <em style={{ color: "var(--terra)", fontStyle: "normal" }}>
              cuidar também significou tomar posição.
            </em>
          </>
        }
        lead={
          <>
            A IBCM nasceu em um contexto marcado pelo preconceito, pela exclusão
            e pela negação de direitos de pessoas que viviam e conviviam com
            HIV.
            <br />
            Com o tempo, essa missão se ampliou, mas nunca perdeu sua raiz:
            estar ao lado de quem teve sua vida, sua história ou sua existência
            tratada como menor. As causas que orientam nosso trabalho não são
            bandeiras de ocasião. <br />
            Elas nascem da escuta diária, dos territórios onde atuamos e das
            pessoas que acompanhamos todos os dias.
          </>
        }
        ariaLabel="Título da página Causas"
      />

      <ProjetosList projetos={causas} />

      <DoacaoBanner />
    </>
  );
}
