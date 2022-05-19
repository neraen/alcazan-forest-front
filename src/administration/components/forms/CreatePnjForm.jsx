import React, {useState} from 'react';
import Field from "../../../components/forms/Field";
import pnjApi from "../../../services/pnjApi";


const CreatePnjForm = (props) => {

    const [pnj, setPnj] = useState({
        name : "",
        avatar : "",
        skin : "",
        description : "",
    });

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setPnj({ ...pnj, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        await pnjApi.create(pnj);
    }

    return(
        <form className="create-pnj-form"onSubmit={handleSubmit}>
            <Field  name="name" label="Nom" value={pnj.name} onChange={(event) => handleChange(event)}/>
            <Field  name="avatar" label="Nom fichier avatar" value={pnj.avatar} onChange={(event) => handleChange(event)}/>
            <Field  name="skin" label="Nom fichier skin" value={pnj.skin} onChange={(event) => handleChange(event)}/>
            <Field  name="description" label="Description" value={pnj.description} onChange={(event) => handleChange(event)}/>
            <button type="submit">Creer le pnj</button>
        </form>

    )
}

export default CreatePnjForm