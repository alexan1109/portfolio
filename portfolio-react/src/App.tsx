import Experiences from './components/Experiences'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Student from './components/Student'
import { useState } from 'react'

function App({list}: any) {

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