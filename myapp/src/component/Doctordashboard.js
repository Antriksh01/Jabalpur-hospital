import React from "react";
import "./Doctordashboard.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Doctordashboard = () => {
  return (
    <>
      <Container>
        <div>
          <Header />
          <div className="title">
            <h1
              className="text-center fs-1 fw-bold"
              style={{ color: "#347571" }}
            >
              Doctor Dashboard
            </h1>
          </div>
          <div className="container-fluid">
            <div className="row g-0">
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                <div className="leftbox">
                  <button>Start Your day</button>
                  <button>Wrap the Day</button>

                  <button>
                    <Link to="/DoctorTreatment">Doctor Display </Link>
                  </button>

                  <button>Report to Admin</button>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
                <div className="container cardContainer">
                  <div className="row g-5">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/token-generation">
                            <h2>Patient in Queue</h2>
                            <h2>10</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/doctor-availablity">
                            <h2>Served</h2>
                            <h2>20</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/patient-assigned">
                            <h2>Patients Treated Yesterday</h2>
                            <h2>20</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/report-admin">
                            <h2>Missed</h2>
                            <h2>10</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/token-generation">
                            <h2>Your Reports</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/token-generated">
                            <h2>Go for Break</h2>
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
      }
    }
  }
  a {
    text-decoration: none;
    color: black;
  }
`;
