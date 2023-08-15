import React, {useState} from 'react';
import Field from "../../../components/forms/field/Field";
import monsterApi from "../../../services/monsterApi";


const CreateMonsterForm = (props) => {

    const [monster, setMonster] = useState({
        name : "",
        maxLife : 0,
        skin : "",
        tempsRepop : 0,
        puissance : 0,
    });

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setMonster({ ...monster, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        await monsterApi.create(monster);
    }

    return(
        <form className="create-pnj-form"onSubmit={handleSubmit}>
            <Field  name="name" label="Nom" value={monster.name} onChange={(event) => handleChange(event)}/>
            <Field  name="maxLife" type="number" label="Vie max" value={monster.maxLife} onChange={(event) => handleChange(event)}/>
            <Field  name="skin" label="Nom fichier skin" value={monster.skin} onChange={(event) => handleChange(event)}/>
            <Field  name="tempsRepop" type="number" label="Temps de repop" value={monster.tempsRepop} onChange={(event) => handleChange(event)}/>
            <Field  name="puissance" type="number" label="Puissance" value={monster.puissance} onChange={(event) => handleChange(event)}/>
            <button type="submit">Creer le pnj</button>
        </form>

    )
}

export default CreateMonsterForm