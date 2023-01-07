import axios from "axios";
import {API_URL} from "../config";


function getAllObjects() {
    return axios.post(`${API_URL}objects`, {}).then(response => response.data);
}

function getObject(objectId) {
    return axios.post(`${API_URL}object`, {objectId: objectId}).then(response => response.data);
}

function createObject(object) {
    return axios.post(`${API_URL}object/create`, {object: object});
}

function updateObject(objectId, object) {
    return axios.post(`${API_URL}object/update`, {objectId: objectId, object: object});
}

function deleteObject(objectId) {
    return axios.post(`${API_URL}object/delete`, {objectId: objectId});
}

export default {
    getAllObjects,
    getObject,
    createObject,
    updateObject,
    deleteObject
}