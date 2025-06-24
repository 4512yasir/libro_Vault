import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/layout/Navbar";
import LayoutWithSidebar from "./Components/layout/layoutwithsidebar.jsx";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Registration.jsx";
import GuestRegistrationPage from "./Pages/guestregistartion.jsx";
import HomePage from "./Pages/homepage.jsx";
import GuestHome from "./Pages/Guest/GuestHome.jsx";
import GuestBooks from "./Pages/Guest/GuestBooks.jsx";
import GuestLog from "./Pages/Guest/GuestLog.jsx";
import GuestBookDetails from "./Pages/Guest/GuestBookDetail.jsx";
import MemberBooks from "./Pages/Members/books.jsx";
import BorrowedBooks from "./Pages/Members/borrowedbooks.jsx";
import History from "./Pages/Members/History.jsx";
import MemberProfile from "./Pages/Members/profile.jsx";
import MemberDashboard from "./Pages/Members/Dashboard.jsx";
import AdminDashboard from "./Pages/Admin/dashboard.jsx"
import Members from "./Pages/Admin/members.jsx"
import Books from "./Pages/Admin/books.jsx"

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/guest"];

  return (
    <div className="App">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Auth & Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/guest" element={<GuestRegistrationPage />} />
        <Route path="/" element={<HomePage />} />

        {/* Guest Pages */}
        <Route path="/guest-home" element={<GuestHome />} />
        <Route path="/guest-books" element={<GuestBooks />} />
        <Route path="/guest-log" element={<GuestLog />} />
        <Route path="/guest-book/:id" element={<GuestBookDetails />} />

        {/* Member/Admin Pages with Sidebar */}
        <Route
          path="/member-dashboard"
          element={
            <LayoutWithSidebar>
              <MemberDashboard />
            </LayoutWithSidebar>
          }
        /> 
        <Route
          path="/books"
          element={
            <LayoutWithSidebar>
              <MemberBooks />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/member-borrowed"
          element={
            <LayoutWithSidebar>
              <BorrowedBooks />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/history"
          element={
            <LayoutWithSidebar>
              <History />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <LayoutWithSidebar>
              <MemberProfile />
            </LayoutWithSidebar>
          }
        />
        <Route 
            path="/Admindashboard"
            element={
              <LayoutWithSidebar>
                <AdminDashboard/>
              </LayoutWithSidebar>
            }
          />
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
