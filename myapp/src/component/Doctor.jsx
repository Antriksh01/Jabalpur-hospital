import Header from './Header';
import React from 'react';
import './Doctor.css';

// import jbplogo from './jbplogo.png';
// import {useNavigate,Navlink} from "react-router-dom";
// import { Link } from 'react-router-dom';

const Doctor = () =>{
    return(
      
    <div>
    
    {/* <nav className="navbar">
      <div className="logo">
        <img src={jbplogo} alt="Logo" />
      </div>
      <div className='title'> <span>Doctor Availability</span></div>
      <div className="links">
       
        <h3>Hi Admin Name </h3>
        <h3>Employee Id</h3>
        <span Id="btu"><button >Logout</button></span>
       
      </div>
    </nav> */}
    <div className='title'> <span>Doctor Availability</span></div>
      
      <div className="table-responsive">
      <table id="table" className="table">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
           
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

    );
    
};

export default Doctor;
