import React from "react";
import { Navigate } from "react-router-dom";
import authServiceInstance from "../../utils/auth";

export const PrivateRoute = ({ children }) => {
    return authServiceInstance.loggedIn() ? children : <Navigate to='/login' />
}

