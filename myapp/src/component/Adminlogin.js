// import React from 'react';
import "./Login.css";
import jbplogo from "../photos/jbplogo.png";
import Admin from "../photos/Admin.jpg";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import MainLogin from "./MainLogin";
import styled from "styled-components";
import { useAuth } from "../context";
import axios from "axios";
import cogoToast from "cogo-toast";
// Import the CSS file for styling

const Adminlogin = () => {
  const [auth, setAuth] = useAuth();
  const [data, setData] = useState({
    loginCredential: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const domain = "http://localhost:8100";
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${domain}/api/auth/login`, data)
      .then((res) => {
        // console.log(res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAuth({
            ...auth,
            user: res.data[0],
            token: res.data.token,
          });

          console.log(res.data[0].username);
          if (
            res.data[0].role === "Admin" &&
            res.data[0].Admin_Approval === "Approved"
          ) {
            cogoToast.success("Admin login successful");
            navigate("/admin-dashboard");
            localStorage.setItem("auth", JSON.stringify(res.data));
          } else if (res.data[0].Admin_Approval !== "Approved") {
            cogoToast.error("Approval Pending");
          } else {
            cogoToast.error("wrong password or username");
          }
        } else {
          cogoToast.error("invalid credientials");
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
            <div id="logo" className="logo ms-3">
              <img src={jbplogo} alt="Logo" />
            </div>
            {/* <div className='title'> <span>Admin Login</span></div> */}
            <div className="links">
              <h3> </h3>
              <h3> </h3>
            </div>
          </nav>
          <div className="title text-center">
            <span className="fs-1">Admin Login</span>
          </div>
          <div className="maincontainer">
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                <div className="left-container">
                  <div id="container-img" className="container-img">
                    <img src={Admin} alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                {" "}
                <div className="right-container">
                  <div
                    className="container-login"
                    style={{ alignItems: "stretch" }}
                  >
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
export default Adminlogin;
const Container = styled.div`
  overflow-x: hidden;
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
    @media screen and (max-width: 500px) {
      margin-left: 0rem;
    }
  }
`;
