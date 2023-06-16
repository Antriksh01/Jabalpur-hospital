import React, { useState } from "react";
import "./Header.css";
// import Receptionist from "./Receptionist";
import jbplogo from "../photos/jbplogo.png";
// import Doctor from "./Doctor";
// import Dashboard from "./RDashboard";
// import Doctordashboard from "./Doctordashboard";
// import Admindashboard from "./Admindashboard";
// import Token from "./TokenGeneration";
// import Managedoctor from "./Managedoctor";
// import Addadocter from "./Addadoctor";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import axios from "axios";
// import { Link, NavLink  } from "react-router-dom";

const Header = () => {
  const [userLogged, setUserLogged] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  const logoutHandler = (e) => {
    e.preventDefault();

    setUserLogged(dispatch(authActions.logout()));
    navigate("/login");
  };

  console.log(userLogged);

  return (
    <div>
      <nav className="navbar">
        <div id="logo" className="logo">
          <img src={jbplogo} alt="Logo" />
        </div>
        {/* <div className='title'> <span> </span></div> */}
        <div id="links" className="links">
          <h3>Hi Admin Name </h3>
          <h3>Employee Id</h3>
          <span Id="btu">
            {isLoggedIn ? (
              <button onClick={logoutHandler}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}

            <Link to="/Frontpage" className={isLoggedIn ? `d-none` : ""}>
              <button>Go to Home</button>
            </Link>
          </span>
        </div>
      </nav>
      {/* <Receptionist/>
      <Doctor/>
      <Dashboard/>
      <Doctordashboard/>
      <Admindashboard/> */}
    </div>
  );
};
// {
//   /* <link to='./Doctor'></link> */
// }
export default Header;
