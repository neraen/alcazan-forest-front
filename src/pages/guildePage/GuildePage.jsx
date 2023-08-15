import React from 'react'
import { connect } from "react-redux";
import {updateJoueurState} from "../../store/actions";
import Guilde from "../../components/social/Guilde";


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
            <main className="guilde-page">
                <h1 className="text-center title-map-font banner-map banner-map-inventory">Guilde</h1>
                <Guilde />
            </main>
        </>  )
    }
}

export default connect((state, ownProperties) =>{
    return {joueurState: {...state.data.joueurState}, ownProperties}
}, {updateJoueurState})(GuildePage)