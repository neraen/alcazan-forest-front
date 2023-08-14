import React from 'react'
import StatBar from "../statBar/StatBar";
import {connect} from "react-redux";
import {updateJoueurState} from "../../../store/actions";
import Loader from "../../loader/Loader";

const UsernameBlock = (props) => {
    return <>
        {(props.joueurState.level && props.joueurState.lifeJoueur) && (
            <div className="username-block mb-3 row">
                <h3 className="player-pseudo">{props.user.pseudo}</h3>
                <img className="avatar-player" src="/img/gui/CharacterPlayer/Avatar.png" alt=""/>
                <StatBar value={props.joueurState.lifeJoueur} max={props.user.maxLife} maxWidth={window.innerWidth / 10} classN="lifeBar"/>
                <StatBar value={props.user.currentMana} max={props.user.maxMana} maxWidth={window.innerWidth / 10} classN="manaBar"/>
                <div className="player-level">{props.joueurState.level}</div>
                {/*<NavLink className="nav-link text-center" to="/">Messagerie</NavLink>*/}
            </div>
        ) || <Loader maxWidth={200} maxHeight={200}/>}
    </>
}

export default connect((state, ownProperties) =>{
    return {joueurState: state.data.joueurState, ownProperties}
}, {updateJoueurState})(UsernameBlock)
