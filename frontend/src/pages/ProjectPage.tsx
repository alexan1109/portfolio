import {useState, useEffect, FormEvent, useCallback} from 'react';
import type { Project as ProjectType, Id } from "@/types";

type ProjectProps = {
  id: number;
  title: string;
  company: string;
  description: string;
  url: string;
}

function ProjectPage () {
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
  // ...
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(async () => {
      try {
        console.time("fetching");
        console.log("fetching data ...");
        setLoading(true);
        const projectPromise = projectsApi.list();
        const [projects] = await Promise.all([
          projectPromise,
        ]);
        console.log("... data fetched");
        setProjects(projects ?? []);
        console.log("... data initialized");
        console.timeEnd("fetching");
      } catch (error) {
        console.error(error);
        setError("Feilet ved henting av data");
      } finally {
        setLoading(false);
      }
    }, []);
    
    useEffect(() => {
      fetchData();
    }, [fetchData]);

  if (loading) return <p>Henter data...</p>;
  if (error) return <p className="error">{error}</p>;

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
          <button type='button' onClick={() => removeProject(data.id)} className="error"> [Delete project]</button>
        </article> 
      )) 
) }    
    </section>
    
  );   
}

const addProjects = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();


  const form = event.target as HTMLFormElement | null;

  if (!form) return;
  const formData = new FormData(form);

  const title = formData.get('pname');
  const company = formData.get('pcompany');
  const description = formData.get('pdescription');
  const url = formData.get('pimage');

  if (!title || !company || !description || !url) return;
  setProjects((prevProjects: any) => {
      return [...prevProjects, { id: crypto.randomUUID(), title, company, description, url }]});

  form.reset();
}

const handleProjectMutation = (action: Action, data: Partial<ProjectType>) => {
  const { id, company, description, url, ...projects } = data;

  switch (action) {
    case "add":
      add(projects);
      break;
    case "remove":
      remove(id);
      break;
    default:
      break;
  }
};

const removeProject = (id: Id) => {
  handleProjectMutation("remove", { id });
};

const remove = async (id?: Id) => {
  if (!id) return;

  try {
    setLoading(true);
    await projectsApi.remove(id);
    await fetchData();
  } catch (error) {
    setError("Failed removing item");
  } finally {
    setLoading(false);
  }
};

const add = async (data: Partial<ProjectType>) => {
  const { title = "" , company = "", description = "", url = "" } = data;

  try {
    setLoading(true);
    await projectsApi.create({ title, company, description, url });
    await fetchData();

  } catch (error) {
    setError("Failed creating habit");
  } finally {
    setLoading(false);
  }
};

return (
  <>
    <article id="form-style">
        <h3 id="form-title">Add new <br/> project</h3>
        <form id="projectForm" method="POST" action="/" onSubmit={addProjects}>
            <label>Name: <br/>
            <input type="text" id="pname" name="pname" /></label><br/><br/>
            <label>Company: <br/>
            <input type="text" id="pcompany" name="pcompany" /></label><br/><br/>
            <label>Description: <br/>
            <input type="text" id="pdescription" name="pdescription" /></label><br/><br/>
            <label>Image URL: <br/>
            <input type="text" id="pimage" name="pimage"/></label><br/><br/>
            <button type="submit" id="button-bgcolor add-new-project">Submit</button>
        </form>
    </article>
    <Projects projects={projects}/>
  </>
)
};



export default ProjectPage;

