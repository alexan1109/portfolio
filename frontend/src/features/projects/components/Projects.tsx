"use client"
import React, { useEffect, useState } from "react";
import CreateProject from "./CreateProject";
import { formatCreated, formatUpdated } from "../helpers/format";
import { ofetch } from "ofetch";

export type ProjectProps = {
  id: string,
  title: string,
  company: string,
  description: string,
  url: string,
  categories: string[],
  website: string,
  files: FileList[] | null,
  createdAt: Date,
  updatedAt: Date,
}
function Projects () {

  const [projects, setProjects] = useState<ProjectProps[]>([]);

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

  const ProjectComp  = ({projects}: {projects: Readonly<ProjectProps>}) => {
    return(
      <>
        <h2>{projects.title}</h2>
        <h4>{projects.company}</h4>
        <p>{projects.description}</p>
        <img src={projects.url} />
        <ul><h4>Categories:</h4>
          <li>{projects.categories[0]}</li>
          <li>{projects.categories[1]}</li>
          <li>{projects.categories[2]}</li>
          <li>{projects.categories[3]}</li>
          <li>{projects.categories[4]}</li>
          <li>{projects.categories[5]}</li>
        </ul>
        <p><a href={projects.website}><i>Portfolio Website</i></a></p>
        <pre>
  {projects.files instanceof FileList
    ? Array.from(projects.files).map(file => file.name).join(', ')
    : 'No files uploaded'}
</pre>
        {formatCreated}
        {formatUpdated}
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