import React from "react";
import Header from "./Header";
import styled from "styled-components";

const PatientAssigned = () => {
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
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                  <td>Data 3</td>
                  <td>Data 4</td>
                </tr>
                <tr>
                  <td>Data 9</td>
                  <td>Data 10</td>
                  <td>Data 11</td>
                  <td>Data 12</td>
                </tr>
                <tr>
                  <td>Data 17</td>
                  <td>Data 18</td>
                  <td>Data 19</td>
                  <td>Data 20</td>
                </tr>
                <tr>
                  <td>Data 17</td>
                  <td>Data 18</td>
                  <td>Data 19</td>
                  <td>Data 20</td>
                </tr>
              </tbody>
            </table>
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
  }
  td {
    text-align: center;
  }
`;
