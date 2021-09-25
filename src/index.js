import React, {useState, useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar'
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import authAPI from "./services/authAPI";
import ProfilPage from "./pages/ProfilPage";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import MapPage from "./pages/MapPage";
import InventoryPage from "./pages/InventoryPage";
import UsersApi from "./services/UsersApi";
import {Provider} from "react-redux";
import {CARTE_API, USER_API} from "./config";
import MercureSubscriber from "@cerati/react-mercure";
//import store from "store/index"

authAPI.setup();

const Index = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());

    const NavbarWitRouter = withRouter(Navbar)

    const context = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    }


    return(
        /*<Provider store={store} >*/

            <AuthContext.Provider value={context}>
            <HashRouter>
                <NavbarWitRouter />
                <main className={!isAuthenticated ? "": "" + "pt-5"}>
                    <Switch>
                        <Route path="/connexion" component={LoginPage}/>
                        <Route path="/inscription" component={RegisterPage} />
                        <Route path="/preview" component={RegisterPage} />
                        <Route path="/about" component={RegisterPage} />
                        <PrivateRoute path="/profil" component={ProfilPage} />
                        <PrivateRoute path="/carte" component={MapPage} />
                        <PrivateRoute path="/inventory" component={InventoryPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>

                </main>
                <footer className="footer">
                    Clement Silvestre - jeu en cours de construction
                </footer>

            </HashRouter>
            </AuthContext.Provider>
        //</Provider>
    )

}

const rootElement = document.querySelector('#app');
ReactDOM.render(<Index />, rootElement);
