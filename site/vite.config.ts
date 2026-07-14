import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

export default defineConfig(({ command }) => ({
  base: process.env.BASE_PATH || "/",
  plugins: [
    react(),
    tailwindcss(),
    ...(command === "build"
      ? [
          vitePrerenderPlugin({
            renderTarget: "#root",
            prerenderScript: path.resolve(__dirname, "src/prerender.tsx"),
            additionalPrerenderRoutes: [
              "/work/commercial",
              "/work/gaming",
              "/work/film",
              "/work/social",
            ],
          }),
        ]
      : []),
  ],
  server: {
    host: true,
    open: true,
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
