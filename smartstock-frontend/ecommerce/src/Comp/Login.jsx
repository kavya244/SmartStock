
import React, { useState } from 'react';
import '../Styles/Login.css';

const Login = ({ setLogin }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Demo login credentials
    const validEmail = "";
    const validPassword = "";

    function handleLogin(e) {
        e.preventDefault();

        if (email === validEmail && password === validPassword) {
            setError("");
            setLogin(true);
        } else {
            setError("Invalid email or password");
        }
    }

    return (
        <div className="login">

            <h1>SmartStock</h1>

            <div className="logintitle">
                <p>Sign in to manage your inventory</p>
            </div>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="error">{error}</p>}

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
};

export default Login;
