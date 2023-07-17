// import React  from 'react';
import "./Login.css";
import jbplogo from "../photos/jbplogo.png";
import Receptionist from "../photos/Receptionist.png";
import React, { useState } from "react";
import "./Login.css"; // Import the CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import MainLogin from "./MainLogin";
import { useAuth } from "../context";
import cogoToast from "cogo-toast";
import styled from "styled-components";

const Login = () => {
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

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${domain}/api/auth/login`, data)
      .then((res) => {
        const dt = res.data;
        console.log(dt.user);
        if (dt.user !== "") {
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });

          if (
            dt.user.role === "Receptionist" &&
            dt.user.Admin_Approval === "Approved"
          ) {
            cogoToast.success("receptionist login successful");
            navigate("/receptionist-dashboard");
            localStorage.setItem("auth", JSON.stringify(res.data.user));
            localStorage.setItem("Token", res.data.token);
          } else if (dt.user.Admin_Approval !== "Approved") {
            cogoToast.error("Admin Approval Pending");
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

  // console.log(data);
  return (
    <>
      <Container>
        <div>
          <nav className="navbar">
            <div id="logo" className="logo ms-3">
              <img src={jbplogo} alt="Logo" />
            </div>
            {/* <div className='title'> <span> </span></div> */}
            <div className="links">
              <h3> </h3>
              <h3> </h3>
            </div>
          </nav>
          <div className="title text-center">
            <span className="text-center fs-1" style={{ fontWeight: "700" }}>
              Receptionist login
            </span>
          </div>
          <div className="maincontainer">
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                <div className="left-container p-sm-0">
                  <div id="container-img" className="container-img">
                    <img src={Receptionist} alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="right-container">
                  <div className="container-login">
                    <form
                      id="login-from"
                      className="login-form py-4  px-sm-5"
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
export default Login;
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
  .left-container {
    @media screen and (max-width: 500px) {
      padding: 0rem;
    }
  }

  .right-container {
    @media screen and (max-width: 500px) {
      padding: 0rem;
    }
  }
`;
