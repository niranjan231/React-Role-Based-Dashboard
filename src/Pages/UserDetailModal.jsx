import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function UserDetailModal({ show, handleClose, user }) {
  if (!user) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-warning text-white">
        <Modal.Title className="fw-bold">👤 User Details</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-light">
        {["Name", "Email", "Category", "Role", "Password"].map((field) => (
          <div className="mb-3" key={field}>
            <strong>{field}:</strong>
            <div className="form-control bg-white">{user[field.toLowerCase()]}</div>
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
