import React from 'react'
import UsernameBlock from "../../components/UserInterface/usernameBlock/UsernameBlock";
import SideMenu from "../../components/UserInterface/sideMenu/SideMenu";
import Map from "../../components/map/map/Map";
import SpellBar from "../../components/UserInterface/spellBar/SpellBar";
import UserStatsBlock from "../../components/UserInterface/userStatsBlock/UserStatsBlock";
import UsersApi from "../../services/UsersApi";
import Loader from "../../components/loader/Loader";
import Target from "../../components/target/Target";
import { connect } from "react-redux";
import {updateJoueurState} from "../../store/actions";

import 'intro.js/introjs.css';
import { Steps, Hints } from 'intro.js-react';


class MapPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            display: false,
            isMapLoaded: false,
            isSpellsLoaded: false,
            isBarLoaded: false,
            steps: [
                {
                    element: '.lifeBar',
                    intro: "Ici se trouve votre barre de vie, si elle est vide vous irez au cimetière et votre résurection vous coutera en expérience."
                },
                {
                    element: '.manaBar',
                    intro: "Maintenant, votre barre de mana utile pour lancer des sortilèges",
                },
                {
                    element: '.pa',
                    intro: "Là vous trouverez le nombre de points d'actions qu'il vous reste, à 0 vous ne pouvez plus agir et il faudra vous reposer (gain : 7 par heures)",
                },
                {
                    element: '.pm',
                    intro: "Ensuite le nombre de points de mouvements, à 0 vous ne pourrez plus bouger et serez à la merci de vos ennemies (gain : 20 par heures)",
                },
                {
                    element: '.spell-bar',
                    intro: 'La barre de sorts contient les capacités que vous pouvez utiliser, les consommables et les effets qui agissent sur votre personnage',
                },
                {
                    element: '.spell-container',
                    intro: 'Cliquer sur le sort quand vous avez une cible pour l\'utiliser',
                },
                {
                    element: '.pnj',
                    intro: 'Deplacer vous à coté de ce personnage non joueur pour commencer la première quête de votre aventure. Pour vous deplacer vous pouvez utiliser les touches Z, S, Q, D ou simplement cliquer sur les cases adjacentes à votre personnage. ',
                },


            ]
        }
    }

    setMapLoaded(){
        this.setState({isMapLoaded: true});
    }

    setSpellsLoaded(){
        this.setState({isSpellsLoaded: true});
    }

    isIntroJsAllowed = () => {
        return this.state.isBarLoaded && this.state.isMapLoaded && this.state.isSpellsLoaded && this.state.user.tutorialActive;
    }

    onExit = async (stepIndex) => {
        await UsersApi.disableTutorial();
        await this.initialisePlayerState();
    }

    onBeforeExit = (stepIndex) => {
        return stepIndex === this.state.steps.length - 1;
    }

    componentDidMount() {
        this.initialisePlayerState();
    }

    initialisePlayerState = async () => {
        const user = await UsersApi.find();
        this.setState({user: user, display: true, isBarLoaded: true}, () => {
            this.props.updateJoueurState({
                idJoueur: user.userId,
                lifeJoueur: this.state.user.currentLife,
                experience: 0,
                newExperience: this.state.user.experienceActuelle,
                maxExperience: this.state.user.experienceMax,
                damage: 0,
                damageReturns: 0,
                droppedItems: "",
                money: this.state.user.money,
                pa: this.state.user.actionPoint,
                pm: this.state.user.mouvementPoint,
                level: this.state.user.niveau
            })
        })
    }

    render(){
        return (<>
            <main className="map-page">
                <div className="top-container raw">
                    <div className="side-block px-5">
                        <Steps
                            enabled={this.isIntroJsAllowed()}
                            steps={this.state.steps}
                            initialStep={0}
                            options={{tooltipPosition: "right", tooltipClass: "intro-js-tooltip", highlightClass: "intro-js-highlight"}}
                            onExit={(stepIndex) => this.onExit(stepIndex)}
                            onBeforeExit={(stepIndex) => this.onBeforeExit(stepIndex)}
                        />
                        <UsernameBlock user={this.state.user}/>
                        <Target />
                        <UserStatsBlock />
                        <SideMenu />

                        <div className="block-notification">
                            {(this.props.joueurState.message !== '') && (
                                <div dangerouslySetInnerHTML={{__html: this.props.joueurState.message}}></div>
                            )}
                        </div>
                    </div>

                    <div className="map-container mr-5" >
                        {this.state.display && <Map setMapLoaded={() => this.setMapLoaded()} user={this.state.user} needRefresh={this.props.joueurState.needRefresh}/> || <Loader />}
                        <div className="footer-block">
                            {this.state.display && <SpellBar setSpellsLoaded={() => this.setSpellsLoaded()} newExperience={this.props.joueurState.newExperience}/>}
                        </div>
                    </div>

                </div>

            </main>
        </>  )
    }
}

export default connect((state, ownProperties) =>{
    return {joueurState: {...state.data.joueurState}, ownProperties}
}, {updateJoueurState})(MapPage)