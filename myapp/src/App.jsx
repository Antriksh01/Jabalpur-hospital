import "./App.css";
// import Header from "./component/Header";
import Frontpage from "./component/Frontpage";
import Login from "./component/Login";
import Doctorlogin from "./component/Doctorlogin";
import Adminlogin from "./component/Adminlogin";
// import { useSelector } from "react-redux";
import RDashboard from "./component/RDashboard";
import Doctor from "./component/Doctor";

import Doctordashboard from "./component/Doctordashboard";
import Admindashboard from "./component/Admindashboard";
// import Token from "./component/TokenGeneration";
// import Addadocter from "./component/Addadoctor";
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
import axios from "axios";
import Patientopd from "./component/patientopd";
import PatientAssigned from "./component/PatientAssigned";
import ReportAdmin from "./component/ReportAdmin";
import ReceptionistProfile from "./component/ReceptionistProfile";
import Managedoctor from "./component/Managedoctor";
import RecpManage from "./component/RecpManage";
import Report from "./component/Report";
import AddReceptionist from "./component/AddReceptionist";
import AddDoctor from "./component/AddDoctor";
import TokenGenForm from "./component/TokenGenForm";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/forgot-password" element={<ForgetPassword />} />

        <Route path="/confirm-password" element={<ConfirmPassword />} />

        <Route path="/" element={<Frontpage />} />
        {/* receptionist routes */}
        <Route path="/Login" element={<Login />} />
        <Route path="/receptionist-dashboard" element={<RDashboard />} />
        <Route path="/token-generation" element={<TokenGeneration />} />
        <Route path="/token-gen-form" element={<TokenGenForm />} />
        <Route path="/Patientregistration" element={<Patientregistration />} />
        <Route path="/token-generated" element={<Tokengenerated />} />
        <Route path="/doctor-availablity" element={<Doctor />} />
        <Route path="/display-content" element={<DisplayContent />} />
        <Route path="/patient-opd" element={<Patientopd />} />
        <Route path="/patient-assigned" element={<PatientAssigned />} />
        <Route path="/report-admin" element={<ReportAdmin />} />
        <Route path="/receptionist-profile" element={<ReceptionistProfile />} />

        {/* admin-dashboard */}
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/admin-dashboard" element={<Admindashboard />} />
        <Route path="/display-content" element={<DisplayContent />} />
        <Route path="/manage-doctors" element={<Managedoctor />} />
        <Route path="/manage-receptionist" element={<RecpManage />} />
        <Route path="/admin-report" element={<Report />} />
        <Route path="/add-receptionist" element={<AddReceptionist />} />
        <Route path="/add-doctor" element={<AddDoctor />} />

        {/* doctor routes */}
        <Route path="/Doctorlogin" element={<Doctorlogin />} />
        <Route path="/doctor-dashboard" element={<Doctordashboard />} />
        <Route path="/DoctorTreatment" element={<DoctorTreatment />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
