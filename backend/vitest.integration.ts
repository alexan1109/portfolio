import type { Hono } from "hono";
import { defineConfig } from "vitest/config";
import { HonoEnv } from "./src";

let app: Hono<HonoEnv>;
let auth: { headers: Record<string, string> };

export default defineConfig({
  test: {
    exclude: ["./src/**/*.test.ts"],
    include: ["./src/**/*.test.integration.ts"],
    reporters: ["html", "verbose"],
    outputFile: "./.vitest/html",
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
    testTimeout: 60_000,
    teardownTimeout: 60_000,
  },
});