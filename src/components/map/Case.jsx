import React, {useEffect} from 'react'
import '../../styles/app.css'
import Player from "../Player";
import Pnj from "../Pnj";

const Case = (props) => {

    useEffect(() => {
        console.log(props.haveJoueur)
    }, [])

    return <>
        <div className={"case "+ (props.isUnabled && "unabled-move" || 'disabled-move') } style={{border: "rgba(255, 255, 255, .5) 1px solid"}} >
            { props.hasPnj && <Pnj pnj={props.hasPnj}/>}
            { props.haveJoueur && <Player player={props.haveJoueur} hasMonstre={props.hasMonstre}/>}
        </div>
    </>
}

export default Case