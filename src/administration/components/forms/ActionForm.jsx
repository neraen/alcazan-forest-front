import React from 'react'
import '../../../styles/app.css'
import actionTypeApi from "../../services/actionTypeApi";
import Field from "../../../components/forms/field/Field";
import Select from "../../../components/forms/select/Select";
import objectApi from "../../../services/objectApi";
import EquipementApi from "../../../services/EquipementApi";
import MapApi from "../../../services/MapApi";
import consommableApi from "../../../services/consommableApi";
import bossApi from "../../../services/bossApi";
import mapMakerApi from "../../services/MapMakerApi";
import {connect} from "react-redux";
import {removeQuestMakerAction, updateQuestMakerAction} from "../../../store/actions";
import monsterApi from "../../../services/monsterApi";


class ActionForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            actionName: this.props.action.actionName ? this.props.action.actionName : "",
        }
    }

    componentDidMount() {
        this.fetchAllFieldsAndValues();
        //setActionValues(this.props.action, this);
    }

    fetchAllFieldsAndValues = async () =>{
        const fields = await actionTypeApi.getAllFields(this.props.action.actionTypeId);
        this.setState({fields: fields})

        switch (this.props.action.actionTypeName) {
            case "donnerObjet":
                const objets = await objectApi.getAllObjects();
                this.setState({fieldContent: objets})
                break;
            case "donnerEquipement":
                const equipements = await EquipementApi.getAllEquipements();
                this.setState({fieldContent: equipements})
                break;
            case "donnerConsommable":
                const consommables = await consommableApi.getAllConsommables();
                this.setState({fieldContent: consommables})
                break;
            case "battreBoss":
                const bosses = await bossApi.getAllBosses();
                this.setState({fieldContent: bosses})
                break;
            case "battreMonstre":
                const monstres = await monsterApi.getAllMonsters();
                this.setState({fieldContent: monstres})
                break;
            case "visiterCarte":
                const cartes = await MapApi.getAllMaps();
                this.setState({fieldContent: cartes})
                break;
            case "parlerPnj":
                const pnjs = await mapMakerApi.getPnjInfoForSelect();
                this.setState({fieldContent: pnjs})
                break;
            default:
                break;
        }

    }

    handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        const action = Object.assign({...this.props.questMaker.sequences[this.props.sequenceIndex].actions[this.props.actionIndex]}, {[name]: value});

        this.props.updateQuestMakerAction(action, this.props.sequenceIndex, this.props.actionIndex);
    }

    render(){
        return (
            <div className="action-container">
                <h6>{this.props.questMaker.sequences[this.props.sequenceIndex].actions[this.props.actionIndex].actionName + " : " + this.props.action.actionTypeName}</h6>
                <Field name="actionName" value={this.props.questMaker.sequences[this.props.sequenceIndex].actions[this.props.actionIndex].actionName} onChange={this.handleChange} label="Nom de l'action"/>
                {this.state.fields && this.state.fields.length > 0 && this.state.fields.map((field, index) => {
                    if(field.type === "select"){
                        return <Select key={index} name={field.name} onChange={this.handleChange} label={field.name}>
                            <option value={0}>selectionner un {field.name}</option>
                            {this.state.fieldContent && this.state.fieldContent.length > 0 && this.state.fieldContent.map((content, index) => {
                                return <option key={index} value={content.id}>{content.name}</option>
                            })}
                        </Select>
                    }
                    else{
                        return <Field key={index} name={"action"+ field.name[0].toUpperCase() + field.name.substring(1)} type={field.type} label={field.name} value={this.props.action["action"+ field.name[0].toUpperCase() + field.name.substring(1)]} onChange={this.handleChange}/>
                    }

                })}
            </div>
        )
    }
}

export default connect((state, ownProps) => {
    return {questMaker: state.data.questMaker, ownProps};
}, {removeQuestMakerAction, updateQuestMakerAction})(ActionForm);