import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  root: "client",
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './client/src') },
      { find: /^@shared\/(.*)$/, replacement: path.resolve(__dirname, './shared') + '/$1' },
      { find: '@shared', replacement: path.resolve(__dirname, './shared') },
    ],
  },
})