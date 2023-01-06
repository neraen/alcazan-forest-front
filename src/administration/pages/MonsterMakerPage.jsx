import React from 'react';
import CreateMonsterForm from "../components/forms/CreateMonsterForm";

class MonsterMakerPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount (){

    }

    render(){
        return <>
            <h1>Creer un monstre</h1>
            <div className="map-maker-container">
            <CreateMonsterForm />
            </div>
        </>
    };

}

export default MonsterMakerPage;