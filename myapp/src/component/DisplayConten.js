import React from "react";
import pic from "../photos/jbplogo.png";
// import "./DisplayContent.css";
import Header from "./Header";

function DisplayContent() {
  return (
    <>
      <div>
        <Header />
        <div className="container">
          <h1 className="text-center">Display Content</h1>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="nav">
                <h5>Doctor Name : Doctor_Name</h5>

                <h5>Degree: MD</h5>

                <h5>Department. : Dept_1</h5>

                <h5>Room No. :</h5>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
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
        </div>
      </div>
    </>
  );
}

export default DisplayContent;
