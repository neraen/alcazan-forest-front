import React from 'react'
import '../../../styles/app.css'
import Field from "../../../components/forms/field/Field";
import Select from "../../../components/forms/select/Select";
import {connect} from "react-redux";
import {
    updateQuestMakerSequenceRecompense
} from "../../../store/actions";


class RecompenseForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }


    handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        const recompense = Object.assign({...this.props.questMaker.sequences[this.props.sequenceIndex].recompense}, {[name]: value});

        this.props.updateQuestMakerSequenceRecompense(recompense, this.props.sequenceIndex);
    }

    getSequence(){
        return this.props.questMaker.sequences[this.props.sequenceIndex];
    }

    render(){
        return (
            <div className="action-container">
                <h6>Recompense pour cette séquence</h6>
                <Field name="argent" value={this.getSequence().recompense.money} onChange={this.handleChange} label="Argent"/>
                <Field name="experience" value={this.getSequence().recompense.experience} onChange={this.handleChange} label="Experience"/>
                <Field name="quantity" value={this.getSequence().recompense.quantity} onChange={this.handleChange} label="quantity"/>

                <Select name="objet" value={this.getSequence().recompense.objet} onChange={this.handleChange} label="Objet">
                    <option value={0}>selectionner un objet</option>
                    {this.props.objets && this.props.objets.length > 0 && this.props.objets.map((objet, index) => {
                        return <option key={index} value={objet.id}>{objet.name}</option>
                    })}
                </Select>

                <Select name="equipement" value={this.getSequence().recompense.equipement} onChange={this.handleChange} label="Equipement">
                    <option value={0}>selectionner un équipement</option>
                    {this.props.equipements && this.props.equipements.length > 0 && this.props.equipements.map((equipement, index) => {
                        return <option key={index} value={equipement.id}>{equipement.name}</option>
                    })}
                </Select>

                <Select name="consommable" value={this.getSequence().recompense.consommable} onChange={this.handleChange} label="Consommable">
                    <option value={0}>selectionner une potion</option>
                    {this.props.consommables && this.props.consommables.length > 0 && this.props.consommables.map((consommable, index) => {
                        return <option key={index} value={consommable.id}>{consommable.name}</option>
                    })}
                </Select>
            </div>
        )
    }
}

export default connect((state, ownProps) => {
    return {questMaker: state.data.questMaker, ownProps};
}, {updateQuestMakerSequenceRecompense})(RecompenseForm);