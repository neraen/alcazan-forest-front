import React, {useEffect, useState} from 'react'
import InventaireApi from "../services/InventaireApi";
import Equipements from "./inventory/Equipements";
import {Link, Redirect, Switch} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Objets from "./inventory/Objets";

const Inventory = (props) => {

    const [equipements, setEquipements] = useState([]);
    const [objets, setObjets] = useState([]);
    const [consommables, setConsommables] = useState([]);

    useEffect(() => {
        fetchInventaire();
    }, [])

    const fetchInventaire = async () => {
        const dataInventaire = await InventaireApi.getPlayerInventaire();
        setEquipements(dataInventaire.equipements)
        setObjets(dataInventaire.objets)
        setConsommables(dataInventaire.consommables)
        console.log(equipements)
    }

    const shouldRefreshInventory = () => {
        fetchInventaire()
    }

    return <>
    <h1 className="text-center title-map-font banner-map banner-map-inventory">Inventaire</h1>

    <div className="inventaire-container">
        <div className="inventaire-header">
            <h3 className="inventaire-title"><Link activeClassName="inventaire-active" className="title-map-font no-style-link " to='/inventaire/equipement' >Equipements</Link></h3>
            <h3 className="inventaire-title"><Link activeClassName="inventaire-active" className="title-map-font no-style-link" to='/inventaire/objet' >Objets</Link></h3>
            <h3 className="inventaire-title"><Link activeClassName="inventaire-active" className="title-map-font no-style-link" to='/inventaire/objet' >Objets de quêtes</Link></h3>
            <Redirect to="/inventaire/equipement" />
        </div>
        <Switch>
            <PrivateRoute path="/inventaire/equipement" component={() => <Equipements equipements={equipements} shouldRefreshInventory={shouldRefreshInventory} />}/>
            <PrivateRoute path="/inventaire/objet" component={() => <Objets consommables={consommables}  objets={objets}/>}/>
        </Switch>
    </div>
    </>
}

export default Inventory