import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("p-"),
      },
    }),
  ],
});
