import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import cogoToast from "cogo-toast";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const domain = "http://localhost:8100";

  const handleVerifyOtpPasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${domain}/api/auth/reset-password/verify`, {
        email,
        otp,
        password,
      });
      setMessage(res.data.message);
      cogoToast.success("password updated successfully");
      console.log(message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Header />
        <div className="contMain">
          {/* <h2>Verify OTP and Update Password</h2> */}
          <div className="title">
            {" "}
            <span>
              <h1
                className="text-center fs-1 fw-bold"
                style={{ color: "#347571" }}
              >
                Update Password
              </h1>
            </span>
          </div>
          <div className="container d-flex justify-content-center">
            <div class="card text-center">
              <div
                class="card-header h5 text-white"
                style={{ backgroundColor: "#00a94e" }}
              >
                Change Password
              </div>
              <div class="card-body px-5">
                <p class="card-text py-2">Verify OTP and Update Password</p>
                <form onSubmit={handleVerifyOtpPasswordUpdate}>
                  <div class="form-outline">
                    <input
                      type="email"
                      placeholder="Email"
                      class="form-control my-3"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="OTP"
                      value={otp}
                      required
                      class="form-control my-3"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      required
                      class="form-control my-3"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" class="btn btn-success w-100">
                    Verify OTP and Update Password
                  </button>
                </form>

                {/* {message && <p>{message}</p>} */}
                <div class="d-flex justify-content-between mt-4">
                  <button
                    class="btn btn-secondary"
                    style={{ backgroundColor: "#347571" }}
                  >
                    <Link to="/">Home</Link>
                  </button>
                  <button
                    class="btn btn-secondary"
                    style={{ backgroundColor: "#347571" }}
                  >
                    <Link to="/register">Register</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="container contBx">
            <button className="btn btn-success btnDash">
              <Link to="/">Back to Home</Link>
            </button>
          </div> */}
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
const Container = styled.div`
.card {
  padding: 0;
}

a{
  text-decoration:none;
  color:white;
}
.contMain {
    @media screen and (max-width: 500px) {
      margin-top: 5rem;
    }`;
