import useModal from "../../../hooks/useModal";
import React from "react";
import Modal from "../../modal/Modal";
import ShopView from "../shopView/ShopView";
import QuestView from "../questView/QuestView";
import ActionView from "../actionView/ActionView";
import GuildeView from "../guildeView/GuildeView";
import distanceCalculator from "../../../services/distanceCalculator";

class PnjModal extends React.Component{

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return  <Modal
            isShowing={this.props.isDialogShowed}
            hide={this.props.toggleDialogPnj}
            title={this.props.title}>
            {this.props.typePnj === "shop" && (
                <ShopView typeShop={this.props.typeShop} items={this.props.data}/>
            )}
            {this.props.typePnj === "quest" &&(
                <QuestView pnjId={this.props.pnjId} />
            )}
            {this.props.typePnj === "action" &&(
                <ActionView pnjId={this.props.pnjId} />
            )}
            {this.props.typePnj === "guilde" &&(
                <GuildeView pnjId={this.props.pnjId} />
            )}

        </Modal>
    }
}

export default PnjModal