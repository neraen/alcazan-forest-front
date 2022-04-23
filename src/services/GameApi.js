import axios from 'axios';
import {API_URL} from "../config";


function getTargetInfos(id, type){
   return axios.post(API_URL + "target/" + type, {targetId: id})
       //.then(response => response.data)
}


export default {
    getTargetInfos
}