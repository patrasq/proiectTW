const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        res.send({
            message: 'You are not authorized to access this resource',
        });
        return;
    }

    // extract token from header
    const token = req.headers.authorization.split(' ')[1];

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.status(401);
            res.send({
                message: 'You are not authorized to access this resource',
            });
            return;
        }
    });

    next();
}