import axios from 'axios';
import {API_URL} from "../../config";

function getAllQuests() {
    return axios.post(`${API_URL}quests`, {}).then(response => response.data);
}

function getQuest(questId) {
    return axios.post(`${API_URL}quest`, {questId: questId}).then(response => response.data);
}

function getQuestsInfoForSelect() {
    return axios.post(`${API_URL}quest/infos`, {}).then(response => response.data);
}

function deleteQuest(questId) {
    return axios.post(`${API_URL}quest/delete`, {questId: questId});
}

function updateQuest(questId, quest) {
    return axios.post(`${API_URL}quest/update`, {questId: questId, quest: quest});
}

function createQuest(questName) {
    return axios.post(`${API_URL}quest/create`, {name: questName});
}

function getAllActionTypes() {
    return axios.post(`${API_URL}action/types`, {}).then(response => response.data);
}


export default {
    getAllQuests,
    getQuest,
    updateQuest,
    createQuest,
    getQuestsInfoForSelect,
    deleteQuest,
    getAllActionTypes,
}