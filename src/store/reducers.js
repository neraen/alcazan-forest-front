import * as actions from './actions'
import {combineReducers} from "redux";

export const playerStatsReducer = (state = {
    data: {
        targetId: 0,
        type: "none",
        abscisseTarget: 0,
        ordonneeTarget:0
    },
    loading: false,
    error: null
}, action) => {
    switch (action.type){
        case actions.UPDATE_PLAYER_LIFE: {
            return {
                ...state,
                life: action.life
            }
        }
        case actions.UPDATE_PLAYER_MANA: {
            return {
                ...state,
                mana: action.mana
            }
        }
        case actions.UPDATE_PLAYER_EXPERIENCE: {
            return {
                ...state,
                experience: action.experience
            }
        }
        case actions.REQUEST_TARGET:
            return {
                ...state,
                loading: true
            }
        case actions.UPDATE_PLAYER_TARGET: {
            return {
                ...state,
                data: {...state.data, ...action.payload},
                loading: false,
                error: null
            }
        }
        case actions.FETCH_TARGET_SUCCESS:
            if (action.target) {
                return {
                    ...state,
                    data: {...state.data, ...action.target},
                    loading: false,
                    error: null
                }
            } else {
                return {
                    ...state,
                    loading: false
                }
            }
        case actions.FETCH_TARGET_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actions.REMOVE_PLAYER_TARGET: {
            return {
                ...state,
                target: {}
            }
        }
        case actions.UPDATE_DISTANCE_TARGET: {
            return {
                ...state,
                distance: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

