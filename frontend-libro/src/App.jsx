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

import AdminDashboard from "./Pages/Admin/dashboard.jsx";
import AdminMembers from "./Pages/Admin/members.jsx";
import AdminBooks from "./Pages/Admin/books.jsx";
import AdminGuestLogs from "./Pages/Admin/guestlogs.jsx";
import AdminBorrowingManagement from "./Pages/Admin/borrowmanagement.jsx";
import AdminBorrowingHistory from "./Pages/Admin/borrowedhistory.jsx";

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/guest"];

  return (
    <div className="App">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
       
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/guest" element={<GuestRegistrationPage />} />
        <Route path="/" element={<HomePage />} />

        <Route path="/guest-home" element={<GuestHome />} />
        <Route path="/guest-books" element={<GuestBooks />} />
        <Route path="/guest-log" element={<GuestLog />} />
        <Route path="/guest-book/:id" element={<GuestBookDetails />} />

        
        <Route
          path="/member-dashboard"
          element={
            <LayoutWithSidebar>
              <MemberDashboard />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/member-books"
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
          path="/member-history"
          element={
            <LayoutWithSidebar>
              <History />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/member-profile"
          element={
            <LayoutWithSidebar>
              <MemberProfile />
            </LayoutWithSidebar>
          }
        />

      
        <Route
          path="/admin-dashboard"
          element={
            <LayoutWithSidebar>
              <AdminDashboard />
            </LayoutWithSidebar>
          }
        />
       
        
        <Route
          path="/admin-members"
          element={
            <LayoutWithSidebar>
              <AdminMembers />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/admin-books"
          element={
            <LayoutWithSidebar>
              <AdminBooks />
            </LayoutWithSidebar>
          }
        /> 
        <Route 
           path="/admin-guestlog"
           element= {
            <LayoutWithSidebar>
              <AdminGuestLogs/>
            </LayoutWithSidebar>
           }
           />
           <Route
          path="/admin-borrowing"
          element={
            <LayoutWithSidebar>
               <AdminBorrowingManagement />
             </LayoutWithSidebar>
          }
          />
          {/* <Route 
          path="/" */}
      
       
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
