import React from "react";
import '../styles/NavBar.css'
import { FaMagnifyingGlass } from "react-icons/fa6";


const NavBar = () => {
    return (
      <div className='navBarContainer'>
        <h1 className='title'>m4tiss</h1>
        <h1 className='title'>MY NOTES</h1>
        <div className="searchContainer">
            <input
                className="searchInput"
                type="text"
                placeholder="Search notes..."
            />
        <FaMagnifyingGlass />
        </div>
    </div>
    )
  }
  
  export default NavBar