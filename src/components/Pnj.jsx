import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import pnjApi from "../services/pnjApi";


const Pnj = (props) => {

    const { isShowing: isDialogShowed, toggle: toggleDialogPnj } = useModal();
    const [sequence, setSequence] = useState();

    useEffect(() => {
        getSequance()
    }, []);

    const getSequance = async () =>  {

        const sequenceData = await pnjApi.getSequance(props.pnj.pnjId);
        console.log(sequenceData);
        setSequence(sequenceData);
    }

    const handleAction = () => {

    }


    return <>
        <div className="pnj" style={{backgroundImage: "url(../../../img/pnj/"+props.pnj.pnjSkin+".png)"}} onClick={toggleDialogPnj}>
            <div className="pnj-hover d-none flex-column">
                <div className="pnj-name">{props.pnj.pnjName}</div>
                <div className="pnj-description">{props.pnj.pnjDescription}</div>
            </div>
        </div>

        <Modal
            isShowing={isDialogShowed}
            hide={toggleDialogPnj}
            title={sequence && sequence[0].dialogTitle}
        >
            <div>

                {sequence && sequence[0].dialogContent}

                    {sequence && sequence.map(action => <><button className="btn-action">{action.actionName}</button><br/> </>)}


            </div>
        </Modal>

    </>
}

export default Pnj;