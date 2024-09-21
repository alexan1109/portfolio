import {useState, useEffect } from 'react';
import CreatingProjects from './createProject';

function Projects () {
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
    
  
  //projects
  type ProjectProps = {
    id: number;
    title: string;
    company: string;
    description: String;
    url: string;
  }

const ProjectComp  = ({projects}: {projects: Readonly<ProjectProps>}) =>  {
    return(
      <>
        <h2>{projects.title}</h2>
        <h4>{projects.company}</h4>
        <p>{projects.description}</p>
        <img src={projects.url} />
      </>
    );
  }
  
  const Projects = ({projects}:{projects: Readonly<ProjectProps[]>}) => {

    return (
      <section id="grid-container">
        
        {projects.length === 0 ? (
          <p>You have no projects.</p>
      ) : (
        projects.map((data) => (
          <article className="articles" key={data.id}>
            <ProjectComp projects={data} />
            <button type='button' onClick={() => removeProject(data.id)}> [Delete project]</button>
          </article> 
        )) 
      ) }    
      </section>
      
    );   
  }
  const removeProject = (id: any) => {
    setProjects((prevProjects: any[]) => prevProjects.filter((data: { id: any; }) => data.id !== id));
  };

return(
<>
<CreatingProjects setProjects={setProjects} projects={projects} />
<Projects projects={projects}  />
</>
)
}

export default Projects;