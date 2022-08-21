import React, {useContext, useEffect, useState} from 'react'
import UsernameBlock from "../components/UserInterface/UsernameBlock";
import SideMenu from "../components/UserInterface/SideMenu";
import SpellBar from "../components/UserInterface/SpellBar";
import Profil from "../components/profil/profil";
import AuthContext from "../contexts/AuthContext";
import UserStatsBlock from "../components/UserInterface/UserStatsBlock";
import Map from "../components/map/Map";
import UsersApi from "../services/UsersApi";
import authAPI from "../services/authAPI";
import {ToastContainer} from "react-toastify";
import {useParams} from "react-router";
import ProfilJoueur from "../components/ProfilJoueur";

const ProfilPage = ({match, history}) => {

    const [user, setUser] = useState({})

    const { pseudo = undefined} = match.params;

    useEffect(()=> {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        console.log(pseudo)
        const user = await UsersApi.find(await authAPI.getUserInfo().id)
        setUser(user)
    }

    return <>
        <main className="main-profil-page ">
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={4000} />
            <div className="banner-map m-auto">
                <h1 className="text-center title-map-font a">Profil {pseudo !== undefined && (" de "+ pseudo)}</h1>
            </div>
            <div className="top-container mt-4">
                {/*<div className="side-block px-5">*/}
                {/*    <UsernameBlock user={user}/>*/}
                {/*    <UserStatsBlock user={user} />*/}
                {/*    /!*<SideMenu />*!/*/}
                {/*</div>*/}
                <div className="profil-container">
                    {pseudo === undefined && ( <Profil user={user}/>) || (<ProfilJoueur history={history} pseudo={pseudo}/>)}
                </div>
            </div>
        </main>
    </>
}

export default ProfilPage