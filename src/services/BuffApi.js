import axios from 'axios';
import {API_URL} from "../config";

function getActiveBuff(){
    return axios.post(API_URL + "joueur/buffs", {}).then(response => response.data)
}




export default {
    getActiveBuff
}