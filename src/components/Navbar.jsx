import React, {useContext} from "react"
import authAPI from "../services/authAPI";
import {NavLink} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false)
        history.push('/login')
    }


    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-padding title-font" >
            <NavLink to="/" className="navbar-brand" href="#">Alcazan Forest</NavLink>
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    {isAuthenticated &&
                    <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/carte">Carte</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/profil">Profil</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/inventaire">Inventaire</NavLink>
                        </li>
                    </>
                    ||
                    <>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/preview">Apercu</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/about">A propos</NavLink>
                        </li>
                    </>
                    }
                </ul>
                <ul className="navbar-nav ml-auto">
                    {!isAuthenticated &&
                    <>
                        <li className="nav-item">
                            <NavLink to="/inscription" className="btn btn-success">Inscription</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/connexion" className="btn btn-success">connexion</NavLink>
                        </li>
                    </>
                    ||
                    <li className="nav-link ml-auto">
                        <button onClick={handleLogout} className="btn btn-danger">Deconnexion</button>
                    </li>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar