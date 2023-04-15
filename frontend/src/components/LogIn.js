// import React, { useState } from "react";
// import { User } from "../api/users"
// import AuthContext from "../context/AuthProvider";


// export function LogIn() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const LogInnClick = async (username, password) => {
//     setUsername(username);
//     console.log(username);
//     setPassword(password);
//     console.log(password);
//     User(username, password).then(

//     ).catch(() => {
//       // handle error here
//     })
//   };

//   return (
//     <>
//       <div className="login-wrapper">
//         <h1 className="login-title">Log in or Register</h1>

//         <form>
//           <input
//             className="login-input"
//             type="text"
//             id="username"
//             name="username"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//             placeholder="Username"
//           />
//           <br></br>
//           <input
//             className="login-input"
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             placeholder="Password"
//           />
//           <br></br>
//           <button className="login-submit" onClick={event => LogInnClick(username, password)}>Log in</button>
//           <br></br>
//           <button className="register-submit" onClick={event => LogInnClick(username, password)}>Register</button>
//         </form>
//       </div>

//     </>
//   );
// }

import React, { useState, useContext } from "react";
import { loginUser, registerUser } from "../api/users";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from 'react-router-dom';
import ThemeContext from "../context/ThemeContext";
export function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isDarkMode } = useContext(ThemeContext);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const containerStyle = {
    backgroundColor: isDarkMode ? "#292929" : "white",
    color: isDarkMode ? "white" : "#292929",
  };

  const handleLogin = async () => {
    try {
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
      <div className="login-wrapper" style={containerStyle}>
        <h1 className="login-title">
          {"Log in"}
        </h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display the error message */}
        <>
          <input
            className="login-input"
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
            className="login-input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoFocus
          />
          <br></br>
          <button className="login-submit" onClick={handleLogin}>
            Log in
          </button>

          <button id="registerNow" onClick={() => navigate("/register")}>
            Register
          </button>
        </>
      </div>
    </>
  );
}
