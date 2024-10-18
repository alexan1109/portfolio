import Database from "better-sqlite3";
import type { DB } from "../../../db/db";
import { createProjectRepository } from "../repository";
import { createProjectService } from "../service";
import { createProjectController } from "../controller";

export function createTestDb(): any {
    const db = new Database(":memory:");
  
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL
        );
  
        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          company TEXT NOT NULL,
          description TEXT NOT NULL,
          url TEXT NOT NULL,
          website TEXT NOT NULL,
          userId TEXT NOT NULL,
          email TEXT NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id)
        )
    `);
    }

  export function seedTestDb(db: any): void {
    const insertUser = db.prepare(
      "INSERT INTO users (id, email, name) VALUES (?, ?, ?)"
    );
  
    const insertProject = db.prepare(
      "INSERT INTO habits (id, title, company, description, url, website, userId, email, createdAt) VALUES (?, ?, ?, ?, ?)"
    );
    db.transaction(() => {
      insertUser.run("user1", "test@test.no", "Test User");
      insertUser.run("user2", "test2@test.no", "Test User 2");
  
      insertProject.run(
        "1",
        "A project for joggers",
        "A project about ...",
        "A description...",
        "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "www.alexandermyrvold.cloud",
        "user2",
        "alexanhm@hiof.no",
        new Date().toISOString()
      );
      insertProject.run("2", "A book project", "user1", "alexandra@hiof.no", null);
      insertProject.run("3", "A meditation app", "user2", "mindfull@gmail.com", null);
    })();
  }

  export function cleanTestDb(db: any): void {
    db.exec("DELETE FROM projects");
    db.exec("DELETE FROM users");
  }