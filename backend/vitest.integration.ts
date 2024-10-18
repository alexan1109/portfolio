import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setupTestEnvironment, cleanTestDb } from "./src/features/projects/tests/setup";
import { makeApp, type HonoEnv } from "./src/index";
import type { Hono } from "hono";
import { defineConfig } from "vitest/config";

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

describe("Project Integration Tests", () => {
  let env: ReturnType<typeof setupTestEnvironment>;

  beforeEach(() => {
    env = setupTestEnvironment();
    app = makeApp(env.db, {
      info: vi.fn(),
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      fatal: vi.fn(),
    });

    app.route("/projects", env.projectController);
  });

  afterEach(() => {
    cleanTestDb(env.db);
    env.db.close();
  });

  describe("POST /projects", () => {
    it("should create a new project", async () => {
      const newProject = {
        title: "New Habit",
        rule: "daily",
      };

      const res = await app.request("/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: "user.id=user1",
        },
        body: JSON.stringify(newProject),
        credentials: "include",
      });

      const body = await res.json();

      expect(res.status).toBe(201);
      expect(body.success).toBe(true);
    });
  });
});
