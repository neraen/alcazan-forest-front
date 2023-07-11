import axios from 'axios';
import {API_URL, USER_API} from "../config";

function register(user){
    return axios.post(USER_API, user)
}

function applyUserAction(link, params, actionId){
    return axios.post(API_URL + link, {...JSON.parse(params), actionId: actionId}).then(response => response.data)
}

function takeConsommable(consommableId){
    return axios.post(API_URL + 'joueur/use/consommable', {consommableId: consommableId}).then(response => response.data)
}

function buyItem(itemId){
    return axios.post(API_URL + 'joueur/buy/shop', {item: itemId}).then(response => response.data)
}

function joinGuilde(guildeId){
    return axios.post(API_URL + 'joueur/guilde/join', {guildeId: guildeId}).then(response => response.data)
}

function addFriend(userId){
    return axios.post(API_URL + 'joueur/add/friend', {userId: userId}).then(response => response.data)
}

function removeFriend(friendId){
    return axios.post(API_URL + 'joueur/remove/friend', {friendId: friendId}).then(response => response.data)
}

export default {
    applyUserAction,
    buyItem,
    takeConsommable,
    joinGuilde,
    addFriend,
    removeFriend
}