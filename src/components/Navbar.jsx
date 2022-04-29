import React, {useContext} from "react"
import authAPI from "../services/authAPI";
import {NavLink} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated, role } = useContext(AuthContext)

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false)
        history.push('/login')
    }


    return(
        <nav className="navbar navbar-expand-lg navbar-padding title-font" >
            <NavLink to="/" className="navbar-brand" href="#"><img src="../img/A.F.png"/>Alcazan Forest</NavLink>
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    {isAuthenticated &&
                    <>
                        <li className="nav-item">
                            <NavLink className="nav-link link-dark" to="/carte">Carte</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link link-dark" to="/profil">Profil</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link link-dark" to="/inventaire">Inventaire</NavLink>
                        </li>
                        {role.includes('ROLE_ADMIN') && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link link-dark" to="/administration">Administration</NavLink>
                                </li>
                            </>
                        )}
                    </>
                    ||
                    <>
                        <li className="nav-item">
                        <NavLink className="nav-link link-dark" to="/preview">APERCU</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link link-dark" to="/about">A PROPOS</NavLink>
                        </li>
                    </>
                    }
                </ul>
                <ul className="navbar-nav ml-auto">
                    {!isAuthenticated &&
                    <>
                        <li className="nav-item link-dark">
                            <NavLink to="/inscription" className="btn-sign">Inscription</NavLink>
                        </li>
                        <li className="nav-item link-dark">
                            <NavLink to="/connexion" className="btn-sign">connexion au jeu</NavLink>
                        </li>
                    </>
                    ||
                    <li className="nav-link ml-auto">
                        <button onClick={handleLogout} className="btn-sign btn-signout">Deconnexion</button>
                    </li>
                    }
                </ul>
            </div>
            <div>Alcazan Forest MMORPG médieval</div>

        </nav>
    );
}

export default Navbar