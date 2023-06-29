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
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="title text-center">
              {" "}
              <span>
                Welcome to jabalpur Hospital and Research Centre Queue
                Management Application{" "}
              </span>
            </div>
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
