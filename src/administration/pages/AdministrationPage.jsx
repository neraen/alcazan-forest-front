import {NavLink} from "react-router-dom";
import React from "react";


const AdministrationPage = (props) => {

    return <>
        <main className="main-administration-page">
            <div className="administration-side-menu">
                <ul className="administration-nav-links">
                    <li className="administration-nav-link">
                        <NavLink className="" to="/administration/joueurs">Joueurs</NavLink>
                    </li>
                    <li className="administration-nav-link">
                        <NavLink className="" to="/administration/mapmaker">Map Maker</NavLink>
                    </li>
                    <li className="administration-nav-link">
                        <NavLink className="" to="/administration/questmaker">Quest Maker</NavLink>
                    </li>
                    <li className="administration-nav-link">
                        <NavLink className="" to="/administration/pnj">Pnj</NavLink>
                    </li>
                    <li className="administration-nav-link">
                        <NavLink className="" to="/administration/monstres">Monstres</NavLink>

                    </li>
                </ul>
            </div>
            <div className="footer-block">

            </div>
        </main>
    </>
}

export default AdministrationPage