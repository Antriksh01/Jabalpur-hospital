// import React from 'react';
import "./Login.css";
import jbplogo from "../photos/jbplogo.png";
import Admin from "../photos/Admin.jpg";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLogin from "./MainLogin";
// Import the CSS file for styling

const Adminlogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleRegister = () => {
    // Handle registration logic here
  };
  return (
    <div>
      <nav className="navbar">
        <div id="logo" className="logo">
          <img src={jbplogo} alt="Logo" />
        </div>
        {/* <div className='title'> <span>Admin Login</span></div> */}
        <div className="links">
          <h3> </h3>
          <h3> </h3>
        </div>
      </nav>
      <div className="title">
        <span>Admin Login</span>
      </div>
      <div className="maincontainer">
        <div className="left-container">
          <div id="container-img" className="container-img">
            <img src={Admin} alt="img" />
          </div>
        </div>
        <div className="right-container">
          <MainLogin />
        </div>
      </div>
    </div>
  );
};
export default Adminlogin;
