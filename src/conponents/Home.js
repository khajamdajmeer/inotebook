import React, {  } from 'react'
import Notes from './Notes'
// import AddNote from './AddNote'
// import { Routes,Route } from 'react-router-dom'
const Home = (props) => {
  // const showAlert= props
  return (
    <>    <div className="container">
  <Notes showAlert={props.showAlert}/>
  

    </div>
    
</>
  )
}

export default Home
