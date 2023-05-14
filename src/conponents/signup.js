import React, { useState ,useContext} from 'react';
import noteContext from '../context/NoteContext';
// import {useNavigate } from "react-router-dom";
// eslint-disable-next-line
import e from 'cors';
// import { Navigate } from 'react-router-dom';

const Signup=(props)=> {
    const [Credentials, setCredentials] = useState({ name:'',email: '', password: '',cpassword:'' });
// const history = useNavigate();
    const context = useContext(noteContext);
    const {userSignup}=context
  // Select all the input fields
const inputs = document.querySelectorAll('input');
    const [msg,setMsg] = useState('');
    const[rtmsg,setRtmsg] = useState('');
    //the function of the button that sends the user signup data to backend
const handlesubmit= async(e)=>{
    e.preventDefault();
    
let [rt,rtmsg] = await userSignup(Credentials.name,Credentials.email,Credentials.password);
inputs.forEach((input) => {
    input.value = '';
  });
if(rt){
    // props.showAlert('Sign Up Successfully','success')
    setMsg("Account created succefully! Login to Continue")
    // history('/login')
}
else{
    // setMsg("Try again")
    setRtmsg(rtmsg.error)
    // console.log(rtmsg.error[0].msg)
    

    // props.showAlert('Sign Up Unsuccessful Try again','danger')

}


}


      // Function to handle input change
  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };
    return (
        <>
            <form onSubmit={handlesubmit}>
                <div id="parent">
                    <div className="middlebox">

                        <div className="box">
                            <h2>Sign up</h2>
                            <div><strong style={{color:'white'}}>{msg} </strong></div>

                            <div><strong style={{color:'red'}}>{rtmsg} </strong></div>

                            <div className="text-element"><h4 className="text">Name</h4></div>
                            <input placeholder='Enter Your Name' type="text" name="name" className='input' onChange={onChange} value={Credentials.name} minLength={3} maxLength={15} required />
                            <div className="text-element"><h4 className="text"  required>Email</h4></div>
                            <input placeholder='Enter a email' type="email" name="email" className='input' onChange={onChange} value={Credentials.email} required />
                            <div className="text-element"> <h4 className="text" required>Password</h4>
                            </div>
                            <input placeholder='Enter a password' type="password" name="password" className='input' onChange={onChange} value={Credentials.password} required />
                            <div className="text-element"> <h4 className="text" required>Reenter Password</h4>
                            </div>
                            <input placeholder='Enter password again' type="password" name="cpassword" className='input' onChange={onChange} value={Credentials.cpassword} required />

                            <input className='input btn1' type="submit" value="Sign up" />

                        </div>
                    </div>
                </div>
            </form>

        </>
    )
}

export default Signup
