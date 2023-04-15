import React, { useState, useContext } from "react";
import { loginUser, registerUser } from "../api/users";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from 'react-router-dom';
import ThemeContext from "../context/ThemeContext";

export function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { isDarkMode } = useContext(ThemeContext);

    const containerStyle = {
        backgroundColor: isDarkMode ? "#292929" : "white",
        color: isDarkMode ? "white" : "#292929",
    };


    const handleRegister = async () => {
        try {
            const user = await registerUser(name, email, password);
            const token = await loginUser(email, password);
            auth.login(token);
            navigate('/');
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <div className="register-wrapper" style={containerStyle}>
                <h1 className="register-title">
                    Register your account
                </h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display the error message */}
                <input
                    className="register-input"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Name"
                    autoFocus
                />
                <br></br>
                <input
                    className="register-input"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                    autoFocus
                />
                <br></br>
                <input
                    className="register-input"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    autoFocus
                />
                <br></br>
                <button className="register-submit" onClick={handleRegister}>
                    Register
                </button>
                <br></br>
            </div>
        </>
    );
}