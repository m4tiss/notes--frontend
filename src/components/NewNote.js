import React,{useState} from "react";
import '../styles/NewNote.css';
import { IoAddCircleOutline } from "react-icons/io5";
const NewNote = (props) => {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [color,setColor] = useState("yellow");


  const changeTitleHandler = event =>{
    const value = event.target.value;
    setTitle(value);
  }

  const changeBodyHandler = event =>{
    const value = event.target.value;
    setBody(value);
  }

    const changeColorHandler = event =>{
    const value = event.target.value;
    setColor(value);
  }
  
  const addNote = () =>{
    let idNumber = props.newID;
    const note = {
        title: title,
        body: body,
        color: color,
        _id : idNumber
    };
    console.log(note.id);
    props.onAdd(note);
    
    setTitle('');
    setBody('');
    setColor("yellow");
}

    return (
      <div className='newNoteContainer'>
        <h2 className="newNoteHeader">Add new note</h2>
        <p className="newNoteInfo">Title</p>
        <input
                className="titleInput"
                type="text"
                placeholder="Do homework"
                value={title}
                onChange={changeTitleHandler}
                maxLength={20}
            />
        <p className="newNoteInfo" >Describe</p>
        <textarea
                className="describeInput"
                type="text"
                placeholder="Math ex 6"
                value={body}
                onChange={changeBodyHandler}
                maxLength={200}
            />
            <div className="colorInput">
              <input type="radio" id="yellow" name="colors" value="yellow" onChange={changeColorHandler} checked={color === "yellow"} />
              <input type="radio" id="blue" name="colors" value="blue" onChange={changeColorHandler}/>
              <input type="radio" id="red" name="colors" value="red" onChange={changeColorHandler}/>
            </div>

            <div className="newNoteAddDiv"><a className="newNoteAdd" onClick={addNote}><IoAddCircleOutline size={60}/></a></div>
            
    </div>
    )
  }
  
  export default NewNote