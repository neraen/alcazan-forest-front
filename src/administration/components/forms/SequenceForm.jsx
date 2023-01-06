import React from 'react'
import '../../../styles/app.css'
import Field from "../../../components/forms/Field";
import Select from "../../../components/forms/Select";
import ActionGiveObjectForm from "./actions/ActionGiveObjectForm";

class SequenceForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:  "",
            hasAction: false,
            isLast: false,
            position: 0,
            lastSequence: 0,
            nextSequence: 0
        }
    }

handleHasActionChange = (event) =>{
    const hasAction = event.target.value;
    this.setState({hasAction})
}
handleSequenceChange(event){

}

    render(){
        return (
            <div className="sequence-container">
                <Field name="name" type="text" label="Nom" value={this.state.name}/>
                <Field name="isLast" type="number" label="Dernière sequence" value={false}/>
                <Field name="position" type="number" label="Position" value={this.state.position} onChange={this.handleSequenceChange}/>

                <Select name="lastSequence" value={this.state.lastSequence} label="Sequence précédante" value={this.state.lastSequence} onChange={this.handleSequenceChange}>
                    <option value="0">Aucune</option>
                </Select>

                <Select name="nextSequence" value={this.state.nextSequence} label="Sequence suivante" value={this.state.nextSequence} onChange={this.handleSequenceChange}>
                    <option value="0">Aucune</option>
                </Select>

                <div className="quest-maker-actions-container">
                    <div className="map-maker-btn-validation" onClick={() => this.handleAddAction()}>Ajouter une action</div>

                    <div className="quest-maker-actions">
                        {this.props.sequence.actions && this.props.sequence.actions.map((action) => {
                            return <ActionGiveObjectForm key={action.id}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default SequenceForm;