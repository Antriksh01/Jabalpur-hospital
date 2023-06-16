import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store";
import axios from "axios";

const MainLogin = () => {
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
      .then(() => navigate("/dashboard"));
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

  return (
    <>
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
    </>
  );
};

export default MainLogin;
