import React from "react";
import pic from "../photos/jbplogo.png";
import "./DoctorTreatment.css";
import styled from "styled-components";
import Header from "./Header";
import TestOwlCr from "./TestOwlCarousel/TestOwlCr";

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
  }`;
