import React from "react";
import pic from "../photos/jbplogo.png";
import "./DisplayContent.css";

function DisplayContent() {
  return (
    <>
      <div>
        <div className="header">
          <img id="img1" src={pic} alt="img" />
          <h1 id="adm1">Display Content</h1>
          <h3 id="hd">
            Hi, Admin Name <br />
            Employee Id
          </h3>
          <button className="btn1">Logout</button>
        </div>
        <div className="container">
          <div className="nav">
            <h5>Doctor Name : Doctor_Name</h5>

            <h5>Degree: MD</h5>

            <h5>Department. : Dept_1</h5>

            <h5>Room No. :</h5>
          </div>
          <div className="table-responsive">
            <table id="table" className="table">
              <tr>
                <th>Token No</th>
                <th>Room No</th>
                <th>
                  Time of
                  <br /> Appointment
                </th>
              </tr>
              <tr>
                <td>Row 1, Cell 1</td>
                <td>Row 1, Cell 2</td>
                <td>Row 1, Cell 3</td>
              </tr>
              <tr>
                <td>Row 2, Cell 1</td>
                <td>Row 2, Cell 2</td>
                <td>Row 2, Cell 3</td>
              </tr>
              <tr>
                <td>Row 3, Cell 1</td>
                <td>Row 3, Cell 2</td>
                <td>Row 3, Cell 3</td>
              </tr>
              <tr>
                <td>Row 4, Cell 1</td>
                <td>Row 4, Cell 2</td>
                <td>Row 4, Cell 3</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayContent;
