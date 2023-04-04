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
import Field from "../../components/forms/Field";

class WorldMakerPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            maps: [],
        }
    }

    async componentDidMount (){
        const maps = await MapApi.getAllMaps();
        this.setState({maps});
    }

    handleSubmit(){
    }

    render() {
        return <>
            <div className="maps">
                {this.state.maps && this.state.maps.map(map =>
                    <div className="world-map" key={map.carteId}
                         style={{backgroundImage: "url("+require("../../img/map/"+map.carteId+".png").default+")", backgroundSize: 'contain'}}>

                    </div>
                )}
            </div>
        </>
    }
}

export default WorldMakerPage;
