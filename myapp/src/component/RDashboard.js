import React from "react";
import "./RDashboard.css";
import { Link } from "react-router-dom";
import Header from "./Header";

// import Patientregistration from "./Patientregistration";
// import Patientopd from "./patientopd";

// import DoctorTreatment from "./DoctorTreatment";
// import TokenGeneration from "./TokenGeneration";
// import Doctor from "./Doctor";
const RDashboard = () => {
  return (
    <div>
      <Header />

      <div className="title">
        <span>Dashboard</span>
      </div>
      <div className="container">
        <div className="cardcan">
          <div id="card" className="card">
            <Link to="/TokenGeneration">
              <h2>Token Generation</h2>
            </Link>
          </div>
          <div id="card" className="card">
            <Link to="./Doctor">
              <h2>Doctor Availability</h2>
            </Link>
          </div>
          <div id="card" className="card">
            <a href="/">
              {" "}
              <h2>Patients assigned to specific doctor</h2>
            </a>
          </div>
          <div id="card" className="card">
            <a href="/">
              {" "}
              <h2>Report to Admin </h2>
            </a>
          </div>
          <div id="card" className="card">
            <Link to="./DoctorTreatment">
              {" "}
              <h2>Doctor's Display</h2>
            </Link>
          </div>
          <div id="card" className="card">
            <Link to="./Patientregistration">
              {" "}
              <h2>Patient Registration</h2>
            </Link>
          </div>
          <div id="card" className="card">
            <Link to="./Patientopd">
              {" "}
              <h2>Patient OPD Visit</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RDashboard;
