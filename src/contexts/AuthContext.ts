import React from 'react';

export default React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value) => {},
    role: ['ROLE_USER'],
    user: {}
})