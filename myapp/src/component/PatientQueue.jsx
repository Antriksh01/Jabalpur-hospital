import React, { useState } from "react";
import { styled } from "styled-components";
import Header from "./Header";
import axios from "axios";
import { useAuth } from "../context";

const PatientQueue = () => {
  const [patient, setpatient] = useState();
  const [auth] = useAuth();
  //   console.log(auth);

  const handlePatient = async () => {
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
    try {
      const { data } = await axios.get(
        "http://localhost:8100/api/auth/tokenReciept"
      );
      console.log(data);
      const filteredData = data.filter(
        (item) =>
          item.Assigned_doctor === auth.user.reg_email &&
          item.treatment_status !== "Treated" &&
          item.Token_Generate_Date === formattedDate
      );

      setpatient(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(patient);

  useState(() => {
    handlePatient();
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
                Patient in Queue
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
                {patient?.map((item, index) => (
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

export default PatientQueue;
const Container = styled.div``;
