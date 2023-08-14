import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {updatePlayerTarget} from "../../store/actions";

const Boss = (props) => {

    useEffect(() => {
        if(props.hasMonstre){
            props.updatePlayerTarget({targetId: props.hasMonstre, type: "monstre"})
        }
    }, [])

    const handleTarget = () =>{
        props.updatePlayerTarget({targetId: props.boss.bossId, type: "boss"})
    }

    return <>
        <div className="joueur" style={{backgroundImage: "url(../img/boss/"+props.boss.bossSkin+".png)"}} onClick={handleTarget}>
            <div className="joueur-hover d-none flex-column">
                <div className="joueur-name">{props.boss.bossName}</div>
                {/*<div className="joueur-level">{props.player.nomGuilde && <span>{props.player.nomGuilde}</span>}</div>*/}

            </div>
        </div>
    </>
}

export default connect(null, (dispatch, ownProps) => {
    return {
        ownProps,
        updatePlayerTarget: (targetId, type) => dispatch(updatePlayerTarget(targetId, type))
    }
})(Boss)