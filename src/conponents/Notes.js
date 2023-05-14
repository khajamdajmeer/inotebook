import React, { useState, useContext, useEffect, useRef } from 'react'
import noteContext from '../context/NoteContext';
import Noteitem from './Noteitem';
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, editNote, getNotes,viewNote,seeNote } = context;
const history = useNavigate();


  
  // useEffect(() => {
  //   getNotes()  });
  
  const ref = useRef(null);
  const refclose = useRef(null)
  const refreadclose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote)

  }
  const [note, setNote] = useState({id:"", Title: "", Description: "", tag: "" })
  const handleNoteSubmit = (e) => {
    e.preventDefault();
    editNote(note._id,note.Title,note.Description,note.tag)
    refclose.current.click()
    console.log('updating the note')
    console.log(note)


  }

  const viewnote=(_id)=>{
    refreadclose.current.click();
   viewNote(_id)

  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
       getNotes();

    }
    else{
      history('/login')
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  // const [loginvalid,setLoginvalid] = useState(false);
  // useEffect(()=>{
  //   if(localStorage.getItem('token')){
  // setLoginvalid(true);
  
  //   }
  //   else{
  //    setLoginvalid(false);
  //   }
  //  },[])

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (<>
  
  {/* this is the view button    */}
<div>
  <button style={{ display: 'none' }} ref={refreadclose} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Title: {seeNote.Title} </h1>
         
        </div>
        <div className="modal-body overflow-auto">
        <h3>Description</h3>
          <p style={{maxHeight:"250px",overflow:"auto"}} className='overflow-auto'>{seeNote.Description}</p>
        </div>
        <div className="modal-body overflow-auto">
          <h4>Tag: {seeNote.tag} </h4>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          
        </div>
      </div>
    </div>
  </div>
</div>

{/* this is the update note */}
    <div>
      {/* Button trigger modal */}
      <button style={{ display: 'none' }} type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>
      {/* Modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label" >Title</label>
                  <input type="text" className="form-control" id="Title" value={note.Title} aria-describedby="emailHelp" name='Title' onChange={onChange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label" >Description</label>
                  <textarea type="text" className="form-control textarea" rows='4' id="Description" name='Description' value={note.Description} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="Description" name='tag' onChange={onChange} value={note.tag}/>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.Title.length<5||note.Description.length<5} type="button" className="btn btn-primary" onClick={handleNoteSubmit}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className='row my-3'>
      <h2>Your notes</h2>
      {notes.length===0 && 'No notes to Display'}
     {notes.map((note) => {
        return <Noteitem key={note._id} updateNote={updateNote} note={note} viewNote = {viewnote}/>
      })}
    </div>
  <Link title='Click to add New Note' className="sticky" to='/addnote'> <i style={{color:'black'}} className="fa-solid fa-circle-plus fa-2xla addbtnstyle" id='addbtn'></i></Link>
 
  </>

  )
}

export default Notes
