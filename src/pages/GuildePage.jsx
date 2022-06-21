import React from 'react'
import UsernameBlock from "../components/UserInterface/UsernameBlock";
import SideMenu from "../components/UserInterface/SideMenu";
import Map from "../components/map/Map";
import SpellBar from "../components/UserInterface/SpellBar";
import UserStatsBlock from "../components/UserInterface/UserStatsBlock";
import UsersApi from "../services/UsersApi";
import Loader from "../components/Loader";
import ChatBox from "../components/ChatBox";
import Target from "../components/Target";
import { connect } from "react-redux";
import {updateJoueurState} from "../store/actions";
import {toast, ToastContainer} from "react-toastify";


 class GuildePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }

     async componentDidMount() {
         this.setState({})
     }

    render(){
        return (<>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={4000} />
                <main className="guilde-page">
                    <h1 className="text-center title-map-font banner-map banner-map-inventory">Guilde</h1>

                </main>
        </>  )
    }
}

export default connect((state, ownProperties) =>{
    return {joueurState: {...state.data.joueurState}, ownProperties}
}, {updateJoueurState})(GuildePage)