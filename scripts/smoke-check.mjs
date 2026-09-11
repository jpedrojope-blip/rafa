import { readFile } from "node:fs/promises";

const sources = await Promise.all([
  readFile("src/app/page.tsx", "utf8"),
  readFile("src/app/central/page.tsx", "utf8"),
  readFile("src/app/globals.css", "utf8"),
  readFile("src/components/sites/levo-studio-com-7d74c785/root-8a5edab2/Hero.tsx", "utf8"),
  readFile("src/components/sites/levo-studio-com-7d74c785/root-8a5edab2/Philosophy.tsx", "utf8"),
  readFile("src/components/sites/levo-studio-com-7d74c785/root-8a5edab2/CapabilityCard.tsx", "utf8"),
  readFile("src/components/sites/levo-studio-com-7d74c785/root-8a5edab2/ContactFooter.tsx", "utf8"),
]);
const source = sources.join("\n");

for (const value of ["Barbearia do Rafa", "4,8/5", "barbeariadorafa16", "R. Ourique", "wa.me/5521965403777", "Agendar pelo WhatsApp", "Pagamento no local", "R$ 27", "R$ 55", "corte-cinematografico.jpeg", "mapsEmbedUrl", "gsap", "levo-hero", "levo-card", "levo-cta"]) {
  if (!source.toLowerCase().includes(value.toLowerCase())) throw new Error(`Missing content: ${value}`);
}

for (const value of ["Software built in Germany", "cal.com/levo-studio", "Levo Studio/Tübingen"]) {
  if (source.includes(value)) throw new Error(`Old copy still present: ${value}`);
}

console.log("Barbearia do Rafa clone-design smoke check passed");
