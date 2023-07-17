import "./App.css";

import Frontpage from "./component/Frontpage";
import Login from "./component/Login";
import Doctorlogin from "./component/Doctorlogin";
import Adminlogin from "./component/Adminlogin";
import RDashboard from "./component/RDashboard";
import Doctor from "./component/Doctor";

import Doctordashboard from "./component/Doctordashboard";
import Admindashboard from "./component/Admindashboard";
// import Patientregistration from "./component/Patientregistration";
import Tokengenerated from "./component/Tokengenerated";
import DoctorTreatment from "./component/DoctorTreatment";
import TokenGeneration from "./component/TokenGeneration";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./component/Registration/Register";
// import DisplayContent from "./component/DisplayConten";
import ForgetPassword from "./component/FOrgatePassword";
import axios from "axios";
// import Patientopd from "./component/patientopd";
import PatientAssigned from "./component/PatientAssigned";
import ReportAdmin from "./component/ReportAdmin";
import ReceptionistProfile from "./component/ReceptionistProfile";
import Managedoctor from "./component/Managedoctor";
// import RecpManage from "./component/RecpManage";
import Report from "./component/Report";
import AddReceptionist from "./component/AddReceptionist";
import AddDoctor from "./component/AddDoctor";
import TokenGenForm from "./component/TokenGenForm";
import { useAuth } from "./context";
import TokenSearch from "./component/TokenSearch";
import PatientQueue from "./component/PatientQueue";
import ServePatient from "./component/ServePatient";
import PatientTreatY from "./component/PatientTreatY";
import MissedPatient from "./component/MissedPatient";
import DoctorDisplay from "./component/DoctorDisplay";
import DoctorDisplayScr from "./component/DoctorDisplayScr";
import ManageRec from "./component/ManageRec";
import MonthWiseToken from "./component/MonthWiseToken";
import PendingApproval from "./component/PendingApproval";
import SendOtp from "./component/SendOtp";
import ResetPassword from "./component/ResetPassword";
import AdminReportGen from "./Pages/AdminReportGen";
// import Temp from "./component/Temp.jsx";
axios.defaults.withCredentials = true;

function App() {
  const [auth] = useAuth();
  console.log(process.env.REACT_APP_DOMAIN);

  console.log(auth);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/forgot-password" element={<ForgetPassword />} /> */}
        {/* <Route path="/confirm-password" element={<ConfirmPassword />} /> */}
        <Route path="/doctorLive/:value" element={<DoctorDisplayScr />} />
        <Route path="/" element={<Frontpage />} />
        {/* receptionist routes */}
        <Route path="/Login" element={<Login />} />
        <Route path="/admin-login" element={<Adminlogin />} />
        {auth.user.role === "Receptionist" ? (
          <>
            <Route path="/receptionist-dashboard" element={<RDashboard />} />
            <Route path="/token-generation" element={<TokenGeneration />} />
            <Route path="/token-gen-form" element={<TokenGenForm />} />
            {/* <Route
              path="/Patientregistration"
              element={<Patientregistration />}
            /> */}
            <Route path="/token-generated" element={<Tokengenerated />} />
            <Route path="/token-search" element={<TokenSearch />} />
            <Route path="/doctor-availablity" element={<Doctor />} />
            {/* <Route path="/display-content" element={<DisplayContent />} /> */}
            {/* <Route path="/patient-opd" element={<Patientopd />} /> */}
            <Route path="/patient-assigned" element={<PatientAssigned />} />

            <Route path="/report-admin" element={<ReportAdmin />} />
            <Route
              path="/receptionist-profile"
              element={<ReceptionistProfile />}
            />
          </>
        ) : (
          <Route path="/Login" element={<Login />} />
        )}
        {auth.user.role === "Admin" ? (
          <>
            {/* admin-dashboard */}
            <Route path="/admin-dashboard" element={<Admindashboard />} />
            {/* <Route path="/display-content" element={<DisplayContent />} /> */}
            <Route path="/manage-doctors" element={<Managedoctor />} />
            <Route path="/manage-receptionist" element={<ManageRec />} />
            <Route path="/admin-report" element={<Report />} />
            <Route path="/add-receptionist" element={<AddReceptionist />} />
            <Route path="/token-generation" element={<TokenGeneration />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/month-wise-token" element={<MonthWiseToken />} />
            <Route path="/pending-approval" element={<PendingApproval />} />
            <Route path="/admin-reports" element={<AdminReportGen />} />
          </>
        ) : (
          <Route path="/Adminlogin" element={<Adminlogin />} />
        )}
        {auth.user.role === "Doctor" ? (
          <>
            {/* doctor-dashboard */}
            <Route path="/doctor-dashboard" element={<Doctordashboard />} />
            <Route path="/DoctorTreatment" element={<DoctorTreatment />} />
            <Route path="/patient-queue" element={<PatientQueue />} />
            <Route path="/servePatient" element={<ServePatient />} />
            <Route path="/patientTreated" element={<PatientTreatY />} />
            <Route path="/patient-missed" element={<MissedPatient />} />
            <Route path="/doctor-display" element={<DoctorDisplay />} />
          </>
        ) : (
          <Route path="/Doctorlogin" element={<Doctorlogin />} />
        )}
        {/* doctor routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Doctorlogin" element={<Doctorlogin />} />
        <Route path="/forgot-password" element={<SendOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path="/test" element={<Temp />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
