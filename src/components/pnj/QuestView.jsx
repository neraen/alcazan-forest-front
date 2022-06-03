import React, {useEffect, useState} from "react"
import {connect} from "react-redux";
import {updateJoueurState} from "../../store/actions";
import UserActionApi from "../../services/UserActionApi";
import pnjApi from "../../services/pnjApi";


const QuestView = (props) => {

    const [sequence, setSequence] = useState();

    useEffect(()=>{
        fetchSequenceData();
    }, []);

    const fetchSequenceData = async () => {
        const sequenceData = await pnjApi.getSequence(props.pnjId)
        setSequence(sequenceData);
    }

    const handleAction = async (link, params) => {
        console.log(link, params)
        await UserActionApi.applyUserAction(link, params)
    }

    return(
        <div className="quest-modal-body">
                <div>
                    {sequence && sequence[0].dialogContent}
                    {sequence && sequence.map(action => <><button onClick={() => handleAction(action.actionLink, action.actionParams)} className="btn-action">{action.actionName}</button><br/> </>)}
                </div>
        </div>
    )
}

export default connect((state, ownProperties) =>{
    return {joueurState: {...state.data.joueurState}, ownProperties}
}, {updateJoueurState})(QuestView)