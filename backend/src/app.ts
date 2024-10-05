import { data } from "./data/data";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/projects", (c) => {
  return c.json({
    data: data,
  });
});

app.post("/projects", async (c) => {
  const dataFromFrontend = await c.req.json<{ id: number, title: string, company: string, description: string; url: string; categories: string, website: string; createdAt: Date; updatedAt: Date;}>();

  const created = {
    id: crypto.randomUUID(),
    title: dataFromFrontend.title,
    company: dataFromFrontend.company,
    description: dataFromFrontend.description, 
    url: dataFromFrontend.url,
    categories: dataFromFrontend.categories,
    website: dataFromFrontend.website,
    createdAt: dataFromFrontend.createdAt,
    updatedAt: dataFromFrontend.updatedAt,
  };
});

export default app;