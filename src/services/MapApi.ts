import axios from 'axios';
import {API_URL, CARTE_API} from "../config";

function findAll(){
    return axios.get(CARTE_API)
        .then(response => response.data['hydra:member'])
}

function find(id){
   return axios.post(API_URL + "map/cases/data", {mapId: id})
       .then(response => response.data)
}

function getAllMaps(id){
   return axios.post(API_URL + "map/all", {})
       .then(response => response.data)
}

function create(name){
    return axios.post(API_URL + "map/create", {name: name})
        .then(response => response.data)
}


export default {
    findAll,
    find,
    getAllMaps,
    create
}