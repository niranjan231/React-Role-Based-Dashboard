import React from "react";
import { FaUsers, FaUserCheck, FaRegComments } from "react-icons/fa";
import "../App.css";

export default function CustomerPage() {
  return (
    <div className="page-container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" // user group icon as logo
        alt="Customer Logo"
        className="page-logo"
      />
      <h1 className="page-title">Customer Management</h1>
      <p className="page-description">
        View and manage customer data and profiles seamlessly.
      </p>

      <div className="cards-container">
        <div className="info-card">
          <FaUsers className="info-icon" />
          <h3>Customer Database</h3>
          <p>Maintain an updated and organized customer database.</p>
        </div>

        <div className="info-card">
          <FaUserCheck className="info-icon" />
          <h3>Verification</h3>
          <p>Verify and validate customer information quickly.</p>
        </div>

        <div className="info-card">
          <FaRegComments className="info-icon" />
          <h3>Support</h3>
          <p>Manage customer support tickets and feedback efficiently.</p>
        </div>
      </div>
    </div>
  );
}
