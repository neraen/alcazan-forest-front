import React from 'react'
import '../../../../styles/app.css'
import Field from "../../../../components/forms/field/Field";
import objectApi from "../../../../services/objectApi";
import Select from "../../../../components/forms/select/Select";

class ActionGiveObjectForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            objects: [] ,
            givedObject: props.givedObject ? props.givedObject : [],
        }
    }


    componentDidMount() {
        this.fetchAllObjects();
    }

    fetchAllObjects = async () =>{
        const objects = objectApi.getAllObjects();
        this.setState({objects})
    }

    addNewGiveObject = () => {
        const givedObjects = this.state.givedObjects;
        givedObjects.push({object: "", quantity: 0})
        this.setState({givedObjects: givedObjects})

    }

    handleGivedObjectChange = (event) => {
        const {name, value} = event.currentTarget;
        const index = event.currentTarget.dataset.index;
        const givedObjects = this.state.givedObjects;
        givedObjects[index][name] = value;
        this.setState({givedObjects})
        console.log(this.state.givedObjects);
    }

    render(){
        return (
            <div className="sequence-container">
                <button onClick={this.addNewGiveObject}>Ajouter un objet</button>
                {this.state.givedObjects && this.state.givedObjects.map((object, index) => {
                    return (
                        <div className="action-give-object-element">
                            <Select name="object" label="Objet" value={this.state.givedObjects[index].id} onChange={(event) => this.handleGivedObjectChange(event, index)}>
                                {this.state.objects.map((object) => {
                                    return (
                                        <option value={object.id}>{object.name}</option>
                                    )
                                })}
                            </Select>
                            <Field name="quantity" label="Quantité" type="number" value={this.state.givedObjects[index].quantity} onChange={(event) => this.handleGivedObjectChange(event, index)}/>
                        </div>
                    )
                })}

            </div>
        )
    }
}

export default ActionGiveObjectForm;

