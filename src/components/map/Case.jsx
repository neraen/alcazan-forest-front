import React, {useEffect} from 'react'
import '../../styles/app.css'
import Player from "../Player";

const Case = (props) => {

    useEffect(() => {
        // console.log(props.onClickFunction)
    }, [])

    return <>
        <div className={"case "+ (props.isUnabled && "unabled-move" || 'disabled-move') } style={{border: "rgba(255, 255, 255, .5) 1px solid"}} >
            { props.haveJoueur && <Player player={props.haveJoueur} hasMonstre={props.hasMonstre}/>}
        </div>
    </>
}

export default Case