import React from 'react'
import UsernameBlock from "../components/UserInterface/UsernameBlock";
import SideMenu from "../components/UserInterface/SideMenu";
import Map from "../components/map/Map";
import SpellBar from "../components/UserInterface/SpellBar";
import UserStatsBlock from "../components/UserInterface/UserStatsBlock";
import UsersApi from "../services/UsersApi";
import Loader from "../components/Loader";
import Target from "../components/Target";
import { connect } from "react-redux";


 class MapPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            display: false
        }
    }

     async componentDidMount() {
         const user = await UsersApi.find();
         this.setState({user: user, display: true})
     }

    render(){
        return (<>
                <main className="map-page">
                    <div className="top-container raw">
                        <div className="side-block px-5">
                            <UsernameBlock user={this.state.user}/>
                            <Target />
                            <UserStatsBlock user={this.state.user} />
                            <SideMenu />
                            {this.props.joueurState !== undefined &&  (
                                <div className="block-notification">
                                    {(this.props.joueurState.damage > 0) && "Vous infligez "+ this.props.joueurState.damage +" points de dommages et vous gagnez "+this.props.joueurState.experience+" points d'expériences"} <br />
                                    {(this.props.joueurState.droppedItems !== "") && (<span>En mourrant le monstre laisse tomber ceci : <strong>{this.props.joueurState.droppedItems}</strong></span>)}
                                </div>
                            )}
                        </div>

                        <div className="map-container mr-5" >
                            {this.state.display && <Map user={this.state.user}/> || <Loader />}
                        </div>

                    </div>
                    <div className="footer-block">
                        {this.state.display && <SpellBar newExperience={this.props.joueurState.newExperience}/>}
                    </div>
                </main>
        </>  )
    }
}

export default connect((state, ownProperties) =>{
    return {joueurState: state.data.joueurState, ownProperties}
})(MapPage)