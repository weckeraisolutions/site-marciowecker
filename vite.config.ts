import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { sites } from "@openai/sites-vite-plugin"
import { fileURLToPath, URL } from "node:url"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sites()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // Garante uma única instância do three (drei + fiber compartilham a mesma).
    dedupe: ["three", "@react-three/fiber"],
  },
})
