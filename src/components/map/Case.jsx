import React, {useEffect} from 'react'
import '../../styles/app.css'
import Player from "../Player";
import Pnj from "../Pnj";

const Case = (props) => {

    useEffect(() => {
    }, [])


    return <>
        <div className={"case "+ (props.isUnabled && "unabled-move" || 'disabled-move') } >
            { props.hasPnj && <Pnj pnj={props.hasPnj}/>}
            { props.haveJoueur && <Player player={props.haveJoueur} hasMonstre={props.hasMonstre}/>}
        </div>
    </>
}

export default Case