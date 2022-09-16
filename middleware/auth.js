const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get the token from the header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token) {
        return res.status(401).json({ msg: 'No admin token, authorization denied!'});
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecretAdmin'));
        req.userId = decoded.admin.id;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is invalid!'});
    }
};