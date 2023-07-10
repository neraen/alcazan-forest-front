import React from 'react';
import CreatePnjForm from "../components/forms/CreatePnjForm";

class PnjMakerPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount (){

    }

    render(){
        return <>
            <h1>Creer un pnj</h1>
            <div className="map-maker-container">
            <CreatePnjForm />
            </div>
        </>
    };

}

export default PnjMakerPage;