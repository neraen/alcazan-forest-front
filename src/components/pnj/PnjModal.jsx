import useModal from "../../hooks/useModal";
import React from "react";
import Modal from "../Modal";
import ShopView from "./ShopView";
import QuestView from "./QuestView";
import ActionView from "./ActionView";
import GuildeView from "./GuildeView";

class PnjModal extends React.Component{

    constructor(props) {
        super(props);
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