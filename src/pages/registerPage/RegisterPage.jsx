import React, {useState} from "react";
import Field from "../../components/forms/field/Field";
import {Link} from "react-router-dom";
import UsersApi from "../../services/UsersApi";

const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        pseudo: '',
        sexe: 'feminin',
        email: '',
        password: '',
        passwordConfirm: '',
    })

    const [errors, setErrors] = useState({
        pseudo: '',
        email: '',
        password: '',
    })

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setUser({...user, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};
        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Les deux mots de passes ne sont pas identiques";
            setErrors(apiErrors);
            return;
        }

        try {
            const data = await UsersApi.register(user);
            setErrors({});
            history.replace("/connexion");
        }catch(error){
            const {violations} = error.response.data;

            if(violations){
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                })
                setErrors(apiErrors);
            }
        }
    }

    return <div className="main-register-page">

        <div className="register-form">
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field name="pseudo" label="Pseudo" placeholder="Votre pseudo" onChange={handleChange} value={user.pseudo} error={errors.pseudo}/>
                <div className="form-register-radio-sexe">
                    <label>Sexe du personnage</label><br />
                    <div className="form-register-input-sexe">
                        <input type="radio" name="sexe" value="feminin" checked={user.sexe === "feminin"} onChange={handleChange}/>Femme
                        <input type="radio" name="sexe" value="masculin" checked={user.sexe === "masculin"} onChange={handleChange}/>Homme
                    </div>
                </div>
                <Field name="email" label="Email" placeholder="Votre email" onChange={handleChange} value={user.email} error={errors.email} type="email"/>
                <Field name="password" label="Mot de passe" placeholder="Votre mot de passe" onChange={handleChange} value={user.password} error={errors.password} type="password"/>
                <Field name="passwordConfirm" label="Confirmation du mot de passe" placeholder="Repetez le mot de passe" onChange={handleChange} value={user.passwordConfirm} error={errors.passwordConfirm} type="password"/>

                <div className="form-group">
                    <button type="submit" className="btn-valider-inscription">Je m'inscrit</button>
                    <Link to='/connexion' className="btn-link-have-account">J'ai déjà un compte</Link>
                </div>
            </form>
        </div>
    </div>
}

export default RegisterPage