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
        <main className="map-page">
            <div className="top-container raw">
                <div className="side-block col-2">
                    <UsernameBlock user={user}/>
                    <UserStatsBlock user={user} />
                    <SideMenu />
                </div>
                <div className="profil-container col-8">
                    <Profil />
                </div>
            </div>
            <div className="footer-block col-12">
                <SpellBar />
            </div>
        </main>
    </>
}

export default ProfilPage