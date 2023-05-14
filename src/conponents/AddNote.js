import React, { useState,useContext} from 'react';
import noteContext from '../context/NoteContext';
const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote}= context;
const[note,setNote]= useState({Title:"",Description:"",tag:""})
const [adrt,setAdrt]= useState(false);
const inputfield = document.querySelectorAll("input")

    const handleNoteSubmit=async(e)=>{
        e.preventDefault();
        
      const rt= await addNote(note.Title,note.Description,note.tag)
      setNote({Title:"",Description:"",tag:""})
      setAdrt(rt);
      inputfield.forEach((inputfield)=>{
        inputfield.value=''
      })
        
    }
   
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    
    return (
        <><div className="container">
            <h1>Add a notes</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="Title" aria-describedby="emailHelp" maxLength={15}  value={note.Title}  name='Title' onChange={onChange} required />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <textarea type="text" rows='5' className="form-control" id="Description" value={note.Description}  name='Description' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onChange}/>
                </div>
                {adrt &&<h5 style={{color:'green'}}>New Note Created</h5>}
                <button disabled={note.Title.length<5||note.Description.length<5} type="submit" className="btn btn-primary" onClick={handleNoteSubmit}>Add Note</button>
            </form>
            </div>
        </>
    );
}

export default AddNote;
