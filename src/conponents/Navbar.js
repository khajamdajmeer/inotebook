import React,{useEffect, useRef, useState} from 'react'
import { Link, useLocation } from "react-router-dom";


const Navbar = (props ) => {
  let location = useLocation();
  useEffect(()=>{
  },[location])

  const callhome = useRef(null)
  const [loginvalid,setLoginvalid] = useState(false);
  useEffect(()=>{
   if(localStorage.getItem('token')){
 setLoginvalid(true);
   }
   else{
    setLoginvalid(false);
   }
  },[])
  const handlelogout = ()=>{
    localStorage.clear();
    setLoginvalid(false)
  }
  return (
    <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark"  data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home">My NoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/home"? "active":""}`} aria-current="page" to="/home" ref={callhome}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link>
        </li>
        
        
      </ul>
      {!loginvalid && <><Link to='/login'  className="btn btn-primary mx-3">Login</Link>
      <Link to='/signup'  className="btn btn-primary ">Signup</Link></>}

      {loginvalid && <>
      <button type="button" className="btn btn-primary" onClick={handlelogout}>Logout</button>
</>
      }
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar
