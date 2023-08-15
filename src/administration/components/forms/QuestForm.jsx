import React from 'react'
import '../../../styles/app.css'
import Select from "../../../components/forms/select/Select";
import QuestMakerApi from "../../services/QuestMakerApi";
import SequenceForm from "./SequenceForm";
import Field from "../../../components/forms/field/Field";
import {connect} from "react-redux";
import {
    addQuestMakerSequence,
    setQuestMakerActions,
    setQuestMakerSequences,
    updateQuestMaker
} from "../../../store/actions";

class QuestForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            questInfos: [],
            questContent: [],
            selectContent: [],
            questForm: [],
            questId: this.props.questId
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.questId !== this.props.questId){
            this.setState({questId: nextProps.questId}, () => {
                this.componentDidMount();
            })
        }
    }

    async componentDidMount() {
        console.log(this.props.questId);
        const questInfos = await QuestMakerApi.getQuest(this.state.questId);
        this.setState({questInfos: questInfos})
        if(questInfos.sequences !== undefined){
            this.props.setQuestMakerSequences(questInfos.sequences);
        }else{
            this.props.setQuestMakerSequences([]);
        }
        const selectContent = await QuestMakerApi.getQuestsInfoForSelect();
        this.setState({selectContent: selectContent});
        this.props.updateQuestMaker({
            alignement: questInfos.alignement,
            objet: questInfos.objet,
            level: questInfos.level,
            name: questInfos.name
        });
    }

    handleChangePnj(event){
        const pnjId = event.target.value;
        this.setState({pnjId})
    }

    handleAddSequance(){
        const sequence = {
            id: 0,
            position: 0,
            hasAction: 0,
            isLast: false,
            dialogueContent:"",
            dialogueId: 0,
            pnjName: "",
            pnjId: 0,
            actions: [],
            recompense: []
        };
        this.props.addQuestMakerSequence(sequence);
    };

   async handleSubmit(){
        await QuestMakerApi.updateQuest(this.state.questId, this.props.questMaker);
    }

    handleQuestFormChange(event){
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        this.setState({questForm: {...this.state.questForm, [name]: value}}, () => {
            this.props.updateQuestMaker(this.state.questForm);
        });
    }

    render(){
        return (
            <>
                <form className="quest-maker-container">
                    <div className="quest-maker-left-part">
                        <h2 className="title-map-font">Prérequis</h2>
                        <Select name="alignement" label="Alignement requis" value={this.props.questMaker.alignement} onChange={(event) => this.handleQuestFormChange(event)}>
                            <option>Aucun alignement requis</option>
                            {this.state.selectContent.alignements && this.state.selectContent.alignements.map((alignement) => {
                                return <option key={alignement.id} value={alignement.id}>{alignement.name}</option>
                            })}
                        </Select>
                        <Select name="objet" label="Objet requis" value={this.props.questMaker.objet} onChange={(event) => this.handleQuestFormChange(event)}>
                            <option>Aucun objet requis</option>
                            {this.state.selectContent.objets && this.state.selectContent.objets.map((objet) => {
                                return <option key={objet.id} value={objet.id}>{objet.name}</option>
                            })}
                        </Select>
                        <Field name="level" label="Level requis" type="number" value={this.props.questMaker.level} onChange={(event) => this.handleQuestFormChange(event)}/>
                    </div>
                    <div className="quest-maker-central-part sequences">
                        <div className="map-maker-btn-validation" onClick={() => this.handleAddSequance()}>Ajouter une sequence</div>
                        {this.props.questMaker.sequences && this.props.questMaker.sequences.map((sequence, index) => {
                            return <SequenceForm key={index} index={index} sequence={sequence} />
                        })}
                    </div>
                </form>
                <div className="map-maker-btn-validation" onClick={() => this.handleSubmit()}>Valider les changements</div>
            </>
    )
    }

}


export default connect((state, ownProps) => {
    return {questMaker: state.data.questMaker, ownProps};
}, {setQuestMakerSequences, setQuestMakerActions, updateQuestMaker, addQuestMakerSequence})(QuestForm);