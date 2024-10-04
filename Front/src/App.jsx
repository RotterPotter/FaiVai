import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FindJobs from "./pages/FindJobs";
import Navbar from "./components/Navbar.jsx";
import FindWorker from "./pages/FindWorker";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login/Login.jsx";
import SendCode from "./pages/Login/SendCode.jsx";
import VerifyCode from "./pages/Login/VerifyCode.jsx";
import NewPwd from "./pages/Login/NewPwd.jsx";

export default function App() {
  return (
    <Router>
      <div className="mx-10">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<FindJobs></FindJobs>}></Route>
          <Route path="/findworker" element={<FindWorker />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/login/sendcode" element={<SendCode />}></Route>
          <Route path="/login/verifycode" element={<VerifyCode />}></Route>
          <Route path="/login/newpwd" element={<NewPwd />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
