import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import axios from "axios";
import { useAuth } from "../context";
import { Link } from "react-router-dom";

const DoctorDisplay = () => {
  const [content, setContent] = useState([]);
  const [auth] = useAuth();
  const domain = process.env.REACT_APP_DOMAIN;

  const DocDisplayCont = async () => {
    try {
      // get-request
      const res = await axios.post(
        `https://api.ananthospital.org/api/auth/display-doctor-screen`
      );
      const data = res.data;
      console.log(data);
      const today = new Date();
      const yesterday = new Date(today);
      const formattedDate = yesterday
        .toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .reverse()
        .join("-");
      console.log(formattedDate);

      const filteredData = data.filter(
        (item) =>
          item.Assigned_doctor === auth.user.reg_email &&
          item.treatment_status === "Pending" &&
          item.Time.split("T")[0] === formattedDate
      );

      filteredData.forEach((item) => {
        const time = new Date(item.Time);
        const formattedTime = time.toLocaleTimeString();
        item.Time = formattedTime;
      });

      setContent(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  content.sort((a, b) => parseInt(a.Token_ID) - parseInt(b.Token_ID));
  console.log(content);
  useEffect(() => {
    DocDisplayCont();
  }, []);
  return (
    <>
      <Container>
        <Header />
        <div className="contMain">
          <h1 className="text-center fw-bold" style={{ color: "#347571" }}>
            Doctor's Display
          </h1>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="leftbox">
                  <h1>Doctor Name : {content[0]?.Doctor_name}</h1>
                  <h1>Degree : </h1>
                  <h1>Department : {content[0]?.Dept}</h1>
                  <h1>Room No. : {content[0]?.Room_No}</h1>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <div className="table-responsive">
                  <table id="table" className="table">
                    <thead>
                      <tr>
                        <th className="text-center">Token No</th>
                        <th className="text-center">Patient Name</th>
                        <th className="text-center">Approximate Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content?.map((item, index) => (
                        <>
                          <tr
                            key={item.uhid}
                            className={index === 0 ? "first-row" : ""}
                          >
                            <td>{item.uhid}</td>
                            <td>
                              {item.firstname} {item.lastname}
                            </td>
                            {}
                            <td>{item.Time}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="container contBx">
            <button className="btn btn-success btnDash">
              <Link to="/doctor-dashboard">Go to Dashboard</Link>
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DoctorDisplay;
const Container = styled.div`
  .leftbox {
    height: 100%;
    background-color: #1abc9c;
    color:white;
    margin-top: 14px;
    padding: 7rem 1rem;
    h1 {
      font-size: 2rem;
    }
    @media screen and (max-width:500px){
      display: flex;
      flex-direction: column;
    }
    h1{
      @media screen and (min-width:501px) and (max-width:900px){
        font-size:18px;
      }
      @media screen and (max-width:500px){
        font-size:18px;
      }
    }
    
  }
  th {
    padding: 2rem;
    border: 1rem solid white;
    background-color: #1abc9c;
    color: #fff;
    font-size: 2rem;
    text-shadow: 0px 5px 35px #4a4545;
    @media screen and (max-width:500px){
      padding: 1rem;
      font-size:1rem;
      
    }
  }
  td {
    padding: 2rem;
    border: 1rem solid white;
    background-color: #f6e58d;
    color: #347571;
    font-size: 2rem;
    @media screen and (max-width:500px){
      padding: 1rem;
      font-size:1rem;
    }
  }
  .table > :not(:last-child) > :last-child > * {
    border-bottom-color: white;
  }

  .first-row {
    background-color: red !important;
  }

  .contMain {
    @media screen and (max-width: 500px) {
      margin-top: 10rem;
    }
    .table-responsive{
      margin:0rem;
      @media screen and (max-width:500px){
        margin-left:-1rem;
      }
    }

    a{
      text-decoration:none;
      color:white;
    }

    .first-row {
      td {
        background-color: #e74c3c;
        color: #fff;
      }
    }
`;
// Approximate time
