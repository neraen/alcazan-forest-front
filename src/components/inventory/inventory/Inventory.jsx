import React from 'react'
import InventaireApi from "../../../services/InventaireApi";
import Switch from "react-bootstrap/Switch";
import PrivateRoute from "../../PrivateRoute";
import Equipements from "../equipement/Equipements";
import Objets from "../objets/Objets";
import {Link, Redirect} from "react-router-dom";
import Loader from "../../loader/Loader";


class Inventory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            equipements: [],
            objets: [],
            consommables: [],
            loading: true
        }
    }

    componentDidMount() {
        this.fetchInventaire();
    }

    shouldRefreshInventory(){
        this.fetchInventaire();
    }

    async fetchInventaire(){
        const dataInventaire = await InventaireApi.getPlayerInventaire();
        this.setState({
            equipements: dataInventaire.equipements,
            objets: dataInventaire.objets,
            consommables: dataInventaire.consommables,
            loading: false
        })
    }


    render() {
        return (
            <>
                {!this.state.loading && (
                    <>
                        <h1 className="text-center title-map-font banner-map banner-map-inventory">Inventaire</h1>

                        <div className="inventaire-container">
                            <div className="inventaire-header">
                                <h3 className="inventaire-title"><Link activeClassName="inventaire-active" className="title-map-font inventaire-active" to='/inventaire/equipement' >Equipements</Link></h3>
                                <h3 className="inventaire-title"><Link activeClassName="inventaire-active" className="title-map-font inventaire-active" to='/inventaire/objet' >Objets</Link></h3>
                                <h3 className="inventaire-title"><Link activeClassName="inventaire-active" className="title-map-font inventaire-active" to='/inventaire/objet' >Objets de quêtes</Link></h3>
                            </div>
                        <Switch>
                            <PrivateRoute path="/inventaire/equipement" component={() => <Equipements equipements={this.state.equipements} shouldRefreshInventory={() => this.shouldRefreshInventory()} />}/>
                            <PrivateRoute path="/inventaire/objet" component={() => <Objets consommables={this.state.consommables}  objets={this.state.objets}/>}/>
                            {this.props.history.location.pathname === '/inventaire' && <Redirect to="/inventaire/equipement"></Redirect>}
                        </Switch>
                        </div>
                    </>
                ) || <div className="center-loader"><Loader /></div>}
            </>
        )

    }

}

export default Inventory