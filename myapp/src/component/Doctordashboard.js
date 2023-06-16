import React from "react";
import "./Doctordashboard.css";
import Header from "./Header";

const Doctordashboard = () => {
  return (
    <div>
      <Header />
      <div className="title">
        <span>Doctor Dashboard</span>
      </div>
      <div className="container">
        {/* <div className="hamburger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div> */}
        <div id="cardcan" className="cardcan">
          <div className="card">
            <a href="/">
              <h2>Assigned Patient</h2>
            </a>
          </div>
          <div className="card">
            <a href="/">
              <h2>Served</h2>
            </a>
          </div>
          <div className="card">
            <a href="/">
              {" "}
              <h2>Patients Treated Yesterday</h2>
            </a>
          </div>
          <div className="card">
            <a href="/">
              {" "}
              <h2>Missed</h2>
            </a>
          </div>
          <div className="card">
            <a href="/">
              {" "}
              <h2>Your Reports</h2>
            </a>
          </div>
          <div className="card">
            <a href="/">
              <h2>Go for Break</h2>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Doctordashboard;
