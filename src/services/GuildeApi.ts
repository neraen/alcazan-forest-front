import axios from 'axios';
import {API_URL} from "../config";


function fetchGuildeData(){
    return axios.post(API_URL + "guilde/infos", {})
        .then(response => response.data)
}

export default {
    fetchGuildeData,
}