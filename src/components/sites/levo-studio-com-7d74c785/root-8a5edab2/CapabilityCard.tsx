"use client";

import { useEffect, useRef } from "react";

type Kind = "platforms" | "websites" | "hosting" | "infrastructure";

const bookingUrl = "https://wa.me/5521965403777";
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=R.+Ourique,+1055+-+Loja+D,+Br%C3%A1s+de+Pina,+Rio+de+Janeiro+-+RJ";
const mapsEmbedUrl = "https://www.google.com/maps?q=R.+Ourique,+1055+-+Loja+D,+Br%C3%A1s+de+Pina,+Rio+de+Janeiro+-+RJ&output=embed";

const content: Record<Kind, { number: string; label: string; title: string; offer?: string; parts: Array<[string, boolean]>; link: string; href: string }> = {
  platforms: {
    number: "02", label: "Serviço", title: "Cortes com precisão", offer: "Cortes a partir de R$ 27", href: bookingUrl, link: "Agendar pelo WhatsApp",
    parts: [["Cortes pensados para o seu estilo, com acabamento ", false], ["preciso", true], [" e atenção em cada detalhe. Você sai alinhado, confiante e ", false], ["pronto para a sua melhor versão", true], [".", false]],
  },
  websites: {
    number: "03", label: "Serviço", title: "Barba & acabamento", offer: "Barba a partir de R$ 25", href: bookingUrl, link: "Agendar pelo WhatsApp",
    parts: [["Barba desenhada, acabamento limpo e cuidado masculino com resultado ", false], ["impecável", true], [". Um atendimento feito para valorizar o seu rosto e o seu ", false], ["estilo", true], [".", false]],
  },
  hosting: {
    number: "04", label: "Ambiente", title: "Conforto em cada visita", offer: "Terça a sábado · 08:30–20:00", href: bookingUrl, link: "Agendar pelo WhatsApp",
    parts: [["Ambiente climatizado, higiene 100% e profissionais qualificados. Tudo preparado para uma experiência ", false], ["leve", true], [", confortável e ", false], ["de qualidade", true], [".", false]],
  },
  infrastructure: {
    number: "05", label: "Localização", title: "Como chegar", href: mapsUrl, link: "Abrir no Maps",
    parts: [["A Barbearia do Rafa fica na R. Ourique, 1055 — Loja D, em Brás de Pina. ", false], ["Trace sua rota", true], [" e venha viver essa experiência.", false]],
  },
};

function Photo({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="levo-card__media">
      <img src={src} alt={alt} loading="lazy" />
      <figcaption><span>{caption}</span><b aria-hidden="true">↗</b></figcaption>
    </figure>
  );
}

function Diagram({ kind }: { kind: Kind }) {
  if (kind === "platforms") {
    return <Photo src="/sites/barbearia-do-rafa/corte-cinematografico.jpeg" alt="Corte masculino feito na Barbearia do Rafa" caption="Corte · acabamento" />;
  }

  if (kind === "websites") {
    return <Photo src="/sites/barbearia-do-rafa/barba-profissional.jpeg" alt="Barba e acabamento profissional na Barbearia do Rafa" caption="Barba · precisão" />;
  }

  if (kind === "hosting") {
    return <Photo src="/sites/barbearia-do-rafa/ambiente-barbearia.jpeg" alt="Interior da Barbearia do Rafa" caption="Ambiente · conforto" />;
  }

  return (
    <div className="levo-card__map-frame">
      <iframe title="Mapa para chegar à Barbearia do Rafa" src={mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      <a href={mapsUrl} target="_blank" rel="noreferrer">Abrir rota no Google Maps <span aria-hidden="true">↗</span></a>
    </div>
  );
}

export function CapabilityCard({ kind }: { kind: Kind }) {
  const sectionRef = useRef<HTMLElement>(null);
  const data = content[kind];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const draw = [...section.querySelectorAll<SVGGeometryElement>(".draw")];
    draw.forEach((item) => {
      try {
        const length = item.getTotalLength();
        item.style.strokeDasharray = String(length);
        item.style.strokeDashoffset = String(length);
      } catch {
        item.style.opacity = "0";
      }
    });
    const update = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / Math.max(1, rect.height)));
      section.querySelectorAll<HTMLElement>(".crawl-word").forEach((word, index) => {
        const count = section.querySelectorAll(".crawl-word").length;
        const step = Math.max(0, Math.min(1, ((progress * (count + 2.2) - index) / 2.2)));
        const eased = step * step * (3 - 2 * step);
        word.style.filter = `blur(${((1 - eased) * 8).toFixed(2)}px)`;
        word.style.opacity = (0.22 + 0.78 * eased).toFixed(3);
        word.style.color = word.dataset.accent === "true"
          ? `rgb(${Math.round(78 + (255 - 78) * eased)},${Math.round(78 + (177 - 78) * eased)},${Math.round(74 * (1 - eased))})`
          : `rgb(${Math.round(78 + (255 - 78) * eased)},${Math.round(78 + (255 - 78) * eased)},${Math.round(74 + (255 - 74) * eased)})`;
      });
      draw.forEach((item, index) => {
        const length = Number(item.style.strokeDasharray);
        const reveal = Math.max(0, Math.min(1, (1.5 * progress - 0.05 - (index / Math.max(draw.length, 1)) * 0.35) * 2.2));
        if (length) item.style.strokeDashoffset = (length * (1 - reveal)).toFixed(1);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="levo-pin levo-card" data-pin="true" ref={sectionRef} aria-labelledby={`cap-${kind}`}>
      <div className="levo-card__sticky">
        <div>
          <p className="levo-card__tag"><span className="levo-card__num">{data.number}</span><span className="levo-eyebrow">{data.label}</span></p>
          <h3 id={`cap-${kind}`}>{data.title}</h3>
          {data.offer && <p className="levo-card__offer">{data.offer}</p>}
          <p className="levo-card__text">{data.parts.flatMap(([part, accent], partIndex) => part.split(/(\s+)/).map((token, tokenIndex) => /^\s+$/.test(token) ? <span key={`${partIndex}-${tokenIndex}`}>{token}</span> : <span key={`${partIndex}-${tokenIndex}`} className="crawl-word" data-accent={accent ? "true" : "false"}>{token}</span>))}</p>
          <a className="levo-card__link" href={data.href} target={data.href.startsWith("http") ? "_blank" : undefined} rel={data.href.startsWith("http") ? "noreferrer" : undefined} data-track={data.href.includes("wa.me") ? "whatsapp" : "maps"}>{data.link} <span aria-hidden="true">→</span></a>
        </div>
        <Diagram kind={kind} />
      </div>
    </section>
  );
}
