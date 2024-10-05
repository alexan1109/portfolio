import type { PropsWithChildren } from "react";
import ProjectForm from "../components/ProjectForm"
import { formatDistance } from "../helpers/format";
import type { Action, HandleMutation, ProjectType } from "../types/types";

type ProjectProps = {
    handleProjectMutation: (action: Action, project: Partial<ProjectType>) => void;
    projects: ProjectType[];
    updatedAt: Date;
  };


  export default function Projects (  props: Readonly<PropsWithChildren<ProjectProps>>
  ) {

    const { projects = [], handleProjectMutation, children, updatedAt} = props;

    const formatedProject = formatDistance(updatedAt);

      const addProject = async (title: string, company: string, description: string, url: string, categories: string[], website: string, createdAt: string, updatedAt: Date) => 
        {handleProjectMutation("add", {title, company, description, url, categories, website, createdAt, updatedAt})};

      const removeProject = (id: number) => {
        handleProjectMutation("remove", {id});
      };

      return(
        <>
        <section id="grid-container">
        {children}
        {projects.length === 0 ? (
          <p>You have no projects.</p>
      ) : (
        projects.map((data) => (
          <article className="articles" key={data.id}>
            <h2>{data.title}</h2>
        <h4>{data.company}</h4>
        <p>{data.description}</p>
        <img src={data.url} />
        <ul>
          <li>{data.categories}</li>
        </ul>
        <p>Website for project: {data.website}</p>
        <p>Project created at: {data.createdAt}</p>
        <p><i>{formatedProject}</i></p>

            <button type='button' onClick={() => removeProject(data.id)}> [Delete project]</button>
          </article> 
        ))

    )} </section>
    <ProjectForm addProject={addProject} />
        </>
      )
  }