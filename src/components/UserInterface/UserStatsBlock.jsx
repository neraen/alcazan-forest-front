import React, {useEffect, useState} from 'react'
import UsersApi from "../../services/UsersApi";
import {ProgressBar} from "react-bootstrap";
import {connect} from "react-redux";
import {updateJoueurState} from "../../store/actions";

const UserStatsBlock = ({user}) => {

   const [userData, setUserData] = useState({})

    useEffect(() => {
        fetchUserLevel();
    }, [])

    const fetchUserLevel = async () => {
        try {
            const data = await UsersApi.getLevelAndExperience();
            setUserData(data);
        }catch(error){

        }
    }

    return <>
        <div className="user-stats-block py-3 px-3 row">
            <div className="user-stats-container">
                <span><img className="coin-icon" src="/img/gui/Money03.png" /> {user.money} Or</span>
                <div className="user-stats-points">
                    <span className="pm"><img src="/img/gui/10.png"/> {user.mouvementPoint} PA</span>
                    <span className="pa"><img src="/img/gui/36.png"/> {user.actionPoint} PM</span>
                </div>
            </div>
        </div>

    </>
}


export default UserStatsBlock;
