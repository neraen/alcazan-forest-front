import React, {useState, useContext} from "react";
import authAPI from "../../services/authAPI";
import AuthContext from "../../contexts/AuthContext";
import UsersApi from "../../services/UsersApi";

const LoginPage = ({history }) =>{

    const {setIsAuthenticated} = useContext(AuthContext)


    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })

    const [error, setError] = useState()

    const handleChange = (e) => {
        e.preventDefault()
        const value = e.currentTarget.value
        const name = e.currentTarget.name
        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            await authAPI.authenticate(credentials)
            setError("")
            if(authAPI.isAuthenticated()){
                setIsAuthenticated(true)
                history.replace("/carte")
            }else{
                setError("Combinaison email / mot de passe invalid ou email inexistant")
            }
        }catch(error){
            setError("Combinaison email / mot de passe invalid ou email inexistant")
        }
    }

    return (
        <>
            <div className="login-page-main">
                <form className="form-login" onSubmit={handleSubmit}>
                    <h1 style={{color: 'aliceblue'}}>Connexion</h1>
                    <div className="form-group">
                        <label htmlFor="username">Adresse email</label>
                        <input type="email" name="username" id="username" className={"form-control" + (error ? " is-invalid": "")} value={credentials.username} onChange={handleChange}/>
                        {error && <p className="invalid-feedback">{error}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" className="form-control" value={credentials.password} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn-valider-login">Je me connecte</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginPage