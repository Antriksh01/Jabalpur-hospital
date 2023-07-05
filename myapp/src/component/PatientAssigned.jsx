import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const PatientAssigned = () => {
  const [assignPat, setAssignPat] = useState([]);

  const assignPatientData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8100/api/auth/tokenReciept"
      );
      console.log(res.data);
      setAssignPat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    assignPatientData();
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
                Assigned Patient
              </h1>
            </span>
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
`;
