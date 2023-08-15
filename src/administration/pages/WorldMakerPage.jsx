import React from 'react';
import MapApi from "../../services/MapApi";


class WorldMakerPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            maps: [],
        }
    }

    async componentDidMount (){
        const maps = await MapApi.getAllMaps();
        this.setState({maps});
    }

    handleSubmit(){
    }

    render() {
        return <>
            <div className="maps">
                {this.state.maps && this.state.maps.map(map =>
                    <div className="world-map" key={map.carteId}
                         style={{backgroundImage: "url("+require("../../img/map/"+map.carteId+".png").default+")", backgroundSize: 'contain'}}>

                    </div>
                )}
            </div>
        </>
    }
}

export default WorldMakerPage;
