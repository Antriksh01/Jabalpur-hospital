import React from "react";
import pic from "../photos/jbplogo.png";
import "./DoctorTreatment.css";
import styled from "styled-components";
import Header from "./Header";
import TestOwlCr from "./TestOwlCarousel/TestOwlCr";
import { Link } from "react-router-dom";

function DoctorTreatment() {
  return (
    <>
      <Container>
        <Header />
        <div className="contMain">
          <h1 className="text-center fw-bold" style={{ color: "#347571" }}>
            Patient Queue
          </h1>

          {/* center-test */}
          {/* <TestCarousel /> */}
          <TestOwlCr />
          <div className="container contBx">
            <button className="btn btn-success btnDash">
              <Link to="/doctor-dashboard">Go to Dashboard</Link>
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default DoctorTreatment;
const Container = styled.div`
.contMain {
  @media screen and (max-width: 500px) {
    margin-top: 10rem;
  }
  a{
    text-decoration:none;
    color:white;
  }
  
  `;
