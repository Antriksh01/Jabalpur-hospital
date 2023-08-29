import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { useAuth } from "../context";

const DoctorDisplayScr = () => {
  const [content, setContent] = useState([]);
  // const [auth] = useAuth();
  const { value } = useParams();
  const domain = process.env.REACT_APP_DOMAIN;

  const DocDisplayCont = async (value) => {
    try {
      // get-request
      const res = await axios.post(
        `https://queuemanagementsystemdg.com/api/auth/doctorLive/${value}`
      );
      console.log(value);
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
          item.treatment_status === "Pending" &&
          item.Time.split("T")[0] === formattedDate
      );

      console.log(filteredData);
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

  useEffect(() => {
    DocDisplayCont(value);
    const interval = setInterval(() => {
      DocDisplayCont(value);
    }, 1000); // Repeat every 1 second (1000 milliseconds)

    return () => {
      clearInterval(interval); // Cleanup function to clear the interval when the component is unmounted
    };
  }, [value]);

  console.log(content);

  return (
    <>
      <Container>
        <Header />
        <h1 className="text-center fw-bold" style={{ color: "#347571" }}>
          Doctor's Display
        </h1>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="container">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="leftCont">
                      <img
                        src="https://res.cloudinary.com/antrix/image/upload/v1692018410/woj/avatar-female_hdaurr.png"
                        className="img-doc"
                        alt=""
                        srcset=""
                      />
                      <h6>Doctor Name : {content[0]?.Doctor_name}</h6>
                      <h6>Degree : </h6>
                      <h6>Department : {content[0]?.Dept}</h6>
                      <h6>Room No. : {content[0]?.Room_No}</h6>
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
                            <tr
                              key={item.uhid}
                              className={index === 0 ? "first-row" : " "}
                              // style={{
                              //   backgroundColor:
                              //     index === 0 ? "red !important" : "",
                              // }}
                            >
                              <td>{item.uhid}</td>
                              <td>
                                {item.firstname} {item.lastname}
                              </td>
                              <td>{item.Time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="container-fluid mt-5">
                <video controls width="640" height="360" muted autoplay loop>
                  <source
                    src="https://res.cloudinary.com/antrix/video/upload/v1678196544/strangerThings-vid_zk8f5l.mp4"
                    type="video/mp4"
                  />
                </video>
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
    background-color: #1abc9c;
    margin-top: 4px;
    padding: 2rem 0rem;
    display: flex;
    width: 13.5rem;
    padding-left: 1rem;
    color: #fff;
    flex-direction: column;
    align-items: flex-start;
    h1 {
      font-size: 2rem;
    }
  }
  th {
    padding: 10px;
    border: 5px solid white;
    background-color: #1abc9c;
    color: #fff;
    font-size: 15px;
  }
  td {
    padding: 10px;
    border: 5px solid white;
    background-color: #f6e58d;
    color: #347571;
    font-size: 16px;
  }
  .table > :not(:last-child) > :last-child > * {
    border-bottom-color: white;
  }

  .first-row {
    td {
      background-color: #e74c3c;
      color: #fff;
    }
  }
  .img-doc {
    height: 100px;
    width: 100px;
    margin-left: 2rem;
  }
  h6 {
    font-size: 14px !important;
  }
`;
