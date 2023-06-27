import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import axios from "axios";

const PatientTreatY = () => {
  const [patTreated, setPatTreated] = useState([]);

  const handleServedPatient = async () => {
    try {
      const dt = await axios.get("http://localhost:8100/api/auth/tokenReciept");
      const data = dt.data;

      setPatTreated(data);
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const formattedDate = yesterday
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  const filteredYest = patTreated.filter(
    (item) =>
      item.treatment_status === "Treated" &&
      item.Token_Generate_Date === formattedDate
  );

  console.log(filteredYest);

  useEffect(() => {
    handleServedPatient();
  }, []);
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
                Patients Treated yesterday
              </h1>
            </span>
          </div>

          <div className="table-responsive mt-5">
            <table id="table" className="table">
              <thead>
                <tr>
                  <th>Token ID</th>
                  <th>P_ID</th>
                  <th>P_Name</th>
                  <th>P_Contact</th>
                  <th>Assigned_doctor</th>
                  <th>Dept</th>
                </tr>
              </thead>
              <tbody>
                {filteredYest?.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td>{item.Token_ID}</td>
                      <td>{item.uhid}</td>
                      <td>
                        {item.firstname} {item.lastname}
                      </td>
                      <td>{item.P_Contact}</td>
                      <td>{item.Assigned_doctor}</td>
                      <td>{item.Dept}</td>
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

export default PatientTreatY;
const Container = styled.div``;
