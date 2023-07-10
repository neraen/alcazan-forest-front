import React from "react";
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