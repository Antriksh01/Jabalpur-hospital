import React, { useState } from "react";
import pic from "../photos/jbplogo.png";

import "./ForgatePassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      <div className="header">
        <img id="img1" src={pic} alt="img" />
        <h1 id="adm1">Forget Password</h1>
        <h3 id="hd">
          Hi, Admin Name <br />
          Employee Id
        </h3>
        {/* <button className="btn1">Logout</button> */}
      </div>

      <form className="form" onSubmit={onsubmit}>
        <input
          type="text"
          placeholder="Enter your email"
          name="username"
          value={data.username}
          style={{ border: "none", width: "100%" }}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          style={{ border: "none", width: "100%" }}
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
          style={{ border: "none", width: "100%" }}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <button type="submit" className="btn">
          Reset Password{" "}
        </button>
      </form>
    </>
  );
};

export default ForgetPassword;
