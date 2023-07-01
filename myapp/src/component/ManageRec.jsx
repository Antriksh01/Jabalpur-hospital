import React, { useEffect, useState } from "react";
// import "./Managedoctor.css";
import Header from "./Header";
// import jbplogo from './jbplogo.png';
import { styled } from "styled-components";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const ManageRec = () => {
  const [docCount, setDocCount] = useState([]);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalValues, setModalValues] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const countDoctors = async () => {
    try {
      const dt = await axios.get(
        "http://localhost:8100/api/auth/get-patient-details"
      );
      const res = dt.data;
      setData(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = [...data];
      updatedData[selectedItem] = {
        ...updatedData[selectedItem],
        ...modalValues,
      };
      setData(updatedData);

      const updatedItem = updatedData[selectedItem];
      console.log(updatedItem);
      await axios.put(
        `http://localhost:8100/api/auth/update-rec-details/${updatedItem.Rec_ID}`,
        updatedItem
      );

      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const updatedData = [...data];

      updatedData.splice(selectedItem, 1);
      setData(updatedData);
      console.log(selectedItem);

      const deletedItem = data[selectedItem];
      console.log(deletedItem);
      await axios.delete(
        `http://localhost:8100/api/auth/delete-receptionist/${deletedItem.Rec_ID}`
      );

      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (index) => {
    setSelectedItem(index);
    setModalValues(data[index]);
    console.log(modalValues);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalValues({});
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    countDoctors();
  }, []);
  return (
    <>
      <Container>
        <div>
          <Header />
          <div className="title text-center">
            {" "}
            <span>Manage Receptionists</span>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Availability</th>
                  <th>Off Days</th>
                  <th>Assigned Counter</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <>
                    <tr key={item.Rec_ID}>
                      <td>{item.Rec_ID}</td>
                      <td>{item.fullname}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.Workingday}</td>
                      <td>{item.Offday}</td>
                      <td>{item.AssignedCounter}</td>
                      <td>
                        <div className="actButton d-flex flex-column justify-content-between">
                          <button
                            className="btn btn-primary mb-2"
                            style={{
                              backgroundColor: "#5ec57e",
                              border: "none",
                            }}
                            onClick={() => handleOpenModal(index)}
                          >
                            update
                          </button>
                          {/* <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                          >
                            Delete
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  </>
                ))}

                <Modal show={showModal} onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Values</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleUpdate}>
                      <div className="form">
                        <input
                          type="text"
                          placeholder="Receptionist ID"
                          style={{ border: "none" }}
                          name="Rec_ID"
                          value={modalValues.Rec_ID || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Receptionist name"
                          style={{ border: "none" }}
                          name="fullname"
                          value={modalValues.fullname || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Email"
                          style={{ border: "none" }}
                          value={modalValues.email || ""}
                          name="email"
                          onChange={handleInputChange}
                          required
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Mobile"
                          style={{ border: "none" }}
                          value={modalValues.mobile || ""}
                          onChange={handleInputChange}
                          name="mobile"
                          required
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Working days"
                          style={{ border: "none" }}
                          name="Workingday"
                          value={modalValues.Workingday || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Off days"
                          style={{ border: "none" }}
                          name="Offday"
                          value={modalValues.Offday || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Assigned Counter"
                          style={{ border: "none" }}
                          name="AssignedCounter"
                          value={modalValues.AssignedCounter || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="d-flex justify-content-center btnBx">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{
                            backgroundColor: "#22923ad4",
                            border: "none",
                          }}
                          onClick={handleUpdate}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                    {/* Add more input fields as needed */}
                  </Modal.Body>
                  <Modal.Footer>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button variant="danger" onClick={handleDelete}>
                        Delete
                      </Button>
                    </div>
                  </Modal.Footer>
                </Modal>
              </tbody>
            </table>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-4  d-flex justify-content-center">
                <button>
                  <Link to="/add-receptionist">Add a Receptionist</Link>{" "}
                </button>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <button>
                  <Link to="/admin-dashboard">Go to Dashboard</Link>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ManageRec;
const Container = styled.div`
  .container-fluid {
    button {
      width: 50%;
      padding: 0.5rem;
      border: none;
      color: #fff;
      font-size: 1.5rem;
      background-color: #5ec57e;
      border-radius: 1.5rem;
    }
  }
  .modal-footer {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  input {
    padding: 1rem;
    border-radius: 0.5rem;
  }
  a {
    text-decoration: none;
    color: white;
  }
  .form {
    input {
      padding: 1rem !important;
    }
  }
`;
