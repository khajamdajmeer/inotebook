import React, { useContext } from 'react';
import noteContext from '../context/NoteContext';
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, } = context;
  const {note , updateNote,viewNote} = props;
  let date = note.date;
  const trimdate = date.slice(0,10)
  return (
    <>
      <div className="col-md-3 mt-4"  >
        <div className="card " style={{height:"150px"}}>
          <div className="card-body " style={{ paddingTop:"2px"}}>
            <h5 className="card-title">    {note.Title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
            <p className="card-text">{note.Discription}</p>
            <p className="card-text">Created on {trimdate}</p>
            <div className="d-flex justify-content-between">
              <button type="button" title='View Note' className="btn btn-light" onClick={()=>{viewNote(note._id)}}><i className="fa-sharp fa-solid fa-book"></i></button>
              <button type="button" className="btn btn-light" title='Delete note' onClick={()=>{deleteNote(note._id)}}><i className="fa-solid fa-trash"></i></button>
              <button type="button" title='Edit Note' className="btn btn-light" onClick={()=>{updateNote(note)}}><i className="fa-solid fa-pen-to-square"></i></button>
              
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Noteitem;

