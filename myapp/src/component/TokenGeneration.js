import React, { useEffect, useState } from "react";
import "./TokenGeneration.css";
import Header from "./Header";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const TokenGeneration = () => {
  const [patient, setPatient] = useState([]);

  const getAllPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8100/api/auth/tokenReciept"
      );
      // console.log(response.data);
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // console.log(patient);

  useEffect(() => {
    getAllPatients();
  }, []);
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
            <div className="container contBx">
              <button className="btn btn-success btnDash">
                <Link to="/admin-dashboard">Go to Dashboard</Link>
              </button>
            </div>

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
                    <th>Token Generate Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.map((item, index) => (
                    <>
                      <tr key={index}>
                        <td>{item.uhid}</td>
                        <td>
                          {item.firstname} {item.lastname}
                        </td>
                        <td>{item.P_Contact}</td>
                        <td>{item.Doctor_name}</td>
                        <td>{item.Time}</td>
                        <td>{item.Dept}</td>
                        <td>{item.Token_Generated}</td>
                        <td>{item.regdatetime}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
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
export default TokenGeneration;
const Container = styled.div`
  th {
    background-color: #ff9999;
    text-align: center;
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
`;
