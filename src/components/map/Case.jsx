import React from 'react'
import '../../styles/app.css'
import Player from "../Player";

const Case = (props) => {
    return <>
        <div className="case" style={{border: "rgba(255, 255, 255, .5) 1px solid"}} >

            { props.otherPlayer && <Player player={props.otherPlayer}/>}
        </div>
    </>
}

export default Case