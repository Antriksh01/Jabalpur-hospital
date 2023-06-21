import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8100/api/auth/register", {
        username,
        mobile,
        email,
        password,
        // userType: "User",
      });
      alert("Registration completed ! now login");
      //   navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Container className="container">
        <div className="mainheight mt-5 mb-5">
          <form onSubmit={onSubmit}>
            <h3 className="text-white">Join us</h3>
            <div className="mb-3">
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname">Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="mobile"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password">
              Already registered <Link to="/login">sign in?</Link>
            </p>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
const Container = styled.div`
  width: 100%;

  .mainheight {
    width: 100%;
    display: flex;
    justify-content: center;
    form {
      width: auto;
      background-color: #4fbd92;
      padding: 2rem;
      border-radius: 1rem;
      h3 {
        text-align: center;
      }
      p {
        text-align: right;
        a {
          color: #255b47;
          text-decoration: none;
          font-weight: bold;
        }
      }
      .d-grid {
        button {
          background-color: #255b47;
          border: none;
        }
      }
      input {
        width: 18rem;
      }
    }
  }
`;
