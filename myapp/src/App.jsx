import "./App.css";
// import Header from "./component/Header";
import Frontpage from "./component/Frontpage";
import Login from "./component/Login";
import Doctorlogin from "./component/Doctorlogin";
import Adminlogin from "./component/Adminlogin";
import { useSelector } from "react-redux";
import RDashboard from "./component/RDashboard";
import Doctor from "./component/Doctor";
import hamburger from "./component/Hamburger";
import Receptionist from "./component/Receptionist";
import Managedoctor from "./component/Managedoctor";
import Doctordashboard from "./component/Doctordashboard";
import Admindashboard from "./component/Admindashboard";
import Token from "./component/TokenGeneration";
import Addadocter from "./component/Addadoctor";
import ConfirmPassword from "./component/ConfirmPassword";
import Patientregistration from "./component/Patientregistration";
import Tokengenerated from "./component/Tokengenerated";
import DoctorTreatment from "./component/DoctorTreatment";
import TokenGeneration from "./component/TokenGeneration";

// import Doctortreatment from "./component/Doctortreatment";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./component/Registration/Register";
import DisplayContent from "./component/DisplayConten";
import ForgetPassword from "./component/FOrgatePassword";
// import Patientopd from "./component/patientopd";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        {isLoggedIn ? (
          <Route path="/dashboard" element={<RDashboard />} />
        ) : (
          <Route path="/frontpage" element={<Frontpage />} />
        )}

        <Route path="/Doctor" element={<Doctor />} />
        <Route path="/doctor-dashboard" element={<Doctordashboard />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/Patientregistration" element={<Patientregistration />} />
        <Route path="/DoctorTreatment" element={<DoctorTreatment />} />
        <Route path="/TokenGeneration" element={<TokenGeneration />} />
        <Route path="/display-content" element={<DisplayContent />} />
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Doctorlogin" element={<Doctorlogin />} />
        <Route path="/confirm-password" element={<ConfirmPassword />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
