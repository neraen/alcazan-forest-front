import React from 'react'
import '../../styles/app.css'
import {connect} from "react-redux";
import {toggleCollisionCase, updateDiffCases, addMonsterCase, addPnjCase, addWrapCase} from "../../store/actions";

class EditableCase extends React.Component{


    async handleClick(){
        switch (this.props.mapMaker.mode.type){
            case "collision":
                const cases =  [...this.props.mapMaker.cases];
                await this.props.toggleCollisionCase(this.props.index);
                this.props.updateDiffCases(cases)
                break;
            case "wrap":
                this.props.addWrapCase(this.props.index);
                break;
            case "pnj":
                this.props.addPnjCase(this.props.index);
                break;
            case "monstre":
                this.props.addMonsterCase(this.props.index);
                break;
            default:
                return "";

        }
        if(this.props.mapMaker.mode.type === "collision"){

        }
    }

    getHoverCaseColor(){
        switch (this.props.mapMaker.mode.type){
            case "collision":
                return "map-maker-hover-collision ";
            case "wrap":
                return "map-maker-hover-wrap ";
            case "pnj":
                return "map-maker-hover-pnj ";
            case "monstre":
                return "map-maker-hover-monstre ";
            default:
                return "";

        }
    }

    getCaseColor(){
        console.log(this.props)
        if(this.props.isWrap){
            return "map-maker-wrap ";
        }

        if(this.props.hasMonstre){
            return "map-maker-monstre ";
        }

        if(this.props.pnjId){
            return "map-maker-pnj ";
        }

        if(!this.props.isUsable){
            return "map-maker-collision ";
        }

        return "";
    }

    render() {

        return <>
            <div onClick={()=> this.handleClick()}
                 className={"case " +
                 this.getCaseColor() +
                 this.getHoverCaseColor() }
                 style={{border: "rgba(255, 255, 255, .5) 1px solid"}} >

                <div className="editable-case-hover">
                    {this.props.pnjId && (
                        <div>{this.props.pnjName}</div>
                    )
                    }
                    {this.props.isWrap && (
                        <>
                            <div>map cible : {this.props.targetMapId}</div>
                            <div>case cible : {this.props.targetWrap}</div>
                        </>
                    )
                    }
                </div>
            </div>
        </>
    }


}

export default connect((state, ownProps) => {
    return {mapMaker: state.data.mapMaker, ownProps};
}, {toggleCollisionCase, updateDiffCases, addMonsterCase, addPnjCase, addWrapCase})(EditableCase);