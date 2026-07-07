import { PageBanner } from "../PageBanner/PageBanner";

export function BannerQuemSomos() {
  return (
    <PageBanner
      eyebrow="Quem somos"
      eyebrowColor="var(--ocre)"
      title={
        <>
          Uma história de{" "}
          <span style={{ color: "var(--ocre)" }}>resistência</span>, dignidade e
          cuidado
        </>
      }
      lead={
        <>
          A IBCM é uma organização social de Salvador que há mais de três
          décadas cuida, acolhe e defende direitos. Nossa história nasceu do
          gesto de uma mulher que se recusou a deixar para trás pessoas
          abandonadas pelo preconceito, pela exclusão e pelo medo em torno do
          HIV/aids. <br />
          O que começou como acolhimento direto se transformou em uma
          instituição dedicada à proteção da vida, à dignidade humana e ao
          enfrentamento das desigualdades. Hoje, a IBCM atua com crianças,
          adolescentes, mulheres, mães solo, famílias, juventudes, pessoas
          idosas, população LGBTQIAPN+, profissionais do sexo e pessoas em
          situação de rua. <br />
          No centro dessa atuação está a defesa dos direitos de quem vive e
          convive com HIV/aids.
        </>
      }
      ariaLabel="Título da página Quem Somos"
    />
  );
}
