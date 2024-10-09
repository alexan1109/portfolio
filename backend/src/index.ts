import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { port } from './config'
import { data } from './data/data'
import { cors } from 'hono/cors'
const app = new Hono()
app.use("/*", cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/projects", (c) => {
    return c.json({
    data: data,
  });
});

app.post("/projects", async (c) => {
  const dataFromFrontend = await c.req.json<{ title: string, company: string, description: string; url: string; categories: string[], website: string; files: FileList | null; createdAt: Date; updatedAt: Date;}>();

  const created = {
    id: crypto.randomUUID(),
    title: dataFromFrontend.title,
    company: dataFromFrontend.company,
    description: dataFromFrontend.description, 
    url: dataFromFrontend.url,
    categories: dataFromFrontend.categories,
    website: dataFromFrontend.website,
    files: dataFromFrontend.files,
    createdAt: dataFromFrontend.createdAt,
    updatedAt: dataFromFrontend.updatedAt,
  };

  data.push(created)

  return c.json(created, 201);
});

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
