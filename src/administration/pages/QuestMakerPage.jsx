import React from 'react';
import Select from "../../components/forms/Select";
import MapApi from "../../services/MapApi";
import MapMakerApi from "../services/MapMakerApi";
import Field from "../../components/forms/Field";
import QuestForm from "../components/forms/QuestForm";
import QuestMakerApi from "../services/QuestMakerApi";

class QuestMakerPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            questId: 1
        }
    }

    async componentDidMount (){
        const quests = await QuestMakerApi.getAllQuests();
        this.setState({quests});
    }

    handleChangeQuest(event){
        const questId = event.target.value;
        this.setState({questId})
    }

    handleSubmit(){
        MapMakerApi.updateMap(this.state.mapId, this.props.data.mapMaker.cases);
    }

    handleChangeMapName(event){
        const name = event.target.value;
        this.setState({name})
    }

    async handleSubmitMapName(){
        await MapApi.create(this.state.name);
    }

    render(){
        return <>
            <form className="form-add-quest" action="">
                <Field name="name" label="Nom de la quête" type="text" value={this.state.name} onChange={(event) => this.handleChangeMapName(event)} />
                <div className="map-maker-btn-validation" onClick={() => this.handleSubmitMapName()}>Creer une quête</div>
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

export default QuestMakerPage;
