import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import { useAuth } from "../context";
import cogoToast from "cogo-toast";

const Doctordashboard = () => {
  const [auth] = useAuth();
  const [docStatus, setDocStatus] = useState("");
  const [dayPlan, setDayPlan] = useState("");
  const [getDoc, setGetDoc] = useState("");
  const [serve, setServe] = useState([]);

  const domain = process.env.REACT_APP_DOMAIN;

  // update_doctor_status
  const handleUpdate = async (value) => {
    // if()
    try {
      const updateData = await axios.put(
        `https://api.dvjei.org/api/auth/doctor-availability-update/${auth.user.reg_email}`,
        {
          status: value,
        }
      );

      cogoToast.success("status Updated");
      // alert("status updated");
    } catch (error) {
      console.log(error);
    }
  };

  const patientStats = async () => {
    try {
      // get-request
      const { data } = await axios.post(
        `https://api.dvjei.org/api/auth/patientServe`
      );
      setServe(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = serve.filter(
    (item) =>
      item.treatment_status === "Treated" &&
      item.Assigned_doctor === auth.user.reg_email
  );

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate());
  const formattedDate = yesterday
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  console.log(formattedDate);

  const filteredQueue = serve.filter(
    (item) =>
      item.treatment_status === "Pending" &&
      item.Time.split("T")[0] === formattedDate &&
      item.Assigned_doctor === auth.user.reg_email
  );
  console.log(filteredQueue);

  const todayyest = new Date();
  const yesterdayyest = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const formattedDateyest = yesterday
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  console.log(formattedDateyest);
  const filteredYest = serve.filter(
    (item) =>
      item.treatment_status === "Treated" &&
      item.Time.split("T")[0] === formattedDateyest
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
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                  <div className="leftbox px-3">
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
                <div className="col-xl-9 col-lg-9 col-md-10 col-sm-12 col-12">
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
overflow-X:hidden;
  .leftbox {
    width: 100%;
    height: 90%;
    margin-top: 1.5rem;
    background-color: #dcf4ce;
    box-shadow: 1px 3px 9px #e0e0e0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    button {
      width: 90%;
      padding: 0.5rem;
      border: none;
      background-color: #5ec57e;
      box-shadow: 1px 3px 9px #1a1818;
      border-radius: 1.5rem;
      @media screen and (min-width: 501px) and (max-width: 900px){
        width:12rem;
      }
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
      display: flex;
      padding: 1rem;
      height: 100%;
      margin-bottom: 1rem;
      width: 100%;
      align-content: space-around;
      justify-content: space-between;
      align-items: center;
    }
    @media screen and (min-width: 501px) and (max-width: 900px) {
      padding:2rem 0rem;
      display:flex;
      align-content: space-between;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: row;
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
      box-shadow: 0px 6px 19px #e0e0e0;
      border: none;
      .card-body {
        display: flex;
        align-items: center;
        text-shadow: 0px 9px 20px #4a4545;
        justify-content: center;
        h2 {
          @media screen and (min-width: 501px) and (max-width: 900px) {
            font-size: 18px;
          }
        }
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
