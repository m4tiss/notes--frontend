import React from "react";
import '../styles/Content.css';
import Photo from '../images/note.jpg';
import Note from './Note';
import NewNote from "./NewNote";
const Content = () => {
    return (
      <div className='contentContainer'>
        <div className="leftSide">
            <Note/>
            <Note/>
            <Note/>
            <NewNote/>
            </div>
        <div className="rightSide">
            <div className="photoContainer">
                <img src={Photo} alt="note" width="400px"/>
            </div>
        </div>
    </div>
    )
  }
  
  export default Content