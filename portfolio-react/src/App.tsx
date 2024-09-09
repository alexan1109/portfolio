import { Children, type PropsWithChildren } from "react";

function App() {
  
  type experienceProps = {
    id: number;
    experience: string;
  }

  type experiencesProps = {
    experiences: {
      id: number;
      experience: string;
    }[];
  }

  type Student = {
    student: string;
    degree: string;
    points: number;
  }

  type ContactInfo = {
    email: string;
  }


  const student = 'Alexander Myrvold'
  const degree = 'Bachelor IT'
  const points = 180

  const experiences = [
   { id: 0,
    experience: 'HTML',
  },
  {
    id: 1,
    experience: 'CSS',
  },
  { id: 2,
    experience: 'Javascript',
  },
  {
    id: 3,
    experience: 'Java',
  },
  {
    id: 4,
    experience: 'SQL'
  }
  ]

  const email = 'alexanhm@hiof.no'
  
  //projects
  type ProjectProps = {
    id: number;
    title: string;
    company: string;
    description: String;
    url: string;
  }

  type ProjectsProps = {
    projects: {
      id: number;
      title: string;
      company: string;
      description: string;
      url: string;
    }[];
  }
  
  const projects = [
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
    }
  ]
  
const Experience = (  props: Readonly<PropsWithChildren<experienceProps>> ) => {
  const {children, id, experience} = props;
  return(
  <section>
    {children}
    {id}
    <p>{experience}</p> 
   
  </section>
  );
}

const ProjectComp  = (props: Readonly<PropsWithChildren<ProjectProps>>) =>  {
  const {children, id, title, company, description, url} = props;
  return(
    <section>
      {children}
      {id}
      <h2>{title}</h2>
      <h4>{company}</h4>
      <p>{description}</p>
      <img src={url} />
    </section>
  );
}

function Projects(props: Readonly<ProjectsProps>) {
  // Send props videre og legg til riktig props under på Project
  const {projects = []} = props;
  return (
    <section>
      {projects.map((data) => (
        <article key={data.id}>
          <ProjectComp id={data.id} title={data.title} company={data.company} description={data.description} url={data.url}>
          </ProjectComp>
        </article>
      ))}
    </section>
  );
}

function Experiences(props: Readonly<experiencesProps>) {
  const {experiences = []} = props;
  return (
    <section>
    {experiences.map((data) => (
      <article key={data.id}>
        <Experience id={data.id} experience={data.experience}></Experience>
      </article>
    ))}
    </section>
    
  );
}

function Header({ student, degree, points }: Student) {
  return (
    <article>
    <h2>{student}</h2>
    <h4>{degree}</h4>
    <p>{points}</p>
    </article>
  )
}

function Contact({ email }: ContactInfo) {
  return (
    <>
    <p>{email}</p>
    </>
  )
}

  return (
    <div>
    <Header student={student} degree={degree} points={points}/>
    <Experiences />
    <Projects  />
    <Contact email={email}/>
  </div>
  )
}

export default App