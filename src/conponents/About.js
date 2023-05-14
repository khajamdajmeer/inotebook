import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/NoteContext'
const About = () => {
    const a = useContext(noteContext);
    
  return (
    <>
    <div>
      THis is about  and he is in class 
    </div>
    </>
  )
}

export default About
