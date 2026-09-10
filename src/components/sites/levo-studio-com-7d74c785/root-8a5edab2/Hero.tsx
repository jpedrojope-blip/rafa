"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { BrandTabs } from "./BrandTabs";

const whatsappUrl = "https://wa.me/5521966834526";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;
    if (!section || !copy) return;

    const context = gsap.context(() => {
      gsap.from(".hero-in > *", {
        y: 24,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".levo-hero__brand", {
        scale: 0.9,
        autoAlpha: 0,
        duration: 1.4,
        delay: 0.15,
        ease: "power2.out",
      });
    }, section);

    const update = () => {
      const opacity = Math.max(0, Math.min(1, 1 - window.scrollY / (0.85 * window.innerHeight)));
      copy.style.opacity = opacity.toFixed(3);
      copy.style.transform = `translateY(${(-0.12 * window.scrollY).toFixed(1)}px)`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      context.revert();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="levo-hero" aria-labelledby="hero-title" ref={sectionRef}>
      <div className="levo-hero__glow" aria-hidden="true" />
      <BrandTabs />
      <div className="hero-in" ref={copyRef}>
        <p className="levo-hero__meta">
          <span className="levo-hero__dot" aria-hidden="true" />
          <span>Barbearia do Rafa</span>
          <span className="levo-hero__sep" aria-hidden="true">/</span>
          <span>Brás de Pina, RJ</span>
        </p>
        <h1 id="hero-title" className="levo-hero__title">
          <span>Barbearia do Rafa.</span>{" "}
          <span className="levo-hero__title-dim">Seja a sua melhor versão.</span>
        </h1>
        <p className="levo-hero__lede">
          Cortes, barba e cuidados masculinos com profissionais qualificados e atendimento de qualidade.
        </p>
        <div className="levo-hero__actions">
          <a className="levo-btn" href={whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
          <a className="levo-hero__textlink" href="#avaliacoes">Ver avaliações</a>
        </div>
        <p className="levo-hero__rating" aria-label="Avaliação 4,8 de 5 no Google, com 17 avaliações">
          <span aria-hidden="true">★</span> <strong>4,8/5</strong> no Google · 17 avaliações
        </p>
      </div>
      <div className="levo-hero__foot" aria-hidden="true">
        <span>R. OURIQUE, 1055 · LOJA D · CEP 21011-130</span>
        <span className="levo-hero__scroll">Scroll <span /></span>
      </div>
    </section>
  );
}
