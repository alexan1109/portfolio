import Database from "better-sqlite3";
import { createProjectRepository } from "../repository";
import { createProjectService } from "../service";
import { createProjectController } from "../controller";

// Define the type for your database if needed
type DB = any;

export function createTestDb(): DB {
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

    return db;  // Return the Database instance
}

// This function seeds the database with initial test data
export function seedTestDb(db: DB): void {
    const insertUser = db.prepare(
        "INSERT INTO users (id, email, name) VALUES (?, ?, ?)"
    );

    const insertProject = db.prepare(
        "INSERT INTO projects (id, title, company, description, url, website, userId, email, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    db.transaction(() => {
        insertUser.run("user1", "test@test.no", "Test User");
        insertUser.run("user2", "test2@test.no", "Test User 2");

        insertProject.run(
            "1",
            "A project for joggers",
            "Company A",
            "A project about ...",
            "https://example.com/image.jpg",
            "www.example.com",
            "user2",
            "alexanhm@hiof.no",
            new Date().toISOString()
        );

        insertProject.run(
            "2",
            "A book project",
            "Company B",
            "Project description for book...",
            "https://example.com/book.jpg",
            "www.example.com",
            "user1",
            "alexandra@hiof.no",
            new Date().toISOString()
        );

        insertProject.run(
            "3",
            "A meditation app",
            "Company C",
            "Description for meditation app...",
            "https://example.com/app.jpg",
            "www.example.com",
            "user2",
            "mindfull@gmail.com",
            new Date().toISOString()
        );
    })();
}

// This function cleans the database by deleting all data
export function cleanTestDb(db: DB): void {
    db.exec("DELETE FROM projects");
    db.exec("DELETE FROM users");
}

// This function sets up the test environment with the database and related services
export function setupTestEnvironment() {
    const db = createTestDb();
    seedTestDb(db);

    const projectRepository = createProjectRepository(db);
    const projectService = createProjectService(projectRepository);
    const projectController = createProjectController(projectService);

    return { db, projectRepository, projectService, projectController };
}
