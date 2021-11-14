import axios from 'axios';
import {API_URL, USER_API} from "../config";

function register(user){
    return axios.post(USER_API, user)
}

function find(id){
    return axios.get(USER_API + "/" + id ).then(response => response.data)
}

function getLevelAndExperience(){
    console.log('toto')
    return axios.get(API_URL + "joueur/niveau" ).then(response => response.data['hydra:member'])
}

function updatePosition(id, user){
    return axios.patch(USER_API + "/"  + id,
        {caseAbscisse: user.caseAbscisse, caseOrdonnee: user.caseOrdonnee}
    );
}

function getCaracteristiques(id){
    return axios.get(API_URL + "joueur/caracteristiques").then(response => response.data['hydra:member'])
}

function updateCaracteristiques(data){
    return axios.post(API_URL + "joueur/caracteristiques/update", data)
}

function applyAttaqueToPlayer(target, spell){
    console.log(target, spell)
    console.log({target: target, spell: spell})
    return axios.post(API_URL + "joueur/attack", {targetId: target.id, spellId: spell.id})
}

export default {
    register,
    find,
    updatePosition,
    getCaracteristiques,
    updateCaracteristiques,
    getLevelAndExperience,
    applyAttaqueToPlayer
}