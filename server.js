import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from 'node:fs/promises'



// Oppretter Hono-applikasjon
const app = new Hono();

// Aktiverer CORS (Cross-Origin Resource Sharing) for alle ruter
app.use("/*", cors());

// statisk fiber tjening
app.use("/public/*", serveStatic({ root: "./" }));

// lager en projekt liste
const projects = [
  {
    id: crypto.randomUUID(),
    name: "Javascript-project",
    company: "HMUnite",
    description: "A small company wanted a brand new webapplication",
    url: "https://live.staticflickr.com/1291/1095795163_eaa4dac05d_b.jpg",
  },
];


// Ruter
app.get("/", (c) => {
  return c.json(projects);
});

app.get("/json", async (c) => {
  const data = await fs.readFile('./public/data.json', 'utf8')
  const dataToJson = JSON.parse(data)
  return c.json(dataToJson);
});

app.post("/add", async (c) => {
  const newProject = await c.req.json();
  console.log(newProject);
  // Legger til det nye prosjektet i listen med en unik ID og tidsstempel
  projects.push({ id: crypto.randomUUID(), ...newProject });

  // Returnerer den oppdaterte listen med prosjekter og en 201 (Created) statuskode
  return c.json(projects, { status: 201 });
});


// Definerer porten serveren skal lytte på
const port = 3999;

console.log(`Server is running on port ${port}`);

// Starter serveren
serve({
  fetch: app.fetch,
  port,
});