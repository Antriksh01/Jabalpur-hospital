import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const MonthWiseToken = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [patient, setPatient] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [searchError, setSearchError] = useState(false);

  const domain = process.env.REACT_APP_DOMAIN;

  const filterDataByCurrentMonth = (data) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because month index starts from 0

    return data.filter((item) => {
      const itemDate = new Date(item.Time.split("T")[0]);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth() + 1;

      return itemYear === currentYear && itemMonth === currentMonth;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get-request
        const response = await axios.post(
          `https://api.ananthospital.org/api/auth/tokenReciept`
        );
        const apiData = response.data; // Assuming the response contains an array of objects
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchError) {
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [searchError]);

  // searchHandler
  const handleSearch = async () => {
    try {
      // get-request
      const response = await axios.post(
        `https://api.ananthospital.org/api/auth/searchTokenhistory?keyword=${keyword}`
      );

      const data = response.data;
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index

      const filteredData = data.filter((item) => {
        const itemDate = new Date(item.Time);
        const itemMonth = itemDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
        return itemMonth === currentMonth;
      });

      if (filteredData.length > 0) {
        setResults(filteredData);
        setSearchError(false);
      } else {
        setResults([]);
        setSearchError(true);
      }

      setKeyword("");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(keyword);
  console.log(results);

  useEffect(() => {
    const filtered = filterDataByCurrentMonth(data);
    setFilteredData(filtered);
  }, [data]);

  return (
    <>
      <Container>
        <div>
          <Header />
          <div className="contMain">
            <div className="title">
              <span>
                <h1
                  className="text-center fs-1 fw-bold"
                  style={{ color: "#347571" }}
                >
                  This Month All Tokens
                </h1>
              </span>
            </div>
            <div className="container contBx">
              <button className="btn btn-success btnDash">
                <Link to="/admin-dashboard">Go to Dashboard</Link>
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
                            <th>Dept</th>
                            <th>Token Generated Date</th>
                            <th>Token Generated Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((item, index) => (
                            <tr key={index}>
                              <td>{item.uhid}</td>
                              <td>
                                {item.firstname} {item.lastname}
                              </td>
                              <td>{item.P_Contact}</td>
                              <td>{item.Doctor_name}</td>
                              <td>{item.Dept}</td>
                              <td>{item.Time.split("T")[0]}</td>
                              <td>{item.Time.split("T")[1]}</td>
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
                            <th>P_ID</th>
                            <th>P_Name</th>
                            <th>P_Contact</th>
                            <th>Assigned_doctor</th>
                            <th>Dept</th>
                            <th>Token Generated</th>
                            <th>Token Generate Date & Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((item, index) => (
                            <tr key={index}>
                              <td>{item.uhid}</td>
                              <td>
                                {item.firstname} {item.lastname}
                              </td>
                              <td>{item.P_Contact}</td>
                              <td>{item.Doctor_name}</td>
                              <td>{item.Dept}</td>
                              <td>{item.Token_Generated}</td>
                              <td>{item.Token_Generate_Date}</td>
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
                <Link to="/admin-dashboard">Go to Dashboard</Link>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MonthWiseToken;

const Container = styled.div`
  th {
    background-color: #ff9999;
    text-align: center;
    text-shadow: 0px 5px 20px #4a4545;
  }
  td {
    text-align: center;
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
      td {
        font-size: 18px;
        @media screen and (max-width:500px){
          padding: 15px;
        }
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
        margin: 0;
      }
    }
`;
