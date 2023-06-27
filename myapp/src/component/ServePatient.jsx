import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import axios from "axios";

const ServePatient = () => {
  const [served, setServed] = useState([]);

  const handleServedPatient = async () => {
    try {
      const dt = await axios.get("http://localhost:8100/api/auth/tokenReciept");
      const data = dt.data;
      const filteredData = data.filter(
        (item) => item.treatment_status === "Treated"
      );
      setServed(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleServedPatient();
  });

  return (
    <>
      <Container>
        <div>
          <Header />
          <div className="title">
            {" "}
            <span>
              <h1
                className="text-center fs-1 fw-bold"
                style={{ color: "#347571" }}
              >
                Served patients
              </h1>
            </span>
          </div>

          <div className="table-responsive mt-5">
            <table id="table" className="table">
              <thead>
                <tr>
                  <th>P_ID</th>
                  <th>P_Name</th>
                  <th>P_Contact</th>
                  <th>Assigned_doctor</th>
                  <th>Time</th>
                  <th>Dept</th>
                  <th>Token Generated</th>
                  <th>Token Generate Date</th>
                </tr>
              </thead>
              <tbody>
                {served?.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td>{item.uhid}</td>
                      <td>
                        {item.firstname} {item.lastname}
                      </td>
                      <td>{item.P_Contact}</td>
                      <td>{item.Assigned_doctor}</td>
                      <td>{item.Time}</td>
                      <td>{item.Dept}</td>
                      <td>{item.Token_Generated}</td>
                      <td>{item.Token_Generate_Date}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ServePatient;
const Container = styled.div``;
