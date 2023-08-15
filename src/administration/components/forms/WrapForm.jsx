import React from 'react'
import '../../../styles/app.css'
import {connect} from "react-redux";
import {addWrapTool,updateModeMapMaker} from "../../../store/actions";
import Select from "../../../components/forms/select/Select";
import MapMakerApi from "../../services/MapMakerApi";

class WrapForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            mapId: 1,
            caseId: 0,
            casesInfos: []
        }
    }

    async componentDidMount() {
        const casesInfos = await MapMakerApi.getCasesInfoForSelect(this.state.mapId);
        this.setState({casesInfos})


    }

    async handleChangeMap(event){
        const mapId = event.target.value;
        this.setState({mapId})
        const casesInfos = await MapMakerApi.getCasesInfoForSelect(mapId);
        this.setState({casesInfos})
    }

    handleChangeCase(event){
        const caseId = event.target.value;
        this.setState({caseId})
    }

    handleSubmit(){
        this.props.updateModeMapMaker({
            type: 'wrap',
            data: {
                mapId: this.state.mapId,
                caseId:  this.state.caseId
            }
        })
    }


    render(){
        return (
            <form>
                <Select name="map" label="map visée : " value={this.state.mapId} onChange={(event) => this.handleChangeMap(event)}>
                    {this.props.maps && this.props.maps.map(map =>
                        <option key={map.carteId} value={map.carteId}>{map.nom}</option>
                    )}
                </Select>
                <Select name="map" label="case visée : " value={this.state.caseId} onChange={(event) => this.handleChangeCase(event)}>
                    {this.state.casesInfos && this.state.casesInfos.map(map =>
                        <option key={map.carteCarreauId} value={map.carteCarreauId}>{map.carteCarreauId} : ({map.abscisse}, {map.ordonnee})</option>
                    )}
                </Select>

                <div className="map-maker-btn-validation" onClick={() => this.handleSubmit()}>Ajouter ce wrap à l'outil</div>
            </form>
        )
    }

}


export default connect((state, ownProps) => {
    return {mapMaker: state.data.mapMaker, ownProps};
}, {addWrapTool, updateModeMapMaker})(WrapForm);