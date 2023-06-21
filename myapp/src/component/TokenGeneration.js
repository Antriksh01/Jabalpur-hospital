import React from "react";
import "./TokenGeneration.css";
import Header from "./Header";
import styled from "styled-components";

const TokenGeneration = () => {
  return (
    <>
      <Container>
        <div>
          <Header />
          <div className="title">
            {" "}
            <span>
              <h1
                className="text-center fs-1 fw-bold"
                style={{ color: "#347571" }}
              >
                Token Generation
              </h1>
            </span>
          </div>

          <div className="table-responsive mt-5">
            <table id="table" className="table">
              <thead>
                <tr>
                  <th>P_ID </th>
                  <th>P_Name</th>
                  <th>P_Contact</th>
                  <th>Assigned_doctor</th>
                  <th>Time</th>
                  <th>Dept</th>
                  <th>Token Generated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>ABC</td>
                  <td>99999999</td>
                  <td>DOC_1</td>
                  <td>11:20</td>
                  <td>Dep_1</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>02</td>
                  <td>XYZ</td>
                  <td>99999999</td>
                  <td>DOC_2</td>
                  <td>11:40</td>
                  <td>Dep_2</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>03</td>
                  <td>QWE</td>
                  <td>99999999</td>
                  <td>DOC_3</td>
                  <td>12:00</td>
                  <td>Dep_3</td>
                  <td>Mark as absent</td>
                </tr>
              </tbody>
            </table>
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
  }
  td {
    text-align: center;
  }
`;
