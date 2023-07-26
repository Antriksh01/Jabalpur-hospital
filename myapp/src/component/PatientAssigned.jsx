import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const PatientAssigned = () => {
  const [assignPat, setAssignPat] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [searchError, setSearchError] = useState(false);

  const domain = process.env.REACT_APP_DOMAIN;

  const assignPatientData = async () => {
    try {
      // get-request
      const res = await axios.post(
        `https://api.dvjei.org/api/auth/tokenReciept`
      );
      console.log(res.data);
      setAssignPat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // handlesearch
  const handleSearch = async () => {
    try {
      // get-request
      const response = await axios.post(
        `https://api.dvjei.org/api/auth/searchPatientAssigned?keyword=${keyword}`
      );

      const data = response.data;
      console.log(data);
      setResults(data);
      if (data.length > 0) {
        setSearchError(false);
      } else {
        setSearchError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    assignPatientData();
  }, []);

  useEffect(() => {
    if (searchError) {
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [searchError]);
  return (
    <>
      <Container>
        <div>
          <Header />
          <div className="contMain">
            <span>
              <h1
                className="text-center fs-1 fw-bold"
                style={{ color: "#347571" }}
              >
                Assigned Patient
              </h1>
            </span>

            <div className="container contBx">
              <button className="btn btn-success btnDash">
                <Link to="/receptionist-dashboard">Go to Dashboard</Link>
              </button>
            </div>
            <div className="container">
              <div class="input-group">
                <input
                  type="search"
                  value={keyword}
                  placeholder="search patient"
                  onChange={(e) => setKeyword(e.target.value)}
                  aria-describedby="button-addon1"
                  class="form-control border-0 bg-light"
                />
                <div class="input-group-append">
                  <button
                    id="button-addon1"
                    type="submit"
                    class="btn btn-primary text-light"
                    onClick={handleSearch}
                  >
                    <BsSearch />
                  </button>
                </div>
              </div>
            </div>
            {searchError ? (
              <>
                <h1 className="text-center">No Results Found...</h1>
              </>
            ) : (
              <>
                {results.length === 0 ? (
                  <>
                    <div className="table-responsive mt-5">
                      <table id="table" className="table">
                        <thead>
                          <tr>
                            <th>Patient Name</th>
                            <th>Doctor Name</th>
                            <th>Department</th>
                            <th>P_ID</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignPat?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item.firstname} {item.lastname}
                              </td>
                              <td>{item.Doctor_name}</td>
                              <td>{item.Dept}</td>
                              <td>{item.uhid}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="table-responsive mt-5">
                      <table id="table" className="table">
                        <thead>
                          <tr>
                            <th>Patient Name</th>
                            <th>Doctor Name</th>
                            <th>Department</th>
                            <th>P_ID</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item.firstname} {item.lastname}
                              </td>
                              <td>{item.Doctor_name}</td>
                              <td>{item.Dept}</td>
                              <td>{item.uhid}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </>
            )}

            <div className="container contBx">
              <button className="btn btn-success btnDash">
                <Link to="/receptionist-dashboard">Go to Dashboard</Link>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PatientAssigned;
const Container = styled.div`
  th {
    background-color: #ff9999;
      text-shadow: 0px 9px 20px #4a4545;
    text-align: center;
    @media screen and (max-width: 500px) {
      padding:0.5rem
    }
  }
  td {
    text-align: center;
    @media screen and (max-width: 500px) {
      padding:0.5rem
    }
  }
  .contMain {
    @media screen and (max-width: 500px) {
      margin-top: 10rem;
    }

    a{
      text-decoration:none;
      color:white;
    }
    
    tr{
      font-size:20px;
    }
    
    td{
      font-size:18px;
    }

    .input-group {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      padding: 1rem 20rem;
      @media screen and (max-width: 500px) {
        padding: 1rem 3rem;
      }
      @media screen and (min-width: 501px) and (max-width: 900px) {
        padding: 1rem 6rem;
      }
  
      input {
        border-radius: 1rem;
        //   padding: 1rem;
        width: 50%;
        position: relative;
        border: 1px solid #47a45b !important;
      }
    }
    button{
      @media screen and (max-width:500px){
        margin:0
      }
    }
`;
