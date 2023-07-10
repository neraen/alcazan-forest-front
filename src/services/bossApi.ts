import axios from "axios";
import {API_URL} from "../config";


function getAllBosses() {
    return axios.post(`${API_URL}bosses`, {}).then(response => response.data.bosses);
}

function getBoss(bossId) {
    return axios.post(`${API_URL}boss`, {objectId: bossId}).then(response => response.data);
}

function createBoss(boss) {
    return axios.post(`${API_URL}boss/create`, {object: boss});
}

function updateBoss(bossId, boss) {
    return axios.post(`${API_URL}boss/update`, {objectId: bossId, object: boss});
}

function deleteBoss(bossId) {
    return axios.post(`${API_URL}boss/delete`, {objectId: bossId});
}

export default {
    getAllBosses,
    getBoss,
    createBoss,
    updateBoss,
    deleteBoss
}