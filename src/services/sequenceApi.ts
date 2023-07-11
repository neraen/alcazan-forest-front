import axios from "axios";
import {API_URL} from "../config";

function getAllSequences() {
    return axios.post(`${API_URL}sequences`, {}).then(response => response.data.sequences);
}

export default {
    getAllSequences
}