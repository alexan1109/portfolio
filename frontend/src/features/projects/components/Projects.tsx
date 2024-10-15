import React, { useEffect, useState } from "react";
import CreateProject from "./CreateProject";
import { formatCreated} from "../helpers/format";
import { ofetch } from "ofetch";

export type ProjectProps = {
  id: string,
  title: string,
  company: string,
  description: string,
  url: string,
  categories: string[],
  website: string,
  userId: string,
  email: string,
  createdAt: string,
}
function Projects () {

  const [projects, setProjects] = useState<ProjectProps[]>([]);

  const initializeData = async () => {
    try {
      const response = await fetch("http://localhost:3000/projects", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("data fetched", data);
      setProjects(data.data);
      console.log("data initialized");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    initializeData();
  }, []);

  const ProjectComp  = ({projects}: {projects: Readonly<ProjectProps>}) => {

    return(
      <>
        <h2>{projects.title}</h2>
        <h4>{projects.company}</h4>
        <p>{projects.description}</p>
        <img src={projects.url} />
        <ul>
        <h4>Categories:</h4>
        {projects.categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
        <p><a href={projects.website}><i>Portfolio Website</i></a></p>
    <p>User-id: {projects.userId}</p>
    <p>email: {projects.email}</p>
   <p>Created at: <br/>{formatCreated(new Date(projects.createdAt))}</p>
    </>
    );
  }
  
  const Projects = ({projects}:{projects: Readonly<ProjectProps[]>}) => {
    const projectArray = projects as ProjectProps[];
    console.log('Projects:', projects);
    return (
      <section id="grid-container">
        
        {!projectArray || projectArray.length === 0 ? (
          <p>You have no projects.</p>
      ) : (
        projectArray.map((data) => (
          <article className="articles" key={data.id}>
            <ProjectComp projects={data} />
            <button type='button' onClick={() => removeProject(data.id)}> [Delete project]</button>
          </article> 
        )) 
) }    
      </section>
      
    );   
  }

  const removeProject = (id: string) => {
    setProjects((prevProjects) => prevProjects.filter((data) => data.id !== id));
  };

return(
  <>
    <CreateProject setProjects={setProjects} initializeData={initializeData}/>
    <Projects projects={projects} />
  </>
)
}

export default Projects;