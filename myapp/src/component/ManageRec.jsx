import React, { useEffect, useState } from "react";
import "./Managedoctor.css";
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
        "http://localhost:8100/api/auth/getDoctorsStatus"
      );
      const res = dt.data;
      setData(res);
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
        `http://localhost:8100/api/auth/doctorDataUpdate/${updatedItem.Doc_ID}`,
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
        `http://localhost:8100/api/auth/doctor-data-delete/${deletedItem.Doc_ID}`
      );

      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (index) => {
    setSelectedItem(index);
    setModalValues(data[index]);
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
                  <th>Dept</th>
                  <th>Availability</th>
                  <th>Off Days</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <>
                    <tr key={item.Doc_ID}>
                      <td>{item.Doc_ID}</td>
                      <td>{item.Doctor_name}</td>
                      <td>{item.Email}</td>
                      <td>{item.Mobile}</td>
                      <td>{item.Department_name}</td>
                      <td>{item.working_days}</td>
                      <td>{item.off_days}</td>
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
                    {/* <input
                      type="text"
                      name="value1"
                      value={modalValues.value1 || ""}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="value2"
                      value={modalValues.value2 || ""}
                      onChange={handleInputChange}
                    /> */}

                    <form onSubmit={handleUpdate}>
                      <div className="form">
                        <input
                          type="text"
                          placeholder="Doctor ID"
                          style={{ border: "none" }}
                          name="Doc_ID"
                          value={modalValues.Doc_ID || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Doctor name"
                          style={{ border: "none" }}
                          name="Doctor_name"
                          value={modalValues.Doctor_name || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Email"
                          style={{ border: "none" }}
                          value={modalValues.Email || ""}
                          name="Email"
                          onChange={handleInputChange}
                          required
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Mobile"
                          style={{ border: "none" }}
                          value={modalValues.Mobile || ""}
                          onChange={handleInputChange}
                          name="Mobile"
                          required
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Department name"
                          style={{ border: "none" }}
                          name="Department_name"
                          value={modalValues.Department_name || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Working Days"
                          style={{ border: "none" }}
                          name="working_days"
                          value={modalValues.working_days || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Off Days"
                          style={{ border: "none" }}
                          name="off_days"
                          value={modalValues.off_days || ""}
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
`;
