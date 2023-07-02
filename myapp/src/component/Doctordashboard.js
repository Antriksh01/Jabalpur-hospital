import React, { useEffect, useState } from "react";
import "./Doctordashboard.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import { useAuth } from "../context";

const Doctordashboard = () => {
  const [auth] = useAuth();
  const [docStatus, setDocStatus] = useState("");
  const [dayPlan, setDayPlan] = useState("");
  const [getDoc, setGetDoc] = useState("");
  const [serve, setServe] = useState([]);

  // update_doctor_status
  const handleUpdate = async (value) => {
    // if()
    try {
      const updateData = await axios.put(
        `http://localhost:8100/api/auth/doctor-availability-update/${auth.user.reg_email}`,
        {
          status: value,
        }
      );

      console.log(updateData);
      // alert("status updated");
    } catch (error) {
      console.log(error);
    }
  };

  const patientStats = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8100/api/auth/patientServe"
      );
      setServe(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = serve.filter(
    (item) => item.treatment_status === "Treated"
  );

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const formattedDate = yesterday
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  const filteredQueue = serve.filter(
    (item) =>
      item.treatment_status === "Pending" &&
      item.Token_Generate_Date === formattedDate
  );

  const filteredYest = serve.filter(
    (item) =>
      item.treatment_status === "Treated" &&
      item.Token_Generate_Date === formattedDate
  );

  const filterMissed = serve.filter(
    (item) => item.treatment_status === "Patient_Absent"
  );
  console.log(filterMissed.length);

  useEffect(() => {
    patientStats();
  }, []);

  return (
    <>
      <Container>
        <div>
          <Header />
          <div className="contMain">
            <div className="title">
              <h1
                className="text-center fs-1 fw-bold"
                style={{ color: "#347571" }}
              >
                Doctor Dashboard
              </h1>
            </div>
            <div className="container-fluid">
              <div className="row g-5">
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                  <div className="leftbox">
                    <button onClick={() => handleUpdate("yes")}>
                      <Link to="/DoctorTreatment">Start Your day </Link>
                    </button>

                    <button onClick={() => handleUpdate("no")}>
                      Wrap the Day
                    </button>

                    <button onClick={() => handleUpdate("onBreak")}>
                      Go for Break
                    </button>

                    {/* <button>Report to Admin</button> */}
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
                  <div className="container cardContainer">
                    <div className="row g-5">
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div class="card">
                          <div class="card-body">
                            <Link to="/patient-queue">
                              <h2>Patient in Queue</h2>
                              <h2>{filteredQueue.length}</h2>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div class="card">
                          <div class="card-body">
                            <Link to="/servePatient">
                              <h2>Served</h2>
                              <h2>{filteredData.length}</h2>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div class="card">
                          <div class="card-body">
                            <Link to="/patientTreated">
                              <h2>Patients Treated Yesterday</h2>
                              <h2>{filteredYest.length}</h2>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div class="card">
                          <div class="card-body">
                            <Link to="/patient-missed">
                              <h2>Patient Absent</h2>
                              <h2>{filterMissed.length}</h2>
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/token-generation">
                            <h2>Your Reports</h2>
                          </Link>
                        </div>
                      </div>
                    </div> */}
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div class="card">
                          <div class="card-body">
                            <Link to="/doctor-display">
                              <h2>Doctor Display</h2>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Doctordashboard;
const Container = styled.div`
  .leftbox {
    width: 100%;
    height: 90%;
    margin-top: 1.5rem;
    background-color: #dcf4ce;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    button {
      width: 90%;
      padding: 0.5rem;
      border: none;
      background-color: #5ec57e;
      border-radius: 1.5rem;
    }
    @media (max-width: 500px) {
      display: flex;
      padding: 1rem;
      height: 100%;
      margin-bottom: 1rem;
      width: 100%;
      align-content: space-around;
      justify-content: space-between;
      align-items: center;
    }
    @media (max-width: 376px) {
      display: none;
    }
  }
  .cardContainer {
    // margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .card {
      height: 12rem;
      background-color: #b8e28a;
      width: auto;
      border-radius: 1.5rem;
      border: none;
      .card-body {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  a {
    text-decoration: none;
    color:black;
  }
  .contMain {
    @media screen and (max-width: 500px) {
      margin-top: 10rem;
    }
`;
