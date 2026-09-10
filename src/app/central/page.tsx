"use client";

import { useMemo, useState } from "react";

const whatsappNumber = "5521966834526";
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

const payment = {
  label: "Pagamento no local",
  description: "O pagamento será efetuado na barbearia, no dia do atendimento.",
} as const;

const openHours = Array.from({ length: 24 }, (_, index) => {
  const totalMinutes = 8 * 60 + 30 + index * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

function nextDays() {
  const availableDays = [];
  const date = new Date();
  date.setHours(12, 0, 0, 0);

  while (availableDays.length < 7) {
    date.setDate(date.getDate() + 1);
    const weekday = date.getDay();

    if (weekday === 0 || weekday === 1) continue;

    availableDays.push({
      id: date.toISOString().slice(0, 10),
      weekday: date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
      day: date.toLocaleDateString("pt-BR", { day: "2-digit" }),
      month: date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
    });
  }

  return availableDays;
}

export default function CentralPage() {
  const days = useMemo(nextDays, []);
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState("corte-simples");
  const [serviceGroup, setServiceGroup] = useState<ServiceGroup>("todos");
  const [dateId, setDateId] = useState(days[0]?.id ?? "");
  const [time, setTime] = useState("08:30");
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const selectedService = services.find((item) => item.id === serviceId) ?? services[0];
  const visibleServices = serviceGroup === "todos" ? services : services.filter((service) => service.group === serviceGroup);
  const selectedDay = days.find((item) => item.id === dateId) ?? days[0];
  const confirmationMessage = encodeURIComponent(
    `Olá, quero confirmar meu agendamento na Barbearia do Rafa.\n\nServiço: ${selectedService.name}\nValor: ${selectedService.price}\nData: ${selectedDay?.day}/${selectedDay?.month}\nHorário: ${time}\nNome: ${customer.name}\nPagamento: ${payment.label}`,
  );

  function nextStep() {
    setError("");
    if (step === 3) {
      if (!customer.name.trim() || !customer.phone.trim()) {
        setError("Preencha nome e WhatsApp para continuar.");
        return;
      }
      setConfirmed(true);
      return;
    }
    setStep((current) => Math.min(3, current + 1));
  }

  function previousStep() {
    setError("");
    setStep((current) => Math.max(1, current - 1));
  }

  if (confirmed) {
    return (
      <main className="central-page">
        <section className="central-success" aria-labelledby="success-title">
          <a className="central-back" href="/">← Voltar para o site</a>
          <span className="central-success__mark" aria-hidden="true">✓</span>
          <p className="central-kicker">04 — Confirmado</p>
          <h1 id="success-title">Seu horário está quase certo.</h1>
          <p>Envie os detalhes pelo WhatsApp para a equipe confirmar a disponibilidade. O pagamento será efetuado no local, no dia do atendimento.</p>
          <div className="central-summary central-summary--success">
            <span>{selectedService.name}</span>
            <strong>{selectedDay?.day} de {selectedDay?.month} · {time}</strong>
            <small>{customer.name} · {payment.label}</small>
          </div>
          <a className="central-button" href={`${whatsappUrl}?text=${confirmationMessage}`} target="_blank" rel="noreferrer">
            Enviar pelo WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <a className="central-secondary-link" href="/">Voltar para a Barbearia do Rafa</a>
        </section>
      </main>
    );
  }

  return (
    <main className="central-page">
      <header className="central-header">
        <a className="central-brand" href="/" aria-label="Voltar para a Barbearia do Rafa">
          <img className="central-brand__logo" src="/sites/barbearia-do-rafa/barbearia-logo.jpg" alt="Barbearia do Rafa" />
        </a>
        <a className="central-header__phone" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp ↗</a>
      </header>

      <div className="central-layout">
        <section className="central-workspace" aria-labelledby="central-title">
          <a className="central-back" href="/">← Voltar para o site</a>
          <div className="central-intro">
            <p className="central-kicker">CENTRAL RAFA · AGENDAMENTO</p>
            <h1 id="central-title">Reserve seu<br /><em>momento.</em></h1>
            <p>Escolha o serviço e o melhor horário. Atendimento de terça a sábado, das 08:30 às 20:00.</p>
          </div>

          <div className="central-steps" aria-label="Etapas do agendamento">
            {["Serviço", "Horário", "Dados & pagamento"].map((label, index) => {
              const itemStep = index + 1;
              return (
                <button
                  type="button"
                  className={itemStep === step ? "central-step is-active" : itemStep < step ? "central-step is-done" : "central-step"}
                  key={label}
                  onClick={() => itemStep < step && setStep(itemStep)}
                  aria-current={itemStep === step ? "step" : undefined}
                  disabled={itemStep > step}
                >
                  <span>{String(itemStep).padStart(2, "0")}</span>{label}
                </button>
              );
            })}
          </div>

          <div className="central-form" aria-live="polite">
            {step === 1 && (
              <div className="central-panel">
                <div className="central-panel__heading">
                  <p className="central-kicker">01 — Serviço</p>
                  <h2>O que vamos fazer?</h2>
                  <p className="central-panel__helper">Escolha uma opção para ver o valor e continuar.</p>
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
            )}

            {step === 2 && (
              <div className="central-panel">
                <div className="central-panel__heading">
                  <p className="central-kicker">02 — Horário</p>
                  <h2>Quando fica melhor?</h2>
                </div>
                <div className="central-date-list" aria-label="Escolha um dia">
                  {days.map((day) => (
                    <button type="button" className={day.id === dateId ? "central-date is-selected" : "central-date"} key={day.id} onClick={() => setDateId(day.id)} aria-pressed={day.id === dateId}>
                      <span>{day.weekday}</span><strong>{day.day}</strong><small>{day.month}</small>
                    </button>
                  ))}
                </div>
                <div className="central-time-heading"><span>Horários disponíveis</span><small>Terça a sábado · 08:30–20:00</small></div>
                <p className="central-hours-note">Domingo e segunda: sem atendimento.</p>
                <div className="central-time-list" aria-label="Horários de 08:30 a 20:00">
                  {openHours.map((item) => (
                    <button type="button" className={item === time ? "central-time is-selected" : "central-time"} key={item} onClick={() => setTime(item)} aria-pressed={item === time}>{item}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="central-panel">
                <div className="central-panel__heading">
                  <p className="central-kicker">03 — Dados & pagamento</p>
                  <h2>Como confirmamos?</h2>
                </div>
                <div className="central-fields">
                  <label>Seu nome<input value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} autoComplete="name" /></label>
                  <label>WhatsApp<input value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} inputMode="tel" autoComplete="tel" /></label>
                </div>
                <div className="central-payment-card" role="status">
                  <img className="central-payment-card__mark" src="/sites/barbearia-do-rafa/barbearia-logo.jpg" alt="" />
                  <span><strong>{payment.label}</strong><small>{payment.description}</small></span>
                </div>
                <p className="central-disclaimer">Não é necessário informar cartão ou fazer pagamento online. Você paga diretamente no local.</p>
              </div>
            )}

            {error && <p className="central-error" role="alert">{error}</p>}
            <div className="central-actions">
              {step > 1 && <button type="button" className="central-secondary-button" onClick={previousStep}>Voltar</button>}
              <button type="button" className="central-button" onClick={nextStep}>{step === 3 ? "Confirmar horário" : "Continuar"} <span aria-hidden="true">→</span></button>
            </div>
          </div>
        </section>

        <aside className="central-summary" aria-label="Resumo do agendamento">
          <p className="central-kicker">Seu resumo</p>
          <img className="central-summary__logo" src="/sites/barbearia-do-rafa/barbearia-logo.jpg" alt="Logo da Barbearia do Rafa" />
          <span className="central-summary__label">Barbearia do Rafa</span>
          <h2>{selectedService.name}</h2>
          <p>{selectedService.description}</p>
          <div className="central-summary__line"><span>Data</span><strong>{selectedDay?.day} {selectedDay?.month}</strong></div>
          <div className="central-summary__line"><span>Horário</span><strong>{time}</strong></div>
          <div className="central-summary__line"><span>Pagamento</span><strong>{payment.label}</strong></div>
          <div className="central-summary__price">{selectedService.price}</div>
          <div className="central-summary__address">R. Ourique, 1055 – Loja D<br />Brás de Pina · Rio de Janeiro – RJ</div>
        </aside>
      </div>
    </main>
  );
}
