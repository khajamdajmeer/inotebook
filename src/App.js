import './App.css';
import About from './conponents/About';
import Home from './conponents/Home';
import Navbar from './conponents/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/NoteState';
import Alert from './conponents/Alert';
import { useEffect, useState } from 'react';
import AddNote from './conponents/AddNote';
import Login from './conponents/login';
import Signup from './conponents/signup';

function App() {
  const normal  = ("welcome","success")
  const [Alert, setAlert] = useState(normal);
  // isVisible = true

 const showAlert = (msg,type)=>{
  setAlert({
    msg:msg,
    type:type
  })
  setTimeout(()=>{
    setAlert(null);
  },1500);
 }

 
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
       
        
        
       {/* <Alert/> */}
        <Routes>

          <Route exact path='/home' element={<Home />} ></Route>


          <Route exact path='/about' element={<About />} ></Route>

<Route exact path='/addnote' element={<AddNote />}></Route>
 <Route exact path = '/login' element={<Login/>}></Route>
<Route exact path = '/signup' element={<Signup/>}></Route>
        </Routes>
       
      </Router>
      </NoteState>
    </>
  );
}

export default App;
