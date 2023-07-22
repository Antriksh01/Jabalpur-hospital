import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { useAuth } from "../context";

const DoctorDisplayScr = () => {
  const [content, setContent] = useState([]);
  //   const [auth] = useAuth();
  const { value } = useParams();
  const domain = process.env.REACT_APP_DOMAIN;

  const DocDisplayCont = async (value) => {
    try {
      const res = await axios.get(
        `https://api.dvjei.org/api/auth/doctorLive/${value}`
      );
      console.log(value);
      const data = res.data;
      console.log(res);
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
          item.Doc_ID === value &&
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

  console.log(content);
  useEffect(() => {
    DocDisplayCont(value);
  }, [value]);
  return (
    <>
      <Container>
        <Header />
        <h1 className="text-center fw-bold" style={{ color: "#347571" }}>
          Doctor's Display
        </h1>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="leftCont">
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
                      <th>Token No</th>
                      <th>Patient Name</th>
                      <th>Approximate Time</th>
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
      </Container>
    </>
  );
};

export default DoctorDisplayScr;
const Container = styled.div`
  .leftCont {
    height: 100%;
    background-color: #dcf4ce;
    margin-top: 14px;
    padding: 7rem 1rem;
    h1 {
      font-size: 2rem;
    }
  }
  th {
    padding: 2rem;
    border: 1rem solid white;
    background-color: #b8e28a;
    color: #347571;
    font-size: 2rem;
  }
  td {
    padding: 2rem;
    border: 1rem solid white;
    background-color: #ecf8e5;
    color: #347571;
    font-size: 2rem;
  }
  .table > :not(:last-child) > :last-child > * {
    border-bottom-color: white;
  }

  .first-row {
    background-color: red !important;
  }
`;
