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
          <div id="logo" className="logo ps-3">
            <Link to="/">
              {" "}
              <img src={jbplogo} alt="Logo" />
            </Link>
          </div>

          <div
            className="title text-center mt-3 fs-1"
            style={{ color: "#0fab53" }}
          >
            Welcome to jabalpur Hospital and Research Centre Queue Management
            Application
          </div>
        </nav>
        <div>
          <div>
            <div className="container ">
              <div id="image-container" className="image-container">
                <img src={jbpHospital} alt="img" />
              </div>
              <div id="button-container" className="button-container">
                <span className="fs-2">Login as</span>
                <Link to="/Adminlogin">
                  <button className="btn btn-success">Admin</button>
                </Link>
                <Link to="./Doctorlogin">
                  <button className="btn btn-success">Doctor</button>
                </Link>

                <Link to="Login">
                  <button className="btn btn-success">Receptionist</button>
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
  .title {
    @media screen and (max-width: 500px) {
      font-size: 19px !important;
      margin-top: 4rem !important;
    }
  }
  .button-container {
    @media screen and (max-width: 500px) {
      background-color: white !important;
      box-shadow: 1px 1px 7px #d5d9dc !important;
    }
    @media screen and (min-width: 501px) and (max-width: 800px) {
      background-color: white !important;
      box-shadow: 1px 1px 7px #d5d9dc !important;
    }
    @media screen and (min-width: 801px) and (max-width: 1200px) {
      background-color: white !important;
      box-shadow: 1px 1px 7px #d5d9dc !important;
    }
  }
  button {
    margin: 0.5rem;
    width: 12rem;
  }
`;
