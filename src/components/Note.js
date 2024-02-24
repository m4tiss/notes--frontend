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


const editHandler=()=>{
  props.onEdit({
    title:props.title,
    body:props.body,
    _id:props._id,
    color: props.color,
    createdAt: props.createdAt
  });
}

const date = new Date(props.createdAt);
const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

    return (
      <div key={props._id} className='noteContainer' style={{ backgroundColor }}>
        <div className="noteData">
            <h1 className="noteTitle">{props.title}</h1>
            <div className="noteLine">.</div>
            <p className="noteDate">{formattedDate}</p>
            <br/>
            <p className="noteDescribe">{props.body}</p>
        </div>
        <div className="noteActions">
            <a className="noteIcon" onClick={editHandler}><FaRegEdit size={40}/></a>
            <a className="noteIcon" onClick={() => props.onDelete(props._id)}><IoTrashBinOutline size={40} /></a>
        </div>

    </div>
    )
  }
  
  export default Note