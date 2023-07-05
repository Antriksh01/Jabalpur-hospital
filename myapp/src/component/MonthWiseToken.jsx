import React, { useEffect, useState } from "react";
import "./TokenGeneration.css";
import Header from "./Header";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const MonthWiseToken = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const filterDataByCurrentMonth = (data) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because month index starts from 0

    return data.filter((item) => {
      const itemDate = new Date(item.Token_Generate_Date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth() + 1;

      return itemYear === currentYear && itemMonth === currentMonth;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8100/api/auth/tokenReciept"
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
                  {filteredData.map((item, index) => (
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
    }
`;
