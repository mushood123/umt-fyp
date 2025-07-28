import React from "react";
import Header from "./Header";
import "./Dashboard.css";
import ForecastChart from "../../components/forecastChart";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="main-content">
        <Header />
        <div className="content-placeholder">
          <ForecastChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
