import axios from 'axios';
import {API_URL} from "../../config";

function getAllActionTypes() {
    return axios.post(`${API_URL}action/types`, {}).then(response => response.data.actionTypes);
}

function getAllFields(actionTypeId) {
    return axios.post(`${API_URL}action/type/fields`, {actionTypeId: actionTypeId}).then(response => response.data.fields);
}

export default {
    getAllActionTypes,
    getAllFields
}