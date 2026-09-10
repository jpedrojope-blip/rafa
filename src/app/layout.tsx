import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barbearia do Rafa | Seja a sua melhor versão",
  description:
    "Cortes, barba e cuidados masculinos com profissionais qualificados em Brás de Pina, Rio de Janeiro.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
