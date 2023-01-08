import React from 'react'
import '../../../styles/app.css'
import actionTypeApi from "../../services/actionTypeApi";
import Field from "../../../components/forms/Field";
import Select from "../../../components/forms/Select";
import objectApi from "../../../services/objectApi";
import EquipementApi from "../../../services/EquipementApi";
import MapApi from "../../../services/MapApi";
import consommableApi from "../../../services/consommableApi";
import bossApi from "../../../services/bossApi";
import pnjApi from "../../../services/pnjApi";
import mapMakerApi from "../../services/MapMakerApi";


class ActionForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            actionName: this.props.action.actionName ? this.props.action.actionName : "",
        }

        console.log(this.props.action)
    }

    componentDidMount() {
        this.fetchAllFieldsAndValues();
    }

    fetchAllFieldsAndValues = async () =>{
        const fields = await actionTypeApi.getAllFields(this.props.action.actionTypeId);
        this.setState({fields: fields})
        console.log(this.props.action.actionTypeName)
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
            case "visiterCarte":
                const cartes = await MapApi.getAllMaps();
                this.setState({fieldContent: cartes})
                break;
            case "parlerPnj":
                const pnjs = await mapMakerApi.getPnjInfoForSelect();
                this.setState({fieldContent: pnjs})
                break;
        }

        console.log(this.state.fieldContent)
    }

    handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        this.setState({[name]: value}, () =>  this.props.handleActionChange(this.state));
    }

    render(){
        return (
            <div className="action-container">
                <h6>{this.state.actionName + " : " + this.props.action.actionTypeName}</h6>
                <Field name="actionName" value={this.state.actionName} onChange={this.handleChange} label="Nom de l'action"/>
                {this.state.fields && this.state.fields.length > 0 && this.state.fields.map((field) => {
                    if(field.type === "select"){
                        return <Select name={field.name} onChange={this.handleChange} label={field.name}>
                            {this.state.fieldContent && this.state.fieldContent.length > 0 && this.state.fieldContent.map((content, index) => {
                                return <option key={index} value={content.id}>{content.name}</option>
                            })}
                        </Select>
                    }else{
                        return <Field name={field.name} type={field.type} label={field.name} value={field.value} onChange={this.handleChange}/>
                    }

                })}
            </div>
        )
    }
}

export default ActionForm;