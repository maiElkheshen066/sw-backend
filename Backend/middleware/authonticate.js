// const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/jwt.utils');
const user=require('../models/User')

const authenticateJWT =async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // parse token
   
    if (!token){
        return res.status(401).json({ status: 'fail', message: 'You are not logged in! ,Please login to get access.' });
    }

    try {

        const decoded = verifyToken(token);
        req.user = decoded; // provide user data which decoded
        console.log(decoded);
        // chech if youse exist and password not change after token issued
        const freshUser= await  user.findById(decoded.id);

        if (!freshUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user belonging to this token no longer exists.'
            });
        }
        if(freshUser.passwordChangedAt){
            const changedTimestamp = parseInt(freshUser.passwordChangedAt.getTime() / 1000, 10);
            if(decoded.iat<changedTimestamp){
                return res.status(401).json({
                    status: 'fail',
                    message: 'User recently changed password! Please login again.'
                });
            }
        }
        next();
    }


    catch (err) {
        return res.status(403).json({ status: 'fail', message: 'Invalid token' });
    }
}

module.exports = authenticateJWT;