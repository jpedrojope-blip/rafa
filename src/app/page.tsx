import { CapabilityCard } from "../components/sites/levo-studio-com-7d74c785/root-8a5edab2/CapabilityCard";
import { ContactFooter } from "../components/sites/levo-studio-com-7d74c785/root-8a5edab2/ContactFooter";
import { Hero } from "../components/sites/levo-studio-com-7d74c785/root-8a5edab2/Hero";
import { Philosophy } from "../components/sites/levo-studio-com-7d74c785/root-8a5edab2/Philosophy";

const reviews = [
  ["Lucas Medeiros", "Ótimo atendimento e ótimos profissionais, recomendo demais."],
  ["Mel2k1", "Ambiente climatizado e higiene 100% Super recomendo."],
  ["Vinicius Armelau", "Muita qualidade e excelência no resultado!!!"],
] as const;

export default function Home() {
  return (
    <main className="levo-landing">
      <div className="levo-grain" aria-hidden="true" />
      <Hero />
      <Philosophy />
      <div id="leistungen" className="levo-leistungen-head">
        <h2>O que fazemos</h2>
        <span className="levo-eyebrow">Serviços</span>
      </div>
      <CapabilityCard kind="platforms" />
      <CapabilityCard kind="websites" />
      <CapabilityCard kind="hosting" />
      <CapabilityCard kind="infrastructure" />
      <section id="avaliacoes" className="levo-reviews" aria-labelledby="reviews-title">
        <div className="levo-reviews__head">
          <p className="levo-eyebrow">06 — Avaliações</p>
          <h2 id="reviews-title">Quem já passou por aqui.</h2>
          <p><strong>4,8/5</strong> no Google · 17 avaliações</p>
        </div>
        <div className="levo-reviews__grid">
          {reviews.map(([name, text]) => (
            <figure className="levo-review" key={name}>
              <span className="levo-review__stars" aria-hidden="true">★★★★★</span>
              <blockquote>“{text}”</blockquote>
              <figcaption>{name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <ContactFooter />
    </main>
  );
}
