import React from 'react'
import '../../../styles/app.css'
import {connect} from "react-redux";
import {addWrapTool,updateModeMapMaker} from "../../../store/actions";
import Field from "../../../components/forms/field/Field";
import Select from "../../../components/forms/select/Select";
import MapMakerApi from "../../services/MapMakerApi";

class MonstreAddForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            monstreInfos: [],
            monstreId: 1,
            quantity: 0
        }
    }

    async componentDidMount() {
        const monstreInfos = await MapMakerApi.getMonstreInfoForSelect();
        this.setState({monstreInfos: monstreInfos})
    }

    handleChangeMonstre(event){
        const { name, value } = event.currentTarget;
        this.setState({ ...this.state, [name]: value });
    };

    handleSubmit(){
        this.props.updateModeMapMaker({
            type: 'monstre',
            data: {
                monstreId: this.state.monstreId,
                quantity: this.state.quantity
            }
        })
    }


    render(){
        return (
            <form>
                <Select name="monstreId" label="Monstre : " value={this.state.monstreId} onChange={(event) => this.handleChangeMonstre(event)}>
                    {this.state.monstreInfos && this.state.monstreInfos.map(monstre =>
                        <option key={monstre.id} value={monstre.id}>{monstre.name}</option>
                    )}
                </Select>
                <Field name="quantity" label="Quantité" type="number" value={this.state.quantity} onChange={(event) => this.handleChangeMonstre(event)}/>
                <div className="map-maker-btn-validation" onClick={() => this.handleSubmit()}>Ajouter ce monstre à l'outil</div>
            </form>
        )
    }

}


export default connect((state, ownProps) => {
    return {mapMaker: state.data.mapMaker, ownProps};
}, {addWrapTool, updateModeMapMaker})(MonstreAddForm);