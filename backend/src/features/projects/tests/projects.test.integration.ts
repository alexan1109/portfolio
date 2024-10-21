import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setupTestEnvironment, cleanTestDb } from "./setup";
import { Hono } from "hono";
import {HonoEnv} from "../../../index";

describe("Project Integration Tests", () => {
  let env: ReturnType<typeof setupTestEnvironment>;
  let app: Hono<HonoEnv>;

  beforeEach(() => {
      env = setupTestEnvironment();
      app = new Hono<HonoEnv>(); 

      app.route("/projects", env.projectController);
  });

  afterEach(() => {
      cleanTestDb(env.db);
      env.db.close();
  });
  describe("GET /projects", () => {
    it("should return projects for the authenticated user", async () => {
        const res = await app.request("/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: "user.id=user1",
            },
        });
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.success).toBe(true);
        expect(body.data.length).toBe(2); // Adjust based on your seeding logic
    });
});

describe("GET /projects/:id", () => {
    it("should return a specific project", async () => {
        const res = await app.request("/projects/1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: "user.id=user1",
            },
        });
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.success).toBe(true);
        expect(body.data.id).toBe("1");
        expect(body.data.title).toBe("A project for joggers");
    });

    it("should return 404 for a non-existent project", async () => {
        const res = await app.request("/projects/999", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: "user.id=user1",
            },
        });
        expect(res.status).toBe(404);
    });
});

describe("POST /projects", () => {
    it("should create a new project", async () => {
        const newProject = {
            title: "New Project",
            company: "Company D",
            description: "Description for new project",
            url: "https://example.com/new.jpg",
            website: "www.example.com",
            userId: "user1",
            email: "newuser@test.com",
        };

        const res = await app.request("/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: "user.id=user1",
            },
            body: JSON.stringify(newProject),
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
            headers: {
                "Content-Type": "application/json",
                Cookie: "user.id=user1",
            },
        });

        expect(res.status).toBe(200);

        const checkRes = await app.request("/projects/2", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: "user.id=user1",
            },
        });
        expect(checkRes.status).toBe(404);
    });
});
});
