import React from 'react'
import MapApi from "../../services/MapApi";
import Case from "./Case";
import UsersApi from "../../services/UsersApi";
import MapContext from "../../contexts/MapContext";
import {connect} from "react-redux";
import {updatePositionJoueur, removePlayerTarget} from "../../store/actions";


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
            mapId: this.props.user.mapId
        };
        this.props.updatePositionJoueur({abscisse: this.props.user.caseAbscisse, ordonnee: this.props.user.caseOrdonnee})
    }

    async componentDidMount () {
        try {
            const data = await MapApi.find(this.state.mapId);
            this.setState({cases: data.cases, name: data.mapInfo.nom});
            this.setState({unabledCases: this.getUnabledMove()});
        }catch(error){

        }
        this.listenKeyboard();
    }

    listenKeyboard() {
        document.addEventListener("keypress",  (event) => this.handleKeybord(event))
    }

    handleKeybord(event){
        switch (event.key){
            case "z":
                if(this.verifiyMove(this.state.abscisseJoueur, this.state.ordonneeJoueur - 1)){
                    this.updatePosition( this.state.abscisseJoueur, this.state.ordonneeJoueur - 1);
                }
                break;
            case "s":
                if(this.verifiyMove(this.state.abscisseJoueur, this.state.ordonneeJoueur + 1)) {
                    this.updatePosition(this.state.abscisseJoueur, this.state.ordonneeJoueur + 1);
                }
                break;
            case "q":
                if(this.verifiyMove(this.state.abscisseJoueur - 1, this.state.ordonneeJoueur)) {
                    this.updatePosition(this.state.abscisseJoueur - 1, this.state.ordonneeJoueur);
                }
                break;
            case "d":
                if(this.verifiyMove(this.state.abscisseJoueur + 1, this.state.ordonneeJoueur)) {
                    this.updatePosition(this.state.abscisseJoueur + 1, this.state.ordonneeJoueur);
                }
                break;
        }
    }

    async updatePosition(abscisse, ordonnee){
        const data = await UsersApi.updatePosition(this.state.mapId, abscisse, ordonnee)
        if(this.props.target.type === "monstre"){
            this.props.removePlayerTarget();
        }
        this.setState({abscisseJoueur: abscisse, ordonneeJoueur: ordonnee, cases: data},
            () => {
                this.setState({unabledCases: this.getUnabledMove()})
                this.props.updatePositionJoueur({abscisse: abscisse, ordonnee: ordonnee})
            });

    }

    async changeMap(targetMapId, targetWrap){
        const mapPosition = await UsersApi.changeMap(targetMapId, targetWrap);
        const mapData = await MapApi.find(mapPosition.mapId);
        this.setState({
            cases: mapData.cases,
            name: mapData.mapInfo.nom,
            mapId: mapData.mapId,
            ordonneeJoueur: mapPosition.ordonnee,
            abscisseJoueur: mapPosition.abscisse
        });
        this.setState({unabledCases: this.getUnabledMove()});
    }

    verifiyMove(abscisse, ordonnee){
        const newCaseId = this.state.cases.filter(oneCase => oneCase.abscisse === abscisse && oneCase.ordonnee === ordonnee)[0].carteCarreauId;
        return this.state.unabledCases.filter(oneCase => oneCase === newCaseId).length
    }

    getUnabledMove(){
        const filteredOrdonnee= [ this.state.ordonneeJoueur-1, this.state.ordonneeJoueur, this.state.ordonneeJoueur+1 ];
        const filteredAbscisse= [ this.state.abscisseJoueur-1, this.state.abscisseJoueur, this.state.abscisseJoueur+1 ];

        const filteredCases = this.state.cases.filter(oneCase => filteredAbscisse.includes(oneCase.abscisse) && filteredOrdonnee.includes(oneCase.ordonnee) && oneCase.isUsable && !(oneCase.abscisse === this.state.abscisseJoueur && oneCase.ordonnee === this.state.ordonneeJoueur || oneCase.userId !== null))

        return filteredCases.map(oneCase => oneCase = oneCase.carteCarreauId);
    }


    handleClick(clickedCase){
        if(clickedCase.isWrap){
            this.changeMap(clickedCase.targetMapId, clickedCase.targetWrap)
        }
        else if(this.state.unabledCases.includes(clickedCase.carteCarreauId)){
            this.updatePosition(clickedCase.abscisse, clickedCase.ordonnee);
        }
    }

    render()
    {
        return (<>
            <div className="banner-map">
                <h1 className="text-center title-map-font">{this.state.name}</h1>
            </div>
            <div className="cases" style={{backgroundImage: "url("+require("../../img/map/"+this.state.mapId+".png").default+")", backgroundSize: 'contain'}}>
                {this.state.cases.map(uniquecase => (
                    <div  onClick={() =>this.handleClick(uniquecase)}>
                        <Case key={uniquecase.carteCarreauId}
                              abscisse={uniquecase.abscisse}
                              ordonnee={uniquecase.ordonnee}
                              haveJoueur={(this.state.abscisseJoueur == uniquecase.abscisse && this.state.ordonneeJoueur == uniquecase.ordonnee) ?  this.props.user : uniquecase.userId ? {pseudo: uniquecase.pseudo, nomClasse: uniquecase.nomClasse, idJoueur: uniquecase.userId, niveau: uniquecase.niveau, alignement: uniquecase.nomAlignement, sexe: uniquecase.sexe} : false}
                              hasMonstre={uniquecase.hasMonstre ? uniquecase.hasMonstre : false}
                              hasPnj={uniquecase.pnjName ? {pnjId: uniquecase.pnjId, pnjName: uniquecase.pnjName, pnjSkin: uniquecase.pnjSkin, pnjAvatar: uniquecase.pnjAvatar, pnjDescription: uniquecase.pnjDescription} : false}
                              isUnabled={this.state.unabledCases.includes(uniquecase.carteCarreauId)}
                        />
                    </div>
                ))}
            </div>
        </>)
    }
}

export default connect((state, ownProps) => {
    return {target: state.data.target, ownProps};
}, {updatePositionJoueur, removePlayerTarget})(Map);