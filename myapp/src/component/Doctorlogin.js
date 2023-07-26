// import React from 'react';
import "./Doctorlogin";
import jbplogo from "../photos/jbplogo.png";
import Doctor from "../photos/Doctor.jpg";
import React, { useState } from "react";
// import MainLogin from "./MainLogin";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import axios from "axios";
import cogoToast from "cogo-toast";
import Header from "./Header";

// Import the CSS file for styling

const Doctorlogin = () => {
  const [auth, setAuth] = useAuth();
  const [data, setData] = useState({
    loginCredential: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const domain = process.env.REACT_APP_DOMAIN;

  const navigate = useNavigate();
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  console.log(data);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`https://api.dvjei.org/api/auth/login`, data)
      .then((res) => {
        const dt = res.data;
        console.log(dt.user);
        // Check if the response contains data and is an array
        if (dt.user !== "") {
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });

          // Check if the role is Doctor and Admin_Approval is Approved
          if (
            dt.user.role === "Doctor" &&
            dt.user.Admin_Approval === "Approved"
          ) {
            cogoToast.success("Doctor login successful");
            navigate("/doctor-dashboard");
            localStorage.setItem("auth", JSON.stringify(res.data.user));
            localStorage.setItem("Token", res.data.token);
          } else if (dt.user.Admin_Approval !== "Approved") {
            cogoToast.error("Admin Approval Pending");
          } else {
            cogoToast.error("Wrong password or username");
          }
        } else {
          // If response data is empty or not an array, show an error message
          cogoToast.error("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Login failed. Please try again later.");
        window.location.reload();
      });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  return (
    <>
      <Container>
        <div>
          <Header />
          <div className="title text-center fs-1">
            <span className="text-center fs-1">Doctor Login</span>
          </div>
          <div className="maincontainer">
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12">
                {" "}
                <div className="left-container">
                  <div id="container-img" className="container-img">
                    <img src={Doctor} alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-10 col-sm-12 col-12">
                {" "}
                <div className="right-container">
                  <div className="container-login">
                    <form
                      id="login-from"
                      className="login-form"
                      onSubmit={handleLogin}
                    >
                      <h2>Login</h2>
                      <div className="form-group">
                        <label htmlFor="loginCredential">Username</label>
                        <input
                          type="text"
                          id="loginCredential"
                          name="loginCredential"
                          value={data.loginCredential}
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
                        <button
                          type="submit"
                          className="btn btn-success btnbxd"
                        >
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
    border-radius: 8px;
    border: 1px solid #0000003d;
  }
  button {
    border-radius: 8px;
  }
  a {
    text-decoration: none;
  }
  .btnbxd {
    width: 100%;
    @media screen and (max-width: 300px) {
      margin-left: 0rem;
    }
  }
`;
