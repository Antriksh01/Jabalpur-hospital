import React from "react";
import Header from "./Header";
import styled from "styled-components";

const ReportAdmin = () => {
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
              Report To Admin
            </h1>
          </span>
          <div className="table-responsive mt-5">
            <table id="table" className="table">
              <thead>
                <tr>
                  <th>Today_Registration</th>
                  <th>Today_Doctor_Availability</th>
                  <th>Today_Generated Token</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                  <td>Data 3</td>
                </tr>
                <tr>
                  <td>Data 9</td>
                  <td>Data 10</td>
                  <td>Data 11</td>
                </tr>
                <tr>
                  <td>Data 17</td>
                  <td>Data 18</td>
                  <td>Data 19</td>
                </tr>
                <tr>
                  <td>Data 17</td>
                  <td>Data 18</td>
                  <td>Data 19</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ReportAdmin;
const Container = styled.div`
  th {
    text-align: center;
    background-color: #b8e28a;
    border: 2px solid white;
  }
  td {
    text-align: center;
  }
`;
