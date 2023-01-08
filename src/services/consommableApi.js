import axios from "axios";
import {API_URL} from "../config";


function getAllConsommables() {
    return axios.post(`${API_URL}consommables`, {}).then(response => response.data.consommables);
}

function getConsommable(consommableId) {
    return axios.post(`${API_URL}consommable`, {objectId: consommableId}).then(response => response.data);
}

function createConsommable(consommable) {
    return axios.post(`${API_URL}consommable/create`, {object: consommable});
}

function updateConsommable(consommableId, consommable) {
    return axios.post(`${API_URL}consommable/update`, {objectId: consommableId, object: consommable});
}

function deleteConsommable(consommableId) {
    return axios.post(`${API_URL}consommable/delete`, {objectId: consommableId});
}

export default {
    getAllConsommables,
    getConsommable,
    createConsommable,
    updateConsommable,
    deleteConsommable
}