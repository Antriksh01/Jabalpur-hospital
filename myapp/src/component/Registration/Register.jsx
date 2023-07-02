import React, { useState } from "react";
import "./Register.css";
import Header from "../Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
    cpassword: "",
    role: "",
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
      <Header />
      <h1 id="adm1">Sign up</h1>
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
          name="email"
          value={data.email}
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
        {/* <button
          type="button"
          className="show-password"
          onClick={handleShowPasswordToggle}
        >
          {showPassword ? "Hide" : "Show"}
        </button> */}
        <br />
        <br />
        {/* <input
          type="text"
          name="role"
          value={data.role}
          placeholder="Designation"
          style={{ border: "none" }}
          onChange={handleChange}
          required
        /> */}
        <br />
        <br />

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </>
  );
};

export default Register;
