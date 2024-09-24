import Experiences from './components/Experiences'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Student from './components/Student'
import { ofetch } from "ofetch";
import { useEffect, useState } from 'react';

type ProjectProps = {
  id: number;
  title: string;
  company: string;
  description: String;
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

  const initializeData = () => {
    console.log("fetching data");
    ofetch("<http://localhost:3000/projects>").then(
      (projects: { data: any}) => {
        console.log("data fetched");
        setProjects(projects.data);
        console.log("data initialized");
      }
    );
  };
  
  useEffect(() => {
    initializeData();
  }, []);
  
  return (
    <div>
    <Student />
    <Experiences />
    <Projects projects={projects} setProjects={setProjects} />
    <Contact />
  </div>
  )
}

export default App;