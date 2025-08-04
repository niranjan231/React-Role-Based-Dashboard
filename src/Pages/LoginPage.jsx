// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Submitted credentials:", credentials);

        const { username, password } = credentials;

        // Trim spaces to avoid mismatch
        const user = username.trim();
        const pass = password.trim();

        if (
            (user === "admin" && pass === "admin123") ||
            (user === "user" && pass === "user123")
        ) {
            dispatch(login({ username: user, password: pass }));
            navigate("/dashboard");
        } else {
            alert("Invalid username or password");
        }
    };


    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h3 className="mb-3 text-center">Login (Admin / User)</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />

                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>

            <div className="mt-4">
                <strong>Test Credentials:</strong>
                <ul>
                    <li>Admin: <code>admin / admin123</code></li>
                    <li>User: <code>user / user123</code></li>
                </ul>
            </div>
        </div>
    );
}
