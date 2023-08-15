import React from 'react'
import MapApi from "../../../services/MapApi";
import Case from "../case/Case";
import UsersApi from "../../../services/UsersApi";
import MapContext from "../../../contexts/MapContext";
import {connect} from "react-redux";
import {updatePositionJoueur, removePlayerTarget, updateJoueurState} from "../../../store/actions";
import distanceCalculator from "../../../services/distanceCalculator";



class Map extends React.Component {

    static contextType = MapContext;

    constructor(props) {
        super(props);
        this.state = {
            cases: [],
            name: "",
            abscisseJoueur: this.props.user.caseAbscisse,
            ordonneeJoueur: this.props.user.caseOrdonnee,
            users: [],
            unabledCases: [],
            mapId: this.props.user.mapId,
            isInstance: false
        };
        this.props.updatePositionJoueur({abscisse: this.props.user.caseAbscisse, ordonnee: this.props.user.caseOrdonnee})
    }

    componentDidMount() {
        try {
            this.fetchMapData();
        }catch(error){

        }
        this.listenKeyboard();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.joueurState.needRefresh !== this.props.joueurState.needRefresh){
            this.fetchMapData();
            this.props.updateJoueurState({
                needRefresh: false
            })
        }
    }

    async fetchMapData(){
        const mapId = this.props.joueurState.mapId ? this.props.joueurState.mapId : this.state.mapId
        const data = await MapApi.find(mapId);
        this.setState({cases: data.cases, name: data.mapInfo.nom, isInstance: data.mapInfo.isInstance, mapId: mapId}, () => {
            this.props.setMapLoaded(true);
        });
        this.setState({unabledCases: this.getUnabledMove()});
    }

    listenKeyboard() {
        document.addEventListener("keypress",  (event) => this.handleKeybord(event))
    }

    handleKeybord(event){
        switch (event.key){
            case "z":
                if(this.verifiyMove(this.state.abscisseJoueur, this.state.ordonneeJoueur - 1)){
                    this.updatePosition( this.state.abscisseJoueur, this.state.ordonneeJoueur - 1);
                }else{
                    //toast.error("Un obstacle vous empeche d'aller à cet endroit")
                }
                break;
            case "s":
                if(this.verifiyMove(this.state.abscisseJoueur, this.state.ordonneeJoueur + 1)) {
                    this.updatePosition(this.state.abscisseJoueur, this.state.ordonneeJoueur + 1);
                }else{
                    //toast.error("Un obstacle vous empeche d'aller à cet endroit")
                }
                break;
            case "q":
                if(this.verifiyMove(this.state.abscisseJoueur - 1, this.state.ordonneeJoueur)) {
                    this.updatePosition(this.state.abscisseJoueur - 1, this.state.ordonneeJoueur);
                }else{
                    //toast.error("Un obstacle vous empeche d'aller à cet endroit")
                }
                break;
            case "d":
                if(this.verifiyMove(this.state.abscisseJoueur + 1, this.state.ordonneeJoueur)) {
                    this.updatePosition(this.state.abscisseJoueur + 1, this.state.ordonneeJoueur);
                }else{
                    //toast.error("Un obstacle vous empeche d'aller à cet endroit")
                }
                break;
        }
    }

    async updatePosition(abscisse, ordonnee){
        const data = await UsersApi.updatePosition(this.state.mapId, abscisse, ordonnee)
        if(this.props.target.type === "monstre"){
            this.props.removePlayerTarget();
        }

        this.setState({abscisseJoueur: data.abscisseJoueur, ordonneeJoueur: data.ordonneeJoueur, cases: data.cases, mapId: data.mapId},
            () => {
                this.setState({ unabledCases: this.getUnabledMove() })
                this.props.updatePositionJoueur({abscisse: data.abscisseJoueur, ordonnee: data.ordonneeJoueur})
                this.props.updateJoueurState({lifeJoueur: data.life, manaJoueur: data.mana, pm: data.pm})
            });

        if(data.ordonneeJoueur != ordonnee || data.abscisseJoueur != abscisse){
            //toast.error("Un obstacle vous empeche d'aller à cet endroit");
        }

    }

    async changeMap(targetMapId, targetWrap, clickedWrap){
        const mapPosition = await UsersApi.changeMap(targetMapId, targetWrap, clickedWrap);
        if(mapPosition.message !== undefined && mapPosition.mapId === undefined){
            //toast(mapPosition.message);
        }else{
            const mapData = await MapApi.find(mapPosition.mapId);
            this.setState({
                cases: mapData.cases,
                name: mapData.mapInfo.nom,
                mapId: mapData.mapId,
                ordonneeJoueur: mapPosition.ordonnee,
                abscisseJoueur: mapPosition.abscisse,
                isInstance: mapData.mapInfo.isInstance
            });
            this.props.updateJoueurState({mapId: mapData.mapId})
            this.props.updatePositionJoueur({abscisse: mapPosition.abscisse, ordonnee:  mapPosition.ordonnee })
            this.setState({unabledCases: this.getUnabledMove()});
            this.props.removePlayerTarget();
        }




    }

    verifiyMove(abscisse, ordonnee){
        const newCase = this.state.cases.filter(oneCase => oneCase.abscisse === abscisse && oneCase.ordonnee === ordonnee)[0];
        if(newCase !== undefined){
            const newCaseId = this.state.cases.filter(oneCase => oneCase.abscisse === abscisse && oneCase.ordonnee === ordonnee)[0].carteCarreauId;
            return this.state.unabledCases.filter(oneCase => oneCase === newCaseId).length
        }
       return false;
    }

    getUnabledMove(){
        const filteredOrdonnee= [ this.state.ordonneeJoueur-1, this.state.ordonneeJoueur, this.state.ordonneeJoueur+1 ];
        const filteredAbscisse= [ this.state.abscisseJoueur-1, this.state.abscisseJoueur, this.state.abscisseJoueur+1 ];

        const filteredCases = this.state.cases.filter(oneCase => {
            return filteredAbscisse.includes(oneCase.abscisse) && filteredOrdonnee.includes(oneCase.ordonnee) && oneCase.isUsable
            && !(oneCase.abscisse === this.state.abscisseJoueur && oneCase.ordonnee === this.state.ordonneeJoueur || oneCase.userId !== null || oneCase.pnjId !== null)

        })

        return filteredCases.map(oneCase => oneCase = oneCase.carteCarreauId);
    }


    handleClick(clickedCase){
        if(clickedCase.isWrap){
            const distance = distanceCalculator.computeDistance(clickedCase.abscisse, clickedCase.ordonnee, this.state.abscisseJoueur, this.state.ordonneeJoueur)
            if(distance <= 1){
                this.changeMap(clickedCase.targetMapId, clickedCase.targetWrap, clickedCase.carteCarreauId)
            }
        }
        else if(this.state.unabledCases.includes(clickedCase.carteCarreauId)){
            this.updatePosition(clickedCase.abscisse, clickedCase.ordonnee);
        }
    }

    getJoueur(uniqueCase){
        if(this.state.abscisseJoueur == uniqueCase.abscisse && this.state.ordonneeJoueur == uniqueCase.ordonnee){
         return this.props.user
        }else{
            if(!this.state.isInstance){
                if(uniqueCase.userId){
                    return {pseudo: uniqueCase.pseudo, nomClasse: uniqueCase.nomClasse, idJoueur: uniqueCase.userId, niveau: uniqueCase.niveau, alignement: uniqueCase.nomAlignement, sexe: uniqueCase.sexe}
                }
            }
        }
        return false
    }

    render()
    {
        return (<>

            <div className="banner-map">
                <h1 className="text-center title-map-font">{this.state.name}</h1>
            </div>

            <div className="cases" style={{backgroundImage: "url("+require("../../../img/map/"+this.state.mapId+".png").default+")", backgroundSize: 'cover'}}>
                {this.state.cases.map(uniqueCase => (
                    <div  onClick={() =>this.handleClick(uniqueCase)}>
                        <Case key={uniqueCase.carteCarreauId}
                              debug={uniqueCase.carteCarreauId}
                              abscisse={uniqueCase.abscisse}
                              ordonnee={uniqueCase.ordonnee}
                              haveJoueur={this.getJoueur(uniqueCase)}
                              hasMonstre={uniqueCase.hasMonstre ? uniqueCase.hasMonstre : false}
                              hasPnj={uniqueCase.pnjName ? {pnjId: uniqueCase.pnjId, pnjName: uniqueCase.pnjName, pnjSkin: uniqueCase.pnjSkin, pnjAvatar: uniqueCase.pnjAvatar, pnjDescription: uniqueCase.pnjDescription} : false}
                              hasBoss={uniqueCase.bossName ? {bossId: uniqueCase.bossId, bossName: uniqueCase.bossName, bossSkin: uniqueCase.bossSkin} : false}
                              hasAction={uniqueCase.actionName ? {actionName: uniqueCase.actionName, actionLink: uniqueCase.actionLink, actionParams: uniqueCase.actionParams} : false}
                              isUnabled={this.state.unabledCases.includes(uniqueCase.carteCarreauId)}
                        />
                    </div>
                ))}
            </div>
        </>)
    }
}

export default connect((state, ownProps) => {
    return {target: state.data.target, joueurState: state.data.joueurState, ownProps};
}, {updatePositionJoueur, removePlayerTarget, updateJoueurState})(Map);