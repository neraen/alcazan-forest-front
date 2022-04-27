import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {updatePlayerTarget} from "../store/actions";

const Player = (props) => {

    useEffect(() => {
        if(props.hasMonstre){
            props.updatePlayerTarget({targetId: props.hasMonstre, type: "monstre"})
        }
    }, [])

    const handleTarget = () =>{
        props.updatePlayerTarget({targetId: props.player.idJoueur, type: "player"})
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

export default connect(null, (dispatch, ownProps) => {
    return {
        ownProps,
        updatePlayerTarget: (targetId, type) => dispatch(updatePlayerTarget(targetId, type))
    }
})(Player)