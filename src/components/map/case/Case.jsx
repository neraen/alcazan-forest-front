import React, {useEffect} from 'react'
import '../../../styles/app.css'
import Player from "../../player/Player";
import Pnj from "../../pnj/pnj/Pnj";
import Boss from "../../boss/Boss";
import ActionView from "../../pnj/actionView/ActionView";
import ActionMap from "../../actionMap/ActionMap";

const Case = (props) => {

    useEffect(() => {
    }, [])


    return <>
        <div className={"case "+ (props.isUnabled && "unabled-move" || 'disabled-move') } >
            { props.hasPnj && <Pnj pnj={props.hasPnj} abscisse={props.abscisse} ordonnee={props.ordonnee}/>}
            { props.haveJoueur && <Player player={props.haveJoueur} hasMonstre={props.hasMonstre}/>}
            { props.hasBoss && <Boss boss={props.hasBoss} />}
            { props.hasAction && <ActionMap action={props.hasAction} />}
        </div>
    </>
}

export default Case