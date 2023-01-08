import axios from 'axios';
import {API_URL} from "../config";

function create(equipement){
    return axios.post(API_URL + "equipement/create", {equipement: equipement}).then(response => response.data)
}

function fetchFormElements(){
    return axios.post(API_URL + "equipement/formelements", {}).then(response => response.data)
}

function getAllEquipements() {
    return axios.post(API_URL + "equipements", {}).then(response => response.data.equipements);
}

export default {
    create,
    fetchFormElements,
    getAllEquipements
}