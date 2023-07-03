import React from "react";
import "./Frontpage.css";
import jbplogo from "../photos/jbplogo.png";
import jbpHospital from "../photos/jbpHospital.jpg";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Frontpage = () => {
  return (
    <>
      <Container>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div id="logo" className="logo">
            <img src={jbplogo} alt="Logo" />
          </div>

          <div
            className="title text-center mt-5 fs-1"
            style={{ color: "#0fab53" }}
          >
            Welcome to jabalpur Hospital and Research Centre Queue Management
            Application
          </div>
        </nav>
        <div>
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
      </Container>
    </>
  );
};
export default Frontpage;
const Container = styled.div`
  .navbar {
    background-color: #fff !important;
  }
`;
