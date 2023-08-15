import React, {Component} from 'react'
import StatBar from "../UserInterface/statBar/StatBar";
import {connect} from "react-redux";
import { fetchTargetInfo, removePlayerTarget } from "../../store/actions";
import {Link} from "react-router-dom";


class Target extends Component{

    constructor(props){
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.target.type !== this.props.target.type) || (prevProps.target.targetId !== this.props.target.targetId)) {
            if(this.props.target.type !== undefined){
                this.props.fetchTargetInfo(this.props.target.targetId, this.props.target.type);
            }else{
                this.props.removePlayerTarget();
            }
        }
    }

    render() {

        return (<>

            {(this.props.target.type === "player" && this.props.target) &&
            <div className="joueur-cible">
                <h4 className="joueur-cible-name">{this.props.target.pseudo}</h4>
                <div className="target-stats">
                    <StatBar displayText={false} value={this.props.target.currentLife} max={this.props.target.maxLife}
                             maxWidth={230}
                             classN="lifeBar"/>
                    <StatBar displayText={false} value={this.props.target.currentMana} max={this.props.target.maxMana}
                             maxWidth={230}
                             classN="manaBar"/>
                    <div className="avatar-cible-hover"><Link to={"profil/" + this.props.target.pseudo}>Voir profil</Link></div>
                    <img src="/img/gui/CharacterEnemy/AvatarEnemy.png" alt="avatar" className="avatar-player"/>
                    <div className="joueur-cible-profil-btn-close" title="decibler" onClick={this.props.removePlayerTarget}></div>
                    <div className="joueur-cible-profil-btn" title="Voir le profil"></div>
                    <div className="joueur-cible-level" title="Niveau">{this.props.target.niveau}</div>
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
                         className="avatar-player avatar-monster"/>
                {/*          <div style={{backgroundImage: `url("../img/monstre/${this.props.target.imageMonstre}.png")`, height: "120px"}}
                         className="avatar-player">'</div>*/}
                </div>
            </div>
            }

            {(this.props.target.type === "boss" && this.props.target) &&
            <div className="joueur-cible">
                <h4 className="joueur-cible-name">{this.props.target.bossName}</h4>
                <div className="target-stats">
                    <StatBar displayText={false} value={this.props.target.bossLife} max={this.props.target.bossMaxLife}
                             maxWidth={200} classN="lifeBar"/>

                    <img src={"/img/boss/" + this.props.target.bossSkin + ".png"} alt="avatar"
                         className="avatar-player avatar-monster"/>
                </div>
            </div>
            }
        </>);
    }
}

export default connect(state => {
    let target = state.data.target;
    return {target};
}, {fetchTargetInfo, removePlayerTarget})(Target);