import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Header from "./Header";
import axios from "axios";
import { useAuth } from "../context";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const PatientQueue = () => {
  const [patient, setpatient] = useState();
  const [auth] = useAuth();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchError, setSearchError] = useState(false);
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
          item.treatment_status === "Pending" &&
          item.Time.split("T")[0] === formattedDate
      );

      setpatient(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(patient);

  const handleSearch = async () => {
    const givenDate = new Date();

    const formattedDate = givenDate
      .toISOString()
      .slice(0, 23)
      .replace("T", " ");

    console.log(formattedDate);
    try {
      const response = await axios.get(
        `http://localhost:8100/api/auth/searchPatientQueue?keyword=${keyword}`
      );
      console.log(response.data);
      const data = response.data;

      const filteredData = data.filter(
        (item) =>
          item.Assigned_doctor === auth.user.reg_email &&
          item.treatment_status === "Pending" &&
          item.Time.split("T")[0] === formattedDate
      );

      setSearchData(filteredData);
      if (data.length > 0) {
        setResults(searchData);
        setSearchError(false);
        console.log(results);
      } else {
        setResults([]);
        setSearchError(true);
      }
      setKeyword("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(keyword);
  console.log(results);
  useState(() => {
    handlePatient();
  }, []);

  useEffect(() => {
    if (searchError) {
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [searchError]);
  return (
    <>
      <Container>
        <div>
          <Header />
          <div className="contMain">
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

            <div className="container contBx">
              <button className="btn btn-success btnDash">
                <Link to="/doctor-dashboard">Go to Dashboard</Link>
              </button>
            </div>
            <div className="container">
              <div class="input-group">
                <input
                  type="search"
                  value={keyword}
                  placeholder="search patient"
                  onChange={(e) => setKeyword(e.target.value)}
                  aria-describedby="button-addon1"
                  class="form-control border-0 bg-light"
                />
                <div class="input-group-append">
                  <button
                    id="button-addon1"
                    type="submit"
                    class="btn btn-primary text-light"
                    onClick={handleSearch}
                  >
                    <BsSearch />
                  </button>
                </div>
              </div>
            </div>
            {searchError ? (
              <>
                <h1 className="text-center">No Results Found....</h1>
              </>
            ) : (
              <>
                {results.length === 0 ? (
                  <>
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
                                <td>{item.Time.split("T")[1]}</td>
                                <td>{item.Dept}</td>
                                <td>{item.Token_Generated}</td>
                                <td>{item.Time.split("T")[0]}</td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <>
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
                          {results?.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td>{item.uhid}</td>
                                <td>
                                  {item.firstname} {item.lastname}
                                </td>
                                <td>{item.P_Contact}</td>
                                <td>{item.Assigned_doctor}</td>
                                <td>{item.Time.split("T")[1]}</td>
                                <td>{item.Dept}</td>
                                <td>{item.Token_Generated}</td>
                                <td>{item.Time.split("T")[0]}</td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </>
            )}

            <div className="container contBx">
              <button className="btn btn-success btnDash">
                <Link to="/doctor-dashboard">Go to Dashboard</Link>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PatientQueue;
const Container = styled.div`
.contMain {
  @media screen and (max-width: 500px) {
    margin-top: 10rem;
  }
  
  a{
    text-decoration:none;
    color:white;
  }
  
  tr{
    font-size:20px;
  }
  .input-group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    padding: 1rem 20rem;
    @media screen and (max-width: 500px) {
      padding: 1rem 3rem;
    }
    @media screen and (min-width: 501px) and (max-width: 900px) {
      padding: 1rem 6rem;
    }

    input {
      border-radius: 1rem;
      //   padding: 1rem;
      width: 50%;
      position: relative;
      border: 1px solid #47a45b !important;
    }
  }

  button{
    @media screen and (max-width: 500px) {
      margin:0
    }
   }
  
  td{
    font-size:18px;
    @media screen and (max-width:500px){
      padding:15px;
    }
  }`;
