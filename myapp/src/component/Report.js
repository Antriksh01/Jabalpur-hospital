import pic from './jbplogo.png';
import './Reports.css';
 function Report() {
  return (
    <>
      <div className="header">
        <img id="img1" src={pic} />
        <h1 id="adm1">Reports</h1>
        <h3 id="hd">
          Hi, Admin Name <br />
          Employee Id
        </h3>
        <button className="btn1">Logout</button>
      </div>
      
      <div className="container">
        <div className="nav">
            <button>Generate Doctors Report</button>
            <br/>
            <br/>
            <button>Generate Receptionist Report</button>
            <br/>
            <br/>
            <button>Generate Dispaly Report</button>
            <br/>
            <br />
            <button>Generate Tokens Report</button>
        </div>
        <div className="center">
        <button>Select Duration</button>
            <br/>
            <br/>
            <button>Select Duration</button>
            <br/>
            <br/>
            <button>Select Duration</button>
            <br/>
            <br />
            <button>Select Duration</button>
            </div>
                <div className="back">
                <button>Generate Report</button>
                  
                </div>
            
        </div>
 
      </>
      );
      }
      export default Report