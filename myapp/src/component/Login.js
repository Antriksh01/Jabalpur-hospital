// import React  from 'react';
import "./Login.css";
import jbplogo from "../photos/jbplogo.png";
import Receptionist from "../photos/Receptionist.png";
import React, { useState } from "react";
import "./Login.css"; // Import the CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import MainLogin from "./MainLogin";

const Login = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/"));
  };

  const sendRequest = async () => {
    try {
      const input = await axios.post(
        "http://localhost:8100/api/auth/login",
        data
      );
      console.log(input);
      alert("login successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  // const handleRegister = () => {
  //   // Handle registration logic here
  // };
  return (
    <div>
      <nav className="navbar">
        <div id="logo" className="logo">
          <img src={jbplogo} alt="Logo" />
        </div>
        {/* <div className='title'> <span> </span></div> */}
        <div className="links">
          <h3> </h3>
          <h3> </h3>
        </div>
      </nav>
      <div className="title">
        <span>Receptionist login</span>
      </div>
      <div className="maincontainer">
        <div className="left-container">
          <div id="container-img" className="container-img">
            <img src={Receptionist} alt="img" />
          </div>
        </div>
        <div className="right-container">
          <MainLogin />
        </div>
      </div>
    </div>
  );
};
export default Login;
