import React from 'react'
import MapApi from "../../services/MapApi";
import Case from "./Case";
import UsersApi from "../../services/UsersApi";
import MapContext from "../../contexts/MapContext";


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
            unabledCases: []
        };
    }

    async componentDidMount () {
        try {
            const data = await MapApi.find(this.props.user.map.id);
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
                this.updatePosition( this.state.abscisseJoueur, this.state.ordonneeJoueur - 1);
                break;
            case "s":
                this.updatePosition( this.state.abscisseJoueur, this.state.ordonneeJoueur + 1);
                break;
            case "q":
                this.updatePosition( this.state.abscisseJoueur - 1, this.state.ordonneeJoueur);
                break;
            case "d":
                this.updatePosition( this.state.abscisseJoueur + 1, this.state.ordonneeJoueur);
                break;
        }
    }

    async updatePosition(abscisse, ordonnee){
        const data = await UsersApi.updatePosition(abscisse, ordonnee)
        this.setState({abscisseJoueur: abscisse, ordonneeJoueur: ordonnee});
        this.setState({cases: data});
        this.setState({unabledCases: this.getUnabledMove()});
    }


    getUnabledMove(){
        const filteredOrdonnee= [ this.state.ordonneeJoueur-1, this.state.ordonneeJoueur, this.state.ordonneeJoueur+1];
        const filteredAbscisse= [ this.state.abscisseJoueur-1, this.state.abscisseJoueur, this.state.abscisseJoueur+1];

        const filteredCases = this.state.cases.filter(oneCase => filteredAbscisse.includes(oneCase.abscisse) && filteredOrdonnee.includes(oneCase.ordonnee) && oneCase.isUsable && !(oneCase.abscisse === this.state.abscisseJoueur && oneCase.ordonnee === this.state.ordonneeJoueur))

        return filteredCases.map(oneCase => oneCase = oneCase.carteCarreauId);
    }


    handleClick(carteCarreauId, abscisse, ordonnee){
        if(this.state.unabledCases.includes(carteCarreauId)){
            this.updatePosition(abscisse, ordonnee);
        }
    }

    render()
    {
        return (<>
            <div className="banner-map">
                <h1 className="text-center title-map-font">{this.state.name}</h1>
            </div>
            <div className="cases" style={{backgroundImage: "url(../../../img/map/"+this.props.user.map.id+".png)"}}>
                {this.state.cases.map(uniquecase => (
                    <div  onClick={() =>this.handleClick(uniquecase.carteCarreauId,uniquecase.abscisse, uniquecase.ordonnee)}>
                        <Case key={uniquecase.carteCarreauId}
                              abscisse={uniquecase.abscisse}
                              ordonnee={uniquecase.ordonnee}
                              haveJoueur={(this.state.abscisseJoueur == uniquecase.abscisse && this.state.ordonneeJoueur == uniquecase.ordonnee) ?  this.props.user : uniquecase.userId ? {pseudo: uniquecase.pseudo, classe: uniquecase.nomClasse, idJoueur: uniquecase.userId, niveau: uniquecase.niveau, alignement: uniquecase.nomAlignement} : false}
                              hasMonstre={uniquecase.hasMonstre ? uniquecase.hasMonstre : false}
                              isUnabled={this.state.unabledCases.includes(uniquecase.carteCarreauId)}
                        />
                    </div>
                ))}
            </div>
        </>)
    }
}

/*const MapStore = connect(
    (state) => ({
        cases: [],
        name: "",
        abscisseJoueur: this.props.user.caseAbscisse,
        ordonneeJoueur: this.props.user.caseOrdonnee,
        users: []
    })
)(Map)*/

export default Map