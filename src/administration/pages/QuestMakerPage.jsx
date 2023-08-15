import React from 'react';
import Select from "../../components/forms/select/Select";
import Field from "../../components/forms/field/Field";
import QuestForm from "../components/forms/QuestForm";
import QuestMakerApi from "../services/QuestMakerApi";
import {connect} from "react-redux";

class QuestMakerPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            questId: 1,
            name: ""
        }
    }

    async componentDidMount (){
        const quests = await QuestMakerApi.getAllQuests();
        this.setState({quests});
    }

    handleChangeQuest(event){
        const questId = event.target.value;
        this.setState({questId});
    }

    handleSubmit(){
        QuestMakerApi.updateQuest(this.state.questId, this.props.questMaker);
    }

    handleChangeQuestName(event){
        const name = event.target.value;
        this.setState({name})
    }

    async handleSubmitQuestName(){
        await QuestMakerApi.createQuest(this.state.name);
    }

    render(){
        return <>
            <form className="form-add-quest" action="">
                <Field name="name" label="Nom de la quête" type="text" value={this.state.name} onChange={(event) => this.handleChangeQuestName(event)} />
                <div className="map-maker-btn-validation" onClick={() => this.handleSubmitQuestName()}>Creer une quête</div>
            </form>
            <h1>Editer une quête</h1>
            <div className="quest-page-maker-container">
                <Select onChange={(event) => this.handleChangeQuest(event)}>
                    {this.state.quests && this.state.quests.map(quest =>
                        <option key={quest.id} value={quest.id}>{quest.name}</option>
                    )}
                </Select>
                <QuestForm questId={this.state.questId}/>
            </div>
        </>
    };

}

export default connect((state, ownProps) => {
    return {questMaker: state.data.questMaker, ownProps};
})(QuestMakerPage);
