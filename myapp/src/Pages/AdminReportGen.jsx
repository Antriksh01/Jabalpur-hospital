import React, { useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isAfter } from "date-fns";
import cogoToast from "cogo-toast";
import axios from "axios";
import { utils, writeFile } from "xlsx";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminReportGen = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalValues, setModalValues] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState("");
  const domain = "http://localhost:8100";
  const [docReport, setDocReport] = useState({
    docrepo1: null,
    docrepo2: null,
  });

  const [recReport, setRecReport] = useState({
    rec1: null,
    rec2: null,
  });
  const [disReport, setDisReport] = useState({
    display1: null,
    display2: null,
  });
  const [tokenReport, setTokenReport] = useState({
    tok1: null,
    tok2: null,
  });

  console.log("docReport", docReport);
  console.log("recReport", recReport);
  console.log("disreport", disReport);
  console.log("tokenreport", tokenReport);

  const handleDocChange1 = (date) => {
    setDocReport((prevDateValues) => ({
      ...prevDateValues,
      docrepo1: date,
    }));
  };

  const formatDate = (date) => {
    return date ? format(date, "dd-MM-yyyy") : "";
  };

  const handleDoctorReport = async () => {
    const fromDate = docReport.docrepo1;
    const toDate = docReport.docrepo2;

    if (fromDate && toDate && isAfter(fromDate, toDate)) {
      setError("To Date should be greater than or equal to From Date");
      cogoToast.error("To Date should be greater than or equal to From Date");
      console.log(error);
    } else {
      const res = await axios.post(`${domain}/api/auth/doctors-report`, {
        fromDate,
        toDate,
      });
      const docData = res.data;
      console.log(res.data);
      if (Array.isArray(docData)) {
        // Create a new workbook
        const workbook = utils.book_new();

        // Convert the report data to worksheet format
        const worksheet = utils.json_to_sheet(docData);

        utils.book_append_sheet(workbook, worksheet, "Doctors Report");
        writeFile(workbook, "Doctors-report.xlsx");
        console.log(res.data);
        setError("");
      } else {
        console.error("Token data is not an array");
      }
      setError("");

      // ...
    }
  };

  const handleRecReport = async () => {
    const fromDate = recReport.rec1;
    const toDate = recReport.rec2;

    if (fromDate && toDate && isAfter(fromDate, toDate)) {
      setError("To Date should be greater than or equal to From Date");
      cogoToast.error("To Date should be greater than or equal to From Date");
      console.log(error);
    } else {
      const res = await axios.post(`${domain}/api/auth/receptionist-report`, {
        fromDate,
        toDate,
      });
      const tokenData = res.data;
      console.log(tokenData);
      if (Array.isArray(tokenData)) {
        // Create a new workbook
        const workbook = utils.book_new();

        // Convert the report data to worksheet format
        const worksheet = utils.json_to_sheet(tokenData);

        utils.book_append_sheet(workbook, worksheet, "Receptionist Report");
        writeFile(workbook, "Receptionist-report.xlsx");
        console.log(res.data);
        setError("");
      } else {
        console.error("Token data is not an array");
      }
      setError("");

      // ...
    }
  };

  const handleRecButtom = async () => {
    const fromDate = recReport.rec1;
    const toDate = recReport.rec2;

    if (fromDate && toDate && isAfter(fromDate, toDate)) {
      setError("To Date should be greater than or equal to From Date");
      cogoToast.error("To Date should be greater than or equal to From Date");
      console.log(error);
    } else {
      const res = await axios.post(
        `${domain}/api/auth/receptionistMiniReport`,
        { fromDate, toDate }
      );
      const tokenData = res.data;
      setData(tokenData);
      if (Array.isArray(tokenData)) {
        // Create a new workbook
        const workbook = utils.book_new();

        // Convert the report data to worksheet format
        const worksheet = utils.json_to_sheet(tokenData);

        utils.book_append_sheet(workbook, worksheet, "Receptionist Report");
        writeFile(workbook, "Receptionist-report.xlsx");
        console.log(res.data);
        setError("");
      } else {
        console.error("Token data is not an array");
      }
      setError("");

      // ...
    }
  };

  // const handleDisReport = () => {
  //   const fromDate = disReport.display1;
  //   const toDate = disReport.display2;

  //   if (fromDate && toDate && isAfter(fromDate, toDate)) {
  //     setError("To Date should be greater than or equal to From Date");
  //     cogoToast.error("To Date should be greater than or equal to From Date");
  //     console.log(error);
  //   } else {
  //     // Proceed with report generation logic
  //     setError("");

  //     // ...
  //   }
  // };

  const handleTokenReport = async () => {
    const fromDate = tokenReport.tok1;
    const toDate = tokenReport.tok2;

    if (fromDate && toDate && isAfter(fromDate, toDate)) {
      setError("To Date should be greater than or equal to From Date");
      cogoToast.error("To Date should be greater than or equal to From Date");
      console.log(error);
    } else {
      const res = await axios.post(`${domain}/api/auth/token-report`, {
        fromDate,
        toDate,
      });
      const tokenData = res.data;
      console.log(tokenData);
      if (Array.isArray(tokenData)) {
        // Create a new workbook
        const workbook = utils.book_new();

        // Convert the report data to worksheet format
        const worksheet = utils.json_to_sheet(tokenData);

        utils.book_append_sheet(workbook, worksheet, "Token Report");
        writeFile(workbook, "token-report.xlsx");
        console.log(res.data);
        setError("");
      } else {
        console.error("Token data is not an array");
      }
    }
  };

  return (
    <>
      <Container>
        <Header />

        <div className="contMain">
          <div className="title">
            <h1
              className="text-center fs-1 fw-bold"
              style={{ color: "#347571" }}
            >
              Reports
            </h1>
          </div>
          <div className="container contBx">
            <button className="btn btn-success btnDash">
              <Link to="/admin-dashboard">Go to Dashboard</Link>
            </button>
          </div>
          <div className="container-fluid  mt-5" style={{ height: "auto" }}>
            <div className="row g-3">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="contrepbox">
                  <h4 style={{ color: "#347571" }}>Doctors Report</h4>
                  <div className="d-flex justify-content-between flex-column">
                    <div>
                      <label>From Date :</label>
                      <DatePicker
                        selected={docReport.docrepo1}
                        onChange={handleDocChange1}
                        dateFormat="dd-MM-yyyy"
                        customInput={
                          <input
                            type="text"
                            value={formatDate(docReport.docrepo1)}
                            readOnly
                          />
                        }
                        placeholderText="Select Date"
                        className="mt-0"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="xlable">To Date :</label>
                      <DatePicker
                        selected={docReport.docrepo2}
                        onChange={(date) =>
                          setDocReport((prevDocReport) => ({
                            ...prevDocReport,
                            docrepo2: date,
                          }))
                        }
                        dateFormat="dd-MM-yyyy"
                        customInput={
                          <input
                            type="text"
                            value={formatDate(docReport.docrepo2)}
                            readOnly
                          />
                        }
                        placeholderText="Select Date"
                        className="mt-0"
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={handleDoctorReport}
                  >
                    Generate Report
                  </button>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="contrepbox">
                  <h4 style={{ color: "#347571" }} className="text-center">
                    Receptionist Report
                  </h4>

                  <div className="d-flex justify-content-between flex-column">
                    <div>
                      <label>From Date :</label>
                      <DatePicker
                        selected={recReport.rec1}
                        onChange={(date) =>
                          setRecReport((prevDocReport) => ({
                            ...prevDocReport,
                            rec1: date,
                          }))
                        }
                        dateFormat="dd-MM-yyyy"
                        customInput={
                          <input
                            type="text"
                            value={formatDate(recReport.rec1)}
                            readOnly
                          />
                        }
                        placeholderText="Select Date"
                        className="mt-0"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="xlable">To Date :</label>
                      <DatePicker
                        selected={recReport.rec2}
                        onChange={(date) =>
                          setRecReport((prevDocReport) => ({
                            ...prevDocReport,
                            rec2: date,
                          }))
                        }
                        dateFormat="dd-MM-yyyy"
                        customInput={
                          <input
                            type="text"
                            value={formatDate(recReport.rec2)}
                            readOnly
                          />
                        }
                        placeholderText="Select Date"
                        className="mt-0"
                      />
                    </div>
                  </div>
                  <button className="btn btn-success" onClick={handleRecButtom}>
                    Generate Report
                  </button>
                </div>
              </div>
              {/* <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                <div className="contrepbox">
                  <h4 style={{ color: "#347571" }}> Display Report</h4>
                  <div className="d-flex justify-content-between flex-column">
                    <div>
                      <label>From Date :</label>
                      <DatePicker
                        selected={disReport.display1}
                        onChange={(date) =>
                          setDisReport((prevDocReport) => ({
                            ...prevDocReport,
                            display1: date,
                          }))
                        }
                        dateFormat="dd-MM-yyyy"
                        customInput={
                          <input
                            type="text"
                            value={formatDate(disReport.display1)}
                            readOnly
                          />
                        }
                        placeholderText="Select Date"
                        className="mt-0"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="xlable">To Date :</label>
                      <DatePicker
                        selected={disReport.display2}
                        onChange={(date) =>
                          setDisReport((prevDocReport) => ({
                            ...prevDocReport,
                            display2: date,
                          }))
                        }
                        dateFormat="dd-MM-yyyy"
                        customInput={
                          <input
                            type="text"
                            value={formatDate(disReport.display2)}
                            readOnly
                          />
                        }
                        placeholderText="Select Date"
                        className="mt-0"
                      />
                    </div>
                  </div>
                  <button className="btn btn-success" onClick={handleDisReport}>
                    Generate Report
                  </button>
                </div>
              </div> */}
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="contrepbox">
                  <h4 style={{ color: "#347571" }}>Tokens Report</h4>
                  <div className="d-flex justify-content-between flex-column">
                    <div>
                      <label>From Date :</label>
                      <DatePicker
                        selected={tokenReport.tok1}
                        onChange={(date) =>
                          setTokenReport((prevDocReport) => ({
                            ...prevDocReport,
                            tok1: date,
                          }))
                        }
                        dateFormat="dd-MM-yyyy"
                        customInput={
                          <input
                            type="text"
                            value={formatDate(tokenReport.tok1)}
                            readOnly
                          />
                        }
                        placeholderText="Select Date"
                        className="mt-0"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="xlable">To Date :</label>
                      <DatePicker
                        selected={tokenReport.tok2}
                        onChange={(date) =>
                          setTokenReport((prevDocReport) => ({
                            ...prevDocReport,
                            tok2: date,
                          }))
                        }
                        dateFormat="dd-MM-yyyy"
                        customInput={
                          <input
                            type="text"
                            value={formatDate(tokenReport.tok2)}
                            readOnly
                          />
                        }
                        placeholderText="Select Date"
                        className="mt-0"
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={handleTokenReport}
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminReportGen;

const Container = styled.div`
  .contMain {
    margin-top: 3rem;
    @media screen and (max-width: 500px) {
      margin-top: 10rem;
    }
    input {
      padding: 5px;
      border: none;
      border-bottom: 1px solid #e0e0e0;
      border-radius: none;
    }
    .custom-datepicker .react-datepicker__input-container input::placeholder {
      padding: 5px;
    }
    .contrepbox {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      align-items: center;
      box-shadow: inset 1px 1px 7px #e0e0e0;
      padding: 1rem;
      height: auto;
      border-radius: 0.5rem;
      button {
        margin-top: 1rem;
      }
    }
    .xlable {
      width: 5rem;
    }
  }
  a {
    text-decoration: none;
    color: white;
  }
`;
