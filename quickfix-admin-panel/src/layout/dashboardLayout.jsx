// DashboardLayout.js
import React from "react";
import Sidebar from "../pages/dashboard/sidebar";
import { Outlet } from "react-router-dom";
// import Header from "../pages/dashboard/Header";

const DashboardLayout = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        {/* <Header /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
