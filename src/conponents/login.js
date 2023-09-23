// Importing required modules
import React, { useState ,useContext} from 'react';
import { Link } from 'react-router-dom';
import noteContext from '../context/NoteContext';
import {useNavigate } from "react-router-dom";

// eslint-disable-next-line 


import e from 'cors';

// Initializing the component
const Login = (props) => {
  // Initializing the state variables
  const [Credentials, setCredentials] = useState({ email: '', password: '' });
  const context = useContext(noteContext);
  const {UserAuth}=context

  // Function to handle form submit
let history = useNavigate();

  const handleSubmit = async (e) => {
// eslint-disable-next-line 

    e.preventDefault();
    let rt = false;
rt = await UserAuth(Credentials.email,Credentials.password);
console.log(rt)
if(rt){
  history('/home')
}
else{
  // props.showAlert('invalid Credentials','danger')
  history('/login')
}

  };

  // Function to handle input change
  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  // Returning the JSX
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div id='parent'>
          <div className='middlebox'>
            <div className='box'>
              <h2>Sign In</h2>
              <h3 className='text-element'>Email</h3>
              <input
                placeholder='Enter an email'
                type='email'
                name='email'
                value={Credentials.email}
                onChange={onChange}
                className='input'
                id='email'
                required
              />
              <h3 className='text-element'> Password</h3>
              <input
                placeholder='Enter a password'
                type='password'
                className='input'
                id='password'
                name='password'
                value={Credentials.password}
                onChange={onChange}
                required
              />
              <div className='text-element' id='signup'>
                <h4 className='text'>
                  Not a Member?
                  <Link className='link-tag' to='/signup'>
                    Sign up
                  </Link>
                </h4>
              </div>
              <button className='input btn1' type='submit' value='Sign In'>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
