// import React from 'react';
import "./Doctorlogin";
import jbplogo from "../photos/jbplogo.png";
import Doctor from "../photos/Doctor.jpg";
import React, { useState } from "react";
import MainLogin from "./MainLogin";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import axios from "axios";

// Import the CSS file for styling

const Doctorlogin = () => {
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

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8100/api/auth/login", data)
      .then((res) => {
        // console.log(res.data);
        setAuth({
          ...auth,
          user: res.data[0],
          token: res.data.token,
        });

        console.log(res.data[0].role);
        if (res.data[0].role === 1) {
          console.log("Doctor login successful");
          navigate("/doctor-dashboard");
          localStorage.setItem("auth", JSON.stringify(res.data));
        } else {
          alert("wrong password or username");
        }
      })
      .catch((err) => console.log(err, "login failed"));
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  return (
    <>
      <Container>
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
              <div className="container-login">
                <form
                  id="login-from"
                  className="login-form"
                  onSubmit={handleLogin}
                >
                  <h2>Login</h2>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={data.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="show-password"
                        onClick={handleShowPasswordToggle}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <span className="forgot-password-button">
                      <Link to="/forgot-password">Forgot Password</Link>
                    </span>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="login-button">
                      Login
                    </button>
                  </div>
                  <div className="form-group">
                    <span>Don't have an Account ? </span>
                    <span className="register-button">
                      <Link to="/register">Register </Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Doctorlogin;
const Container = styled.div`
  .container-img {
    @media screen and (max-width: 500px) {
    }
  }
  input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.8rem;
  }
  button {
    border-radius: 0.8rem;
  }
  a {
    text-decoration: none;
  }
`;
