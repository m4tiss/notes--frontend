import React, { useState } from "react";
import "../styles/EditNote.css";

const EditNote = (props) => {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  const changeTitleHandler = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const changeBodyHandler = (event) => {
    const value = event.target.value;
    setBody(value);
  };
  const editNote = () => {
    const note = {
      title: title,
      body: body,
      _id: props._id,
      color: props.color,
      createdAt: props.createdAt,
    };
    props.onEdit(note);
  };
  return (
    <div className="editDiv">
      <h2 className="editNoteHeader">Edit your note</h2>
      <p className="editNoteInfo">Title</p>
      <input
        type="text"
        className="titleEditInput"
        value={title}
        onChange={changeTitleHandler}
        maxLength={20}
      />

      <p className="editNoteInfo">Describe</p>
      <textarea
        className="describeEditInput"
        type="text"
        placeholder="Math ex 6"
        value={body}
        onChange={changeBodyHandler}
        maxLength={200}
      />
      <div className="buttonDiv">
        <button className="sumbitButton" onClick={editNote}>
          Sumbit
        </button>
        <button className="cancelButton" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditNote;
