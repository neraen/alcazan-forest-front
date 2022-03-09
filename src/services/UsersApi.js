import axios from 'axios';
import {API_URL, USER_API} from "../config";

function register(user){
    return axios.post(USER_API, user)
}

function find(){
    return axios.post(API_URL + "joueur/data/minimal").then(response => response.data)
}

function getLevelAndExperience(){
    return axios.get(API_URL + "joueur/niveau" ).then(response => response.data['hydra:member'])
}

function getPlayerSpells(){
    return axios.post(API_URL + "joueur/spells" ).then(response => response.data)
}

function getCaracteristiques(id){
    return axios.get(API_URL + "joueur/caracteristiques").then(response => response.data['hydra:member'])
}

function updateCaracteristiques(data){
    return axios.post(API_URL + "joueur/caracteristiques/update", data)
}

function applyAttaqueToPlayer(target, spell){
    return axios.post(API_URL + "joueur/attack", {targetId: target.id, spellId: spell, type: target.type}).then(response => response.data)
}

function updatePosition(mapId, abscisse, ordonnee){
    return axios.post(API_URL + "joueur/case/update_position", {mapId: mapId, caseAbscisse: abscisse, caseOrdonnee: ordonnee}).then(response => response.data)
}

function changeMap(targetMapId, targetWrap){
    return axios.post(API_URL + "joueur/map/update_position", {targetMapId: targetMapId, targetWrap: targetWrap}).then(response => response.data)
}

function getExpJoueur(){
    return axios.post(API_URL + "joueur/experience").then(response => response.data)
}

export default {
    register,
    find,
    updatePosition,
    changeMap,
    getCaracteristiques,
    updateCaracteristiques,
    getLevelAndExperience,
    getPlayerSpells,
    applyAttaqueToPlayer,
    getExpJoueur
}