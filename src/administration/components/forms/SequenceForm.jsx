import React from 'react'
import '../../../styles/app.css'
import Field from "../../../components/forms/Field";
import Select from "../../../components/forms/Select";
import ActionGiveObjectForm from "./actions/ActionGiveObjectForm";
import sequenceApi from "../../../services/sequenceApi";
import actionTypeApi from "../../services/actionTypeApi";
import ActionForm from "./ActionForm";

class SequenceForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:  "",
            hasAction: false,
            isLast: false,
            position: 0,
            lastSequence: 0,
            nextSequence: 0,
            currentActionType: 1,
            currentActionName: "",
            sequences: [],
            actionTypes: [],
            actions: this.props.sequence.actions
        }
    }

    componentDidMount() {
        this.fetchSequences();
        this.fetchActionTypes();
    }

    fetchSequences = async () =>{
        const sequences = await sequenceApi.getAllSequences();
        this.setState({sequences: sequences}, () => console.log(this.state.sequences))
    }

    fetchActionTypes = async () =>{
        const actionTypes = await actionTypeApi.getAllActionTypes();
        this.setState({actionTypes: actionTypes})
    }

    handleSequenceChange(event){
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        this.setState({[name]: value})
    }

    handleActionTypeChange = (event) =>{
        this.setState({currentActionType: event.target.value, currentActionTypeName: event.currentTarget.name});
    }

    handleAddAction = () =>{
        const actionTypeName = this.state.currentActionTypeName ? this.state.currentActionTypeName : this.state.actionTypes[this.state.currentActionType-1].name;
        this.setState({actions: [...this.state.actions,
                {id: this.state.actions.length, actionTypeId: this.state.currentActionType, actionTypeName: actionTypeName}]
        })
    }


    render(){
        return (
            <div className="sequence-container">
                <div className="sequence-form-container">
                    <div className="sequence-form-left">
                        <Field name="name" type="text" label="Nom" value={this.state.name} onChange={this.handleSequenceChange}/>
                        <Field name="isLast" type="number" label="Dernière sequence" value={false} onChange={this.handleSequenceChange}/>
                        <Field name="position" type="number" label="Position" value={this.state.position} onChange={this.handleSequenceChange}/>
                    </div>

                    <div className="sequence-form-right">
                        <Select name="lastSequence" value={this.state.lastSequence} label="Sequence précédante" value={this.state.lastSequence} onChange={this.handleSequenceChange}>
                            <option value="0">Aucune</option>
                            {this.state.sequences.length > 0 && this.state.sequences.map(sequence => <option key={sequence.id} value={sequence.id}>{sequence.name}</option>)}
                        </Select>

                        <Select name="nextSequence" value={this.state.nextSequence} label="Sequence suivante" value={this.state.nextSequence} onChange={this.handleSequenceChange}>
                            <option value="0">Aucune</option>
                            {this.state.sequences.length > 0 && this.state.sequences.map(sequence => <option key={sequence.id} value={sequence.id}>{sequence.name}</option>)}
                        </Select>
                    </div>
                </div>

                <div className="quest-maker-actions-container">
                    <div className="quest-maker-actions-form">
                        <div className="map-maker-btn-validation" onClick={() => this.handleAddAction()}>Ajouter une action</div>
                        <Select name="typeAction" label="Type action" value={this.state.currentActionType} onChange={this.handleActionTypeChange}>
                            {this.state.actionTypes.length > 0 && this.state.actionTypes.map(actionType => <option key={actionType.id} value={actionType.id}>{actionType.name}</option>)}
                        </Select>
                    </div>

                    <div className="quest-maker-actions">
                        {this.state.actions && this.state.actions.map((action) => {
                            return <ActionForm key={action.id} action={action} typeId={action.actionTypeId}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default SequenceForm;