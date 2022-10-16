import axios from "axios";
import {API_URL} from "../config";

function fetchAllPlayerSpell(equipement){
    return axios.post(API_URL + "player/create", {}).then(response => response.data)
}


export default {
    fetchAllPlayerSpell
}