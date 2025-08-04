import React from "react";
import { FaChartBar, FaFileAlt, FaSearch } from "react-icons/fa";
import "../App.css"; // import the css

export default function ReportingPage() {
  return (
    <div className="page-container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/126/126509.png" // report icon as logo
        alt="Reporting Logo"
        className="page-logo"
      />
      <h1 className="page-title">Reporting Center</h1>
      <p className="page-description">
        Generate and analyze detailed reports to drive smart decisions.
      </p>

      <div className="cards-container">
        <div className="info-card">
          <FaChartBar className="info-icon" />
          <h3>Analytics</h3>
          <p>Comprehensive analytics dashboards for key metrics.</p>
        </div>

        <div className="info-card">
          <FaFileAlt className="info-icon" />
          <h3>Report Generation</h3>
          <p>Create customizable reports in various formats.</p>
        </div>

        <div className="info-card">
          <FaSearch className="info-icon" />
          <h3>Data Insights</h3>
          <p>Discover actionable insights with deep data analysis.</p>
        </div>
      </div>
    </div>
  );
}
