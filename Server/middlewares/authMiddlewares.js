const {verify} = require("jsonwebtoken");

const validateToken =  async (req, res, next) =>{

    

    const accessToken = req.header("accessToken");
    
    
  


    if(accessToken === undefined){ return  res.json({error: "User not logged in!"}) };
    
    try {
        const validToken = verify(accessToken, "VWSCDQzRUZ");
        req.user = validToken;
        if(validToken ){
            return next();
        }
    } catch (error) {
        return res.json({error: error});
    }

}

module.exports = {validateToken};