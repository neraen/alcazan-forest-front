import React, {useEffect, useState} from 'react'
import {ProgressBar} from "react-bootstrap";
import StatBar from "./UserInterface/StatBar";
import GameApi from "../services/GameApi";


const Target = (props) => {

    const [target, setTarget] = useState();

    useEffect(() => {
        console.log(props);
        getTargetInfo();
    }, [props.needUpdate])

    const getTargetInfo = async () => {
        const target = await GameApi.getTargetInfos(props.target, props.type)
        console.log(target)
        setTarget(target)
    }

    return <>
        {(props.type === "player" && target) &&
        <div className="joueur-cible">
            <h4 className="joueur-cible-name">{target.pseudo}</h4>
            <div className="target-stats">
                <StatBar displayText={false} value={target.currentLife} max={target.maxLife} maxWidth={200}
                         classN="lifeBar"/>
                <StatBar displayText={false} value={target.currentMana} max={target.maxMana} maxWidth={200}
                         classN="manaBar"/>
                <img src="/img/gui/CharacterEnemy/AvatarEnemy.png" alt="avatar" className="avatar-player"/>
                <div className="joueur-cible-level">{target.niveau}</div>
            </div>
        </div>
        }
        {(props.type === "monstre" && target) &&
        <div className="joueur-cible">
            <h4 className="joueur-cible-name">{target.nomMonstre} x {target.quantiteMonstre} </h4>
            <div className="target-stats">
                <StatBar displayText={false} value={target.monstreLife} max={target.monstreLifeMax} maxWidth={200} classN="lifeBar"/>
                <img src={"/img/monstre/"+target.imageMonstre+".png"} alt="avatar" className="avatar-player"/>
            </div>
        </div>
        }
    </>
}

export default Target