import React, { useState } from "react";
import "./Register.css";
import Header from "../Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import cogoToast from "cogo-toast";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const domain = "http://localhost:8100";

  const handleClick = async (e) => {
    e.preventDefault();

    const user = {
      username,
      mobile,
      reg_email: email,
      password,
      role: selectedOption,
    };

    try {
      const response = await axios.post(`${domain}/api/auth/register`, user);
      setUsername("");
      setMobile("");
      setEmail("");
      setPassword("");
      setRole("");
      console.log(response);
      cogoToast.success("User registered successfully!");
      navigate("/Login");
    } catch (err) {
      console.log(err);
      cogoToast.error("Failed to register user. Please try again.");
    }
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
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
                style={{ border: "none" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <br />
              <br />
              <input
                type="text"
                placeholder="Moblie No"
                style={{ border: "none" }}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <br />
              <br />
              <input
                type="text"
                placeholder="Email Id"
                style={{ border: "none" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <br />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                style={{ border: "none" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <br />
              <select
                id="mySelect"
                value={selectedOption}
                onChange={handleChange}
                style={{ width: "100%" }}
              >
                <option value="">-- Select --</option>
                <option value="Admin">Admin</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Doctor">Doctor</option>
              </select>
              <br />
              <br />
              {/* <input
                type="text"
                style={{ border: "none" }}
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              /> */}
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
