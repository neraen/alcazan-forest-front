import React from "react";
import Modal from "./Modal";
import useModal from "../hooks/useModal";


const Pnj = (props) => {

    const { isShowing: isDialogShowed, toggle: toggleDialogPnj } = useModal();


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
            title="Léopold le grand Huvelle : un grand départ"
        >
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus consequuntur corporis delectus dolorem doloremque impedit,
                necessitatibus nihil obcaecati officia repellendus reprehenderit,
                saepe vel. A aliquam possimus praesentium temporibus voluptatum.
            </div>
        </Modal>

    </>
}

export default Pnj;