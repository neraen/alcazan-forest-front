import React, {useEffect, useState} from "react";
import useModal from "../../../hooks/useModal";
import pnjApi from "../../../services/pnjApi";
import UserActionApi from "../../../services/UserActionApi";
import PnjModal from "../pnjModal/PnjModal";
import {connect} from "react-redux";
import distanceCalculator from "../../../services/distanceCalculator";


const Pnj = (props) => {

    const { isShowing: isDialogShowed, toggle: toggleDialogPnj } = useModal();
    const [sequence, setSequence] = useState();
    const [clicked, setClicked] = useState(false);
    const [pnjInfo, setPnjInfo] = useState({
        typepnj: "",
        typeShop: "",
        items: []
    })

    useEffect(() => {
        //getSequence()
    }, []);

    const getSequence = async () =>  {

        const sequenceData = await pnjApi.getSequence(props.pnj.pnjId);
        setSequence(sequenceData);
    }

    const handleAction = async (link, params) => {
        await UserActionApi.applyUserAction(link, params)
    }

    const getPnjInfos = async () => {
        const pnjInfos = await pnjApi.getPnjInfos(props.pnj.pnjId)
        setPnjInfo(pnjInfos);
        toggleDialogPnj()
    }

    const isDialogAvailable = () => {
        return isDialogShowed && isPlayerNearPnj();
    }

    const isPlayerNearPnj = () => {
        console.log(props);
        return distanceCalculator.computeDistance(props.abscisse, props.ordonnee, props.positionJoueur.abscisse, props.positionJoueur.ordonnee) < 2;
    }


    return <>
        <div className="pnj" style={{backgroundImage: "url(../../../img/pnj/"+props.pnj.pnjSkin+".png)"}} onClick={getPnjInfos}>
            <div className="pnj-hover d-none flex-column">
                <div className="pnj-name">{props.pnj.pnjName}</div>
                <div className="pnj-description">{props.pnj.pnjDescription}</div>
            </div>
        </div>

        <PnjModal toggleDialogPnj={toggleDialogPnj} isDialogShowed={isDialogAvailable()} pnjId={props.pnj.pnjId} title={pnjInfo.title} typePnj={pnjInfo.typePnj} typeShop={pnjInfo.typeShop} data={pnjInfo.items}/>

        {/*{clicked && sequence !== [] &&*/}
        {/*<Modal*/}
        {/*    isShowing={isDialogShowed}*/}
        {/*    hide={toggleDialogPnj}*/}
        {/*    title={sequence && sequence[0].dialogTitle}*/}
        {/*>*/}
        {/*    <div>*/}
        {/*        {sequence && sequence[0].dialogContent}*/}
        {/*        {sequence && sequence.map(action => <><button onClick={() => handleAction(action.actionLink, action.actionParams)} className="btn-action">{action.actionName}</button><br/> </>)}*/}


        {/*    </div>*/}
        {/*</Modal>*/}
        {/*}*/}
    </>
}

export default connect((state, ownProps) => {
    return {positionJoueur: state.data.positionJoueur, ownProps};
}, {})(Pnj);