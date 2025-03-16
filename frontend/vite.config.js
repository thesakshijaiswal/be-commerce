import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { BASE_BACKEND_URL } from "./src/utils/constants";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": BASE_BACKEND_URL,
    },
  },
});
