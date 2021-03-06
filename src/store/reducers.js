import * as actions from './actions'
import {combineReducers} from "redux";
import {SET_CASES, TOGGLE_COLLISION_CASE} from "./actions";

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
            maxExperience: 0,
            damage: 0,
            damageReturns: 0,
            droppedItems: "",
            lifeJoueur: 0,
            manaJoueur: 0,
            pa: 0,
            pm: 0,
            money: 0,
            level : 0,
            killMessage: '',
            needRefresh: false
        },
        mapMaker:{
            mode: {
                type: '',
                data: {}
            },
            cases: [],
            diffCases: [],
        },

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
                data: {...state.data, joueurState: {...state.data.joueurState, ...action.joueurState}}
            }
        }
        case actions.SET_CASES: {
            return {
                ...state,
                data: {...state.data, mapMaker: {...state.data.mapMaker, cases: [...action.cases]}}
            }
        }
        case actions.UPDATE_DIFF_CASES: {
            const diffCases = state.data.mapMaker.cases.filter((oneCase ,index) => {
                return JSON.stringify(action.cases[index]) !== JSON.stringify(state.data.mapMaker.cases[index])
            });
            return {
                ...state,
                data: {...state.data, mapMaker: {...state.data.mapMaker, diffCases: [diffCases]}}
            }
        }
        case actions.TOGGLE_COLLISION_CASE: {
            return {
                ...state,
                data: {...state.data, mapMaker: {...state.data.mapMaker, cases: [...state.data.mapMaker.cases.map((t, i) => {
                            if (i === action.index) {
                                t.isUsable = !t.isUsable;
                            }
                            return t;
                        })]}}
            }
        }
        case actions.ADD_WRAP_CASE: {
            return {
                ...state,
                data: {...state.data, mapMaker: {...state.data.mapMaker, cases: [...state.data.mapMaker.cases.map((t, i) => {
                            if (i === action.index) {
                                t.isWrap = true;
                                t.isUsable = false;
                                t.targetMapId = state.data.mapMaker.mode.data.mapId
                                t.targetWrap = state.data.mapMaker.mode.data.caseId
                            }
                            return t;
                        })]}}
            }
        }
        case actions.ADD_PNJ_CASE: {
            return {
                ...state,
                data: {...state.data, mapMaker: {...state.data.mapMaker, cases: [...state.data.mapMaker.cases.map((t, i) => {
                            if (i === action.index) {
                                t.isUsable = false;
                                t.pnjId = state.data.mapMaker.mode.data.pnjId
                            }
                            return t;
                        })]}}
            }
        }
        case actions.ADD_MONSTER_CASE: {
            return {
                ...state,
                data: {...state.data, mapMaker: {...state.data.mapMaker, cases: [...state.data.mapMaker.cases.map((t, i) => {
                            if (i === action.index) {
                                t.hasMonstre = state.data.mapMaker.mode.data.monstreId
                                t.monstreQuantity = state.data.mapMaker.mode.data.quantity
                            }
                            return t;
                        })]}}
            }
        }
        case actions.UPDATE_MODE_MAP_MAKER: {
            return {
                ...state,
                data: {...state.data, mapMaker: {...state.data.mapMaker, mode: action.mode}}
            }
        }
        default: {
            return state;
        }
    }
}

