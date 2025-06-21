import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/layout/Navbar";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Registration.jsx";
import GuestRegistrationPage from "./Pages/guestregistartion.jsx";
import HomePage from "./Pages/homepage.jsx";
import GuestHome from "./Pages/Guest/GuestHome.jsx";
import GuestBooks from "./Pages/Guest/GuestBooks.jsx";
import GuestLog from "./Pages/Guest/GuestLog.jsx";
import GuestBookDetails from "./Pages/Guest/GuestBookDetail.jsx";

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
        <Route path="/"   element={<HomePage/>}/>
        <Route path="/guest-home" element={<GuestHome/>}/>
        <Route path="/guest-books" element={<GuestBooks/>}/>
        <Route path="/guest-log" element={<GuestLog/>}/>
        <Route path="/guest-book/:id" element={<GuestBookDetails />} />

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
