import React from "react";
import EquipementApi from "../../../services/EquipementApi";
import Field from "../../../components/forms/field/Field";
import Select from "../../../components/forms/select/Select";

class CreateEquipementForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            icone: "",
            prixRevente: 0,
            prixAchat: 0,
            levelMin: 0,
            description: "",
            positionEquipement: 1,
            rarity: 1,
            caracteristiques: {},
            classe: 1,
            positions: [],
            rarities: [],
            classes: [],
            listeCaracteristiques: []
        }
    }

    componentDidMount() {
        this.fetchFormElements();
    }

    handleChange({ currentTarget }){
        const { name, value } = currentTarget;
        this.setState({ ...this.state, [name]: value });
    };

    handleChangeCaracteristiques({ currentTarget }){
        const { name, value } = currentTarget;
        const caracteristiques = {...this.state.caracteristiques, [name]: value};
        caracteristiques[name] = value;
        this.setState({caracteristiques});
    };


    async fetchFormElements(){
        const formElements = await EquipementApi.fetchFormElements();
        this.setState({
            listeCaracteristiques: formElements.caracteristiques,
            classes: formElements.classes,
            rarities: formElements.rarities,
            positions: formElements.positions
        })
    }


    async handleSubmit(event){
        event.preventDefault();
        const equipement = {
            name: this.state.name,
            icone:this.state.icone,
            prixRevente: this.state.prixRevente,
            prixAchat:this.state.prixAchat,
            levelMin: this.state.levelMin,
            description: this.state.description,
            positionEquipement: this.state.positionEquipement,
            classe: this.state.classe,
            rarity: this.state.rarity,
            caracteristiques: this.state.caracteristiques,
        }
        await EquipementApi.create(equipement);
    }

    render() {
        return(
            <form className="create-equipement-form" onSubmit={() => this.handleSubmit()}>
                <div className="form-equipement-values">
                    <Field  name="name" label="Nom" value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                    <Field  name="icone" type="text" label="Icone" value={this.state.icone} onChange={(event) => this.handleChange(event)}/>
                    <Field  name="description" label="Description" value={this.state.skin} onChange={(event) =>this.handleChange(event)}/>
                    <Field  name="prixAchat" type="number" label="Prix d'achat" value={this.state.prixAchat} onChange={(event) => this.handleChange(event)}/>
                    <Field  name="prixRevente" type="number" label="Prix de revente" value={this.state.prixRevente} onChange={(event) => this.handleChange(event)}/>
                    <Field  name="levelMin" type="number" label="Level Minimum" value={this.state.levelMin} onChange={(event) => this.handleChange(event)}/>
                    <Select name="positionEquipement" label="Position de l'équipement : " value={this.state.positionEquipement} onChange={(event) => this.handleChange(event)}>
                        {this.state.positions && this.state.positions.map(position =>
                            <option key={position.id} value={position.id}>{position.name}</option>
                        )}
                    </Select>
                    <Select name="rarity" label="Rareté : " value={this.state.rarity} onChange={(event) => this.handleChange(event)}>
                        {this.state.rarities && this.state.rarities.map(rarity =>
                            <option key={rarity.id} value={rarity.id}>{rarity.name}</option>
                        )}
                    </Select>
                    <Select name="classe" label="Classe : " value={this.state.classe} onChange={(event) => this.handleChange(event)}>
                        {this.state.classes && this.state.classes.map(classe =>
                            <option key={classe.id} value={classe.id}>{classe.nom}</option>
                        )}
                    </Select>
                </div>
                <div className="form-equipement-caracteristiques">
                {this.state.listeCaracteristiques && this.state.listeCaracteristiques.map(caracteristique =>
                    <Field key={caracteristique.id} label={caracteristique.nom} name={caracteristique.nom} value={this.state.caracteristiques[caracteristique.nom]} onChange={(event) => this.handleChangeCaracteristiques(event)}/>
                )}
                </div>

                <button type="submit" onClick={(event) => this.handleSubmit(event)}>Creer l'équipement</button>
            </form>
        );
    }

}

export default CreateEquipementForm;