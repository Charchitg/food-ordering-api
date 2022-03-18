const jwt = require('jsonwebtoken');

exports.VerifyToken = async ( token ) => {
    try {
        const decoded = await jwt.verify( token , process.env.ACCESS_TOKEN_SECRET);
        if(decoded){
            return {
                auth : true , 
                info : decoded
            };
        }
        else{
            return {
                auth : false , 
                info : decoded
            };
        }
    } catch (error) {
        return {
            auth : false , 
            info : error
        };
    }
    
}