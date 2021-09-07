import React from 'react';

export default React.createContext({
    target: {},
    setTarget: (value) => {},
    isPlayer: false,
    setIsPlayer: (value) => {}
})