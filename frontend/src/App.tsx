import Experiences from './features/components/Experiences'
import Contact from './features/components/Contact'
import Student from './features/components/Student'
import Layout from "./components/Layout"
import ProjectPage from './pages/ProjectPage'
import type { PropsWithChildren } from "react";

type AppProps = PropsWithChildren;

function App(props: AppProps) {  
    
  return (
    <Layout>
    <Student />
    <Experiences />
    <ProjectPage />
    <Contact />
    </Layout>
  )
}

/* REFAKTORERINGSMULIGHETER */
/* Jeg kunne hatt en komponent for grunnleggende-informasjon, en for erfaringer, en for prosjekt-skjemaet og en for prosjekter. Fordelen er at det
vil være lettere å endre spesifikke deler av nettsiden, men kan også bli uoversiktlig hvis applikasjonen blir veldig stor.  
Jeg kunne også hatt en type-komponent for alle typene. Det gjør det lettere å gjenbruke typene, men igjen, kan bli uoversiktlig hvis applikasjonen vokser seg større.*/
export default App;
