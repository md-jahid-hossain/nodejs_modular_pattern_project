const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['access-token'];

    if (!token) return res.status(403).send('Authentication failed.');

    try {
        const decode = jwt.verify(token, 'iamsecretkey');
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send('Invalid token.');
    }
};

module.exports = verifyToken;