import pic from './jbplogo.png';
import './AddReceptionist.css';
 function   AddReceptionist() {
  return (
    <>
      <div className="header">
        <img id="img1" src={pic} />
        <h1 id="adm1">Add a Receptionist</h1>
        <h3 id="hd">
          Hi, Admin Name <br />
          Employee Id
        </h3>
        <button className="btn1">Logout</button>
      </div>
  
      <div className="form">
        <input type="text" placeholder="Full Name" style={{ border: "none" }} />
        <br />
        <br />
        <input type="text" placeholder="Moblie No" style={{ border: "none" }} />
        <br />
        <br />
        <input type="number" placeholder="Working Day" style={{ border: "none" }} />
        <br />
        <br />
        <input type="number" placeholder="Off Day" style={{ border: "none" }} />
        <br />
        <br />
        <input type="number" placeholder="Assigned Counter" style={{ border: "none" }} />
        <br />
        <br />
        <input type="text" placeholder="Additional Notes" style={{ border: "none" }} />
        <br />
        <button type="button" className="btn">Register a Receptionist</button>
      </div>
    </>
  );
  
}
export default AddReceptionist;