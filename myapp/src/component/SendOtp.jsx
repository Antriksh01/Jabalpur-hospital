import React, { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import Header from "./Header";
import cogoToast from "cogo-toast";
import { useNavigate } from "react-router-dom";

const SendOtp = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:8100/api/auth/sendOtp", {
        email,
      });
      setMessage(res.data.message);
      cogoToast.success(res.data.message);
      navigate("/reset-password");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Header />
        <div className="contMain">
          <div className="title">
            {" "}
            <span>
              <h1
                className="text-center fs-1 fw-bold"
                style={{ color: "#347571" }}
              >
                Reset Password
              </h1>
            </span>
          </div>
          <div className="container d-flex justify-content-center">
            <div class="card text-center">
              <div class="card-header h5 text-white bg-success">Send OTP</div>
              <div class="card-body px-5">
                <p class="card-text py-2">
                  Enter your email address and we'll send you an email with OTP
                  to reset your password.
                </p>
                <div class="form-outline">
                  <input
                    type="email"
                    id="typeEmail"
                    class="form-control my-3"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button class="btn btn-success w-100" onClick={handleSendOtp}>
                  Reset password
                </button>
                {/* {message && <p>{message}</p>} */}
                <div class="d-flex justify-content-between mt-4">
                  <button
                    class="btn btn-secondary"
                    style={{ backgroundColor: "#347571" }}
                  >
                    Login
                  </button>
                  <button
                    class="btn btn-secondary"
                    style={{ backgroundColor: "#347571" }}
                  >
                    Register
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

export default SendOtp;
const Container = styled.div`
  .card {
    padding: 0;
  }
  .contMain {
    @media screen and (max-width: 500px) {
      margin-top: 10rem;
    }
`;
