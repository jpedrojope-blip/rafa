'use client';

import { useEffect, useState } from "react";

const whatsappUrl = "https://wa.me/5521965403777";
const instagramUrl = "https://www.instagram.com/barbeariadorafa16/";

const tabs = [
  ["Agendamento", "/central"],
  ["História", "#historia"],
  ["Serviços", "#leistungen"],
  ["Avaliações", "#avaliacoes"],
] as const;

export function BrandTabs() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`brand-tabs${menuOpen ? " brand-tabs--open" : ""}`} aria-label="Navegação principal da Barbearia do Rafa">
      <div className="brand-tabs__inner">
        <a className="brand-tabs__mark" href="/" aria-label="Voltar para o início" onClick={closeMenu}>
          <span>RAFA</span>
          <small>BARBEARIA</small>
        </a>
        <button
          className="brand-tabs__toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="brand-tabs-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>Menu</span>
          <span className="brand-tabs__toggle-icon" aria-hidden="true"><i /><i /></span>
        </button>
        <div className="brand-tabs__links" id="brand-tabs-menu">
          {tabs.map(([label, href]) => <a className={`brand-tabs__tab${label === "Agendamento" ? " brand-tabs__tab--primary" : ""}`} href={href} key={label} onClick={closeMenu} data-track={label === "Agendamento" ? "booking" : undefined}><span>{label}</span></a>)}
          <a className="brand-tabs__tab brand-tabs__tab--accent" href={instagramUrl} target="_blank" rel="noreferrer" onClick={closeMenu} data-track="instagram"><span>Instagram ↗</span></a>
          <a className="brand-tabs__cta" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={closeMenu} data-track="whatsapp" data-track-label="WhatsApp principal"><span>WhatsApp ↗</span></a>
        </div>
      </div>
    </nav>
  );
}
