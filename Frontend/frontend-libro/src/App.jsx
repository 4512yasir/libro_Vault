import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/layout/Navbar";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Registration.jsx";
import GuestRegistrationPage from "./Pages/guestregistartion.jsx";

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register', '/guest'];

  return (
    <div className="App">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/guest"  element={<GuestRegistrationPage/>}/>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
