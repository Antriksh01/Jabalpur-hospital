import React from "react";
import "./Frontpage.css";
import jbplogo from "../photos/jbplogo.png";
import jbpHospital from "../photos/jbpHospital.jpg";
import { Link } from "react-router-dom";
// import Adminlogin from './Adminlogin';
// import Doctorlogin from './Doctorlogin';
// import Login from "./Login";

const Frontpage = () => {
  return (
    <div>
      <nav className="navbar">
        <div id="logo" className="logo">
          <img src={jbplogo} alt="Logo" />
        </div>
        <div className="title">
          {" "}
          <span>
            Welcome to jabalpur Hospital and Research Centre Queue Management
            Application{" "}
          </span>
        </div>
        <div id="links" className="links">
          <h3> </h3>
        </div>
      </nav>
      <div>
        <div className="container">
          <div id="image-container" className="image-container">
            <img src={jbpHospital} alt="img" />
          </div>
          <div id="button-container" className="button-container">
            <span>Login As</span>
            <Link to="/Adminlogin">
              <button className="button">Admin</button>
            </Link>
            <Link to="./Doctorlogin">
              <button className="button">Doctor</button>
            </Link>

            <Link to="Login">
              <button className="button">Receptionist</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Frontpage;
