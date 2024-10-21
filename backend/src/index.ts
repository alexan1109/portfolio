import { serve } from '@hono/node-server'
import { port } from './config'
import app from "./app"
console.log("Starting server on port", port);

serve({
  fetch: app.fetch,
  port,
});