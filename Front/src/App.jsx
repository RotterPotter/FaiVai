import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import FindJobs from "./pages/FindJobs";
import Navbar from "./components/Navbar.jsx";
import FindWorker from "./pages/FindWorker";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login/Login.jsx";
import SendCode from "./pages/Login/SendCode.jsx";
import VerifyCode from "./pages/Login/VerifyCode.jsx";
import NewPwd from "./pages/Login/NewPwd.jsx";
import EmailVerified from "./pages/EmailVerified.jsx";
import PostOffer from "./pages/PostOffer.jsx";
import OffersCatalog from "./pages/OffersCatalog.jsx";
import OfferDetails from "./pages/OfferDetails.jsx";
import ServiceRegister from "./pages/ServiceRegister.jsx";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login/emailverified"];

  return (
    <div className="w-full m-0 p-0 ">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<FindJobs />} />
        <Route path="/findworker" element={<FindWorker />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/sendcode" element={<SendCode />} />
        <Route path="/login/verifycode" element={<VerifyCode />} />
        <Route path="/login/newpwd" element={<NewPwd />} />
        <Route path="/login/emailverified" element={<EmailVerified />} />
        <Route path="/offers/post" element={<PostOffer />} />
        <Route path="/offers/catalog" element={<OffersCatalog />} />
        <Route path="/offers/detail" element={<OfferDetails />} />
        <Route path="/service/register" element={<ServiceRegister />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
