import React, { useEffect, useState} from 'react'
import Profil from "../../components/profil/profil/profil";
import UsersApi from "../../services/UsersApi";
import authAPI from "../../services/authAPI";
import {Link, Redirect} from "react-router-dom";
import Switch from "react-bootstrap/Switch";
import PrivateRoute from "../../components/PrivateRoute";
import ProfilSpells from "../../components/profil/profilSpells/ProfilSpells";
import Options from "../../components/profil/options/Options";

const ProfilPage = ({match, history}) => {

    const [user, setUser] = useState({})

    const { pseudo = undefined} = match.params;

    useEffect(()=> {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        const user = await UsersApi.find(await authAPI.getUserInfo().id)
        setUser(user)
    }

    return <>
        <main className="main-profil-page ">
            <div className="profil-header">
                <h3 className="inventaire-title"><Link activeClassName="inventaire-active" to='/personnage/profil' >Profil</Link></h3>
                <h3 className="inventaire-title"><Link activeClassName="inventaire-active" to='/personnage/sorts' >Sorts</Link></h3>
                <h3 className="inventaire-title"><Link activeClassName="inventaire-active" to='/personnage/options' >Options</Link></h3>
            </div>

            <Switch>
                <PrivateRoute path="/personnage/profil" component={() => <Profil history={history} pseudo={pseudo} user={user} />}/>
                <PrivateRoute path="/personnage/sorts" component={() => <ProfilSpells />}/>
                <PrivateRoute path="/personnage/options" component={() => <Options />}/>
                {history.location.pathname === '/personnage' && <Redirect to="/personnage/profil"></Redirect>}
            </Switch>

        </main>
    </>
}

export default ProfilPage