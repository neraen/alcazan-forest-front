import React, {useContext, useEffect} from 'react'
import MapContext from "../contexts/MapContext";
import {connect} from "react-redux";
import {updatePlayerTarget} from "../store/actions";

const Player = (props) => {

    useEffect(() => {
        console.log(props.player.classe+"_"+ props.player.sexe)
        if(props.hasMonstre){
            setTarget(props.hasMonstre, "monstre")
            window.localStorage.setItem('target', JSON.stringify({id: props.hasMonstre, type: "monstre"}));
        }
    }, [])

    const {setTarget, setIsPlayer, target} = useContext(MapContext)

    const handleTarget = () =>{
        setTarget(props.player.idJoueur, "player")
        //props.updatePlayerTarget({targetId: props.player.idJoueur, type: "player"})
        window.localStorage.setItem('target', JSON.stringify({id: props.player.idJoueur, type: "player"}));
    }

    return <>
        <div className="joueur" style={{backgroundImage: "url(../img/classes/"+props.player.nomClasse+"_"+ props.player.sexe +".png)"}} onClick={handleTarget}>
            <div className="joueur-hover d-none flex-column">
                <div className="joueur-name">{props.player.pseudo}</div>
                <div className="joueur-level">Niveau : {props.player.niveau}</div>
                {props.player.alignement && <div className="joueur-name">{props.player.alignement}</div>}
            </div>
        </div>
    </>
}

//export default Player

export default connect(null, (dispatch, ownProps) => {
    return {
        ownProps,
        updatePlayerTarget: (targetId, type) => dispatch(updatePlayerTarget(targetId, type))
    }
})(Player)