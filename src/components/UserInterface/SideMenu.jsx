import React from 'react'

const SideMenu = (props) => {
    return <>
        <div className="side-menu d-flex flex-wrap mt-3 p-3 row" >
            <h3 className="text-center title-font">Menu</h3>
            <div className="side-menu-link d-flex flex-column align-items-center mr-3 col-4">
                <img className="side-menu-icon" src="/img/icons/map.svg" alt=""/>
                <span>Carte</span>
            </div>
            <div className="side-menu-link d-flex flex-column align-items-center mr-3 col-4">
                <img className="side-menu-icon" src="/img/icons/money-bag.svg" alt=""/>
                <span>Inventaire</span>
            </div>
            <div className="side-menu-link d-flex flex-column align-items-center mr-3 col-4">
                <img className="side-menu-icon" src="/img/icons/profile.svg" alt=""/>
                <span>Profile</span>
            </div>
            <div className="side-menu-link d-flex flex-column align-items-center mr-3 col-4">
                <img className="side-menu-icon" src="/img/icons/guilde.svg" alt=""/>
                <span>Guilde</span>
            </div>
            <div className="side-menu-link d-flex flex-column align-items-center mr-3 col-4">
                <img className="side-menu-icon" src="/img/icons/crown.svg" alt=""/>
                <span>Classement</span>
            </div>
            <div className="side-menu-link d-flex flex-column align-items-center mr-3 col-4">
                <img className="side-menu-icon" src="/img/icons/historique.svg" alt=""/>
                <span>Historique</span>
            </div>
        </div>
    </>
}

export default SideMenu