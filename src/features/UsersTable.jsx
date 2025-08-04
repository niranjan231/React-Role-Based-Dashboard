import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "./usersSlice";

export default function UsersTable() {
  const { role } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Get current page users
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination buttons handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <table className="table table-striped table-hover table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th style={{ width: "220px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2">Edit</button>
                {role === "admin" && (
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => dispatch(deleteUser(user.id))}
                  >
                    Delete
                  </button>
                )}
                {role === "admin" && (
                  <button className="btn btn-success btn-sm">Post</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, idx) => (
            <li
              key={idx}
              className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                {idx + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
