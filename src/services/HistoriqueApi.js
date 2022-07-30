import axios from 'axios';
import {API_URL} from "../config";


function fetchHistoryData(){
    return axios.post(API_URL + "historique/infos", {})
        .then(response => response.data)
}

export default {
    fetchHistoryData,
}