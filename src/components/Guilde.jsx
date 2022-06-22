import React, {useState} from "react"
import GuildeApi from "../services/GuildeApi";

class Guilde extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            joueurs: []
        }
    }

    componentDidMount() {
        this.fetchGuildeData()
    }

    async fetchGuildeData(){
        await GuildeApi.fetchGuildeData();
    }

    render() {
        return(
            <>
                Guilde
            </>
        )
    }
}

export default Guilde