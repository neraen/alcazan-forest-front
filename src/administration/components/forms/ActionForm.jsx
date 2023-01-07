import React from 'react'
import '../../../styles/app.css'
import actionTypeApi from "../../services/actionTypeApi";
import Field from "../../../components/forms/Field";

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
    }

    handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        this.setState({[name]: value})
    }

    render(){
        return (
            <div className="action-container">
                <h6>{this.state.actionName + " : " + this.props.action.actionTypeName}</h6>
                <Field name="actionName" value={this.state.actionName} onChange={this.handleChange} label="Nom de l'action"/>
                {this.state.fields && this.state.fields.length > 0 && this.state.fields.map((field, index) => {
                    return <Field name={field.name} type={field.type} label={field.name} value={field.value} onChange={this.handleSequenceChange}/>
                })}
            </div>
        )
    }
}

export default ActionForm;