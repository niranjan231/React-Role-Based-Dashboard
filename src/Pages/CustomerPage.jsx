import React from "react";
import { useSelector } from "react-redux";

export default function CustomerPage() {
  const users = useSelector((state) =>
    state.users.users.filter((user) => user.category === "customer")
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-success">Customer Page</h2>
      {users.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item">
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
