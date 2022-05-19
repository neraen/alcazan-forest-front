import React from 'react';
import EditableMap from "../components/EditableMap";
import Select from "../../components/forms/Select";
import MapApi from "../../services/MapApi";
import {connect} from "react-redux";
import {updateModeMapMaker} from "../../store/actions";
import MapMakerApi from "../services/MapMakerApi";
import WrapForm from "../components/forms/WrapForm";
import PnjAddForm from "../components/forms/PnjAddForm";
import MonsterAddForm from "../components/forms/MonsterAddForm";
import CreatePnjForm from "../components/forms/CreatePnjForm";
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