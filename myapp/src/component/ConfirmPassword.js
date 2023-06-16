import React from "react";
import pic from "../photos/jbplogo.png";
import "./ConfirmPassword.css";

function ConfirmPassword() {
  return (
    <>
      <div className="header">
        <img id="img1" src={pic} alt="" />
        <h1 id="adm1">Confirm Password</h1>
        <h3 id="hd">
          Hi, Admin Name <br />
          Employee Id
        </h3>
        {/* <button className="btn1">Logout</button> */}
      </div>

      <div className="form">
        <input type="text" placeholder="Password" style={{ border: "none" }} />
        <br />
        <br />
        <input
          type="text"
          placeholder="Confirm Password"
          style={{ border: "none" }}
        />
        <br />
        <br />

        <button type="button" className="btn">
          Sumbit
        </button>
      </div>
    </>
  );
}

export default ConfirmPassword;
