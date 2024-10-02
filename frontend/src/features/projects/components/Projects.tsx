import type { PropsWithChildren } from "react";

import ProjectForm from "./ProjectForm";
import type { Action, ProjectType } from "../types/types";

type ProjectProps = {
    handleProjectMutation: (action: Action, project: Partial<ProjectType>) => void;
    projects: ProjectType[];
  };

  export default function Projects (  props: Readonly<PropsWithChildren<ProjectProps>>
  ) {

    const { projects = [], handleProjectMutation, children } = props;

    const addProject = async (title: string, company: string, description: string, url: string, website: string) => {
        handleProjectMutation("add", { title, company, description, url, website});
      };

      const removeProject = (id: number) => {
        handleProjectMutation("remove", { id });
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
        <p>Website for project: {data.website}</p>
            <button type='button' onClick={() => removeProject(data.id)}> [Delete project]</button>
          </article> 
        ))

    )} </section>
        </>
      )
  }