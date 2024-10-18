import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setupTestEnvironment, cleanTestDb } from "./setup";

import { makeApp, type HonoEnv } from "../../../index";
import type { Hono } from "hono";

describe("Project Integration Tests", () => {
    let env: ReturnType<typeof setupTestEnvironment>;
    let app: Hono<HonoEnv>;
    const auth: RequestInit = {
        headers: new Headers({
          "Content-Type": "application/json",
          Cookie: "user.id=user1",
        }),
        credentials: "include",
      };

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

    describe("GET /projects", () => {
        it("should return projects for the authenticated user", async () => {
          const res = await app.request("/projects", auth);
          expect(res.status).toBe(200);
    
          const body = await res.json();
          expect(body.success).toBe(true);
          expect(body.data.length).toBe(2);
          expect(body.data[0].title).toBe("Project1");
          expect(body.data[1].title).toBe("Project2");
        });
          });
    
      describe("GET /projects/:id", () => {
        it("should return a specific project", async () => {
          const res = await app.request("/projects/1", auth);
          expect(res.status).toBe(200);
    
          const body = await res.json();
    
          expect(body.success).toBe(true);
          expect(body.data.id).toBe("1");
          expect(body.data.title).toBe("Project1");
        });
    
        it("should return 404 for non-existent project", async () => {
          const res = await app.request("/projects/999", auth);
          expect(res.status).toBe(404);
        });
      });
  
    describe("POST /projects", () => {
      it("should create a new project", async () => {
        const newProject = {
          title: "New Project",
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

  describe("DELETE /projects/:id", () => {
    it("should delete an existing project", async () => {
      const res = await app.request("/projects/2", {
        method: "DELETE",
        ...auth,
      });

      expect(res.status).toBe(200);

      const checkRes = await app.request("/projects/2", auth);
      expect(checkRes.status).toBe(404);
    });
  });
});