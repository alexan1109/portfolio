import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { port } from './config'
import { data } from './data/data'
import { cors } from 'hono/cors'
import { User } from './features/users/types/users'
import { authenticate } from './features/users/utils/middleware'
import { ServerEnv } from './lib/env'
type ContextVariables = {
  user: User | null;
};
const app = new Hono<{ Variables: ContextVariables }>();
export type HonoEnv = {
  Bindings: ServerEnv; 
};
app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/projects", authenticate(), (c) => {
  const user = c.get("user");
  
  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const userProjects = data.filter((project) => project.userId === user.id);
  return c.json({ data: userProjects });
});

app.post("/projects", async (c) => {
  const dataFromFrontend = await c.req.json<{ title: string; company: string; description: string; url: string; categories: string[], website: string; userId: string; email: string; createdAt: Date;}>();
  const created = {
    id: crypto.randomUUID(),
    title: dataFromFrontend.title,
    company: dataFromFrontend.company,
    description: dataFromFrontend.description, 
    url: dataFromFrontend.url,
    categories: dataFromFrontend.categories,
    website: dataFromFrontend.website,
    userId: dataFromFrontend.userId,
    email: dataFromFrontend.email,
    createdAt: dataFromFrontend.createdAt,
  };

  data.push(created)

  return c.json(created, 201);
});

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
