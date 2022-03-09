import axios from 'axios';
import {API_URL} from "../config";


function getSequance(pnjId){
    return axios.post(API_URL + "pnj/sequance", {pnjId: pnjId}).then(response => response.data)
}



export default {
    getSequance,
}