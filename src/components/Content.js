import React, { useEffect, useState } from "react";
import '../styles/Content.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import axios from "../axios";
import Note from './Note';
import NewNote from "./NewNote";
const Content = () => {

    const [notes, setNotes] = useState([]);

    const [filteredNotes, setFilteredNotes] = useState([]);
    const [search,setSearch] = useState("")

    const [idIterrator, setIdIterrator] = useState(0);

    useEffect(()=>{
       axios.get('/getAllNotes').then(
         (res)=>{
          const uploadedNotes = res.data;
          setNotes(uploadedNotes);
          setFilteredNotes(uploadedNotes);
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
            setFilteredNotes(newNotes);
            setSearch("")
          })
          .catch((err) => {

          });
    };

     const deleteNote = (_id) => {
      const notesToDelete = notes.filter((note) => note._id !== _id);
  
      axios.delete('/deleteNote/'+_id);
  
      setNotes(notesToDelete);
      setFilteredNotes(notesToDelete);
    };

    const handleSearchInputChange = (event) => {
      const query = event.target.value;
      if (query.trim() === "") {
          setFilteredNotes(notes);
          setSearch("")
      } else {
          const filtered = notes.filter(note =>
              note.title.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredNotes(filtered);
          setSearch(query)
      }
  };
    return (
      <div className='contentContainer'>
        <div className="leftSide">
        <div className="searchContainer">
            <input
                className="searchInput"
                type="text"
                placeholder="Search notes..."
                onChange={handleSearchInputChange}
                value={search}
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
            filteredNotes.map((note, index) => (
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