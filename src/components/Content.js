import React, { useEffect, useState } from "react";
import "../styles/Content.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import axios from "../axios";
import Modal from "react-modal";
import Note from "./Note";
import { RotatingLines } from 'react-loader-spinner'
import EditNote from "./EditNote";
import NewNote from "./NewNote";
const Content = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editNote, setEditNote] = useState({});
  const [currentColor, setCurrentColor] = useState("all");
  const [search, setSearch] = useState("");
  const [idIterrator, setIdIterrator] = useState(0);
  const [loadingDate,setLoadingDate] = useState(false);

  const ColorSorting = [
    {
      id: 1,
      style: { background: "#fdfd64", color: "black" },
      child: <></>,
    },
    {
      id: 2,
      style: { background: "#98DDFC", color: "black" },
      child: <></>,
    },
    {
      id: 3,
      style: { background: "#ff6961", color: "black" },
      child: <></>,
    },
  ];

  const ColorSortingTable = [
    { name: "yellow", color: "#fdfd64" },
    { name: "blue", color: "#98DDFC" },
    { name: "red", color: "#ff6961" },
    { name: "all", color: "#E6EDf5" },
  ];

  useEffect(() => {
    axios.get("/getAllNotes").then((res) => {
      const uploadedNotes = res.data;
      setNotes(uploadedNotes);
      setFilteredNotes(uploadedNotes);
    }).finally(setLoadingDate(true));
  }, []);

  const addNote = (note) => {
    const newNotes = [...notes];
    axios
      .post("/saveNote", note)
      .then((res) => {
        const newNote = res.data;
        newNotes.push(newNote);
        setIdIterrator(idIterrator + 1);
        setNotes(newNotes);
        setFilteredNotes(newNotes);
        setSearch("");
      })
      .catch((err) => {});
  };

  const deleteNote = (_id) => {
    const notesToDelete = notes.filter((note) => note._id !== _id);

    axios.delete("/deleteNote/" + _id);

    setNotes(notesToDelete);
    setFilteredNotes(notesToDelete);
  };

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  const editNotes = (note) => {
    axios.put("/editNote/" + note._id, note);

    const notesToEdit = [...notes];
    const index = notesToEdit.findIndex((x) => x._id === note._id);
    if (index >= 0) {
      notesToEdit[index] = note;
      setNotes(notesToEdit);
      setFilteredNotes(notesToEdit);
      setSearch("");
    }
    toogleModal();
  };

  const onCancel = () => {
    toogleModal();
    setSearch("");
    setEditNote({});
  };

  const editNoteHandler = (note) => {
    toogleModal();
    console.log(showModal);
    setEditNote(note);
  };

  const handleSearchInputChange = (event) => {
    console.log(showModal);
    const query = event.target.value;
    if (query.trim() === "") {
      setFilteredNotes(notes);
      setSearch("");
    } else {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotes(filtered);
      setSearch(query);
    }
  };

  useEffect(() => {
    filterNotesByColor();
  }, [currentColor]);

  const filterNotesByColor = () => {
    if (currentColor === "all") {
      setSearch("");
      setFilteredNotes(notes);
    } else {
      setSearch("");
      setFilteredNotes(notes.filter((note) => note.color === currentColor));
    }
  };
  const handleColorFilterChange = (color) => {
    const selectedColor = ColorSortingTable.find(
      (item) => item.color === color
    );
    setCurrentColor(selectedColor.name);
  };

  return (
    <div className="contentContainer">
      <Modal
        isOpen={showModal}
        style={{
          content: {
            width: "250px",
            height: "300px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <EditNote
          title={editNote.title}
          body={editNote.body}
          _id={editNote._id}
          color={editNote.color}
          createdAt={editNote.createdAt}
          onEdit={(note) => editNotes(note)}
          onCancel={onCancel}
        />
      </Modal>
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

        <NewNote onAdd={addNote} newID={idIterrator} />

        <div className="noteInteractPanel">
          <ul>
            {ColorSorting.map(({ id, style, child }) => (
              <li
                key={id}
                className="noteColorPanel"
                style={style}
                onClick={() => handleColorFilterChange(style.background)}
              >
                {child}
              </li>
            ))}
            <li
              className="noteColorPanel"
              style={{ background: "#E6EDf5" }}
              onClick={() => handleColorFilterChange("#E6EDf5")}
            >
              <></>
            </li>
          </ul>
        </div>
        <div className="mobilePanel">
          <ul className="mobileList" style={{}}>
            {ColorSorting.map(({ id, style, child }) => (
              <li
                key={id}
                className="mobileColorPanel"
                style={style}
                onClick={() => handleColorFilterChange(style.background)}
              >
                {child}
              </li>
            ))}
            <li
              className="mobileColorPanel"
              style={{ background: "#E6EDf5" }}
              onClick={() => handleColorFilterChange("#E6EDf5")}
            >
              <></>
            </li>
          </ul>
        </div>
      </div>
      <div className="rightSide">
      {loadingDate ? (
          filteredNotes.map((note, index) => (
            <Note
              key={note._id}
              _id={note._id}
              title={note.title}
              body={note.body}
              color={note.color}
              onDelete={deleteNote}
              createdAt={note.createdAt}
              onEdit={editNoteHandler}
            />
          ))
        ) : (
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </div>
    </div>
  );
};

export default Content;
