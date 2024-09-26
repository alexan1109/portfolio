import Experiences from './components/Experiences'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Student from './components/Student'
import CreateProject from './components/CreateProject'
import { ofetch } from "ofetch";
import {useEffect, useState } from 'react';

type ProjectProps = {
  id: number;
  title: string;
  company: string;
  description: string;
  url: string;
}

function App() {  
  
  const baseProjects: ProjectProps[] = [
    {
    id: 0,
    title: "Project using Javascript",
    company: "Seriz AS",
    description: "A website made from scratch with Javascript.",
    url: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    id: 1,
    title: "Project using Javascript and React",
    company: "Belum AS",
    description: "A dynamic website with React.",
    url: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "Project using Javascript, React and Node.js",
    company: "Pawn AS",
    description: "A website with Javascript and Node.js in a React app.",
    url: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    id: 3,
    title: "Project using Next.js",
    company: "Labs AS",
    description: "A website made with Next.js.",
    url: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }];

  const [projects, setProjects] = useState<ProjectProps[]>(baseProjects);

  const initializeData = async () => {
    console.log("fetching data");
    try {
      const response = await ofetch("http://localhost:3000/projects");
      console.log("data fetched");
      setProjects(response.data);
      console.log("data initialized");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    initializeData();
  }, []);
  
  return (
    <div>
    <Student />
    <Experiences />
    <CreateProject setProjects={setProjects} />
    <Projects projects={projects} setProjects={setProjects} />
    <Contact />
  </div>
  )
}

/* REFAKTORERINGSMULIGHETER */
/* Jeg kunne hatt en komponent for grunnleggende-informasjon, en for erfaringer, en for prosjekt-skjemaet og en for prosjekter. Fordelen er at det
vil være lettere å endre spesifikke deler av nettsiden, men kan også bli uoversiktlig hvis applikasjonen blir veldig stor.  
Jeg kunne også hatt en type-komponent for alle typene. Det gjør det lettere å gjenbruke typene, men igjen, kan bli uoversiktlig hvis applikasjonen vokser seg større.*/
export default App;
