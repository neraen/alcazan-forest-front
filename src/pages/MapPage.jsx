import React, {useContext, useEffect, useState} from 'react'
import UsernameBlock from "../components/UserInterface/UsernameBlock";
import SideMenu from "../components/UserInterface/SideMenu";
import Map from "../components/map/Map";
import SpellBar from "../components/UserInterface/SpellBar";

import UserStatsBlock from "../components/UserInterface/UserStatsBlock";
import AuthContext from "../contexts/AuthContext";
import UsersApi from "../services/UsersApi";
import authAPI from "../services/authAPI";
import Loader from "../components/Loader";
import {ProgressBar} from "react-bootstrap";
import MapContext from "../contexts/MapContext";
import Target from "../components/Target";


 class MapPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            display: false,
            target: {},
            isPlayer: false,
            playerTargeted: false
        }
    }

     async componentDidMount() {
         const user = await UsersApi.find(await authAPI.getUserInfo().id)
         this.setState({user: user, display: true})
     }

    render(){
        const mapContext = {
            target: true,
            setTarget: (target) => this.setState({target: target, playerTargeted: true}),
        }
        return (<>
            <MapContext.Provider value={mapContext}>
                <main className="map-page">
                    <div className="top-container raw">
                        <div className="side-block col-2 px-5">
                            <UsernameBlock user={this.state.user}/>
                            <UserStatsBlock user={this.state.user} />
                            <SideMenu />
                        </div>

                        <div className="map-container col-6 mr-5" >
                            {this.state.display && <Map user={this.state.user}/> || <Loader />}
                        </div>
                        <div className="right-side-block col-3">
                            <Target player={this.state.target} playerTargeted={this.state.playerTargeted}/>
                            <h3 className="text-center title-font mt-4">Chat</h3>
                            <div className="block-chat p-3">
                                <form className="bottom d-flex" action="">
                                    <input type="text"/>
                                    <button className="btn btn-primary ml-3">Envoyer</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="footer-block col-12">
                        {this.state.display && <SpellBar spells={this.state.user.classe.sortileges} player={this.state.target} playerTargeted={this.state.playerTargeted}/>}
                    </div>
                </main>
            </MapContext.Provider>
        </>  )
    }
}



export default MapPage