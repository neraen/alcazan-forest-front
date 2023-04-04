import {NavLink, Switch} from "react-router-dom";
import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import MapMakerPage from "./MapMakerPage";
import PnjMakerPage from "./PnjMakerPage";
import MonsterMakerPage from "./MonsterMakerPage";
import EquipementPage from "./EquipementPage";
import ShopMakerPage from "./ShopMakerPage";
import QuestMakerPage from "./QuestMakerPage";
import WorldMakerPage from "./WorldMakerPage";



const AdministrationPage = (props) => {

    return <>

        <main className="main-administration-page">
            <div className="administration-side-menu">
                <ul className="administration-nav-links">
                    <li className="administration-nav-link">
                        <NavLink className="" to="/administration/joueurs">Joueurs</NavLink>
                    </li>
                    <li className="administration-nav-link">
                        <NavLink className="" to="/administration/world">Monde</NavLink>
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
                    <li className="administration-nav-link">
                        <NavLink className="" to="/administration/equipements">Equipements</NavLink>
                    </li>
                    <li className="administration-nav-link">
                        <NavLink className="" to="/administration/shopmaker">ShopMaker</NavLink>
                    </li>
                </ul>
            </div>
            <div className="layout-administration">
                <Switch>
                    <PrivateRoute path="/administration/world"  isAdmin={true} component={WorldMakerPage}/>
                    <PrivateRoute path="/administration/mapmaker"  isAdmin={true} component={MapMakerPage}/>
                    <PrivateRoute path="/administration/questmaker"  isAdmin={true} component={QuestMakerPage}/>
                    <PrivateRoute path="/administration/pnj"  isAdmin={true} component={PnjMakerPage}/>
                    <PrivateRoute path="/administration/monstres"  isAdmin={true} component={MonsterMakerPage}/>
                    <PrivateRoute path="/administration/equipements"  isAdmin={true} component={EquipementPage}/>
                    <PrivateRoute path="/administration/shopmaker"  isAdmin={true} component={ShopMakerPage}/>
                </Switch>
            </div>
            <div className="footer-block">

            </div>
        </main>
    </>
}

export default AdministrationPage