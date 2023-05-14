import React, { useState } from "react";
import noteContext from "./NoteContext";
// import Alert from "../conponents/Alert";

const NoteState = (props) => {
const host = 'http://localhost:5000'
  const notesinital = []
  const[notes,setNotes]=useState(notesinital)
  const exsee = {
  
  };
 const [seeNote,setSeeNote]=useState(exsee)
  //get all notes
  const getNotes = async()=>{
    //api call
    const response = await fetch(`${host}/api/notes/getnotes`, {
      
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    
    const json = await response.json();
    setNotes(json)
  }
  
  //Add a Note
  const addNote = async(Title, Description, tag) => {
    //API call
    await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({Title,Description,tag}), // body data type must match "Content-Type" header
    });
    return true;
  
  }







  //Delete a Note

  const deleteNote = async (id) => {
    //api call pending here
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      }

    });

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  const viewNote = async (id) => {
    //api call pending here
    const response = await fetch(`${host}/api/notes/viewnote/${id}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      


    });
 
    // console.log(response.json())
    setSeeNote( await response.json())
    console.log(seeNote)
    

    
  }

  
  //Edit a Note
  const editNote = async (id, Title, Description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({Title,Description,tag}), // body data type must match "Content-Type" header

    });
   
const json = response.json();
console.log(json)

    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.Title = Title;
        element.Description = Description;
        element.tag = tag;

      }
    }

  }


//the user login end
  const UserAuth = async(email,password)=>{
 const response = await fetch(`${host}/api/auth/login`,{
  method:'POST',
  headers:{
    "Content-Type": "application/json",
},
body: JSON.stringify({email:email,password:password}), // body data type must match "Content-Type" header
 });
const json = await response.json();

    console.log(json);
    if(json.success){
      //redirect
      localStorage.setItem('token',json.AuthToken);
      return true;
    }
else{
  alert('invalid Credentials')
  return false;
}


  }



  const userSignup = async(name,email,password)=>{
    const response = await fetch(`${host}/api/auth/createuser`,{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
    },
    body: JSON.stringify({name:name,email:email,password:password}), // body data type must match "Content-Type" header
     });
     const json = await response.json();
if(json.success){
  console.log(json);
  return [true,json];
}
else{
  console.log(json);
  return [false,json];
}


    
  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes,viewNote, seeNote,UserAuth,userSignup}}>
      {props.children}
    </noteContext.Provider>
  )


}


export default NoteState;