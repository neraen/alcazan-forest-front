import axios from 'axios';
import {API_URL, USER_API} from "../config";

function register(user){
    return axios.post(USER_API, user)
}

function applyUserAction(link, params){
    return axios.post(API_URL + link, JSON.parse(params)).then(response => response.data)
}

function buyItem(itemId){
    console.log(itemId)
    return axios.post(API_URL + 'joueur/buy/shop', {item: itemId}).then(response => response.data)
}


export default {
    applyUserAction,
    buyItem
}