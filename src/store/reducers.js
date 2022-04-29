import * as actions from './actions'
import {combineReducers} from "redux";

export const playerStatsReducer = (state = {
    data: {
        target: {
            targetId: 0,
            type: "none"
        },
        positionJoueur: {
            abscisseTarget: 0,
            ordonneeTarget:0
        },
        joueurState: {
            experience: 0,
            newExperience: 0,
            damage: 0,
            damageReturns: 0,
            droppedItems: "",
            lifeJoueur: 0,
            pa: 0
        }
    },
    loading: false,
    error: null
}, action) => {
    switch (action.type){
        case actions.REQUEST_TARGET:
            return {
                ...state,
                loading: true
            }
        case actions.UPDATE_PLAYER_TARGET: {
            return {
                ...state,
                data: {...state.data, target: {...state.data.target, ...action.payload}},
                loading: false,
                error: null
            }
        }
        case actions.FETCH_TARGET_SUCCESS:
            if (action.target) {
                return {
                    ...state,
                    data: {...state.data, target: {...state.data.target, ...action.target}},
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
                data: {...state.data, target: {}},
            }
        }
        case actions.UPDATE_POSITION_JOUEUR: {
            return {
                ...state,
                data: {...state.data, positionJoueur: action.coordonnees}
            }
        }
        case actions.UPDATE_JOUEUR_STATE: {
            return {
                ...state,
                data: {...state.data, joueurState: {...state.joueurState, ...action.joueurState}}
            }
        }
        default: {
            return state;
        }
    }
}

