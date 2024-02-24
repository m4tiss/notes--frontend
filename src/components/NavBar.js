import React from "react";
import '../styles/NavBar.css'
import logo from '../images/noteLogo.jpg'
import { FaMagnifyingGlass } from "react-icons/fa6";


const NavBar = () => {
    return (
      <div className='navBarContainer'>
        <img src={logo} width={80}/>
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