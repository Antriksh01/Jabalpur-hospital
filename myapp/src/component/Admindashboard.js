import React, { useEffect, useState } from "react";

import Header from "./Header";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

const Admindashboard = () => {
  const [docCount, setDocCount] = useState([]);
  const [pendingUserCount, setPendingUserCount] = useState([]);
  const domain = process.env.REACT_APP_DOMAIN;

  const countDoctors = async () => {
    try {
      // get-request
      const dt = await axios.post(
        `http://localhost:8100/api/auth/getDoctorsStatus`
      );
      const res = dt.data;
      setDocCount(res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(docCount.length);
  useEffect(() => {
    countDoctors();
    pendingApprovalList();
  }, []);

  // pending admin approval length
  const pendingApprovalList = async () => {
    try {
      // get-request
      const res = await axios.post("http://localhost:8100/api/auth/users");
      console.log(res.data);
      setPendingUserCount(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(pendingUserCount);
  const filterData = pendingUserCount.filter(
    (item) => item.Admin_Approval === null
  );

  console.log(filterData.length);
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
                Admin Dashboard
              </h1>
            </div>
            <div className="container-fluid">
              <div className="row g-5">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                  <div className="leftbox rounded-4 px-2">
                    {/* <button>Start Your Day</button> */}
                    <button>
                      <Link to="/month-wise-token">This month's token</Link>
                    </button>
                    {/* <button>
                      <Link to="/add-doctor">Add a Doctor</Link>
                    </button>
                    <button>
                      {" "}
                      <Link to="/add-receptionist">Add a Receptionist</Link>
                    </button> */}
                    <button>
                      <Link to="/admin-reports">Report</Link>
                    </button>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-10 col-sm-12 col-12">
                  <div className="container cardContainer">
                    <div className="row g-5">
                      {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/manage-doctors">
                            <h2>Doctors</h2>
                            <h2>{docCount.length}</h2>
                          </Link>
                        </div>
                      </div>
                    </div> */}
                      {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-body">
                          <Link to="/doctor-availablity">
                            <h2>Departments</h2>
                            <h2>20</h2>
                          </Link>
                        </div>
                      </div>
                    </div> */}
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div class="card">
                          <div class="card-body">
                            <Link to="/manage-doctors">
                              <h2>Manage Doctors</h2>
                              {/* <h2>20</h2> */}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div class="card">
                          <div class="card-body">
                            <Link to="/manage-receptionist">
                              <h2>Manage Receptionist</h2>
                              {/* <h2>10</h2> */}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div class="card">
                          <div class="card-body">
                            <Link to="/pending-approval">
                              <h2>Pending Approval</h2>
                              <h2>{filterData.length}</h2>
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
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div class="card">
                          <div class="card-body">
                            <Link to="/admin-reports">
                              <h2>Reports</h2>
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
export default Admindashboard;
const Container = styled.div`
overflow-x: hidden;
  .leftbox {
    width: 100%;
    height: 30rem;
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
      @media screen and (min-width:501px) and (max-width:900px){
        width:10rem;
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
      display: none;
    }
    @media screen and (min-width:501px) and (max-width:900px){
      height: auto;
    padding: 2rem 1rem;
    display: flex;
    align-content: space-around;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
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
      box-shadow: 0px 6px 19px #e0e0e0;
      .card-body {
        display: flex;
        align-items: center;
        justify-content: center;
        text-shadow: 0px 9px 20px #4a4545;
        a {
          text-decoration: none;
          color: black;
        }
      }
    }
  }
  .contMain {
    @media screen and (max-width: 500px) {
      margin-top: 10rem;
    }
`;
