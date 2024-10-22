import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setupTestEnvironment, cleanTestDb } from "./setup";
import { Hono } from "hono";
import {HonoEnv} from "../../../app";

describe("Project Integration Tests without Authentication", () => {
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
      it("should return 401 unauthorized when no user is authenticated", async () => {
          const res = await app.request("/projects", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          expect(res.status).toBe(401);
      });
    });
  

    describe("GET /projects/:id", () => {
      it("should return 401 unauthorized when trying to access a specific project", async () => {
          const res = await app.request("/projects/1", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          expect(res.status).toBe(401);
      });
  
      it("should return 401 unauthorized for non-existent project access without authentication", async () => {
          const res = await app.request("/projects/999", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          expect(res.status).toBe(401); 
      });
    });
  
   describe("POST /projects", () => {
      it("should return 401 unauthorized when trying to create a project without authentication", async () => {
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
              },
              body: JSON.stringify(newProject),
          });
  
          expect(res.status).toBe(401); 
      });
    });
  
    describe("DELETE /projects/:id", () => {
      it("should return 401 unauthorized when trying to delete a project without authentication", async () => {
          const res = await app.request("/projects/2", {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
              },
          });
  
          expect(res.status).toBe(401);
      });
    });
  });
  
