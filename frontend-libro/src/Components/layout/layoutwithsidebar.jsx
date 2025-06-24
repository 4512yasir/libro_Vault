import React from "react";
import Sidebar from "./sideBar";
import '../../css/Layout.css';
import { useLocation } from "react-router-dom";

export default function LayoutWithSidebar({ children }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // Show sidebar on all member and admin pages
  const showSidebar = role === "member" || role === "admin";

  return (
    <div className="layout-container">
      {showSidebar && <Sidebar />}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}
