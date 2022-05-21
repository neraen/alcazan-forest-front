import useModal from "../../../hooks/useModal";
import React from "react";
import Modal from "../../../components/Modal";
import ShopView from "./ShopView";

class PnjModal extends React.Component{

    constructor(props) {
        super(props);
    }


    render() {
        return  <Modal
            isShowing={this.props.isDialogShowed}
            hide={this.props.toggleDialogPnj}
            title={this.props.title}>
            {this.props.typePnj && (
                <ShopView typeShop={this.props.typeShop} items={this.props.data}/>
            )}
        </Modal>
    }


}

export default PnjModal