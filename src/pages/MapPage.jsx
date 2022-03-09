import React from 'react'
import UsernameBlock from "../components/UserInterface/UsernameBlock";
import SideMenu from "../components/UserInterface/SideMenu";
import Map from "../components/map/Map";
import SpellBar from "../components/UserInterface/SpellBar";

import UserStatsBlock from "../components/UserInterface/UserStatsBlock";
import UsersApi from "../services/UsersApi";
import authAPI from "../services/authAPI";
import Loader from "../components/Loader";
import MapContext from "../contexts/MapContext";
import Target from "../components/Target";
import {BehaviorSubject, Subject} from "rxjs";


const mainSubject = new BehaviorSubject();
// This function is used to publish data to the Subject via next().
export const publish = (data) => {mainSubject.next(data); console.log('under')}

 class MapPage extends React.Component{

     subscription = null

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            display: false,
            target: {},
            targetId: 0,
            isPlayer: false,
            type: "none",
            needUpdate: false,
            experience: 0,
            damage: 0
        }
    }

     async componentDidMount() {
         const user = await UsersApi.find();
         this.setState({user: user, display: true})
         this.subscription = mainSubject
             .subscribe(data => {
                 if(data){
                     this.setState({ targetId: data.id, type: data.type, needUpdate: !this.state.needUpdate, experience: data.experience, damage: data.damage })
                 }
             })
     }

     componentWillUnmount() {
         this.subscription.unsubscribe()
     }

    render(){
        const mapContext = {
            target: true,
            setTarget: (target, type) => this.setState({targetId: target, type: type}),
        }
        return (<>
            <MapContext.Provider value={mapContext}>
                <main className="map-page">
                    <div className="top-container raw">
                        <div className="side-block px-5">
                            <UsernameBlock user={this.state.user}/>
                            {this.state.type !== "none" && <Target needUpdate={this.state.needUpdate} target={this.state.targetId} type={this.state.type}/>}
                            <UserStatsBlock user={this.state.user} />
                            <SideMenu />
                            <div className="block-notification">{(this.state.damage > 0) && "Vous infligez "+ this.state.damage +" points de dommages et vous gagnez "+this.state.experience+" points d'expériences"}</div>
                        </div>

                        <div className="map-container mr-5" >
                            {this.state.display && <Map user={this.state.user}/> || <Loader />}
                        </div>

                    </div>
                    <div className="footer-block">
                        {this.state.display && <SpellBar  player={this.state.target} playerTargeted={this.state.playerTargeted}/>}
                    </div>
                </main>
            </MapContext.Provider>
        </>  )
    }
}



export default MapPage