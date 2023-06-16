// import React from 'react';
import "./Doctorlogin";
import jbplogo from "../photos/jbplogo.png";
import Doctor from "../photos/Doctor.jpg";
import React, { useState } from "react";
import MainLogin from "./MainLogin";

// Import the CSS file for styling

const Doctorlogin = () => {
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
        {/* <div className='title'> <span>Doctor Login</span></div> */}
        <div className="links">
          <h3> </h3>
          <h3> </h3>
        </div>
      </nav>
      <div className="title">
        <span>Doctor Login</span>
      </div>
      <div className="maincontainer">
        <div className="left-container">
          <div id="container-img" className="container-img">
            <img src={Doctor} alt="img" />
          </div>
        </div>
        <div className="right-container">
          <MainLogin />
        </div>
      </div>
    </div>
  );
};
export default Doctorlogin;
