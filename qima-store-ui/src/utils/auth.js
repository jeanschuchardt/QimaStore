export const setAuthData = (token, username, roles) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('roles', JSON.stringify(roles));
};

export const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
};

export const getAuthData = () => {
    return {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
        roles: JSON.parse(localStorage.getItem('roles')) || [],
    };
};
