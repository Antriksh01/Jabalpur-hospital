import axios from "axios";
// import pic from "../photos/jbplogo.png";
import "./AddRecptionist.css";
import Header from "./Header";
import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddReceptionist = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname: "",
    mobile: "",
    Workingday: "",
    Offday: "",
    email: "",
    AssignedCounter: "",
    Additionalnotes: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const input = await axios.post(
        "http://localhost:8100/api/auth/add-receptionist",
        data
      );

      console.log(input);
      alert("Receptionist Data added successful");
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
            Add Receptionist
          </h1>
          <div className="container">
            <form onSubmit={handleClick}>
              <div className="form">
                <input
                  type="text"
                  placeholder="Full Name"
                  style={{ border: "none" }}
                  name="fullname"
                  value={data.fullname}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Moblie No"
                  style={{ border: "none" }}
                  value={data.mobile}
                  name="mobile"
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Working Day"
                  style={{ border: "none" }}
                  value={data.Workingday}
                  onChange={handleChange}
                  name="Workingday"
                  required
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Off Day"
                  style={{ border: "none" }}
                  name="Offday"
                  value={data.Offday}
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
                  placeholder="Assigned Counter"
                  style={{ border: "none" }}
                  name="AssignedCounter"
                  value={data.AssignedCounter}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Additional Notes"
                  style={{ border: "none" }}
                  name="Additionalnotes"
                  value={data.Additionalnotes}
                  onChange={handleChange}
                  required
                />
                <br />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success btnbx">
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
export default AddReceptionist;
const Container = styled.div`
  input {
    padding: 1.5rem;
    border-radius: 0.5rem;
  }
  .contMain {
    @media screen and (max-width: 500px) {
      margin-top: 10rem;
    }
    .btnbx{
      @media screen and (max-width: 500px) {
        width:50%;
      }
      @media screen and (min-width:501px) and (max-width:900px){
        width:50%;
      }
    }
`;
