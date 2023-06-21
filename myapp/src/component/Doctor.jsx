import React from "react";
import "./Doctor.css";
import Header from "./Header";
import styled from "styled-components";

const Doctor = () => {
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
