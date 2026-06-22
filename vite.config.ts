// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

function buildSsrErrorLogger() {
  const SSR_CAPTURE_KEY = "__LOVABLE_TANSTACK_CAPTURE_SSR_ERROR__";
  return {
    name: "build-ssr-error-logger",
    transform(code: string, id: string) {
      const normalizedId = id.replace(/\\/g, "/");
      const isTargetModule = normalizedId.includes("/@tanstack/start-server-core/src/request-response.ts") || 
                             normalizedId.includes("/@tanstack/start-server-core/dist/esm/request-response.js");
      if (!isTargetModule) {
        return null;
      }
      const needle = "handler(request, requestOpts)";
      if (!code.includes(needle)) {
        return null;
      }
      return {
        code: code.replace(
          needle,
          `Promise.resolve(${needle}).catch((err) => { globalThis.${SSR_CAPTURE_KEY}?.(err); throw err; })`
        ),
        map: null,
      };
    }
  };
}

export default defineConfig({
  cloudflare: false,
  vite: {
    ssr: {
      noExternal: true,
    },
    plugins: [
      buildSsrErrorLogger(),
      nitro({
        preset: "vercel",
        errorHandler: "./error.ts",
      }),
    ],
  },
});
