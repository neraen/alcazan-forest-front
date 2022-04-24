import React, {Component, useEffect, useState} from 'react'
import {ProgressBar} from "react-bootstrap";
import StatBar from "./UserInterface/StatBar";
import {connect} from "react-redux";
import { fetchTargetInfo } from "../store/actions";


class Target extends Component{

    constructor(props){
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.target.type !== this.props.target.type) || (prevProps.target.targetId !== this.props.target.targetId)) {
            this.props.fetchTargetInfo(this.props.target.targetId, this.props.target.type);
        }
    }

    render() {

        return (<>

            {(this.props.target.type === "player" && this.props.target) &&
            <div className="joueur-cible">
                <h4 className="joueur-cible-name">{this.props.target.pseudo}</h4>
                <div className="target-stats">
                    <StatBar displayText={false} value={this.props.target.currentLife} max={this.props.target.maxLife}
                             maxWidth={200}
                             classN="lifeBar"/>
                    <StatBar displayText={false} value={this.props.target.currentMana} max={this.props.target.maxMana}
                             maxWidth={200}
                             classN="manaBar"/>
                    <img src="/img/gui/CharacterEnemy/AvatarEnemy.png" alt="avatar" className="avatar-player"/>
                    <div className="joueur-cible-level">{this.props.target.niveau}</div>
                </div>
            </div>
            }
            {(this.props.target.type === "monstre" && this.props.target) &&
            <div className="joueur-cible">
                <h4 className="joueur-cible-name">{this.props.target.nomMonstre} x {this.props.target.quantiteMonstre} </h4>
                <div className="target-stats">
                    <StatBar displayText={false} value={this.props.target.monstreLife} max={this.props.target.monstreLifeMax}
                             maxWidth={200} classN="lifeBar"/>
                    <img src={"/img/monstre/" + this.props.target.imageMonstre + ".png"} alt="avatar"
                         className="avatar-player"/>
                </div>
            </div>
            }
        </>);
    }
}

export default connect(state => {
    let target = state.data.target;
    return {target};
}, {fetchTargetInfo})(Target);