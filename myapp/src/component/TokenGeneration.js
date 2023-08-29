import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const TokenGeneration = () => {
  const [patient, setPatient] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const navigate = useNavigate();
  const domain = process.env.REACT_APP_DOMAIN;

  const handleGoBack = () => {
    // Navigate to the previous page
    navigate(-1);
  };

  const getAllPatients = async () => {
    try {
      // get-request
      const response = await axios.post(
        `https://queuemanagementsystemdg.com/api/auth/tokenReciept`
      );
      // console.log(response.data);
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  console.log(patient);

  const handleSearch = async () => {
    try {
      // get-request
      const response = await axios.post(
        `https://queuemanagementsystemdg.com/api/auth/searchTokenhistory?keyword=${keyword}`
      );
      console.log(response.data);
      const data = response.data;
      if (data.length > 0) {
        setResults(data);
        setSearchError(false);
        console.log(results);
      } else {
        setResults([]);
        setSearchError(true);
      }
      setKeyword("");
    } catch (error) {
      console.log(error);
    }
  };

  patient.sort((a, b) => parseInt(a.Token_ID) - parseInt(b.Token_ID));

  console.log(keyword);
  console.log(results);

  useEffect(() => {
    if (searchError) {
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [searchError]);

  useEffect(() => {
    getAllPatients();
  }, []);

  console.log(results);
  return (
    <>
      <Container>
        <div>
          <Header />
          <div className="contMain">
            <div className="title">
              {" "}
              <span>
                <h1
                  className="text-center fs-1 fw-bold"
                  style={{ color: "#347571" }}
                >
                  Token History
                </h1>
              </span>
            </div>
            {/* <div className="container contBx">
              <button className="btn btn-success btnDash">
                <Link to="/receptionist-dashboard">Go to Dashboard</Link>
              </button>
            </div> */}
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
                <h1 className="text-center">No Results Found....</h1>
              </>
            ) : (
              <>
                {results.length === 0 ? (
                  <>
                    <div className="table-responsive mt-5">
                      <table id="table" className="table">
                        <thead>
                          <tr>
                            <th>P_ID</th>
                            <th>P_Name</th>
                            <th>P_Contact</th>
                            <th>Assigned_doctor</th>
                            <th>Date & Time</th>
                            <th>Dept</th>
                            <th>Token ID</th>
                          </tr>
                        </thead>
                        <tbody>
                          {patient?.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td>{item.uhid}</td>
                                <td>
                                  {item.firstname} {item.lastname}
                                </td>
                                <td>{item.P_Contact}</td>
                                <td>{item.Doctor_name}</td>
                                <td>
                                  {item.Time.split("T")[0]}{" "}
                                  {item.Time.split("T")[1]}
                                </td>
                                <td>{item.Dept}</td>
                                <td>{item.Token_ID}</td>
                              </tr>
                            </>
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
                            <th>P_ID</th>
                            <th>P_Name</th>
                            <th>P_Contact</th>
                            <th>Assigned_doctor</th>
                            <th>Date & Time</th>
                            <th>Dept</th>
                            <th>Token Generated</th>
                            <th>Token Generate Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td>{item.uhid}</td>
                                <td>
                                  {item.firstname} {item.lastname}
                                </td>
                                <td>{item.P_Contact}</td>
                                <td>{item.Doctor_name}</td>
                                <td>
                                  {item.Time.split("T")[0]}{" "}
                                  {item.Time.split("T")[1]}
                                </td>
                                <td>{item.Dept}</td>
                                <td>{item.Token_Generated}</td>
                                <td>{item.Time.split("T")[0]}</td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </>
            )}

            <div className="container contBx">
              <button
                className="btn btn-success btnDash"
                onClick={handleGoBack}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default TokenGeneration;
const Container = styled.div`
  th {
    background-color: #ff9999;
    text-align: center;
    text-shadow: 0px 9px 20px #4a4545;
    @media screen and (max-width: 500px) {
      padding: 1rem;
      text-align:center;
      
    }
  }
  td {
    text-align: center;
    @media screen and (max-width: 500px) {
      padding: 1rem;
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
    @media screen and (max-width: 500px) {
      margin:0
    }
   }
`;
