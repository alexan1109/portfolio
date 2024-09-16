function Experiences() {
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
       ];

    type ExperienceProps = {
    id: number;
    experience: string;
      }
    
    const Experience = ({experiences}: {experiences: Readonly<ExperienceProps>}) => {
    return(
    <>
        <p>{experiences.experience}.</p>
    </>
  );
}

    const Experiences = ({experiences}:{experiences: Readonly<ExperienceProps[]>}) => {
        return (
        <section>
        {experiences.map((data) => (
            <article key={data.id}>
            <Experience experiences={data} />
            </article>
        ))}
        </section>
        
        );
    }

    return (
        <>
        <Experiences experiences={experiences}/>
        </>
    )
}

export default Experiences;