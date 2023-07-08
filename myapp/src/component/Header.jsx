import React, { useEffect } from "react";
import "./Header.css";

import jbplogo from "../photos/jbplogo.png";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  console.log(auth);

  const logoutHandler = (e) => {
    axios
      .get("http://localhost:8100/api/auth/logout")
      .then((res) => {
        localStorage.removeItem("auth");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container>
        <div>
          <nav className="navbar">
            <div id="logo" className="logo">
              <img src={jbplogo} alt="Logo" />
            </div>
            {/* <div className='title'> <span> </span></div> */}
            <div id="links" className="links">
              {auth.user ? (
                <>
                  <h3>Hi {auth.user.username}</h3>
                  <h3>Employee Id :{auth.user.a_id} </h3>
                  <span Id="btu">
                    <button onClick={logoutHandler}>Logout</button>
                  </span>
                </>
              ) : (
                ""
              )}
            </div>
          </nav>
        </div>
      </Container>
    </>
  );
};
// {
//   /* <link to='./Doctor'></link> */
// }
export default Header;
const Container = styled.div`
  background-color: transparent;
  button {
    width: auto;
    padding: 0.5rem 1.2rem;
    margin: 10px;
    border: none;
    height: auto;
    border-radius: 2rem;
    color: white;
    /* font-weight: bold; */
    font-size: 1.2rem;
    background-color: rgba(34, 146, 58, 0.83);
    a {
      text-decoration: none;
      color: #fff;
    }
  }
  h3 {
    padding-left: 1rem;
  }
  .navbar {
    height: 9rem;
    padding: 0rem 2rem;
    @media screen and (max-width: 500px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
`;
