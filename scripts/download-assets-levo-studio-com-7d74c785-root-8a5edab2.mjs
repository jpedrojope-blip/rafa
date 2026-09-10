import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = join(process.cwd(), "public", "sites", "levo-studio-com-7d74c785", "root-8a5edab2");
const assets = {
  "logo-round.PNG": "https://levo-studio.com/logo-round.PNG",
  "og-image.png": "https://levo-studio.com/og-image.png",
  "22a5144ee8d83bca-s.p.woff2": "https://levo-studio.com/_next/static/media/22a5144ee8d83bca-s.p.woff2",
  "7d4881bb7e1bf84d-s.p.woff2": "https://levo-studio.com/_next/static/media/7d4881bb7e1bf84d-s.p.woff2",
};
await mkdir(root, { recursive: true });
for (const [file, url] of Object.entries(assets)) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  await writeFile(join(root, file), Buffer.from(await response.arrayBuffer()));
  console.log(`${file} ${response.headers.get("content-type") ?? ""}`);
}
