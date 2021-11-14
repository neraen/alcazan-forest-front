import React, {useContext} from 'react'
import MapContext from "../contexts/MapContext";

const Player = (props) => {
    const {setTarget, setIsPlayer, target} = useContext(MapContext)

    const handleTarget = () =>{
        setTarget(props.player)
        window.localStorage.setItem('target', JSON.stringify(props.player));
    }

    return <>
        <div className="joueur" onClick={handleTarget}>
            <div className="joueur-hover d-none flex-column">
                <div className="joueur-name">{props.player.pseudo}</div>
                <div className="joueur-level">Niveau : {props.player.niveau} 12</div>
                {props.player.alignement && <div className="joueur-name">{props.player.pseudo}</div>}
            </div>
        </div>
    </>
}

export default Player