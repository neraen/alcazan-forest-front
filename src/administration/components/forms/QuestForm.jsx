import React from 'react'
import '../../../styles/app.css'
import Select from "../../../components/forms/Select";
import QuestMakerApi from "../../services/QuestMakerApi";
import SequenceForm from "./SequenceForm";
import ActionForm from "./ActionForm";
import ActionGiveObjectForm from "./actions/ActionGiveObjectForm";
import Field from "../../../components/forms/Field";

class QuestForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            questInfos: [],
            selectContent: [],
            questId: 1
        }
    }

    async componentDidMount() {
        const questInfos = await QuestMakerApi.getQuest(this.props.questId);
        this.setState({questInfos: questInfos})
        const selectContent = await QuestMakerApi.getQuestsInfoForSelect();
        this.setState({selectContent: selectContent});
    }

    handleChangePnj(event){
        const pnjId = event.target.value;
        this.setState({pnjId})
    }

    handleAddSequance(){
        console.log(this.state.questInfos.sequences)
        const sequences = this.state.questInfos.sequences;
        sequences.push({
            id: 0,
            position: 0,
            hasAction: 0,
            isLast: false,
            dialogueContent:"",
            dialogueId: 0,
            pnjName: "",
            pnjId: 0,
        });
        this.setState({questInfos: {...this.state.questInfos, sequences: sequences}})
    };

    handleAddAction(){
        const actions = this.state.questInfos.sequences;
        actions.push({
            id: 0,
            position: 0,
            hasAction: 0,
            isLast: false,
            dialogueContent:"",
            dialogueId: 0,
            pnjName: "",
            pnjId: 0,
        });
        this.setState({actions: actions})
    }

    setActionsForSequence(actions){
        this.setState({actions: actions})
    }

    handleSubmit(){
        QuestMakerApi.updateQuest(this.state.questId, this.state.questInfos);
    }

    render(){
        return (
            <>
                <form className="quest-maker-container">
                    <div className="quest-maker-left-part">
                        <Select name="alignement" label="Alignement requis">
                            <option key={0}>Aucun alignement requis</option>
                            {this.state.selectContent.alignements && this.state.selectContent.alignements.map((alignement) => {
                                return <option key={alignement.id}>{alignement.name}</option>
                            })}
                        </Select>
                        <Select name="objet" label="Objet requis">
                            <option key={0}>Aucun objet requis</option>
                            {this.state.selectContent.objets && this.state.selectContent.objets.map((objet) => {
                                return <option key={objet.id}>{objet.name}</option>
                            })}
                        </Select>
                        <Field name="level" label="Level requis" type="number"/>
                    </div>
                    <div className="quest-maker-central-part sequences">
                        <div className="map-maker-btn-validation" onClick={() => this.handleAddSequance()}>Ajouter une sequence</div>
                        {this.state.questInfos.sequences && this.state.questInfos.sequences.map((sequence) => {
                            return <SequenceForm key={sequence.id} sequence={sequence} setActionsForSequence={this.setActionsForSequence}/>
                        })}
                    </div>
                </form>
                <div className="map-maker-btn-validation" onClick={() => this.handleSubmit()}>Valider les changements</div>
            </>
    )
    }

}


export default QuestForm;