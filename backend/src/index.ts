import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { port } from './config'
import { data } from './data/data'
import { cors } from 'hono/cors'
import { User } from './features/users/types/users'
import { authenticate } from './features/users/utils/middleware'
import { env, ServerEnv } from './lib/env'
import db, { DB } from './db/db'
import { Logger, makeLogger } from './lib/logger'
import { handleError } from './lib/error'

type ContextVariables = {
  user: User | null;
};

export type ServiceContext = {
  db: DB;
  logger: Logger;
};

export type HonoEnv = {
  Bindings: ServerEnv;
  Variables: {
    services: ServiceContext;
  } & ContextVariables;
};


const database: DB = db;
const logger: Logger = makeLogger({ logLevel: env.LOG_LEVEL, env: env.NODE_ENV });

const app = new Hono<HonoEnv>();

app.use(
  "/*",
  cors({
    origin: `${env.FRONTEND_URL}`,
    credentials: true,
  })
);

app.use("*", async (c, next) => {
  c.set("services", {
    logger,
    db: database,
  } as ServiceContext);

  await next();
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get("/projects", authenticate(), (c) => {
  const user = c.get("user");
  
  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const userProjects = data.filter((project) => project.userId === user.id);
  return c.json({ data: userProjects });
});

app.post("/projects", async (c) => {
  const dataFromFrontend = await c.req.json<{
    title: string;
    company: string;
    description: string;
    url: string;
    categories: string[];
    website: string;
    userId: string;
    email: string;
    createdAt: Date;
  }>();

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

  data.push(created);

  return c.json(created, 201);
});

app.onError(handleError);

export default app;
