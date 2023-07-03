import React, { useState } from "react";
import "./Register.css";
import Header from "../Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    mobile: "",
    reg_email: "",
    password: "",
    cpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const input = await axios.post(
        "http://localhost:8100/api/auth/register",
        data
      );

      console.log(input);
      alert("sign up successful");
      navigate("/Login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Header />
        <div className="contMain">
          <h1 className="text-center">Sign up</h1>
          <div className="container">
            <form className="form" onSubmit={handleClick}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={data.username}
                style={{ border: "none" }}
                onChange={handleChange}
                required
              />
              <br />
              <br />
              <input
                type="text"
                placeholder="Moblie No"
                name="mobile"
                value={data.mobile}
                style={{ border: "none" }}
                onChange={handleChange}
                required
              />
              <br />
              <br />
              <input
                type="text"
                placeholder="Email Id"
                name="reg_email"
                value={data.reg_email}
                style={{ border: "none" }}
                onChange={handleChange}
                required
              />
              <br />
              <br />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={data.password}
                style={{ border: "none" }}
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
                style={{ border: "none" }}
                onChange={handleChange}
                required
              />
              {/* <br />
              <br />
              <input
                type="text"
                name="role"
                value={data.role}
                placeholder="Define rol"
                style={{ border: "none" }}
                onChange={handleChange}
                required
              /> */}
              {/* <button
          type="button"
          className="show-password"
          onClick={handleShowPasswordToggle}
        >
          {showPassword ? "Hide" : "Show"}
        </button> */}

              <button type="submit" className="btn btn-success mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
const Container = styled.div`
  .form {
    button {
      @media screen and (max-width: 500px) {
        margin-left: 0rem;
      }
      @media screen and (min-width: 501px) and (max-width: 900px) {
        margin-left: 0rem;
      }
    }
  }
`;
