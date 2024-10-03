 export const register = (req, res, next) => {
    res.json('User registered!');
}

 export const login = (req, res, next) => {
   res.json('user logged in')
}

 export const logout = (req, res, next) => {
    res.json ('user logged out')
}