import React, {useEffect, useState} from 'react'
import MapApi from "../../services/MapApi";
import UsersApi from "../../services/UsersApi";
import {ProgressBar} from "react-bootstrap";

const UserStatsBlock = ({user}) => {

   // const [user, setUser] = useState({})

    // useEffect(() => {
    //     fetchUserStats();
    // }, [])
    //
    // const fetchUserStats = async () => {
    //     try {
    //         const data = await UsersApi.find(props.userId);
    //         setUser(data);
    //     }catch(error){
    //
    //     }
    // }

    let lifePercent = Math.ceil(user.currentLife / user.maxLife * 100)
    let manaPercent = Math.ceil(user.currentMana / user.maxMana * 100)
    return <>
        <div className="user-stats-block py-3 px-3 row">
            <h3 className="text-center title-font">Statistiques</h3>
            <div className="bars mb-3">
                <div className="d-flex align-items-center w100">
                    <img className="life-icon mr-2" src="/img/icons/pixel-life.png" />
                    <ProgressBar className="progress-bar-stats" variant="danger" now={lifePercent} label={user.currentLife +  " / " + user.maxLife}/>
                </div>
                <div className="d-flex align-items-center w100">
                    <img className="mana-icon mr-2" src="/img/icons/mana.png" />
                    <ProgressBar className="progress-bar-stats" variant="info" now={manaPercent} label={user.currentMana +  " / " + user.maxMana}/>
                </div>
            </div>
            <div className="gold">
                <span><img className="coin-icon" src="/img/icons/coin.svg" /> {user.money} Or</span>
            </div>
            <div className="raw">
                <span className="pm col-4">PM : {user.mouvementPoint}</span>
                <span className="pa offset-2 col-4">PA : {user.actionPoint}</span>
            </div>
        </div>

    </>
}

export default UserStatsBlock