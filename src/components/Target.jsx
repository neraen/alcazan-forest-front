import React, {useContext} from 'react'
import {ProgressBar} from "react-bootstrap";
import MapContext from "../contexts/MapContext";

const Target = (props) => {

    //const {target} = useContext(MapContext)

    return <>
        {console.log(props.player)}
        {console.log(props.playerTargeted)}
        <h3 className="text-center title-font">Ciblage</h3>
        {(props.playerTargeted) &&

        <div className="block-joueur-cible p-3">
            <div className="joueur-cible">
                <h4 className="joueur-cible-name">{props.player.pseudo} / {props.player.classe.nom} niveau 18</h4>
                <div className="d-flex align-items-center w100">
                    <img src="/img/avatar/guerrier.png" alt="avatar"/>
                    <img className="life-icon mr-2" src="/img/icons/pixel-life.png"/>
                    <ProgressBar className="progress-bar-stats" variant="danger" now="44"/>
                </div>
            </div>
        </div>
        ||
        <span>Aucune cible</span>
        }
    </>
}

export default Target