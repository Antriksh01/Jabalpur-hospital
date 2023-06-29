import React, { useEffect, useState } from "react";
// import "./RDashboard.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import axios from "axios";

const RDashboard = () => {
  const [users, setUsers] = useState([]);
  const [patient, setPatient] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8100/api/auth/users");
      console.log(response.data.role);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getAllPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8100/api/auth/getAllPatient"
      );
      // console.log(response.data);
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllPatients();
  }, []);

  const roles = users.map(({ role }) => role);
  const matchingObject = roles.filter((item) => item === 1);
  // console.log(roles);
  const showDoc = matchingObject.length;
  const ptData = patient.length;

  return (
    <>
      <Container>
        <div>
          <Header />

          <div
            className="text-center fs-1 fw-bold"
            style={{ color: "#347571" }}
          >
            <span>Receptionist Dashboard</span>
          </div>
          <div className="container-fluid">
            <div className="row g-0">
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                <div className="leftbox"></div>
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
                <div className="container cardContainer">
                  <div className="row g-5">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/token-search">
                            <h2>Token Generation</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/doctor-availablity">
                            <h2>Doctors availablity</h2>
                            <h2>{showDoc}</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/patient-assigned">
                            <h2>Patient assigned to specific doctors</h2>
                            <h2>{ptData}</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/report-admin">
                            <h2>Report to Admin</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/DoctorTreatment">
                            <h2>Doctor's Display</h2>
                          </Link>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/token-generation">
                            <h2>Token History</h2>
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
      </Container>
    </>
  );
};

export default RDashboard;
const Container = styled.div`
  .leftbox {
    width: 100%;
    height: 90%;
    margin-top: 1.5rem;
    background-color: #dcf4ce;
    @media (max-width: 500px) {
      display: none;
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
        a {
          text-decoration: none;
          color: black;
        }
      }
    }
  }
`;
