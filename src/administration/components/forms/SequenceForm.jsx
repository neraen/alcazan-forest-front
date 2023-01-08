import React from 'react'
import '../../../styles/app.css'
import Field from "../../../components/forms/Field";
import Select from "../../../components/forms/Select";
import sequenceApi from "../../../services/sequenceApi";
import actionTypeApi from "../../services/actionTypeApi";
import ActionForm from "./ActionForm";
import mapMakerApi from "../../services/MapMakerApi";

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
            pnj: 0,
            currentActionType: 1,
            currentActionName: "",
            sequences: [],
            actionTypes: [],
            actions: this.props.sequence.actions,
            pnjs: []
        }
    }

    componentDidMount() {
        this.fetchSequences();
        this.fetchActionTypes();
        this.fetchPnjs();
    }

    fetchSequences = async () =>{
        const sequences = await sequenceApi.getAllSequences();
        this.setState({sequences: sequences}, () => console.log(this.state.sequences))
    }

    fetchActionTypes = async () =>{
        const actionTypes = await actionTypeApi.getAllActionTypes();
        this.setState({actionTypes: actionTypes})
    }

    fetchPnjs = async () =>{
        const pnjs = await mapMakerApi.getPnjInfoForSelect();
        this.setState({pnjs: pnjs})
    }

    handleSequenceChange = (event) =>{
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        console.log(name);
        this.setState({[name]: value}, () => this.props.handleAllQuestFormChange(this.state))

    }

    handleActionTypeChange = (event) =>{
        this.setState({currentActionType: event.target.value, currentActionTypeName: this.state.actionTypes[event.target.value-1].name});
    }

    handleAddAction = () =>{
        const actionTypeName = this.state.currentActionTypeName ? this.state.currentActionTypeName : this.state.actionTypes[this.state.currentActionType-1].name;
        this.setState({actions: [...this.state.actions,
                {id: this.state.actions.length, actionTypeId: this.state.currentActionType, actionTypeName: actionTypeName}]
        })
    }

    handleActionChange = (action) => {
        const actions = [...this.state.actions];
        const actionsFiltered = actions.filter(a => a.id === action.id);
        if(actionsFiltered.length > 0){
            actions[actions.indexOf(actionsFiltered[0])] = action;
        }else {
            actions.push(action);
        }

        this.setState({actions: actions}, () => this.props.handleAllQuestFormChange(this.state))
    }

    handleSubmitQuest = async (event) =>{

    }


    render(){
        return (
            <div className="sequence-container">
                <button className="map-maker-btn-validation" onChange={this.submitQuest}>Valider la quête</button>
                <div className="sequence-form-container">
                    <div className="sequence-form-left">
                        <Field name={"name-"+ this.props.sequence.id} type="text" label="Nom" value={this.state.name} onChange={this.handleSequenceChange}/>
                        <Field name={"isLast-"+this.props.sequence.id} type="number" label="Dernière sequence" value={false} onChange={this.handleSequenceChange}/>
                        <Field name={"position-"+this.props.sequence.id} type="number" label="Position" value={this.state.position} onChange={this.handleSequenceChange}/>
                    </div>

                    <div className="sequence-form-right">
                        <Select name={"lastSequence-"+this.props.sequence.id} value={this.state.lastSequence} label="Sequence précédante" onChange={this.handleSequenceChange}>
                            <option value="0">Aucune</option>
                            {this.state.sequences.length > 0 && this.state.sequences.map(sequence => <option key={sequence.id} value={sequence.id}>{sequence.name}</option>)}
                        </Select>

                        <Select name={"nextSequence-"+this.props.sequence.id} value={this.state.nextSequence} label="Sequence suivante" onChange={this.handleSequenceChange}>
                            <option value="0">Aucune</option>
                            {this.state.sequences.length > 0 && this.state.sequences.map(sequence => <option key={sequence.id} value={sequence.id}>{sequence.name}</option>)}
                        </Select>

                        <Select name={"pnj-"+this.props.sequence.id} value={this.state.pnj} label="Pnj" onChange={this.handleSequenceChange}>
                            <option value="0">Aucune</option>
                            {this.state.pnjs.length > 0 && this.state.pnjs.map(pnj => <option key={pnj.id} value={pnj.id}>{pnj.name}</option>)}
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
                            return <ActionForm key={action.id} action={action} typeId={action.actionTypeId} handleActionChange={this.handleActionChange}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default SequenceForm;