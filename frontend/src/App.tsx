import Experiences from './components/Experiences'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Student from './components/Student'
import { ofetch } from "ofetch";
import { useEffect } from 'react';


function App({setProjects}: any) {  

  const initializeData = () => {
    console.log("fetching data");
    ofetch("<http://localhost:3000/projects>").then(
      (projects: { data: any}) => {
        console.log("data fetched");
        setProjects(projects.data);
        console.log("data initialized");
      }
    );
  };
  
  useEffect(() => {
    initializeData();
  }, []);
  
  return (
    <div>
    <Student />
    <Experiences />
    <Projects />
    <Contact />
  </div>
  )
}

export default App;