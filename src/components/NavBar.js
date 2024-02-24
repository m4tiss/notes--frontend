import React from "react";
import '../styles/NavBar.css'
import logo from '../images/noteLogo.jpg'



const NavBar = () => {
    return (
      <div className='navBarContainer'>
        <img src={logo} width={80}/>
        <h1 className='title'>MY NOTES</h1>
    </div>
    )
  }
  
  export default NavBar