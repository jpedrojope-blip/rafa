"use client";

import { useState } from "react";

const whatsappNumber = "5521965403777";
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

const serviceGroups = [
  { id: "todos", label: "Todos" },
  { id: "cortes", label: "Cortes" },
  { id: "barba", label: "Barba & detalhes" },
  { id: "combos", label: "Combos" },
  { id: "outros", label: "Outros" },
] as const;

type ServiceGroup = (typeof serviceGroups)[number]["id"];

const services = [
  { id: "corte-simples", group: "cortes", number: "01", name: "Corte simples", description: "Corte clássico com acabamento preciso.", price: "R$ 27" },
  { id: "corte-disfarcado", group: "cortes", number: "02", name: "Corte disfarçado", description: "Degradê limpo e acabamento alinhado.", price: "R$ 33" },
  { id: "corte-tesoura", group: "cortes", number: "03", name: "Corte tesoura", description: "Precisão e textura trabalhadas na tesoura.", price: "R$ 35" },
  { id: "corte-navalhado", group: "cortes", number: "04", name: "Corte navalhado", description: "Acabamento rente e visual marcante.", price: "R$ 35" },
  { id: "corte-maquina-tesoura", group: "cortes", number: "05", name: "Máquina + tesoura", description: "Equilíbrio entre praticidade e precisão.", price: "R$ 35" },
  { id: "barba-modelada", group: "barba", number: "06", name: "Barba modelada", description: "Desenho e linhas para valorizar o rosto.", price: "R$ 25" },
  { id: "barba-total", group: "barba", number: "07", name: "Barba total", description: "Cuidado completo para a barba.", price: "R$ 27" },
  { id: "acabamento", group: "barba", number: "08", name: "Acabamento", description: "Contornos e detalhes sempre alinhados.", price: "R$ 10" },
  { id: "sobrancelha", group: "barba", number: "09", name: "Sobrancelha", description: "Design rápido para completar o visual.", price: "R$ 10" },
  { id: "combo-1", group: "combos", number: "10", name: "Combo 1", description: "Corte simples + barba.", price: "R$ 50" },
  { id: "combo-2", group: "combos", number: "11", name: "Combo 2", description: "Corte disfarçado, tesoura, navalhado ou máquina + tesoura + barba.", price: "R$ 55" },
  { id: "pigmentacao", group: "outros", number: "12", name: "Pigmentação", description: "Realce do visual conforme o estilo escolhido.", price: "A partir de R$ 10" },
  { id: "reflexo", group: "outros", number: "13", name: "Reflexo", description: "Iluminação personalizada para o seu cabelo.", price: "A partir de R$ 40" },
] as const;

export default function CentralPage() {
  const [serviceId, setServiceId] = useState("corte-simples");
  const [serviceGroup, setServiceGroup] = useState<ServiceGroup>("todos");
  const [customerName, setCustomerName] = useState("");
  const [preference, setPreference] = useState("");

  const selectedService = services.find((item) => item.id === serviceId) ?? services[0];
  const visibleServices = serviceGroup === "todos" ? services : services.filter((service) => service.group === serviceGroup);
  const confirmationMessage = encodeURIComponent(
    `Olá, quero agendar meu horário na Barbearia do Rafa.\n\nServiço: ${selectedService.name}\nValor: ${selectedService.price}\nNome: ${customerName.trim() || "não informado"}\nPreferência de horário: ${preference.trim() || "a combinar"}`,
  );

  return (
    <main className="central-page">
      <header className="central-header">
        <a className="central-brand" href="/" aria-label="Voltar para a Barbearia do Rafa">
          <img className="central-brand__logo" src="/sites/barbearia-do-rafa/barbearia-logo.jpg" alt="Barbearia do Rafa" />
        </a>
        <a className="central-header__phone" href={whatsappUrl} target="_blank" rel="noreferrer" data-track="whatsapp">WhatsApp ↗</a>
      </header>

      <div className="central-layout">
        <section className="central-workspace" aria-labelledby="central-title">
          <a className="central-back" href="/">← Voltar para o site</a>
          <div className="central-intro">
            <p className="central-kicker">CENTRAL RAFA · AGENDAMENTO</p>
            <h1 id="central-title">Reserve seu<br /><em>momento.</em></h1>
            <p>Escolha seu serviço e envie uma solicitação. A equipe confirma o melhor horário pelo WhatsApp, de terça a sábado, das 08:30 às 20:00.</p>
          </div>

          <div className="central-steps" aria-label="Como agendar">
            <div className="central-step is-active"><span>01</span>Escolha seu serviço</div>
            <div className="central-step is-active"><span>02</span>Fale com a equipe</div>
          </div>

          <div className="central-form" aria-live="polite">
            <div className="central-panel">
              <div className="central-panel__heading">
                <p className="central-kicker">01 — Serviço</p>
                <h2>O que você quer fazer?</h2>
                <p className="central-panel__helper">Escolha uma opção para ver o valor. A equipe confirma o horário pelo WhatsApp.</p>
              </div>
              <div className="central-service-filters" role="group" aria-label="Filtrar serviços">
                {serviceGroups.map((group) => (
                  <button
                    type="button"
                    className={serviceGroup === group.id ? "central-service-filter is-selected" : "central-service-filter"}
                    key={group.id}
                    aria-pressed={serviceGroup === group.id}
                    onClick={() => setServiceGroup(group.id)}
                  >
                    {group.label}
                  </button>
                ))}
              </div>
              <p className="central-service-count">{visibleServices.length} {visibleServices.length === 1 ? "opção disponível" : "opções disponíveis"}</p>
              <div className="central-service-list">
                {visibleServices.map((service) => (
                  <button type="button" className={service.id === serviceId ? "central-service is-selected" : "central-service"} key={service.id} onClick={() => setServiceId(service.id)} aria-pressed={service.id === serviceId} aria-label={`${service.name}, ${service.price}${service.id === serviceId ? ", selecionado" : ""}`}>
                    <span className="central-service__number">{service.number}</span>
                    <span className="central-service__copy"><strong>{service.name}</strong><small>{service.description}</small></span>
                    <span className="central-service__price">{service.price}</span>
                    <span className="central-service__select" aria-hidden="true">{service.id === serviceId ? "✓" : "+"}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="central-contact-panel">
              <div className="central-panel__heading">
                <p className="central-kicker">02 — WhatsApp</p>
                <h2>Fale com a equipe.</h2>
                <p className="central-panel__helper">O nome e a preferência de horário são opcionais. Você pode ajustar tudo na conversa.</p>
              </div>
              <div className="central-fields">
                <label htmlFor="customer-name">Seu nome <span>(opcional)</span><input id="customer-name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} autoComplete="name" /></label>
                <label htmlFor="preference">Quando você prefere? <span>(opcional)</span><input id="preference" value={preference} onChange={(event) => setPreference(event.target.value)} placeholder="Ex.: sábado à tarde" /></label>
              </div>
              <div className="central-payment-card" role="status">
                <img className="central-payment-card__mark" src="/sites/barbearia-do-rafa/barbearia-logo.jpg" alt="" />
                <span><strong>Pagamento no local</strong><small>Você paga diretamente na barbearia, no dia do atendimento.</small></span>
              </div>
              <p className="central-disclaimer">A solicitação abre uma mensagem pronta no WhatsApp oficial. O horário só fica confirmado depois da resposta da equipe.</p>
              <div className="central-actions">
                <a className="central-button" href={`${whatsappUrl}?text=${confirmationMessage}`} target="_blank" rel="noreferrer" data-track="whatsapp" data-track-label="Enviar solicitação de agendamento">Falar com a equipe <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </section>

        <aside className="central-summary" aria-label="Resumo do agendamento">
          <p className="central-kicker">Seu resumo</p>
          <img className="central-summary__logo" src="/sites/barbearia-do-rafa/barbearia-logo.jpg" alt="Logo da Barbearia do Rafa" />
          <span className="central-summary__label">Barbearia do Rafa</span>
          <h2>{selectedService.name}</h2>
          <p>{selectedService.description}</p>
          <div className="central-summary__line"><span>Atendimento</span><strong>Ter–Sáb</strong></div>
          <div className="central-summary__line"><span>Horário</span><strong>08:30–20:00</strong></div>
          <div className="central-summary__line"><span>Pagamento</span><strong>Local</strong></div>
          <div className="central-summary__price">{selectedService.price}</div>
          <div className="central-summary__address">R. Ourique, 1055 – Loja D<br />Brás de Pina · Rio de Janeiro – RJ</div>
        </aside>
      </div>
    </main>
  );
}
