import React from "react";
import "./Receptionst.css";
// import jbplogo from './jbplogo.png';

const Receptionist = () => {
  return (
    <div>
      {/* <nav className="navbar">
      <div className="logo">
        <img src={jbplogo} alt="Logo" />
      </div>
      <div className='title'> <span>Manage Receptionist</span></div>
      <div className="links">
       
        <h3>Hi Admin Name </h3>
        <h3>Employee Id</h3>
        <span Id="btu"><button >Logout</button></span>
       
      </div>
    </nav> */}
      <div className="title">
        {" "}
        <span>Manage Receptionist</span>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
              <th>Column 4</th>
              <th>Column 5</th>
              <th>Column 6</th>
              <th>Column 7</th>
              <th>Column 8</th>
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
    </div>
  );
};
export default Receptionist;
