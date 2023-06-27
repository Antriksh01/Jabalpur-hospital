import React, { useEffect, useState } from "react";
import "./Doctor.css";
import Header from "./Header";
import styled from "styled-components";
import axios from "axios";

const Doctor = () => {
  const [docData, setDocData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8100/api/auth/getAssignedDoc`
      );
      const dt = response.data;
      console.log(dt);
      setDocData(dt);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <Container>
        <div>
          <Header />
          <span>
            <h1
              className="text-center fs-1 fw-bold"
              style={{ color: "#347571" }}
            >
              Doctor Availability
            </h1>
          </span>
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

    th {
      text-align: center;
      background-color: #b8e28a;
    }
    td {
      text-align: center;
    }
  }
`;
