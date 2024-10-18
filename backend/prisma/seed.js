import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
const prisma = new PrismaClient();


app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/projects', async (req, res) => {
  try {
    const { id, title, company, description, url, website, userId, email, createdAt } = req.body;
    const project = await prisma.projects.create({
      data: { id, title, company, description, url, website, userId, email, createdAt },
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await prisma.projects.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.projects.findUnique({ where: { id } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, description, url, website, userId, email, createdAt } = req.body;
    const project = await prisma.projects.update({
      where: { id },
      data: { title, company, description, url, website, userId, email, createdAt },
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.projects.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

async function main() {
  const data = JSON.parse(await fs.readFile('data.json', 'utf-8'));

  for (const project of data) {
    const existingProject = await prisma.projects.findUnique({
     where: { id: "20" },
    });

    if (existingProject) {
      console.log(`Project with id ${project.id} already exists. Skipping...`);
      continue;
    }
    await prisma.projects.create({
      data: {
        id: project.id,
        title: project.title,
        company: project.company,
        description: project.description,
        url: project.url,
        website: project.website,
        userId: project.userId,
        email: project.email,
        createdAt: new Date(project.createdAt),
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
export default prisma;