import axios from 'axios';
import {API_URL} from "../config";


function getPlayerInventaire(id, type){
    return axios.post(API_URL + "inventaire", {})
        .then(response => response.data)
}

function getEquipementEquipe(){
    return axios.post(API_URL + "inventaire/equipement/equipe", {})
        .then(response => response.data)
}

function wearEquipement(idEquipement){
    return axios.post(API_URL + "inventaire/equipement/wear", {idEquipement: idEquipement})
        .then(response => response.data)
}

function unwearEquipement(idEquipement){
    return axios.post(API_URL + "inventaire/equipement/unwear", {idEquipement: idEquipement})
        .then(response => response.data)
}


export default {
    getPlayerInventaire,
    getEquipementEquipe,
    unwearEquipement,
    wearEquipement
}