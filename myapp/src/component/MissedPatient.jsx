import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useAuth } from "../context";

const MissedPatient = () => {
  const [patMissed, setPatMissed] = useState([]);
  const [auth] = useAuth();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchError, setSearchError] = useState(false);

  const domain = process.env.REACT_APP_DOMAIN;

  const handleServedPatient = async () => {
    try {
      // get-request
      const dt = await axios.post(
        `https://api.ananthospital.org/api/auth/tokenReciept`
      );
      const data = dt.data;
      const filteredData = data.filter(
        (item) =>
          item.treatment_status === "Patient_Absent" &&
          item.Assigned_doctor === auth.user.reg_email
      );
      setPatMissed(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  // search handler
  const handleSearch = async () => {
    try {
      // get-request
      const response = await axios.post(
        `https://api.ananthospital.org/api/auth/missed-partient?keyword=${keyword}`
      );

      const data = response.data;
      console.log(data);
      const filteredData = data.filter(
        (item) =>
          item.treatment_status === "Patient_Absent" &&
          item.Assigned_doctor === auth.user.reg_email
      );
      console.log(filteredData);

      if (filteredData.length > 0) {
        setResults(filteredData);
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

  useEffect(() => {
    handleServedPatient();
  }, []);

  console.log(keyword);
  console.log(results);
  console.log(patMissed);

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
            <div className="title">
              {" "}
              <span>
                <h1
                  className="text-center fs-1 fw-bold"
                  style={{ color: "#347571" }}
                >
                  Patients Missed-Absent-Not Treated
                </h1>
              </span>
            </div>
            <div className="container contBx">
              <button className="btn btn-success btnDash">
                <Link to="/doctor-dashboard">Go to Dashboard</Link>
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
                            <th>Token ID</th>
                            <th>P_ID</th>
                            <th>P_Name</th>
                            <th>P_Contact</th>
                            <th>Assigned_doctor</th>
                            <th>Dept</th>
                          </tr>
                        </thead>
                        <tbody>
                          {patMissed?.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td>{item.Token_ID}</td>
                                <td>{item.uhid}</td>
                                <td>
                                  {item.firstname} {item.lastname}
                                </td>
                                <td>{item.P_Contact}</td>
                                <td>{item.Assigned_doctor}</td>
                                <td>{item.Dept}</td>
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
                            <th>Token ID</th>
                            <th>P_ID</th>
                            <th>P_Name</th>
                            <th>P_Contact</th>
                            <th>Assigned_doctor</th>
                            <th>Dept</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results?.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td>{item.Token_ID}</td>
                                <td>{item.uhid}</td>
                                <td>
                                  {item.firstname} {item.lastname}
                                </td>
                                <td>{item.P_Contact}</td>
                                <td>{item.Assigned_doctor}</td>
                                <td>{item.Dept}</td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                <div className="container contBx">
                  <button className="btn btn-success btnDash">
                    <Link to="/doctor-dashboard">Go to Dashboard</Link>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default MissedPatient;
const Container = styled.div`
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
    @media screen and (max-width:500px){
      padding:15px;
    }
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
  th{
    text-shadow: 0px 9px 20px #4a4545;
  }
  
  `;
