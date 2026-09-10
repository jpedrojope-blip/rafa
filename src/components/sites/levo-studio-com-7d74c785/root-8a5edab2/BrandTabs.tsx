const whatsappUrl = "https://wa.me/5521966834526";
const instagramUrl = "https://www.instagram.com/barbeariadorafa16/?utm_source=chatgpt.com";

const tabs = [
  ["Agendamento", "/central"],
  ["História", "#historia"],
  ["Serviços", "#leistungen"],
  ["Avaliações", "#avaliacoes"],
] as const;

export function BrandTabs() {
  return (
    <nav className="brand-tabs" aria-label="Navegação principal da Barbearia do Rafa">
      <div className="brand-tabs__inner">
        <a className="brand-tabs__mark" href="/" aria-label="Voltar para o início">
          <span>RAFA</span>
          <small>BARBEARIA</small>
        </a>
        <div className="brand-tabs__links">
          {tabs.map(([label, href]) => <a className={`brand-tabs__tab${label === "Agendamento" ? " brand-tabs__tab--primary" : ""}`} href={href} key={label}><span>{label}</span></a>)}
          <a className="brand-tabs__tab brand-tabs__tab--accent" href={instagramUrl} target="_blank" rel="noreferrer"><span>Instagram ↗</span></a>
          <a className="brand-tabs__cta" href={whatsappUrl} target="_blank" rel="noreferrer"><span>WhatsApp ↗</span></a>
        </div>
      </div>
    </nav>
  );
}
