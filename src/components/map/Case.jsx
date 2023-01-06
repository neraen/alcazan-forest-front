import React, {useEffect} from 'react'
import '../../styles/app.css'
import Player from "../Player";
import Pnj from "../Pnj";
import Boss from "../Boss";
import ActionView from "../pnj/ActionView";
import ActionMap from "../ActionMap";

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