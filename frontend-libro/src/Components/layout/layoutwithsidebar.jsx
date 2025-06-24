import React from "react";
import Sidebar from "./sideBar";
import '../../css/Layout.css'
import { useLocation } from "react-router-dom";

const sidebarRoutes = [
  "/dashboard", "/books", "/borrowed", "/history", "/profile",
  "/members", "/guestlogs", "/inventory"
];

export default function LayoutWithSidebar({ children }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const showSidebar = role && sidebarRoutes.includes(location.pathname);

  return (
    <div className="layout-container">
      {showSidebar && <Sidebar />}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}
