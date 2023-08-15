import React from 'react'
import '../../../styles/app.css'
import Field from "../../../components/forms/field/Field";
import Select from "../../../components/forms/select/Select";
import sequenceApi from "../../../services/sequenceApi";
import actionTypeApi from "../../services/actionTypeApi";
import ActionForm from "./ActionForm";
import mapMakerApi from "../../services/MapMakerApi";
import {connect} from "react-redux";
import {
    addQuestMakerAction,
    addQuestMakerSequence,
    removeQuestMakerSequence,
    setQuestMakerActions,
    updateQuestMakerSequence
} from "../../../store/actions";
import EquipementApi from "../../../services/EquipementApi";
import consommableApi from "../../../services/consommableApi";
import objectApi from "../../../services/objectApi";
import RecompenseForm from "./RecompenseForm";

class SequenceForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sequence: this.props.sequence,
            currentActionType: 1,
            currentActionName: "",
            sequences: [],
            actionTypes: [],
            actions: this.props.sequence.actions,
            pnjs: [],
            equipements: [],
            consommables: [],
            objets: [],
        }

    }

    componentDidMount() {
        this.fetchSequences();
        this.fetchActionTypes();
        this.fetchPnjs();
        this.fetchSelectElements();
    }

    fetchSelectElements = async () =>{
        const equipements = await EquipementApi.getAllEquipements();
        const consommables = await consommableApi.getAllConsommables();
        const objets = await objectApi.getAllObjects();
        this.setState({equipements: equipements, consommables: consommables, objets: objets});
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
        const sequence = {...this.props.sequence, [name]: value}
        this.props.updateQuestMakerSequence(this.props.index, sequence);
    }

    handleActionTypeChange = (event) =>{
        this.setState({currentActionType: event.target.value, currentActionTypeName: this.state.actionTypes[event.target.value-1].name});
    }

    handleAddAction = () =>{
        const actionTypeName = this.state.currentActionTypeName ? this.state.currentActionTypeName : this.state.actionTypes[this.state.currentActionType-1].name;
        console.log(this.props.sequence);
        this.props.addQuestMakerAction({actionId: 0, actionTypeId: this.state.currentActionType, actionTypeName: actionTypeName}, this.props.index);
    }

    getSequence = () => {
        return this.props.questMaker.sequences[this.props.index]
    }


    render(){
        return (
            <div className="sequence-container">
                <div className="sequence-form-container">
                    <div className="sequence-form-left">
                        <Field name="nomSequence" type="text" label="Nom" value={this.getSequence().nomSequence} onChange={this.handleSequenceChange}/>
                        <Field name="isLast" type="number" label="Dernière sequence" value={false} onChange={this.handleSequenceChange}/>
                        <Field name="position" type="number" label="Position" value={this.state.position} onChange={this.handleSequenceChange}/>
                    </div>

                    <div className="sequence-form-right">
                        <Select name="lastSequence" value={this.getSequence().lastSequence} label="Sequence précédante" onChange={this.handleSequenceChange}>
                            <option value="0">Aucune</option>
                            {this.state.sequences.length > 0 && this.state.sequences.map(sequence => <option key={sequence.id} value={sequence.id}>{sequence.name}</option>)}
                        </Select>

                        <Select name="nextSequence" value={this.getSequence().nextSequence} label="Sequence suivante" onChange={this.handleSequenceChange}>
                            <option value="0">Aucune</option>
                            {this.state.sequences.length > 0 && this.state.sequences.map(sequence => <option key={sequence.id} value={sequence.id}>{sequence.name}</option>)}
                        </Select>

                        <Select name="pnj" value={this.getSequence().pnj} label="Pnj" onChange={this.handleSequenceChange}>
                            <option value="0">Aucune</option>
                            {this.state.pnjs.length > 0 && this.state.pnjs.map(pnj => <option key={pnj.id} value={pnj.id}>{pnj.name}</option>)}
                        </Select>
                    </div>
                </div>

                <div className="sequence-actions-container">
                    <Field name="dialogueTitre" type="text" label="Titre" value={this.getSequence().dialogueTitre} onChange={this.handleSequenceChange}/>
                    <textarea className="quest-maker-textarea" name="dialogueContent" value={this.getSequence().dialogueContent} onChange={this.handleSequenceChange}/>
                </div>
                <div className="quest-maker-actions-container">
                    <div className="quest-maker-actions-form">
                        <div className="map-maker-btn-validation" onClick={() => this.handleAddAction()}>Ajouter une action</div>
                        <Select name="typeAction" label="Type action" value={this.state.currentActionType} onChange={this.handleActionTypeChange}>
                            {this.state.actionTypes.length > 0 && this.state.actionTypes.map(actionType => <option key={actionType.id} value={actionType.id}>{actionType.name}</option>)}
                        </Select>
                    </div>
                    Actions
                    <div className="quest-maker-actions">
                        {this.props.questMaker.sequences[this.props.index].actions && this.props.questMaker.sequences[this.props.index].actions.map((action, index) => {
                            return <ActionForm key={index} action={action} sequenceIndex={this.props.index} actionIndex={index} typeId={action.actionTypeId} />
                        })}
                    </div>
                    recompenses
                    <div className="quest-maker-actions">
                        <RecompenseForm recompense={this.getSequence().recompense} sequenceIndex={this.props.index}
                                        objets={this.state.objets}
                                        equipements={this.state.equipements}
                                        consommables={this.state.consommables}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state, ownProps) => {
    return {questMaker: state.data.questMaker, ownProps};
}, {addQuestMakerSequence, updateQuestMakerSequence, removeQuestMakerSequence, addQuestMakerAction, setQuestMakerActions})(SequenceForm);