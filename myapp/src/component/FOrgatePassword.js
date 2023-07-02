import React, { useState } from "react";
import pic from "../photos/jbplogo.png";
import styled from "styled-components";

import "./ForgatePassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");

    try {
      const input = await axios.post(
        "http://localhost:8100/api/auth/password-reset",
        data
      );
      console.log(input);
      alert("password updated");
      navigate("/Login");
    } catch (err) {
      //   setErr(err.response.data);
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Header />
        <div className="container d-flex flex-column">
          <h1 className="text-center">Reset Password</h1>
          <form className="form" onSubmit={onsubmit}>
            <input
              type="text"
              placeholder="Enter your email"
              name="username"
              value={data.username}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="password"
              name="cpassword"
              value={data.cpassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            <br />
            <br />

            <button type="submit" className="btn btn-success">
              Reset Password{" "}
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default ForgetPassword;
const Container = styled.div`
  .form {
    input {
      border: none;
      width: 50%;
      @media screen and (max-width: 500px) {
        width: 100%;
      }
    }
    button {
      margin-left: 0rem;
      @media screen and (min-width: 501px) and (max-width: 900px) {
        width: 50%;
      }
    }
  }
`;
