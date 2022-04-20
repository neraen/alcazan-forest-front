import * as actions from './actions'

export const playerStatsReducer = (state = {
    data: {},
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
        case actions.UPDATE_PLAYER_TARGET: {
            return {
                ...state,
                target: action.target
            }
        }
        default: {
            return state;
        }
    }
}