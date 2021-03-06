const { VerifyToken } = require("../Helpers/TokenVerify");


exports.authorization = async (req,res,next) => {
    let token;
    if(req.cookies.accesstoken){
        token = req.cookies.accesstoken;
    }
    else if(req.headers["authorization"]){
        token = req.headers["authorization"].split(" ")[1];
    }
    
    if(!token){
        return res.status(403).json({
            message : "Please Login Again "
        });
    }

    try {
        const check = await VerifyToken(token);
        if(check.auth === false){
            res.status(401).json({
                message : check.info 
            });
        }
        else{
            req.user = check.info.user._id;
            next();
        }
        

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : error
        })
    }
}