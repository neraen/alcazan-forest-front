import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {updatePlayerTarget} from "../../store/actions";

const Player = (props) => {

    useEffect(() => {
        if(props.hasMonstre){
            props.updatePlayerTarget({targetId: props.hasMonstre, type: "monstre"})
        }
        console.log(props);
    }, [])

    const handleTarget = () =>{
        props.updatePlayerTarget({targetId: props.player.idJoueur, type: "player"})
    }

    return <>
        <div className={"joueur " + (props.player.idJoueur !== props.joueurState.joueurId && "joueur-hoverable") } style={{backgroundImage: "url(../img/classes/"+props.player.nomClasse+"_"+ props.player.sexe +".png)"}} onClick={handleTarget}>
            <div className="joueur-hover d-none flex-column">
                <div className="joueur-name">{props.player.pseudo}</div>
                <div className="joueur-level">Niveau : {props.player.niveau}  {props.player.nomAlignement && <img className="icone-alignement" src={"../img/alignement/"+props.player.iconeAlignement} />}</div>
                {/*<div className="joueur-level">{props.player.nomGuilde && <span>{props.player.nomGuilde}</span>}</div>*/}

            </div>
        </div>
    </>
}

export default connect((state, ownProperties) =>{
    return {joueurState: {...state.data.joueurState}, ownProperties}
}, (dispatch, ownProps) => {
    return {
        updatePlayerTarget: (targetId, type) => dispatch(updatePlayerTarget(targetId, type))
    }
})(Player)