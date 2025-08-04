// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users.users);

    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();

        const { username, password } = credentials;
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        const foundUser = users.find(
            (u) => u.email === trimmedUsername && u.password === trimmedPassword
        );

        if (foundUser) {
            dispatch(login({ user: foundUser }));
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
                <strong>Example Credentials:</strong>
                <ul>
                    <li>Admin: <code>admin / admin123</code></li>
                    <li>Or use your created user credentials</li>
                </ul>
            </div>
        </div>
    );
}
