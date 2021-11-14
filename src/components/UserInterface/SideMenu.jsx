import React from 'react'
import {Link} from "react-router-dom";

const SideMenu = (props) => {
    return <>
        <div className="side-menu d-flex flex-wrap mt-3 p-3 row" >
            <Link to="/carte" className="side-menu-link d-flex flex-column align-items-center mr-3 col-4 text-decoration-none">
                <img className="side-menu-icon" src="/img/icons/map.svg" alt=""/>
                <span>Carte</span>
            </Link>
            <Link to="/inventaire" className="side-menu-link d-flex flex-column align-items-center mr-3 col-4 text-decoration-none">
                <img className="side-menu-icon" src="/img/icons/money-bag.svg" alt=""/>
                <span>Inventaire</span>
            </Link>
            <Link to="/profil" className="side-menu-link d-flex flex-column align-items-center mr-3 col-4 text-decoration-none">
                <img className="side-menu-icon" src="/img/icons/profile.svg" alt=""/>
                <span>Profile</span>
            </Link>
            <Link className="side-menu-link d-flex flex-column align-items-center mr-3 col-4 text-decoration-none">
                <img className="side-menu-icon" src="/img/icons/guilde.svg" alt=""/>
                <span>Guilde</span>
            </Link>
            <Link className="side-menu-link d-flex flex-column align-items-center mr-3 col-4 text-decoration-none">
                <img className="side-menu-icon" src="/img/icons/crown.svg" alt=""/>
                <span>Classement</span>
            </Link>
            <Link className="side-menu-link d-flex flex-column align-items-center mr-3 col-4 text-decoration-none">
                <img className="side-menu-icon" src="/img/icons/historique.svg" alt=""/>
                <span>Historique</span>
            </Link>
        </div>
    </>
}

export default SideMenu