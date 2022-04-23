import GameApi from "../services/GameApi";

export const UPDATE_PLAYER_LIFE = 'update player life';
export const UPDATE_PLAYER_MANA = 'update player mana';
export const UPDATE_PLAYER_EXPERIENCE = 'update player experience';
export const UPDATE_PLAYER_TARGET = "update player target";
export const REMOVE_PLAYER_TARGET = "remove player target";
export const REQUEST_TARGET = "request target";
export const FETCH_TARGET_SUCCESS = "fetch target success";
export const FETCH_TARGET_ERROR = "fetch target error";
export const UPDATE_DISTANCE_TARGET = "update distance target";
export const UPDATE_POSITION_JOUEUR = "update position joueur";

export const updatePlayerLife = (payload) => {
    return{
        type: UPDATE_PLAYER_LIFE,
        payload
    }
}

export const updatePlayerMana = (payload) => {
    return{
        type: UPDATE_PLAYER_MANA,
        payload
    }
}

export const updatePlayerExperience = (payload) => {
    return{
        type: UPDATE_PLAYER_EXPERIENCE,
        payload
    }
}

export const updatePlayerTarget = (payload) => {
    return{
        type: UPDATE_PLAYER_TARGET,
        payload
    }
}

export const removePlayerTarget = (payload) => {
    return {
        type: REMOVE_PLAYER_TARGET,
        payload
    }
}

export const requestTarget = () => {
    return {
        type: REQUEST_TARGET
    }
}

export const fetchTargetSuccess = (target) => {
    return {
        type: FETCH_TARGET_SUCCESS,
        target
    }
}

export const fetchTodoError = (error) => {
    return {
        type: FETCH_TARGET_ERROR,
        error
    }
}

export const fetchTargetInfo = (target, type) => {
    return dispatch => {
        dispatch(requestTarget());
        return GameApi.getTargetInfos(target, type).then(
            response => {
                const target = response.data;
                dispatch(fetchTargetSuccess(target));
            },
            error => {
                dispatch(fetchTodoError(error));
            }
        )
    }
}

export const updatePositionJoueur = (payload) => {
    return{
        type: UPDATE_POSITION_JOUEUR,
        payload
    }
}