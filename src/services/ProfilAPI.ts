import axios from "axios";
import {API_URL} from "../config";


function getEquipementEquipeJoueur(userId){
    return axios.post(API_URL + "profil/joueur/equipement", {userId: userId})
        .then(response => response.data)
}

export default {
    getEquipementEquipeJoueur
}