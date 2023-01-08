import axios from "axios";
import {API_URL} from "../config";


function getAllObjects() {
    return axios.post(`${API_URL}objets`, {}).then(response => response.data.objets);
}

function getObject(objectId) {
    return axios.post(`${API_URL}objet`, {objectId: objectId}).then(response => response.data);
}

function createObject(object) {
    return axios.post(`${API_URL}objet/create`, {object: object});
}

function updateObject(objectId, object) {
    return axios.post(`${API_URL}objet/update`, {objectId: objectId, object: object});
}

function deleteObject(objectId) {
    return axios.post(`${API_URL}objet/delete`, {objectId: objectId});
}

export default {
    getAllObjects,
    getObject,
    createObject,
    updateObject,
    deleteObject
}