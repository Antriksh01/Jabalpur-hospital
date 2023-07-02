import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import { BsSearch } from "react-icons/bs";
import jbplogo from "../photos/jbplogo.png";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { Button, Modal } from "react-bootstrap";

const TokenSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [reciept, setReciept] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState();
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [patient, setPatient] = useState([]);
  const [content, setContent] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalValues, setModalValues] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const form = useRef();
  const printContentRef = useRef();

  console.log(patient);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8100/api/auth/Search-patient?keyword=${keyword}`
      );
      console.log(response.data);
      const data = response.data;
      if (data.length > 0) {
        setResults(data);
        setSearchError(false);
      } else {
        setResults([]);
        setSearchError(true);
      }
      setKeyword("");
    } catch (error) {
      console.log(error);
    }
  };

  const recieptHandler = () => {
    setReciept(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const sendSMS = async (e) => {
    e.preventDefault();

    const recptsmsData = `
    UHID: ${results[0].uhid},
    PatientName: ${results[0].firstname} ${results[0].lastname} ,
    AssignedDoctor: ${results[0].Assigned_doctor} ,
    Department: ${results[0].Dept},
    TokenGeneratedby: ${results[0].Token_Generated_by},
    RoomNo: ${results[0].Room_No},
    CounterNo: ${results[0].Counter_No}`;

    setPhoneNumber(results[0].P_Contact);

    console.log(recptsmsData);

    try {
      await axios.post("http://localhost:8100/api/auth/sendSMS", {
        phoneNumber,
        message: recptsmsData,
      });

      console.log("Message sent successfully!");
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
    // console.log("send sms");
  };

  console.log(phoneNumber);
  console.log(message);

  const sendEmail = async (e) => {
    const recptsmsData = `UHID: ${results[0].uhid},
    Patient Name: ${results[0].firstname} ${results[0].lastname} ,
    Assigned Doctor: ${results[0].Assigned_doctor} ,
    Department: ${results[0].Dept},
    Token Generated by: ${results[0].Token_Generated_by},
    Room no: ${results[0].Room_No},
    Counter no: ${results[0].Counter_No}`;
    // Build the email content with a div element
    const htmlContent = `Token Reciepts from QMS`;
    try {
      const emailSmsSend = await axios.post(
        "http://localhost:8100/api/auth/sendEmailSms",
        {
          to: results[0].P_Email,
          subject: htmlContent,
          text: recptsmsData,
        }
      );
      console.log(emailSmsSend);
      alert("email sent successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const sendWhatsapp = async (e) => {
    e.preventDefault();
    const recptsmsData = `UHID: ${results[0].uhid},
    Patient Name: ${results[0].firstname} ${results[0].lastname} ,
    Assigned Doctor: ${results[0].Assigned_doctor} ,
    Department: ${results[0].Dept},
    Token Generated by: ${results[0].Token_Generated_by},
    Room no: ${results[0].Room_No},
    Counter no: ${results[0].Counter_No}`;
    const whatNum = `whatsapp:${phoneNumber}`;
    console.log(whatNum);
    try {
      const whatsappRes = await axios.post(
        "http://localhost:8100/api/auth/sendWhatsapp",
        { phoneNumber: whatNum, message: recptsmsData }
      );
      console.log(whatsappRes);
      alert("whatsapp msg send");
    } catch (error) {
      console.log(error);
    }
    console.log("clicked");
  };

  console.log(results);

  const getAllPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8100/api/auth/tokenReciept"
      );
      // console.log(response.data);
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  console.log(patient);

  const getItemById = (id) => {
    return patient.find((item) => item.id === id);
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  useEffect(() => {
    if (searchError) {
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [searchError]);

  const handleOpenModal = (index) => {
    setSelectedItem(index);
    setModalValues(patient[index]);
    console.log(modalValues);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalValues({});
    setShowModal(false);
  };

  // console.log(selectedItem);

  return (
    <>
      <Container>
        <Header />
        <div className="container-fluid bxt-btn">
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
          {searchError ? (
            <>
              <h1 className="text-center">No Token Found</h1>
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
                          <th>Token ID</th>
                          <th>Print Token</th>
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
                              <td>{item.Token_ID}</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleOpenModal(index)}
                                >
                                  Print Token
                                </button>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div className="container-fluid">
                    {results.map((result) => (
                      // <li key={result.uhid}>{result.P_Email}</li>
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
                                <th>Token ID</th>
                                <th>Print Token</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr key={result.uhid}>
                                <td>{result.uhid}</td>
                                <td>
                                  {result.firstname} {result.lastname}
                                </td>
                                <td>{result.P_Contact}</td>
                                <td>{result.Assigned_doctor}</td>
                                <td>{result.Time}</td>
                                <td>{result.Dept}</td>
                                <td>{result.Token_ID}</td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={recieptHandler}
                                  >
                                    Print Token
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* receipt */}
          {reciept && (
            <>
              <div className="container genToken">
                <h1
                  className="text-center fs-1 fw-bold"
                  style={{ color: "#347571" }}
                >
                  Token Generated
                </h1>

                <div class="card mt-5" id="tokenPrint" ref={printContentRef}>
                  <div class="card-body">
                    <img src={jbplogo} alt="Card" className="card-image" />
                    <div className="cardp mt-5 text-start">
                      <p className="fw-bold">UHID : {results[0].uhid}</p>
                      <p>
                        {" "}
                        Patient Name : {results[0].firstname}{" "}
                        {results[0].lastname}
                      </p>
                      <p>Assigned Doctor : {results[0].Doctor_name}</p>
                      <p>Department : {results[0].Dept}</p>
                      <p>Token Generated by : {results[0].fullname}</p>
                      <p>Token generated on Date: {results[0].regdatetime}</p>
                      <p>Room No : {results[0].Room_No}</p>
                      <p>Counter No :{results[0].Counter_No}</p>
                    </div>

                    <div className="card-content mt-5">
                      <h2 className="cardh">
                        {" "}
                        Token No: {results[0].Token_ID}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="container foot-btn">
                  <div className="row g-3">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 btnText">
                      <button onClick={sendSMS}>Send Token as SMS</button>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 btnText">
                      <ReactToPrint
                        trigger={() => <button>Print Token</button>}
                        content={() => printContentRef.current}
                      />
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 btnText">
                      <button onClick={sendWhatsapp}>
                        {" "}
                        Send Token on whatsapp
                      </button>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 btnText">
                      <button onClick={sendEmail}>Send Token on Email</button>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12 col-12 btnText">
                      <button>
                        <Link to="/receptionist-dashboard">
                          Go To Dashboard
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Token Reciept</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="card mt-5" id="tokenPrint" ref={printContentRef}>
                <div class="card-body">
                  <img src={jbplogo} alt="Card" className="card-image" />
                  <div className="cardp mt-5 text-start">
                    <p className="fw-bold">UHID : {modalValues.uhid}</p>
                    <p>
                      {" "}
                      Patient Name : {modalValues.firstname}{" "}
                      {modalValues.lastname}
                    </p>
                    <p>Assigned Doctor : {modalValues.Doctor_name}</p>
                    <p>Department : {modalValues.Dept}</p>
                    <p>Token Generated by : {modalValues.fullname}</p>
                    <p>Token generated on Date: {modalValues.Time}</p>
                    <p>Room No : {modalValues.Room_No}</p>
                    <p>Counter No : {modalValues.Counter_No}</p>
                  </div>

                  <div className="card-content mt-5">
                    <h2 className="cardh"> Token No: {modalValues.Token_ID}</h2>
                  </div>
                </div>
              </div>
              {/* Add more input fields as needed */}
            </Modal.Body>
            <Modal.Footer>
              <div className="container foot-btn">
                <div className="row g-3">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 btnText">
                    <Button
                      variant="success"
                      onClick={sendSMS}
                      className="modalBtn"
                    >
                      Send Token as SMS
                    </Button>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 btnText">
                    <ReactToPrint
                      trigger={() => (
                        <Button variant="success">Print Token</Button>
                      )}
                      content={() => printContentRef.current}
                    />
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 btnText">
                    <Button onClick={sendWhatsapp} variant="success">
                      {" "}
                      Send Token on whatsapp
                    </Button>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 btnText">
                    <Button variant="success" onClick={sendEmail}>
                      Send Token on Email
                    </Button>
                  </div>
                  <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12 col-12 btnText">
                    <Button variant="success">
                      <Link
                        to="/receptionist-dashboard"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Go To Dashboard
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </>
  );
};
export default TokenSearch;
const Container = styled.div`
  .container {
    display: flex;
    flex-direction: column;
  }
  .form-control:focus {
    box-shadow: none;
  }
  .form-control-underlined {
    border-width: 0;
    border-bottom-width: 1px;
    border-radius: 0;
    padding-left: 0;
  }
  .form-control::placeholder {
    font-size: 0.95rem;
    color: #aaa;
    font-style: italic;
  }
  table {
    button {
      height: 100% !important;
      background-color: #47a45b;
      border: none;
    }
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
  a {
    text-decoration: none;
    color: white;
  }

  .genToken {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
  .image {
    width: 35rem;
  }
  .card {
    width: 35rem;
    border: 2px solid black;
    @media print {
      .card-body {
        background-color: green;
      }
    }
    .card-content {
    }
  }
  .card-body {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    .cardp {
    }
  }
  .cardp {
    margin-left: -4rem;
    p {
      margin: 0;
    }
  }

  .foot-btn {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btnText {
    display: flex;
    justify-content: center;
    button {
      padding: 0.7rem 1.5rem;
      border: none;
      color: #fff;
      font-weight: bold;
      background-color: #5ec57e;
      border-radius: 1.5rem;
    }
  }
  @media print {
    .card {
      display: flex;
      justify-content: center;
      align-item: center;
      margin-right: 5rem;
    }

    #tokenPrint {
      margin: 10rem auto;
      max-width: 800px;

      p {
        margin: 10rem !important;
      }
    }
  }

  .modalBtn {
    padding: 0.7rem 1.5rem !important;
    border: none;
    color: #fff;
    font-weight: bold;
    background-color: #5ec57e;
    border-radius: 1.5rem;
  }

  a {
    text-decoration: none;
  }

  .bxt-btn {
    @media screen and (max-width: 500px) {
      margin-top: 10rem;
    }
  }
`;
