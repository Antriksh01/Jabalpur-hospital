// import React  from 'react';
import "./Login.css";
import jbplogo from "../photos/jbplogo.png";
import Receptionist from "../photos/Receptionist.png";
import React, { useState } from "react";
import "./Login.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainLogin from "./MainLogin";
import { useAuth } from "../context";
import styled from "styled-components";

const Login = () => {
  const [auth, setAuth] = useAuth();
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
    sendRequest().then(() => navigate("/"));
  };

  const sendRequest = async () => {
    try {
      const input = await axios.post(
        "http://localhost:8100/api/auth/login",
        data
      );
      setAuth({
        ...auth,
        user: input.data.username,
        token: input.data.token,
      });
      localStorage.setItem("auth", JSON.stringify(input.data));
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
    <>
      <Container>
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
          <div className="title text-center">
            <span className="text-center">Receptionist login</span>
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
      </Container>
    </>
  );
};
export default Login;
const Container = styled.div`
  .container-img {
    @media screen and (max-width: 500px) {
    }
  }
`;
