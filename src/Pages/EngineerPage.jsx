import React from "react";
import { FaCogs, FaTools, FaProjectDiagram } from "react-icons/fa";
import "../App.css"; // import the css

export default function EngineerPage() {
  return (
    <div className="page-container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2907/2907998.png" // example gear icon as logo
        alt="Engineer Logo"
        className="page-logo"
      />
      <h1 className="page-title">Engineer Dashboard</h1>
      <p className="page-description">
        Welcome to the Engineer page. Manage engineering tasks, workflows, and projects efficiently.
      </p>

      <div className="cards-container">
        <div className="info-card">
          <FaCogs className="info-icon" />
          <h3>Task Automation</h3>
          <p>Automate repetitive engineering tasks and increase productivity.</p>
        </div>

        <div className="info-card">
          <FaTools className="info-icon" />
          <h3>Tool Management</h3>
          <p>Manage engineering tools and resources with ease.</p>
        </div>

        <div className="info-card">
          <FaProjectDiagram className="info-icon" />
          <h3>Project Tracking</h3>
          <p>Track the progress of engineering projects in real-time.</p>
        </div>
      </div>
    </div>
  );
}
