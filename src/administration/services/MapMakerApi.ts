import axios from 'axios';
import {API_URL} from "../../config";


function updateMap(mapId, cases){
    return axios.post(API_URL + "map/update", {mapId: mapId, cases: cases}).then(response => response.data)
}

function getCasesInfoForSelect(mapId){
    return axios.post(API_URL + "map/cases/infos", {mapId: mapId}).then(response => response.data)
}

function getPnjInfoForSelect(){
    return axios.post(API_URL + "pnj/infos", {}).then(response => response.data)
}

function getMonstreInfoForSelect(){
    return axios.post(API_URL + "monstre/infos", {}).then(response => response.data)
}

export default {
    updateMap,
    getCasesInfoForSelect,
    getPnjInfoForSelect,
    getMonstreInfoForSelect
}