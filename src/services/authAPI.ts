import axios from "axios";
import jwtDecode from "jwt-decode";
import {LOGIN_API} from "../config";

function logout(){
    window.localStorage.removeItem("authToken")
    delete axios.defaults.headers["Authorization"]
}

async function  authenticate(credentials){
    return await axios.post(LOGIN_API, credentials)
         .then(response => {
             const token = response.data.token;
             if(token !== undefined){
                 window.localStorage.setItem("authToken", token)
                 setAxiosToken(token)
             }
         })
}

function setAxiosToken(token){
    return axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup(){
    const token = window.localStorage.getItem("authToken")
    if(token) {
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token)
        }
    }
}

function isAuthenticated(){
    const token = window.localStorage.getItem("authToken")
    if(token) {
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            return true
        }
    }
    return false
}

function getRoles(){
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const tokenData = jwtDecode(token);
        return tokenData.roles;
    }
    return ['ROLE_USER'];
}

function getUserInfo(){
    const token = window.localStorage.getItem("authToken")
    if(token) {
        const data = jwtDecode(token)
        return {
            pseudo: data.pseudo,
            email: data.email,
            id: data.id,
        };
    }
    return {};
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated,
    getUserInfo,
    getRoles
}



