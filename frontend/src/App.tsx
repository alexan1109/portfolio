import Experiences from './features/projects/components/Experiences'
import Contact from './features/projects/components/Contact'
import Student from './features/projects/components/Student'
import Layout from "./components/Layout"
import ProjectPage from './features/projects/pages/ProjectPage'


function App() {  

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
Jeg kunne også hatt en type-komponent for globale typer. Det kunne gjøre det lettere å sortere typene etter hva de skal brukes til.*/

export default App;
