import React from "react";
import "../styles/NavBar.css";
import logo from "../images/noteLogo.jpg";

const NavBar = () => {
  return (
    <div className="navBarContainer">
      <div className="leftNavBar">
        <img src={logo} width={60} />
        <h1 className="title">MY NOTES</h1>
      </div>
      <div className="rightNavBar">
        <p className="navBartext">
          Dive into your daily notes for a glimpse into your day-to-day thoughts
          and activities.
        </p>
      </div>
    </div>
  );
};

export default NavBar;
