import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar'
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import authAPI from "./services/authAPI";
import ProfilPage from "./pages/ProfilPage";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import MapPage from "./pages/MapPage";
import GuildePage from "./pages/GuildePage";
import InventoryPage from "./pages/InventoryPage";
import {Provider} from "react-redux";
// import MercureSubscriber from "@cerati/react-mercure";
import store from "./store/index"
import AdministrationPage from "./administration/pages/AdministrationPage";
import HistoryPage from "./pages/HistoryPage";

authAPI.setup();

const Index =  () => {
    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
    const [role, setRole] = useState(authAPI.getRoles());

    const NavbarWitRouter = withRouter(Navbar)


    const context = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        role: role
    }


    return (
        <AuthContext.Provider value={context}>
            <HashRouter>
                <NavbarWitRouter/>
                <main className={!isAuthenticated ? "" : "main-auth-bg"}>
                    <Switch>
                        <Route path="/connexion" component={LoginPage}/>
                        <Route path="/inscription" component={RegisterPage}/>
                        <Route path="/preview" component={RegisterPage}/>
                        <Route path="/about" component={RegisterPage}/>
                        <PrivateRoute path="/profil" component={ProfilPage}/>
                        <PrivateRoute path="/carte" component={MapPage}/>
                        <PrivateRoute path="/inventaire" redirectTo="/inventaire/equipement" component={InventoryPage}/>
                        <PrivateRoute path="/guilde" component={GuildePage}/>
                        <PrivateRoute path="/historique"  component={HistoryPage}/>
                        <PrivateRoute path="/administration"  isAdmin={true} component={AdministrationPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>

                </main>
                <footer className="footer">
                    Clement Silvestre - jeu en cours de construction
                </footer>

            </HashRouter>
        </AuthContext.Provider>
    )

}

const rootElement = document.querySelector('#app');
ReactDOM.render(<Provider store={store} ><Index /></Provider>, rootElement);
