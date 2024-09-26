import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FindJobs from "./pages/FindJobs";
import Navbar from "./components/Navbar.jsx";
import FindWorker from "./pages/FindWorker";

export default function App() {
  return (
    <Router>
      <div className="mx-10">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<FindJobs></FindJobs>}></Route>
          <Route path="/findworker" element={<FindWorker />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
