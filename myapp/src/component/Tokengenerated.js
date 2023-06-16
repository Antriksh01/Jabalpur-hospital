import React from "react";
import "./Tokengenerated.css";
import Header from "./Header";
import jbplogo from "../photos/jbplogo.png";

const Tokengenerated = () => {
  return (
    <>
      <Header />
      <div>
        <h1>Token Generated</h1>
        <div className="card">
          <div className="image">
            <img src={jbplogo} alt="Card" className="card-image" />
            <div className="cardp">
              <p>UHID : 123</p>
              <p> Patient Name : Name Of The Patient</p>
              <p>Assigned Doctor : Name of Assigned Doctor</p>
              <p>Department : Name of the Department</p>
              <p>Token Generated by : Name of Receptionist</p>
              <p>Token generated on Date: Current Date & Time</p>
              <p>Room No : Room No of Assigned Doctor</p>
              <p>Counter No : Number Of Counter</p>
            </div>

            <div className="card-content">
              <h2 className="cardh"> Token No: DEPID_DATE_01</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Tokengenerated;