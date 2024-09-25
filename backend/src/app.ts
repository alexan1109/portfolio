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
  const dataFromFrontend = await c.req.json<{ id: number, title: string, company: string, description: string; url: string; }>();

  const created = {
    id: crypto.randomUUID(),
    title: dataFromFrontend.title,
    company: dataFromFrontend.company,
    description: dataFromFrontend.description, 
    url: dataFromFrontend.url,
  };
});

export default app;