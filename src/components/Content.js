import React, { useEffect, useState } from "react";
import '../styles/Content.css';
import Photo from '../images/note.jpg';
import axios from "../axios";
import Note from './Note';
import NewNote from "./NewNote";
const Content = () => {

    const [notes, setNotes] = useState([]);


    useEffect(()=>{
       axios.get('/getAllNotes').then(
         (res)=>{
          const uploadedNotes = res.data;
          console.log(uploadedNotes);
          setNotes(uploadedNotes);
          console.log(res.data);
         }
       );
     },[])


     const deleteNote = (_id) => {
      const notesToDelete = notes.filter((note) => note._id !== _id);
  
      axios.delete('/deleteNote/'+_id);
  
      setNotes(notesToDelete);
    };

    return (
      <div className='contentContainer'>
        <div className="leftSide">
        <NewNote/>
        </div>
        <div className="rightSide">
            {(
            notes.map((note, index) => (
            <Note  key={note._id}
            _id={note._id}
            title={note.title}
            body={note.body}
            color = {note.color}
            onDelete={deleteNote}
            // onEdit={editNoteHandler} 
            />
                    ))
                )}
        
        </div>

    </div>
    )
  }
  
  export default Content