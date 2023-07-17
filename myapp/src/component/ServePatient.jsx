import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useAuth } from "../context";

const ServePatient = () => {
  const [served, setServed] = useState([]);
  const [auth] = useAuth();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const domain = process.env.REACT_APP_DOMAIN;

  const handleServedPatient = async () => {
    try {
      const dt = await axios.get(`${domain}/api/auth/tokenReciept`);
      const data = dt.data;
      const filteredData = data.filter(
        (item) =>
          item.treatment_status === "Treated" &&
          item.Assigned_doctor === auth.user.reg_email
      );
      setServed(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  // search handler
  const handleSearch = async () => {
    const today = new Date();
    const yesterday = new Date(today);
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
    try {
      const response = await axios.get(
        `${domain}/api/auth/searchPatientServe?keyword=${keyword}`
      );

      const data = response.data;
      console.log(data);
      const filteredData = data.filter(
        (item) => item.Assigned_doctor === auth.user.reg_email
      );
      console.log(filteredData);
      setSearchData(filteredData);
      if (filteredData.length > 0) {
        setResults(searchData);
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

  useEffect(() => {
    if (searchError) {
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [searchError]);
  console.log(keyword);
  console.log(results);
  console.log(searchData);

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
                  Served patients
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
                            <th>Time</th>
                            <th>Dept</th>
                            <th>Token Generated</th>
                            <th>Token Generate Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {served?.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td>{item.uhid}</td>
                                <td>
                                  {item.firstname} {item.lastname}
                                </td>
                                <td>{item.P_Contact}</td>
                                <td>{item.Assigned_doctor}</td>
                                <td>{item.Time.split("T")[1]}</td>
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
                            <th>Time</th>
                            <th>Dept</th>
                            <th>Token Generated</th>
                            <th>Token Generate Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results?.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td>{item.uhid}</td>
                                <td>
                                  {item.firstname} {item.lastname}
                                </td>
                                <td>{item.P_Contact}</td>
                                <td>{item.Assigned_doctor}</td>
                                <td>{item.Time}</td>
                                <td>{item.Dept}</td>
                                <td>{item.Token_Generated}</td>
                                <td>{item.Token_Generate_Date}</td>
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
                <Link to="/doctor-dashboard">Go to Dashboard</Link>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ServePatient;
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


   td {
    text-align: center;
    @media screen and (max-width: 500px) {
      padding: 1rem;
    }
  }
  th{
    text-shadow: 0px 9px 20px #4a4545;
  }
  `;
