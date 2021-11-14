import React from 'react'
import {ProgressBar} from "react-bootstrap";
import StatBar from "./UserInterface/StatBar";


const Target = (props) => {

    return <>
        {(props.playerTargeted) &&
            <div className="joueur-cible">
                <h4 className="joueur-cible-name">{props.player.pseudo}</h4>
                <div className="target-stats">
                    <StatBar displayText={false} value={props.player.currentLife} max={props.player.maxLife} maxWidth={200} classN="lifeBar"/>
                    <StatBar displayText={false} value={props.player.currentMana} max={props.player.maxMana} maxWidth={200} classN="manaBar"/>
                    <img src="/img/gui/CharacterEnemy/AvatarEnemy.png" alt="avatar" className="avatar-player"/>
                    <div className="joueur-cible-level">18</div>
                </div>
            </div>
        }
    </>
}

export default Target