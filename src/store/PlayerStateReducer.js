export function PlayerStateReducer(state = initialState, action){
    switch (action.type){
        case 'move':
            return 'ok'
        default:
            return state
    }
}