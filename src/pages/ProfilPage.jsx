import React, {useContext, useEffect, useState} from 'react'
import UsernameBlock from "../components/UserInterface/UsernameBlock";
import SideMenu from "../components/UserInterface/SideMenu";
import SpellBar from "../components/UserInterface/SpellBar";
import Profil from "../components/profil";
import AuthContext from "../contexts/AuthContext";
import UserStatsBlock from "../components/UserInterface/UserStatsBlock";
import Map from "../components/map/Map";
import UsersApi from "../services/UsersApi";
import authAPI from "../services/authAPI";

const ProfilPage = (props) => {

    const [user, setUser] = useState({})

    useEffect(()=> {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        const user = await UsersApi.find(await authAPI.getUserInfo().id)
        setUser(user)
    }

    return <>
        <main className="main-profil-page ">
            <div className="banner-map m-auto">
                <h1 className="text-center title-map-font a">Profil</h1>
            </div>
            <div className="top-container mt-4">
                {/*<div className="side-block px-5">*/}
                {/*    <UsernameBlock user={user}/>*/}
                {/*    <UserStatsBlock user={user} />*/}
                {/*    /!*<SideMenu />*!/*/}
                {/*</div>*/}
                <div className="profil-container">
                    <Profil user={user}/>
                </div>
            </div>
        </main>
    </>
}

export default ProfilPage