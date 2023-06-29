import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Carousel, { ButtonGroupProps } from "react-multi-carousel";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-multi-carousel/lib/styles.css";
// import { Link } from "react-router-dom";
import jbplogo from "../../photos/jbplogo.png";
import axios from "axios";
import { useAuth } from "../../context";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const StoryPart = () => {
  const [results, setResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [treatStatus, setTreatStatus] = useState("");
  const [tokenId, setTokenId] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTrue, setIsTrue] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [auth] = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [timeSetup, setTimeSetup] = useState([]);
  const carouselRef = useRef(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = () => {
    // Perform any desired actions before updating the state
    console.log("Selected Option:", selectedOption);

    // Update the state
    setSelectedOption("option2");
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8100/api/auth/tokenReciept`
      );
      const dt = response.data;
      setResults(dt);
    } catch (error) {
      console.log(error);
    }
  };

  // update treatment status

  const testHandle = () => {
    setShowModal(true);
  };

  const timeInterval = 15 * 60000;
  const currentTimestamp = new Date(); // Get the current timestamp
  const updatedTimestamp = new Date(currentTimestamp.getTime() + timeInterval);
  const formattedTimestamp = updatedTimestamp.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  console.log(formattedTimestamp.split("T")[0]);

  const handleUpdate = async (value) => {
    try {
      const updateData = await axios.put(
        `http://localhost:8100/api/auth/tokenRecStatus/${value}/${auth.user.reg_email}`,
        {
          status: selectedOption,
        }
      );

      setTreatStatus(selectedOption);
      console.log("Selected Option:", selectedOption);
      // alert("status updated");
      // console.log(updateData);
      setInputValue("");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = results.filter(
    (item) =>
      item.Assigned_doctor === auth.user.reg_email &&
      item.treatment_status === "Pending"
  );

  // time setup 15 minute
  useEffect(() => {
    const timeVal = 15 * 60000;
    const timeSetting = [];

    for (let i = 1; i <= filteredData.length; i++) {
      timeSetting.push(timeVal * i);
      setTimeSetup(timeSetting);
    }
  }, []);

  console.log(timeSetup);
  useEffect(() => {
    handleSearch();
  }, []);

  const testNoHandler = () => {
    setShowModal(false);
  };

  // update_doctor_status
  const handleWrapDay = async (value) => {
    // if()
    try {
      const updateData = await axios.put(
        `http://localhost:8100/api/auth/doctor-availability-update/${auth.user.reg_email}`,
        {
          status: value,
        }
      );

      console.log(updateData);
      // alert("status updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        {/* <h1 className="text-center mt-5 mb-5">Media</h1> */}
        <Carousel
          // swipeable={true}
          // draggable={true}
          // showDots={true}
          className={showModal ? "carousel-stopped" : ""}
          ref={carouselRef}
          responsive={responsive}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          // customTransition="all 5s ease-in-out"
          transitionDuration={1000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          swipeable={showModal}
          stopOnHover={showModal}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          buttonType="button"
        >
          {filteredData.map((item, index) => (
            <div key={item.id}>
              {showModal && (
                <>
                  <div
                    className="box popup-overlay"
                    data-aos="zoom-in"
                    key={item.id}
                  >
                    <div className="text">
                      <h1>Are you sure you want to update patient status</h1>
                      <div className="btndiv">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleUpdate(item.Token_ID)}
                        >
                          Yes
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={testNoHandler}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="my-slide-component container">
                <div class="card">
                  <div class="card-body">
                    <img src={jbplogo} alt="Card" className="card-image" />
                    <div className="cardp text-start">
                      <p className="fw-bold">UHID : {item.uhid}</p>
                      <p>
                        {" "}
                        Patient Name : {item.firstname} {item.lastname}
                      </p>
                      <p>Assigned Doctor : {item.Doctor_name}</p>
                      <p>Department : {item.Dept}</p>
                      <p>Token Generated by : {item.fullname}</p>
                      <p>Token generated on Date: {item.regdatetime}</p>
                      <p>Room No : {item.Room_No}</p>
                      <p>Counter No : {item.Counter_No}</p>
                    </div>

                    <div className="card-content">
                      <h2 className="cardh"> Token No: {item.Token_ID}</h2>
                    </div>
                    <div className="statusPart">
                      <h3 className="text-center">
                        Patient status :{" "}
                        {treatStatus ? treatStatus : item.treatment_status}
                      </h3>
                      <div className="formRadio">
                        <Form>
                          <Form.Check
                            type="radio"
                            label="Pending"
                            className="formcheck"
                            name="radioGroup"
                            id={item.Token_ID}
                            value="Pending"
                            checked={selectedOption === "Pending"}
                            onChange={handleOptionChange}
                          />
                          <Form.Check
                            type="radio"
                            label="Treated"
                            name="radioGroup"
                            id={item.Token_ID}
                            value="Treated"
                            checked={selectedOption === "Treated"}
                            onChange={handleOptionChange}
                          />
                          <Form.Check
                            type="radio"
                            label="Patient Absent"
                            name="radioGroup"
                            id={item.Token_ID}
                            value="Patient_Absent"
                            checked={selectedOption === "Patient_Absent"}
                            onChange={handleOptionChange}
                            // style={{ paddingLeft: "3rem !important" }}
                          />
                        </Form>
                        {!showModal && (
                          <>
                            <div className="btnBox d-flex justify-content-evenly">
                              <Button
                                className="btn btn-success"
                                style={{ backgroundColor: "#22923ad4" }}
                                // onClick={() => handleUpdate(item.Token_ID)}
                                onClick={testHandle}
                              >
                                Change Status
                              </Button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleWrapDay("on_Break")}
                              >
                                Wrap the Day
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </Container>
    </>
  );
};

export default StoryPart;
const Container = styled.div`
.container{
  position:relative;
  display:flex;
  justify-content:center;
  align-items:center;
}
.my-slide-component{
  display:flex;
  justify-content:center;
  align-items:center;

}
// .mg-card{
//   border: 2px solid black !important;
// }
  .card {
    border: 1px solid black !important;
    // z-index:-1;
  }
  .my-slide-component container{
    width: 100%,
    height: 100%,
  }

  span {
    @media (max-width: 500px) {
      display: none;
    }
    @media (max-width: 376px) {
      display: none;
    }
  }
  img {
    @media (max-width: 500px) {
      width: 18rem;
    }
    @media (max-width: 376px) {
      width: 18rem;
    }
  }
  .card-body{
    display: flex,
    flex-direction: column,
    justify-content: center,
    align-content: center,
    align-items: center,
  }
  p{
    margin:0;
  }
  .statusPart{
    padding-top:1rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color:#95d3a2d4;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    Form{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    grid-column-gap: 1rem;
    .formcheck{
      // background-color:red!important;
      // margin:2rem;
    }
    }
    h3{

    }
  }
  .formRadio{
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    padding:1rem 0rem;
  }
  
  .box{
    display:flex;
    padding-bottom:1rem;
    align-items:center;
    justify-content:center;
    // background-color:red;
    z-index:1;
    position:absolute;
  .text{
    background-color:#ade6e8;
    padding: 4rem;
    margin-left: 37rem;
    margin-top: 10rem;
    z-index: 1;
    border-radius: 1.5rem;
    box-shadow: 1px 4px 4px black;
    text-align: center;
    width: 31rem;
    h1{
      font-size: 16px;
    }
    .btndiv{
      display:flex;
      justify-content:space-evenly;
      button{
        width: 7rem;
      }
    }
  }
  }
  // [type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled){
  //   display:none;
  // }


  .carousel-stopped .react-multi-carousel-item {
    transition: none !important;
  }
`;
