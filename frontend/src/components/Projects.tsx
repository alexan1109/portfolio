import CreatingProjects from './createProject';

type ProjectProps = {
  id: number;
  title: string;
  company: string;
  description: String;
  url: string;
}
function Projects ({projects, setProjects}: {projects: any, setProjects: any}) {
    

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