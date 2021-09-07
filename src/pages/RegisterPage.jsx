import React, {useState} from "react";
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import UsersApi from "../services/UsersApi";

const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        pseudo: '',
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

    return <>
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
            <Field name="pseudo" label="Pseudo" placeholder="Votre pseudo" onChange={handleChange} value={user.pseudo} error={errors.pseudo}/>
            <Field name="email" label="Email" placeholder="Votre email" onChange={handleChange} value={user.email} error={errors.email} type="email"/>
            <Field name="password" label="Mot de passe" placeholder="Votre mot de passe" onChange={handleChange} value={user.password} error={errors.password} type="password"/>
            <Field name="passwordConfirm" label="Confirmation du mot de passe" placeholder="Repetez le mot de passe" onChange={handleChange} value={user.passwordConfirm} error={errors.passwordConfirm} type="password"/>

            <div className="form-group">
                <button type="submit" className="btn btn-success">Je m'inscrit</button>
                <Link to='/connexion' className="btn btn-link">J'ai déjà un compte</Link>
            </div>
        </form>
    </>
}

export default RegisterPage