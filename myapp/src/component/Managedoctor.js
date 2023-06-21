import React from "react";
import "./Managedoctor.css";
import Header from "./Header";
// import jbplogo from './jbplogo.png';
import { styled } from "styled-components";

const Managedoctor = () => {
  return (
    <>
      <Container>
        <div>
          <Header />
          <div className="title text-center">
            {" "}
            <span>Manage Doctor</span>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Dept</th>
                  <th>Availability</th>
                  <th>Off Days</th>
                  <th>Additional Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                  <td>Data 3</td>
                  <td>Data 4</td>
                  <td>Data 5</td>
                  <td>Data 6</td>
                  <td>Data 7</td>
                  <td>Data 8</td>
                </tr>
                <tr>
                  <td>Data 9</td>
                  <td>Data 10</td>
                  <td>Data 11</td>
                  <td>Data 12</td>
                  <td>Data 13</td>
                  <td>Data 14</td>
                  <td>Data 15</td>
                  <td>Data 16</td>
                </tr>
                <tr>
                  <td>Data 17</td>
                  <td>Data 18</td>
                  <td>Data 19</td>
                  <td>Data 20</td>
                  <td>Data 21</td>
                  <td>Data 22</td>
                  <td>Data 23</td>
                  <td>Data 24</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-4  d-flex justify-content-center">
                <button>Add a Doctor</button>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <button>Go to Dashboard</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Managedoctor;
const Container = styled.div`
  .container-fluid {
    button {
      width: 50%;
      padding: 0.5rem;
      border: none;
      color: #fff;
      font-size: 1.5rem;
      background-color: #5ec57e;
      border-radius: 1.5rem;
    }
  }
`;
