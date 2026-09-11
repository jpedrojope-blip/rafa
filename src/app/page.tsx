import { CapabilityCard } from "../components/sites/levo-studio-com-7d74c785/root-8a5edab2/CapabilityCard";
import { ContactFooter } from "../components/sites/levo-studio-com-7d74c785/root-8a5edab2/ContactFooter";
import { Hero } from "../components/sites/levo-studio-com-7d74c785/root-8a5edab2/Hero";
import { Philosophy } from "../components/sites/levo-studio-com-7d74c785/root-8a5edab2/Philosophy";

const mapsUrl = "https://www.google.com/maps/search/?api=1&query=R.+Ourique,+1055+-+Loja+D,+Br%C3%A1s+de+Pina,+Rio+de+Janeiro+-+RJ";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const reviews = [
  ["Lucas Medeiros", "Ótimo atendimento e ótimos profissionais, recomendo demais."],
  ["Mel2k1", "Ambiente climatizado e higiene 100% Super recomendo."],
  ["Vinicius Armelau", "Muita qualidade e excelência no resultado!!!"],
] as const;

export default function Home() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: "Barbearia do Rafa",
    url: siteUrl,
    image: `${siteUrl}/sites/barbearia-do-rafa/rafa-logo.jpeg`,
    telephone: "+5521965403777",
    priceRange: "R$ 10 – R$ 55",
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. Ourique, 1055 – Loja D",
      addressLocality: "Brás de Pina",
      addressRegion: "RJ",
      postalCode: "21011-130",
      addressCountry: "BR",
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:30",
      closes: "20:00",
    }],
    sameAs: [
      "https://www.instagram.com/barbeariadorafa16/",
      "https://www.trinks.com/barbearia-do-rafa-16",
    ],
  };

  return (
    <main className="levo-landing">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <div className="levo-grain" aria-hidden="true" />
      <Hero />
      <Philosophy />
      <div id="leistungen" className="levo-leistungen-head">
        <div>
          <h2>Serviços e preços</h2>
          <p>Escolha seu serviço, veja o valor e fale com a equipe pelo WhatsApp oficial.</p>
        </div>
        <a className="levo-leistungen-head__link" href="/central" data-track="booking">Ver menu completo <span aria-hidden="true">→</span></a>
      </div>
      <CapabilityCard kind="platforms" />
      <CapabilityCard kind="websites" />
      <CapabilityCard kind="hosting" />
      <CapabilityCard kind="infrastructure" />
      <section id="avaliacoes" className="levo-reviews" aria-labelledby="reviews-title">
        <div className="levo-reviews__head">
          <p className="levo-eyebrow">06 — Avaliações</p>
          <h2 id="reviews-title">Quem já passou por aqui.</h2>
          <div className="levo-reviews__proof">
            <p><strong>4,8/5</strong> no Google · 17 avaliações</p>
            <a href={mapsUrl} target="_blank" rel="noreferrer" data-track="maps">Ver no Google Maps ↗</a>
          </div>
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
