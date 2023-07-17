import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context";
import { BsSearch } from "react-icons/bs";

const Doctor = () => {
  const [docData, setDocData] = useState([]);
  const [auth] = useAuth();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [searchError, setSearchError] = useState(false);

  const domain = process.env.REACT_APP_DOMAIN;

  const handleData = async () => {
    try {
      const response = await axios.get(`${domain}/api/auth/getAssignedDoc`);
      const dt = response.data;
      console.log(dt);
      setDocData(dt);
    } catch (error) {
      console.log(error);
    }
  };

  // search handler
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${domain}/api/auth/searchAvailableDoctor?keyword=${keyword}`
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
    if (searchError) {
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [searchError]);

  useEffect(() => {
    handleData();
  }, []);

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
                Doctor Availability
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
                      <table className="table table-hover table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Doctor Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Availability</th>
                            <th scope="col">Total Patients</th>
                          </tr>
                        </thead>
                        <tbody>
                          {docData.map((item) => (
                            <>
                              <tr>
                                <td>{item.Doctor_name}</td>
                                <td>{item.Department_name}</td>
                                <td>{item.Doc_Availability}</td>
                                <td>{item.assigned_patient}</td>
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
                      <table className="table table-hover table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Doctor Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Availability</th>
                            <th scope="col">Total Patients</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((item) => (
                            <>
                              <tr>
                                <td>{item.Doctor_name}</td>
                                <td>{item.Department_name}</td>
                                <td>{item.Doc_Availability}</td>
                                <td>{item.assigned_patient}</td>
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

export default Doctor;
const Container = styled.div`
  .table-responsive {
    overflow-x: auto;
    width: 100%;
    @media screen and (max-width: 500px) {
      margin: 0rem;
    }

    th {
      text-align: center;
      text-shadow: 0px 9px 20px #4a4545;
      background-color: #b8e28a;
      @media screen and (max-width: 500px) {
        padding: 0.5rem;
      }
    }
    td {
      text-align: center;
      @media screen and (max-width: 500px) {
        padding: 0.5rem;
      }
    }
  }
  .contMain {
    @media screen and (max-width: 500px) {
      margin-top: 10rem;
    }
  }
  a {
    text-decoration: none;
    color: white;
  }

  tr {
    font-size: 20px;
  }

  td {
    font-size: 18px;
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

  button {
    @media screen and (max-width: 500px) {
      margin: 0;
    }
  }
`;
