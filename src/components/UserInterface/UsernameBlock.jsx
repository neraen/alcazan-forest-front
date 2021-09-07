import React, {useContext} from 'react'
import AuthContext from "../../contexts/AuthContext";
import {NavLink} from "react-router-dom";

const UsernameBlock = (props) => {
    return <>
        <div className="username-block mb-3 row">
            <h3 className="text-center pt-2 title-font">{props.user.pseudo}</h3>
            <NavLink className="nav-link text-center" to="/">Messagerie</NavLink>
        </div>
    </>
}

export default UsernameBlock