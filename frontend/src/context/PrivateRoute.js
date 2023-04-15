import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from './AuthProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? Navigate('/') : <Component {...props} />
            }
        />
    );
};

export default PrivateRoute;
