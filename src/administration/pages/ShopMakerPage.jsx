import React from "react";
import CreateEquipementForm from "../components/forms/CreateEquipementForm";
import ShopAddForm from "../components/forms/ShopAddForm";

class ShopMakerPage extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <ShopAddForm />
            </>
        );
    }

}

export default ShopMakerPage;