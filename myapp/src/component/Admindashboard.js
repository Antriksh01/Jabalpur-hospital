import React from "react";
import "./Doctordashboard.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Admindashboard = () => {
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
              Admin Dashboard
            </h1>
          </div>
          <div className="container-fluid">
            <div className="row g-0">
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                <div className="leftbox">
                  <button>Start Your Day</button>
                  <button>This month's token</button>
                  <button>
                    <Link to="/add-doctor">Add a Doctor</Link>
                  </button>
                  <button>
                    {" "}
                    <Link to="/add-receptionist">Add a Receptionist</Link>
                  </button>
                  <button>
                    <Link to="/admin-report">Report</Link>
                  </button>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
                <div className="container cardContainer">
                  <div className="row g-5">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/manage-doctors">
                            <h2>Doctors</h2>
                            <h2>10</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/doctor-availablity">
                            <h2>Departments</h2>
                            <h2>20</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/patient-assigned ">
                            <h2>Monitor Doctors Logs</h2>
                            {/* <h2>20</h2> */}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/manage-receptionist">
                            <h2>Monitors Receptionist Logs</h2>
                            {/* <h2>10</h2> */}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/display-content">
                            <h2>Display Content</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/token-generation">
                            <h2>Token history</h2>
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
export default Admindashboard;
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
      color: #fff;
      background-color: #5ec57e;
      border-radius: 1.5rem;
      a {
        text-decoration: none;
        color: white;
      }
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
        a {
          text-decoration: none;
          color: black;
        }
      }
    }
  }
`;
