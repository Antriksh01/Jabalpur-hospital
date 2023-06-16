import React, { useState } from "react";
// import pic from "../../photos/jbplogo.png";
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
  //   const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  // const handleShowPasswordToggle = () => {
  //   setShowPassword(!showPassword);
  // };

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
      //   setErr(err.response.data);
      console.log(err);
    }
  };

  //   useEffect(() => {
  //     handleChange();
  //   }, []);

  //   console.log(err);
  return (
    <>
      {/* <div className="header">
        <img id="img1" src={pic} alt="img" />
        <h1 id="adm1">Register Page</h1>
        <h3 id="hd">
          Hi, Admin Name <br />
          Employee Id
        </h3>
        <button className="btn1">Logout</button>
      </div> */}
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

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default Register;
