import GameApi from "../services/GameApi";

export const UPDATE_PLAYER_TARGET = "update player target";
export const REMOVE_PLAYER_TARGET = "remove player target";
export const REQUEST_TARGET = "request target";
export const FETCH_TARGET_SUCCESS = "fetch target success";
export const FETCH_TARGET_ERROR = "fetch target error";
export const UPDATE_POSITION_JOUEUR = "update position joueur";
export const UPDATE_JOUEUR_STATE = "update joueur state";

export const SET_CASES = "set cases";
export const UPDATE_DIFF_CASES = "update diff cases";
export const TOGGLE_COLLISION_CASE = "toggle Collision Cases";
export const UPDATE_MODE_MAP_MAKER = "update mode mapmaker";
export const ADD_WRAP_TOOL = "add wrap tool"
export const ADD_WRAP_CASE = "add wrap case"
export const ADD_PNJ_CASE = "add pnj case"
export const ADD_MONSTER_CASE = "add monster case"


export const updatePlayerTarget = (payload) => {
    return{
        type: UPDATE_PLAYER_TARGET,
        payload
    }
}

export const removePlayerTarget = () => {
    return {
        type: REMOVE_PLAYER_TARGET,
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

export const fetchTargetError = (error) => {
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
                dispatch(fetchTargetError(error));
            }
        )
    }
}

export const updatePositionJoueur = (coordonnees) => {
    return{
        type: UPDATE_POSITION_JOUEUR,
        coordonnees
    }
}

export const updateJoueurState = (joueurState) => {
    return{
        type: UPDATE_JOUEUR_STATE,
        joueurState
    }
}

export const setCases = (cases) => {
    return{
        type: SET_CASES,
        cases
    }
}

export const updateDiffCases = (cases) => {
    return{
        type: UPDATE_DIFF_CASES,
        cases
    }
}

export const toggleCollisionCase = (index) => {
    return{
        type: TOGGLE_COLLISION_CASE,
        index
    }
}

export const addWrapCase = (index) => {
    return{
        type: ADD_WRAP_CASE,
        index
    }
}

export const addPnjCase = (index) => {
    return{
        type: ADD_PNJ_CASE,
        index
    }
}

export const addMonsterCase = (index) => {
    return{
        type: ADD_MONSTER_CASE,
        index
    }
}

export const updateModeMapMaker = (mode) => {
    return{
        type: UPDATE_MODE_MAP_MAKER,
        mode
    }
}

export const addWrapTool= (wrap) => {
    return{
        type: ADD_WRAP_TOOL,
        wrap
    }
}