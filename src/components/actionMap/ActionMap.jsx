import React from 'react'
import UserActionApi from "../../services/UserActionApi";



const ActionMap = (props) => {

    const handleAction = async (link, params, actionId) => {
        const messageData = await UserActionApi.applyUserAction(link, params, actionId);
        //toast(messageData.message);
    }

    return(
        <div onClick={() => handleAction(props.action.actionLink, props.action.actionParams, props.action.actionId)}>""</div>
    )
}

export default ActionMap