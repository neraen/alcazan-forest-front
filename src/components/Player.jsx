import React, {useContext, useEffect} from 'react'
import MapContext from "../contexts/MapContext";

const Player = (props) => {

    useEffect(() => {
        if(props.hasMonstre){
            setTarget(props.hasMonstre, "monstre")
            window.localStorage.setItem('target', JSON.stringify({id: props.hasMonstre, type: "monstre"}));
        }
    }, [])

    const {setTarget, setIsPlayer, target} = useContext(MapContext)

    const handleTarget = () =>{
        setTarget(props.player.idJoueur, "player")
        window.localStorage.setItem('target', JSON.stringify({id: props.player.idJoueur, type: "player"}));
    }

    return <>
        <div className="joueur" onClick={handleTarget}>
            <div className="joueur-hover d-none flex-column">
                <div className="joueur-name">{props.player.pseudo}</div>
                <div className="joueur-level">Niveau : {props.player.niveau}</div>
                {props.player.alignement && <div className="joueur-name">{props.player.alignement}</div>}
            </div>
        </div>
    </>
}

export default Player