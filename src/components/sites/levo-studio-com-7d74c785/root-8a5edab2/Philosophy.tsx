"use client";

import { useEffect, useRef } from "react";

const words = [
  ["Cortes,", false], ["barba", false], ["e", false], ["cuidados", false], ["masculinos", false],
  ["com", false], ["profissionais", false], ["qualificados", true], ["e", false], ["atendimento", false],
  ["de", false], ["qualidade.", true], ["Muita", false], ["qualidade", false], ["e", false],
  ["excelência", true], ["no", false], ["resultado.", true],
] as const;

function clamp(value: number) { return Math.max(0, Math.min(1, value)); }

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const paint = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const range = section.getBoundingClientRect();
      const progress = clamp((window.innerHeight - range.top) / Math.max(1, range.height));
      const visible = reducedMotion.matches ? 1 : progress < 0.04 ? 0 : clamp((progress - 0.04) / 0.84);
      section.querySelectorAll<HTMLElement>(".philosophy-word").forEach((word, index) => {
        const step = reducedMotion.matches ? 1 : clamp((visible * (words.length + 2.2) - index) / 2.2);
        const eased = step * step * (3 - 2 * step);
        word.style.filter = reducedMotion.matches ? "none" : `blur(${((1 - eased) * 8).toFixed(2)}px)`;
        word.style.opacity = reducedMotion.matches ? "1" : (0.22 + 0.78 * eased).toFixed(3);
        word.style.transform = reducedMotion.matches ? "none" : `translateY(${((1 - eased) * 0.08).toFixed(3)}em)`;
        word.style.color = word.dataset.accent === "true"
          ? `rgb(${Math.round(78 + (255 - 78) * eased)},${Math.round(78 + (177 - 78) * eased)},${Math.round(74 * (1 - eased))})`
          : `rgb(${Math.round(78 + (255 - 78) * eased)},${Math.round(78 + (255 - 78) * eased)},${Math.round(74 + (255 - 74) * eased)})`;
      });
      const fill = section.querySelector<HTMLElement>("[data-pinfill]");
      if (fill) fill.style.width = `${(progress * 100).toFixed(1)}%`;
    };

    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(paint);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return (
    <section id="historia" className="levo-pin levo-philosophy" data-pin="true" ref={sectionRef} aria-labelledby="philosophy-text">
      <div className="levo-pin__sticky">
        <div className="levo-philosophy__glow" aria-hidden="true" />
        <p className="levo-eyebrow levo-philosophy__label">01 — Experiência</p>
        <p id="philosophy-text" className="levo-philosophy__text">
          {words.map(([word, accent], index) => (
            <span key={`${word}-${index}`}><span className="philosophy-word" data-accent={accent ? "true" : "false"}>{word}</span>{index < words.length - 1 ? " " : ""}</span>
          ))}
        </p>
        <p className="levo-philosophy__proof"><span aria-hidden="true">★</span> 4,8/5 no Google · 17 avaliações</p>
        <div className="levo-pinbar"><span className="levo-pinbar__fill" data-pinfill="true" /></div>
      </div>
    </section>
  );
}
