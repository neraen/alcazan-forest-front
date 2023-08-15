import React from 'react';
import EditableMap from "../components/EditableMap";
import Select from "../../components/forms/select/Select";
import MapApi from "../../services/MapApi";
import {connect} from "react-redux";
import {updateModeMapMaker} from "../../store/actions";
import MapMakerApi from "../services/MapMakerApi";
import WrapForm from "../components/forms/WrapForm";
import PnjAddForm from "../components/forms/PnjAddForm";
import MonsterAddForm from "../components/forms/MonsterAddForm";

class MapCreatorPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            displayWrapFrom: false,
            displayMonsterFrom: false,
            displayPnjFrom: false,
        }
    }

    async componentDidMount (){
        const maps = await MapApi.getAllMaps();
        this.setState({maps});
    }

    handleChangeMap(event){
        const mapId = event.target.value;
        this.setState({mapId})
    }

    handleSubmit(){
        MapMakerApi.updateMap(this.state.mapId, this.props.data.mapMaker.cases);
    }

    setCollision(){
        this.props.updateModeMapMaker({
            type: 'collision',
            data: {}
        })
    }

    unsetTool(){
        this.props.updateModeMapMaker( {
            type: '',
            data: {}
        })
    }

    toggleForms(type){
        switch (type){
            case "wrap":
                this.setState({displayWrapFrom: !this.state.displayWrapFrom})
                break;
            case "monster":
                this.setState({displayMonsterFrom: !this.state.displayMonsterFrom})
                break;
            case "pnj":
                this.setState({displayPnjFrom: !this.state.displayPnjFrom})
                break;
        }
    }

    render(){
        return <>
            <h1>Editer une carte</h1>
            <div className="map-maker-container">
                <div className="map-maker-block-map">
                    <Select onChange={(event) => this.handleChangeMap(event)}>
                        {this.state.maps && this.state.maps.map(map =>
                            <option key={map.carteId} value={map.carteId}>{map.nom}</option>
                        )}
                    </Select>
                    <EditableMap mapId={this.state.mapId}/>
                </div>
                <div className="map-maker-block-outils">
                    <h3 className="map-maker-title">Outils</h3>
                    <div className="map-maker-btn-outils-container">
                        <button className="map-maker-btn-outils btn-collison" onClick={() => this.setCollision()}> Ajouter une collision </button>
                        <button className="map-maker-btn-outils btn-wrap" onClick={() => this.toggleForms("wrap")}> Ajouter un wrap </button>
                        {this.state.displayWrapFrom && <WrapForm  maps={this.state.maps}/>}
                        <button className="map-maker-btn-outils btn-pnj" onClick={() => this.toggleForms("pnj")}> Ajouter un PNJ </button>
                        {this.state.displayPnjFrom && <PnjAddForm  />}
                        <button className="map-maker-btn-outils btn-monstre" onClick={() => this.toggleForms("monster")}> Ajouter un monstre </button>
                        {this.state.displayMonsterFrom && <MonsterAddForm />}
                        <button className="map-maker-btn-outils btn-desactive" onClick={() => this.unsetTool()} > Enlever l'outil </button>
                        <button className="map-maker-btn-outils btn-desactive" onClick={() => this.handleSubmit()} > Sauvegarder les changements </button>
                    </div>
                </div>
            </div>
        </>
    };

}

export default MapCreatorPage
