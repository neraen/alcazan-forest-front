import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import pnjApi from "../services/pnjApi";
import UserActionApi from "../services/UserActionApi";


const Pnj = (props) => {

    const { isShowing: isDialogShowed, toggle: toggleDialogPnj } = useModal();
    const [sequence, setSequence] = useState();

    useEffect(() => {
        getSequence()
    }, []);

    const getSequence = async () =>  {

        const sequenceData = await pnjApi.getSequence(props.pnj.pnjId);
        setSequence(sequenceData);
    }

    const handleAction = async (link, params) => {
        await UserActionApi.applyUserAction(link, params)
    }


    return <>
        <div className="pnj" style={{backgroundImage: "url(../../../img/pnj/"+props.pnj.pnjSkin+".png)"}} onClick={toggleDialogPnj}>
            <div className="pnj-hover d-none flex-column">
                <div className="pnj-name">{props.pnj.pnjName}</div>
                <div className="pnj-description">{props.pnj.pnjDescription}</div>
            </div>
        </div>

        {sequence !== [] &&
        <Modal
            isShowing={isDialogShowed}
            hide={toggleDialogPnj}
            title={sequence && sequence[0].dialogTitle}
        >
            <div>
                {sequence && sequence[0].dialogContent}
                {sequence && sequence.map(action => <><button onClick={() => handleAction(action.actionLink, action.actionParams)} className="btn-action">{action.actionName}</button><br/> </>)}


            </div>
        </Modal>
        }
    </>
}

export default Pnj;