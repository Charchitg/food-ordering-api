const jwt = require('jsonwebtoken');

exports.GenerateToken = async ( user ) => {
    const payload = {
        user : user
    }
    return jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET , {
        expiresIn : '1h'
    });
} 