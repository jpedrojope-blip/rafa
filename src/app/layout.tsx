import type { Metadata } from "next";
import { Analytics } from "../components/Analytics";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Barbearia do Rafa | Corte e barba em Brás de Pina",
    template: "%s | Barbearia do Rafa",
  },
  description:
    "Corte e barba com acabamento preciso, ambiente climatizado e agendamento direto pelo WhatsApp em Brás de Pina, Rio de Janeiro.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Barbearia do Rafa",
    title: "Barbearia do Rafa | Corte e barba em Brás de Pina",
    description:
      "Corte e barba com acabamento preciso, ambiente climatizado e agendamento direto pelo WhatsApp.",
  },
  twitter: {
    card: "summary",
    title: "Barbearia do Rafa | Corte e barba em Brás de Pina",
    description:
      "Corte e barba com acabamento preciso e agendamento direto pelo WhatsApp.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body><Analytics />{children}</body>
    </html>
  );
}
