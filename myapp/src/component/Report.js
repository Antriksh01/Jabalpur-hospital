import pic from "../photos/jbplogo.png";
import Header from "./Header";
import "./Report.css";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
const Report = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <>
      <Container>
        <Header />

        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
              <div className="nav">
                {/* <button>Generate Doctors Report</button> */}
                <button
                  className={`radio-button ${
                    selectedOption === "option1" ? "active" : ""
                  }`}
                  onClick={() => handleOptionChange("option1")}
                >
                  Generate Doctors Report
                </button>

                {/* <button>Generate Receptionist Report</button> */}
                <button
                  className={`radio-button ${
                    selectedOption === "option2" ? "active" : ""
                  }`}
                  onClick={() => handleOptionChange("option2")}
                >
                  Generate Receptionist Report
                </button>

                {/* <button>Generate Dispaly Report</button> */}
                <button
                  className={`radio-button ${
                    selectedOption === "option3" ? "active" : ""
                  }`}
                  onClick={() => handleOptionChange("option3")}
                >
                  Generate Dispaly Report
                </button>

                {/* <button>Generate Tokens Report</button> */}
                <button
                  className={`radio-button ${
                    selectedOption === "option4" ? "active" : ""
                  }`}
                  onClick={() => handleOptionChange("option4")}
                >
                  Generate Tokens Report
                </button>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              {/* <h3 className="text-center">Select a date range</h3> */}
              <div className="center">
                <button
                  // type="button"
                  // class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Select Duration
                </button>

                <button
                  // type="button"
                  // class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Select Duration
                </button>
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Select Date Range
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <span className="mr-5">From: </span>
                            <DatePicker
                              selected={startDate}
                              onChange={handleStartDateChange}
                              selectsStart
                              startDate={startDate}
                              endDate={endDate}
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Select start date"
                              style={{ borderRadius: "0.5rem !important" }}
                            />
                          </div>
                          <div>
                            <span>To: </span>
                            <DatePicker
                              selected={endDate}
                              onChange={handleEndDateChange}
                              selectsEnd
                              startDate={startDate}
                              endDate={endDate}
                              minDate={startDate}
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Select end date"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  // type="button"
                  // class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Select Duration
                </button>

                <button
                  // type="button"
                  // class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Select Duration
                </button>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 d-flex">
              <div className="back">
                <button>Generate Report</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Report;
const Container = styled.div`
  .nav {
    button {
      background-color: #5ec57e;
    }
  }
  button {
    border: none;
    // background-color: #5ec57e;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    button {
      background-color: #dcf4ce;
      margin: 0.9rem;
      color: #000;
      border-radius: 0.5rem;
      padding: 0.7rem;
    }
  }
  DatePicker {
    width: 5rem !important;
  }
  input {
    border-radius: 0;
    padding: 3px;
    border: none;
    border-bottom: 1px solid black;
  }
  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      background-color: #5ec57e;
      padding: 1rem;
      font-weight: bold;
      color: white;
      font-size: 2rem;
      border-radius: 0.5rem;
    }
  }

  .radio-button-container {
    display: flex;
    justify-content: center;
  }

  .radio-button {
    border: 1px solid #ccc;
    background-color: white;
    color: #333;
    padding: 8px 16px;
    margin-right: 8px;
    cursor: pointer;
  }

  .radio-button.active {
    background-color: #007bff;
    color: white;
  }
`;
