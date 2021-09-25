import axios from 'axios';
import {API_URL, USER_API} from "../config";

function register(user){
    return axios.post(USER_API, user)
}

function find(id){
    return axios.get(USER_API + "/" + id ).then(response => response.data)
}

function updatePosition(id, user){
    return axios.patch(USER_API + "/"  + id,
        {caseAbscisse: user.caseAbscisse, caseOrdonnee: user.caseOrdonnee}
    );
}

function getCaracteristiques(id){
    return axios.get(API_URL + "joueur/caracteristiques").then(response => response.data['hydra:member'])
}

export default {
    register,
    find,
    updatePosition,
    getCaracteristiques
}