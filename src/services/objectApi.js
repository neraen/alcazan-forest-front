import axios from 'axios';
import {API_URL} from "../config";

function getAllObjects(){
    return axios.post(API_URL + "objects", {}).then(response => response.data)
}



export default {
    getAllObjects
}