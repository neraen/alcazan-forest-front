import axios from 'axios';
import {API_URL} from "../config";

function init(){
    return axios.post(API_URL + "chat/init", {}).then(response => response.data)
}




export default {
    init
}