import React from "react";
import '../styles/Note.css';
import { FaRegEdit } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";

const Note = (props) => {

  const colorMap = {
    red: '#ff6961',
    yellow: '#fdfd64',
    blue: '#98DDFC'
};
const backgroundColor = colorMap[props.color] || '#ffffff';

    return (
      <div className='noteContainer' style={{ backgroundColor }}>
        <div className="noteData">
            <h1 className="noteTitle">{props.title}</h1>
            <div className="noteLine">.</div>
            <p className="noteDescribe">{props.body}</p>
        </div>
        <div className="noteActions">
            <a className="noteIcon"><FaRegEdit size={40}/></a>
            <a className="noteIcon"><IoTrashBinOutline size={40} /></a>
        </div>

    </div>
    )
  }
  
  export default Note