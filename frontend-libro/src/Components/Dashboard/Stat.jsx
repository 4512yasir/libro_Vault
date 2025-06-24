import React from "react";
import "../../css/Dashboard.css";

export default function Dashboard({ title, stats }) {
  return (
    <div className="dashboard-container">
      <h2>{title}</h2>
      <div className="dashboard-cards">
        {stats.map((stat, index) => (
          <div key={index} className="dashboard-card">
            <h3>{stat.label}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
