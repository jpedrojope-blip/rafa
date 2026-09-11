const trinksUrl = "https://www.trinks.com/barbearia-do-rafa-16?utm_source=chatgpt.com";
const instagramUrl = "https://www.instagram.com/barbeariadorafa16/?utm_source=chatgpt.com";
const whatsappUrl = "https://wa.me/5521965403777";

export function ContactFooter() {
  return <>
    <section id="contato" className="levo-cta" aria-labelledby="cta-link">
      <div className="levo-cta__glow" aria-hidden="true" />
      <p className="levo-eyebrow levo-cta__label">06 — Agendamento</p>
      <a id="cta-link" className="levo-cta__link" href={whatsappUrl} target="_blank" rel="noreferrer" data-track="whatsapp" data-track-label="CTA final de agendamento">
        <span className="levo-cta__chevron" aria-hidden="true">&gt;</span>
        <span>Agendar pelo WhatsApp</span>
        <span className="levo-cta__cursor" aria-hidden="true" />
      </a>
      <p className="levo-cta__note">Escolha seu serviço e fale com a equipe para confirmar o melhor horário.</p>
      <a className="levo-cta__mail" href={whatsappUrl} target="_blank" rel="noreferrer" data-track="whatsapp">(21) 96540-3777</a>
    </section>
    <div className="levo-about-teaser">
      <a className="levo-about-teaser__link" href={instagramUrl} target="_blank" rel="noreferrer">
        <span>Quer acompanhar os próximos cortes?</span>
        <span className="levo-about-teaser__b"><span className="levo-about-teaser__wink">@barbeariadorafa16</span><span className="levo-about-teaser__arrow" aria-hidden="true">→</span></span>
      </a>
    </div>
    <footer className="levo-footer">
      <a href="https://www.google.com/maps/search/?api=1&query=R.+Ourique,+1055+-+Loja+D,+Br%C3%A1s+de+Pina,+Rio+de+Janeiro+-+RJ" target="_blank" rel="noreferrer" data-track="maps">Endereço</a>
      <a href={instagramUrl} target="_blank" rel="noreferrer" data-track="instagram">Instagram</a>
      <a href="/central" data-track="booking">Agendamento</a>
      <a href={trinksUrl} target="_blank" rel="noreferrer" data-track="trinks">Trinks</a>
      <a href={whatsappUrl} target="_blank" rel="noreferrer" data-track="whatsapp">WhatsApp</a>
    </footer>
  </>;
}
