import React from 'react'
import '../../../styles/app.css'
import {connect} from "react-redux";
import {addWrapTool,updateModeMapMaker} from "../../../store/actions";
import Select from "../../../components/forms/select/Select";
import MapMakerApi from "../../services/MapMakerApi";

class PnjAddForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            pnjInfos: [],
            pnjId: 1
        }
    }

    async componentDidMount() {
        const pnjInfos = await MapMakerApi.getPnjInfoForSelect();
        this.setState({pnjInfos: pnjInfos})
    }

    handleChangePnj(event){
        const pnjId = event.target.value;
        this.setState({pnjId})
    }

    handleSubmit(){
        this.props.updateModeMapMaker({
            type: 'pnj',
            data: {
                pnjId: this.state.pnjId
            }
        })
    }


    render(){
        return (
            <form>
                <Select name="map" label="map visée : " value={this.state.pnjId} onChange={(event) => this.handleChangePnj(event)}>
                    {this.state.pnjInfos && this.state.pnjInfos.map(pnj =>
                        <option key={pnj.id} value={pnj.id}>{pnj.name}</option>
                    )}
                </Select>
                <div className="map-maker-btn-validation" onClick={() => this.handleSubmit()}>Ajouter ce pnj à l'outil</div>
            </form>
        )
    }

}


export default connect((state, ownProps) => {
    return {mapMaker: state.data.mapMaker, ownProps};
}, {addWrapTool, updateModeMapMaker})(PnjAddForm);