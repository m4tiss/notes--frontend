import React, { useEffect, useState } from "react";
import '../styles/Content.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import axios from "../axios";
import Note from './Note';
import NewNote from "./NewNote";
const Content = () => {

    const [notes, setNotes] = useState([]);

    const [idIterrator, setIdIterrator] = useState(0);

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


     const addNote = (note) => {
      const newNotes = [...notes];
        axios.post('/saveNote', note)
          .then((res) => {
            const newNote = res.data;
            newNotes.push(newNote);
            setIdIterrator(idIterrator + 1);
            setNotes(newNotes);
          })
          .catch((err) => {

          });
    };

     const deleteNote = (_id) => {
      const notesToDelete = notes.filter((note) => note._id !== _id);
  
      axios.delete('/deleteNote/'+_id);
  
      setNotes(notesToDelete);
    };

    return (
      <div className='contentContainer'>
        <div className="leftSide">
        <div className="searchContainer">
            <input
                className="searchInput"
                type="text"
                placeholder="Search notes..."
            />
        <FaMagnifyingGlass />
        </div>

        <NewNote
        onAdd={addNote}
        newID={idIterrator}
        />
        </div>
        <div className="rightSide">
  
            {(
            notes.map((note, index) => (
            <Note  key = {note._id}
            _id = {note._id}
            title = {note.title}
            body = {note.body}
            color = {note.color}
            onDelete = {deleteNote}
            time = {note.createdAt}
            // onEdit={editNoteHandler} 
            />
                    ))
                )}
        
        </div>

    </div>
    )
  }
  
  export default Content