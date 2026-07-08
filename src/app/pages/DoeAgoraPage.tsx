import { PageBanner } from "../components/PageBanner/PageBanner";
import { DoeAgoraPageContent } from "../components/DoeAgora/DoeAgoraPageContent";
import InfiniteCarousel from "../components/InfiniteCarousel/InfiniteCarousel";

export function DoeAgoraPage() {
  return (
    <>
      <PageBanner
        background="var(--white)"
        eyebrow="Doe agora"
        eyebrowColor="var(--terra)"
        centered
        title={
          <>
            Você doa.{" "}
            <span style={{ color: "var(--terra)" }}>A IBCM transforma.</span>
          </>
        }
        titleColor="var(--ink)"
        lead="Cada valor que chega à IBCM se transforma em comida, proteção e dignidade para crianças, mulheres e famílias de Salvador. Você escolhe quanto. A gente faz virar cuidado."
        leadColor="var(--ink-40)"
        ariaLabel="Título da página Doe Agora"
      />
      <DoeAgoraPageContent />
      <InfiniteCarousel />
    </>
  );
}
