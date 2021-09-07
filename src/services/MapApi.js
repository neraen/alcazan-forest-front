import axios from 'axios';
import {CARTE_API} from "../config";

function findAll(){
    return axios.get(CARTE_API)
        .then(response => response.data['hydra:member'])
}


function find(id){
   return axios.get(CARTE_API + "/" + id)
       .then(response => response.data)
}


export default {
    findAll,
    find
}