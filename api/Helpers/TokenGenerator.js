const jwt = require('jsonwebtoken');

exports.GenerateToken = async ( user ) => {
    return jwt.sign(user , process.env.ACCESS_TOKEN_SECRET , {
        expiresIn : process.env.EXPIRE_TIME
    });
} 