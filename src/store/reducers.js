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
            idJoueur: 0,
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
            message: '',
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
        questMaker: {
            alignement: 0,
            objet: 0,
            level: 0,
            sequences: []
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
        case actions.UPDATE_QUEST_MAKER: {
            return {
                ...state,
                data: {...state.data, questMaker: {...state.data.questMaker, ...action.fields}}
            }
        }
        case actions.SET_QUEST_MAKER_SEQUENCES: {
            return {
                ...state,
                data: {...state.data, questMaker: {...state.data.questMaker, sequences: action.sequences}}
            }
        }
        case actions.ADD_QUEST_MAKER_SEQUENCE: {
            return {
                ...state,
                data: {...state.data, questMaker: {...state.data.questMaker, sequences: [...state.data.questMaker.sequences, action.sequence]}}
            }
        }
        case actions.UPDATE_QUEST_MAKER_SEQUENCE: {
            const sequences = state.data.questMaker.sequences.map((sequence, index) => {
                if(index === action.index){
                    return {...action.sequence}
                }else{
                    return sequence
                }
            });
            return {
                ...state,
                data: {...state.data, questMaker: {...state.data.questMaker, sequences: sequences}}
            }
        }
        case actions.REMOVE_QUEST_MAKER_SEQUENCE: {
            const sequences = state.data.questMaker.sequences.splice(action.index, 1);
            return {
                ...state,
                data: {...state.data, questMaker: {...state.data.questMaker, sequences: sequences}}
            }
        }
        case actions.SET_QUEST_MAKER_ACTIONS: {
            return {
                ...state,
                data: {...state.data, questMaker: {...state.data.questMaker, actions: action.actions}}
            }
        }
        case actions.ADD_QUEST_MAKER_ACTION: {
            const sequences = state.data.questMaker.sequences.map((sequence, index) => {
                if(index === action.sequenceIndex){
                    const actions = [...state.data.questMaker.sequences[action.sequenceIndex].actions, action.action]
                    sequence.actions = actions;
                    return sequence
                }else{
                    return sequence
                }
            });
            return {
                ...state,
                data: {...state.data, questMaker: {...state.data.questMaker, sequences: sequences}}
            }
        }
        case actions.UPDATE_QUEST_MAKER_ACTION: {
            const sequences = state.data.questMaker.sequences.map((sequence, index) => {
                if(index === action.sequenceIndex){
                    return {...sequence, actions: sequence.actions.map((currentAction, index) => {
                        if(index === action.actionIndex){
                            console.log(action.action)
                            return {...action.action}
                        }else{
                            return currentAction
                        }
                    })}
                }else{
                    return sequence
                }
            });

            return {
                ...state,
                data: {...state.data, questMaker: {...state.data.questMaker, sequences: sequences}}
            }
        }
        case actions.REMOVE_QUEST_MAKER_ACTION : {
            const actions = state.data.questMaker.actions.splice(action.index, 1);
            return {
                ...state,
                data: {...state.data, questMaker: {...state.data.questMaker, sequences: action.sequences}}
            }
        }
        case actions.UPDATE_QUEST_MAKER_RECOMPENSE: {
            const sequences = state.data.questMaker.sequences.map((sequence, index) => {
                if(index === action.sequenceIndex){
                    return {...sequence, recompense: action.recompense}
                }else{
                    return sequence
                }
            });

            return {
                ...state,
                data: {...state.data, questMaker: {...state.data.questMaker, sequences: sequences}}
            }
        }

        default: {
            return state;
        }
    }
}

