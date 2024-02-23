import React from "react";
import '../styles/Note.css';
import { FaRegEdit } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";

const Note = () => {
    return (
      <div className='noteContainer'>
        <div className="noteData">
            <h1 className="noteTitle">Title</h1>
            <p className="noteDescribe">Body</p>
        </div>
        <div className="noteActions">
            <a className="noteIcon"><FaRegEdit size={50} color="green"/></a>
            <a className="noteIcon"><IoTrashBinOutline size={50} color="red" /></a>
        </div>

    </div>
    )
  }
  
  export default Note