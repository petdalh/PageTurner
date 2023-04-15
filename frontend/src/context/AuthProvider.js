// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({});
//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     )
// };

// export default AuthContext;

// import React, { useState, createContext } from "react";

// const AuthContext = createContext({
//     isLoggedIn: false,
//     login: () => { },
//     logout: () => { },
// });

// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const loginHandler = (token) => {
//         localStorage.setItem("token", token);
//         setIsLoggedIn(true);
//     };

//     const logoutHandler = () => {
//         localStorage.removeItem("token");
//         setIsLoggedIn(false);
//     };

//     const contextValue = {
//         isLoggedIn: isLoggedIn,
//         login: loginHandler,
//         logout: logoutHandler,
//     };

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;



import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { getUserProfile } from "../api/users";

export const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    //const [loginCounter, setLoginCounter] = useState(0); // DEBUGGING

    useEffect(() => {
        if (isLoggedIn) {
            const token = localStorage.getItem('token');
            const source = axios.CancelToken.source();
            const fetchUserData = async () => {
                try {
                    const userData = await getUserProfile(token);
                    setUser(userData);
                    console.log("USERDATA IN AUTH", userData);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchUserData();
            return () => {
                source.cancel("Request canceled");
            };
        }
    }, [isLoggedIn]);

    const loginHandler = (token) => {
        if (!token) {
            throw new Error('No token provided');
        }
        console.log("Token in loginHandler:", token); // Log the token here
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        //setLoginCounter(prevCounter => prevCounter + 1);
    };

    const logoutHandler = () => {
        try {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    const contextValue = {
        isLoggedIn: isLoggedIn,
        user: user,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
