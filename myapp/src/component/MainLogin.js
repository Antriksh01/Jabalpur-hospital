import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useAuth } from "../context";
axios.defaults.withCredentials = true;

const MainLogin = () => {
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
      .post("http://queuemanagementsystemdg.com/api/auth/login", data)
      .then((res) => {
        // console.log(res.data);
        setAuth({
          ...auth,
          user: res.data[0],
          token: res.data.token,
        });

        console.log(res.data[0].role);
        if (res.data[0].role === 0) {
          console.log("admin login successful");
          navigate("/admin-dashboard");
          localStorage.setItem("auth", JSON.stringify(res.data));
        } else if (res.data[0].role === 1) {
          console.log("doctor login successful");

          navigate("/doctor-dashboard");
          localStorage.setItem("auth", JSON.stringify(res.data));
        } else if (res.data[0].role === 2) {
          console.log("doctor login successful");
          navigate("/receptionist-dashboard");
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

  // console.log(data);

  return (
    <>
      <Container>
        <div className="container-login">
          <form id="login-from" className="login-form" onSubmit={handleLogin}>
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
      </Container>
    </>
  );
};

export default MainLogin;
const Container = styled.div`
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
