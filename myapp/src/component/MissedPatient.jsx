import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import axios from "axios";
import { Link } from "react-router-dom";

const MissedPatient = () => {
  const [patMissed, setPatMissed] = useState([]);

  const handleServedPatient = async () => {
    try {
      const dt = await axios.get("http://localhost:8100/api/auth/tokenReciept");
      const data = dt.data;
      const filteredData = data.filter(
        (item) => item.treatment_status === "Patient_Absent"
      );
      setPatMissed(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleServedPatient();
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
                  Patients Missed-Absent-Not Treated
                </h1>
              </span>
            </div>

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
  }`;
