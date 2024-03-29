import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import axios from "axios";
import cogoToast from "cogo-toast";
import { Link } from "react-router-dom";

const PendingApproval = () => {
  const [userData, setUserData] = useState([]);
  const [approve, setApprove] = useState(false);
  const domain = process.env.REACT_APP_DOMAIN;

  const getUser = async () => {
    try {
      // get-request
      const res = await axios.post(
        `https://queuemanagementsystemdg.com/api/auth/users`
      );
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = userData.filter((i) => i.Admin_Approval !== "Approved");
  console.log(filterData);

  //   approve role

  const adminApproval = async (value) => {
    const updateData = await axios.put(
      `https://queuemanagementsystemdg.com/api/auth/admin-approval-update/${value}`,
      { Admin_Approval: "Approved" }
    );
    cogoToast.success("Approved");
    alert("Approved");
    window.location.reload();
    setApprove(true);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Container>
        <div>
          <Header />
          <div className="contMain">
            <div className="title">
              {" "}
              <span>
                <h1
                  className="text-center fs-1 fw-bold"
                  style={{ color: "#347571" }}
                >
                  Pending Approval
                </h1>
              </span>
            </div>
            <div className="container contBx">
              <button className="btn btn-success btnDash">
                <Link to="/admin-dashboard">Go to Dashboard</Link>
              </button>
            </div>

            <div className="table-responsive mt-5">
              <table id="table" className="table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Mobile</th>
                    <th>Reg. Email</th>
                    <th>Role</th>
                    <th>Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData.map((item, index) => (
                    <>
                      <tr key={index}>
                        <td>{item.username}</td>
                        <td>{item.mobile}</td>
                        <td>{item.reg_email}</td>
                        <td>{item.role}</td>
                        <td>
                          <button
                            className="btn btn-outline-success"
                            onClick={() => adminApproval(item.reg_email)}
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="container contBx">
              <button className="btn btn-success btnDash">
                <Link to="/admin-dashboard">Go to Dashboard</Link>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PendingApproval;
const Container = styled.div`
  a {
    text-decoration: none;
    color: white;
  }

  tr {
    font-size: 20px;
  }

  td {
    font-size: 18px;
    @media screen and (max-width:500px){
      padding: 15px;
    }
  }
  .contMain {
    @media screen and (max-width: 500px) {
      margin-top: 8rem;
    }
    button{
      @media screen and (max-width:500px){
        margin: 0;
      }
    }
    th{
      text-shadow: 0px 9px 20px #4a4545;
    }
`;
