import React from 'react'
import EditableCase from "./EditableCase";
import MapApi from "../../services/MapApi";
import {connect} from "react-redux";
import {setCases} from "../../store/actions";



class EditableMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    setCollisionToACase(){

    }

    componentDidMount () {
        try {
            this.fetchCases();
        }catch(error){

        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.mapId !== this.props.mapId){
            this.fetchCases();
        }
    }

    async fetchCases(){
        const data = await MapApi.find(this.props.mapId);
        this.props.setCases(data.cases);
    }

    handleClick(clickedCase){

    }

    render()
    {
        return (<>

            <div className="cases" style={{backgroundImage: "url("+require("../../img/map/"+this.props.mapId+".png").default+")", backgroundSize: 'contain'}}>
                {this.props.mapMaker.cases.map((uniquecase, index) => (
                    <div  onClick={() =>this.handleClick(uniquecase)}>
                        <EditableCase index={index} targetMapId={uniquecase.targetMapId} targetWrap={uniquecase.targetWrap} pnjName={uniquecase.pnjName} isUsable={uniquecase.isUsable} isWrap={uniquecase.isWrap} hasMonstre={uniquecase.hasMonstre} pnjId={uniquecase.pnjId} key={uniquecase.carteCarreauId}/>

                    </div>
                ))}
            </div>
        </>)
    }
}

export default connect((state, ownProps) => {
    return {mapMaker: state.data.mapMaker, ownProps};
}, {setCases})(EditableMap);
