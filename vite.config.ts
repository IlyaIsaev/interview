import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";

const isTest = Boolean(process.env.VITEST);

export default defineConfig({
  plugins: [
    ...(isTest ? [] : [cloudflare({ viteEnvironment: { name: "ssr" } })]),
    ...(isTest
      ? []
      : [
          tanstackStart({
            router: {
              routeFileIgnorePattern: "^components$",
            },
          }),
        ]),
    viteReact({ compiler: true }),
    tailwindcss(),
  ],
  test: {
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: ["react", "react-dom"],
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: ["src/routeTree.gen.ts", "worker-configuration.d.ts"],
  },
  lint: {
    ignorePatterns: ["src/routeTree.gen.ts", "worker-configuration.d.ts"],
    plugins: ["typescript", "unicorn", "oxc", "react"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
