import React from 'react'

import {connect} from "react-redux";

const UserStatsBlock = (props) => {

    return <>
        <div className="user-stats-block py-3 px-3 row">
            <div className="user-stats-container">
                <span><img className="coin-icon" src="/img/gui/Money03.png" /> {props.joueurState.money} Or</span>
                <div className="user-stats-points">
                    <span className="pm"><img src="/img/gui/10.png"/> {props.joueurState.pa} PA</span>
                    <span className="pa"><img src="/img/gui/36.png"/> {props.joueurState.pm} PM</span>
                </div>
            </div>
        </div>

    </>
}

export default connect((state, ownProperties) =>{
    return {joueurState: {...state.data.joueurState}, ownProperties}
})(UserStatsBlock)