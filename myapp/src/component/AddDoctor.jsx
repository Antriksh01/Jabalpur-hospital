import axios from "axios";
// import pic from "../photos/jbplogo.png";
// import "./AddRecptionist.css";
import Header from "./Header";
import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Doctor_name: "",
    email: "",
    mobile: "",
    Department_name: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const input = await axios.post(
        "http://localhost:8100/api/auth/add-doctor",
        data
      );

      console.log(input);
      alert("Doctors Data Added Successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Header />
        <div className="contMain">
          <h1 className="text-center fs-1 fw-bold" style={{ color: "#347571" }}>
            Add Doctor
          </h1>
          <div className="container">
            <form onSubmit={handleClick}>
              <div className="form">
                <input
                  type="text"
                  placeholder="Doctor ID"
                  style={{ border: "none" }}
                  name="Doc_ID"
                  value={data.Doc_ID}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Doctor name"
                  style={{ border: "none" }}
                  name="Doctor_name"
                  value={data.Doctor_name}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Email"
                  style={{ border: "none" }}
                  value={data.email}
                  name="email"
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Mobile"
                  style={{ border: "none" }}
                  value={data.mobile}
                  onChange={handleChange}
                  name="mobile"
                  required
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Department name"
                  style={{ border: "none" }}
                  name="Department_name"
                  value={data.Department_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btnsub"
                  // style={{ backgroundColor: "#22923ad4", border: "none" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AddDoctor;
const Container = styled.div`
  input {
    padding: 1.5rem;
    border-radius: 0.5rem;
  }
  .contMain {
    @media screen and (max-width: 500px) {
      margin-top: 10rem;
    }
    .btnsub{
      background-color:#22923ad4;
      border:none;
      @media screen and (max-width: 500px) {
        width:50%;
      }
    }
`;
