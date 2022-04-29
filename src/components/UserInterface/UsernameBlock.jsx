import React, {useEffect, useState} from 'react'

import Bar from "./Bar";
import UsersApi from "../../services/UsersApi";
import StatBar from "./StatBar";
import {connect} from "react-redux";

const UsernameBlock = ({user, joueurState}) => {

    const [userData, setUserData] = useState({})

    useEffect(() => {
        fetchUserLevel();
    }, [])

    const fetchUserLevel = async () => {
        try {
            const experienceData = await UsersApi.getExpJoueur();
            setUserData(experienceData);
        }catch(error){

        }
    }

    let lifePercent = Math.ceil(joueurState.lifeJoueur / user.maxLife * 100)
    let manaPercent = Math.ceil(user.currentMana / user.maxMana * 100)

    return <>
        <div className="username-block mb-3 row">
            <h3 className="player-pseudo">{user.pseudo}</h3>
            <img className="avatar-player" src="/img/gui/CharacterPlayer/Avatar.png" alt=""/>
            <StatBar value={joueurState.lifeJoueur} max={user.maxLife} maxWidth={200} classN="lifeBar"/>
            <StatBar value={user.currentMana} max={user.maxMana} maxWidth={200} classN="manaBar"/>
            <div className="player-level">{userData.niveau}</div>
            {/*<NavLink className="nav-link text-center" to="/">Messagerie</NavLink>*/}
        </div>
    </>
}

export default connect((state, ownProperties) =>{
    return {joueurState: state.data.joueurState, ownProperties}
})(UsernameBlock)
