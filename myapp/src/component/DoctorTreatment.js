import React from "react";
import pic from "../photos/jbplogo.png";
import "./DoctorTreatment.css";
import styled from "styled-components";
import Header from "./Header";
import TestCarousel from "./TestCarousel";
import TestOwlCr from "./TestOwlCarousel/TestOwlCr";
// import TestOwlCr from "./TestOwlCarousel/TestOwlCr";

function DoctorTreatment() {
  return (
    <>
      <Container>
        <Header />
        <h1 className="text-center fw-bold" style={{ color: "#347571" }}>
          Patient Queue
        </h1>

        {/* center-test */}
        {/* <TestCarousel /> */}
        <TestOwlCr />
      </Container>
    </>
  );
}

export default DoctorTreatment;
const Container = styled.div``;
