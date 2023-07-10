import React, {useContext} from "react";
import AuthContext from "../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({path, component, isAdmin = false}) => {
    const {isAuthenticated, role} = useContext(AuthContext)
    const granted =  isAdmin ? (role.includes('ROLE_ADMIN') ? true : false) : true
    return (isAuthenticated && granted) ? <Route path={path} component={component} /> : <Redirect to="/login" />
}

export default PrivateRoute