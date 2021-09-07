import React from 'react'
import MapApi from "../../services/MapApi";
import Case from "./Case";
import UsersApi from "../../services/UsersApi";
import MapContext from "../../contexts/MapContext";


// function useKey(key, cb){
//     const callbackRef = useRef(cb)
//
//     useEffect(() => {
//         callbackRef.current = cb
//     })
//
//     useEffect(() => {
//         function handle(event) {
//             if(event.key === key){
//                 callbackRef.current(event)
//             }
//         }
//         document.addEventListener("keypress", handle);
//         return () => document.removeEventListener("keypress", handle)
//     }, [key])
// }

class Map extends React.Component {

    static contextType = MapContext;

    constructor(props) {
        super(props);
        this.state = {
            cases: [],
            name: "",
            abscisseJoueur: this.props.user.caseAbscisse,
            ordonneeJoueur: this.props.user.caseOrdonnee,
            users: []
        };
    }

    async componentDidMount () {
        const target = this.context
        try {
            const data = await MapApi.find(this.props.user.map.id);
            this.setState({cases: data.carteCarreaux, name: data.nom});
        }catch(error){

        }
        this.listenKeyboard();

    }


    componentWillUnmount() {
        //document.removeEventListener("keypress", handle)
    }


    listenKeyboard() {
        document.addEventListener("keypress",  (event) => this.handleKeybord(event))
    }


     handleKeybord(event){
        switch (event.key){
            case "z":
                this.up()
                var user = {...this.props.user, caseAbscisse: this.state.abscisseJoueur, caseOrdonnee: this.state.ordonneeJoueur}
                this.updatePosition(user)
                break;
            case "s":
                this.down()
                var user = {...this.props.user, caseAbscisse: this.state.abscisseJoueur, caseOrdonnee: this.state.ordonneeJoueur}
                this.updatePosition(user)
                break;
            case "q":
                this.left()
                var user = {...this.props.user, caseAbscisse: this.state.abscisseJoueur, caseOrdonnee: this.state.ordonneeJoueur}
                this.updatePosition(user)
                break;
            case "d":
                this.right()
                var user = {...this.props.user, caseAbscisse: this.state.abscisseJoueur, caseOrdonnee: this.state.ordonneeJoueur}
                this.updatePosition(user)
                break;
            default:

        }
        this.refreshMap()
    }

    async updatePosition(user){
        await UsersApi.updatePosition(user.id, user)
    }

    async refreshMap(){
       const data = await MapApi.find(1);
       this.setState({cases: data.carteCarreaux, name: data.nom});
    }

    up(){
        const newOrd = this.state.ordonneeJoueur - 1
        this.setState({ordonneeJoueur: newOrd})
    }

    down(){
        const newOrd = this.state.ordonneeJoueur + 1
        this.setState({ordonneeJoueur: newOrd})
    }

    left(){
        const newAbs = this.state.abscisseJoueur - 1
        this.setState({abscisseJoueur: newAbs})
    }

    right(){
        const newAbs = this.state.abscisseJoueur + 1
        this.setState({abscisseJoueur: newAbs})
    }

    render()
    {
        return (<>
            <div className="banner-map">
                <h1 className="text-center title-map-font">{this.state.name}</h1>
            </div>
            <div className="cases" style={{backgroundImage: "url(../../../img/map/1.png)"}}>
                {this.state.cases.map(uniquecase => (
                    <Case key={uniquecase.id} data={uniquecase.carreau}
                          haveJoueur={(this.state.abscisseJoueur == uniquecase.abscisse && this.state.ordonneeJoueur == uniquecase.ordonnee) ?  true : false}
                          otherPlayer={uniquecase.joueur ? uniquecase.joueur : false}
                    />
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