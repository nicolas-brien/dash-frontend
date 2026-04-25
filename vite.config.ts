import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "api": path.resolve(__dirname, "./src/api"),
      "components": path.resolve(__dirname, "./src/components"),
      "composed-components": path.resolve(__dirname, "./src/composed-components"),
      "context": path.resolve(__dirname, "./src/context"),
      "hooks": path.resolve(__dirname, "./src/hooks"),
      "pages": path.resolve(__dirname, "./src/pages"),
      "svg": path.resolve(__dirname, "./src/svg"),
      "styles": path.resolve(__dirname, "./src/styles"),
      "types": path.resolve(__dirname, "./src/types"),
      "node-modules": path.resolve(__dirname, "./node_modules"),
    },
  }
})
