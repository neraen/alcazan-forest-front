import React from "react";
import CreateEquipementForm from "../components/forms/CreateEquipementForm";

class EquipementPage extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <CreateEquipementForm />
            </>
        );
    }

}

export default EquipementPage;