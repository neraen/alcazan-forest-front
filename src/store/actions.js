export const UPDATE_PLAYER_LIFE = 'update player life';
export const UPDATE_PLAYER_MANA = 'update player mana';
export const UPDATE_PLAYER_EXPERIENCE = 'update player experience';
export const UPDATE_PLAYER_TARGET = "update player target";
export const REMOVE_PLAYER_TARGET = "remove player target";

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