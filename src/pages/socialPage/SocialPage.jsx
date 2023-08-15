import React from "react";
import {Link, Redirect} from "react-router-dom";
import Switch from "react-bootstrap/Switch";
import PrivateRoute from "../../components/PrivateRoute";
import Equipements from "../../components/inventory/equipement/Equipements";
import Objets from "../../components/inventory/objets/Objets";

class SocialPage extends React.Component{
    render(){
        return (<>
            <div className="inventaire-header">
                <h3 className="inventaire-title"><Link activeClassName="inventaire-active" className="title-map-font inventaire-active" to='/social/joueurs' >Joueurs</Link></h3>
                <h3 className="inventaire-title"><Link activeClassName="inventaire-active" className="title-map-font inventaire-active" to='/social/amis' >Amis</Link></h3>
                <h3 className="inventaire-title"><Link activeClassName="inventaire-active" className="title-map-font inventaire-active" to='/social/guilde' >Guilde</Link></h3>
                <h3 className="inventaire-title"><Link activeClassName="inventaire-active" className="title-map-font inventaire-active" to='/social/messagerie' >Messagerie</Link></h3>
                <h3 className="inventaire-title"><Link activeClassName="inventaire-active" className="title-map-font inventaire-active" to='/social/chat' >Chat</Link></h3>
                <h3 className="inventaire-title"><Link activeClassName="inventaire-active" className="title-map-font inventaire-active" to='/social/event' >Event</Link></h3>
            </div>

            <Switch>
                <PrivateRoute path="/inventaire/equipement" component={() => <Equipements equipements={this.state.equipements} shouldRefreshInventory={() => this.shouldRefreshInventory()} />}/>
                <PrivateRoute path="/inventaire/objet" component={() => <Objets consommables={this.state.consommables}  objets={this.state.objets}/>}/>
                {this.props.history.location.pathname === '/social' && <Redirect to="/social/joueurs"></Redirect>}
            </Switch>
        </>  )
    }
}