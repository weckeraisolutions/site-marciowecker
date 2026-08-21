import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { sites } from "@openai/sites-vite-plugin"
import { mkdir, rm, writeFile } from "node:fs/promises"
import { fileURLToPath, URL } from "node:url"

const sitesSpaWorker = {
  name: "sites-spa-worker",
  apply: "build" as const,
  async buildStart() {
    await rm(fileURLToPath(new URL("./dist", import.meta.url)), {
      recursive: true,
      force: true,
    })
  },
  async closeBundle() {
    const serverDir = fileURLToPath(new URL("./dist/server", import.meta.url))
    await mkdir(serverDir, { recursive: true })
    await writeFile(
      fileURLToPath(new URL("./dist/server/index.js", import.meta.url)),
      `export default {
  async fetch(request, env) {
    const assets = env.ASSETS;
    if (!assets) {
      return new Response("Site assets are unavailable.", { status: 503 });
    }

    const response = await assets.fetch(request);
    if (response.status !== 404) return response;

    const pathname = new URL(request.url).pathname;
    const requestsAFile = /\\.[^/]+$/.test(pathname);
    if ((request.method !== "GET" && request.method !== "HEAD") || requestsAFile) {
      return response;
    }

    const indexUrl = new URL("/index.html", request.url);
    return assets.fetch(new Request(indexUrl, request));
  },
};
`,
      "utf8",
    )
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sites(), sitesSpaWorker],
  build: {
    outDir: "dist/client",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // Garante uma única instância do three (drei + fiber compartilham a mesma).
    dedupe: ["three", "@react-three/fiber"],
  },
})
