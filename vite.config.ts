import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import mockDevServerPlugin from "vite-plugin-mock-dev-server";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mockDevServerPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "#lib": path.resolve(__dirname, "./lib"),
    },
  },
  server: {
    proxy: {
      "^/api": "http://dev.a.zgds.eu/",
    },
  },
});
