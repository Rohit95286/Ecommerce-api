const jwt = require('jsonwebtoken');
require("dotenv").config();
const secretKey = process.env.JSON_SECRET_KEY ;
const jwtExpiryTime = process.env.TOKEN_EXPIRY_TIME;

function generatetokenWithEmailAndId(email , id){
   return(jwt.sign({email , id }, secretKey, { expiresIn: jwtExpiryTime }));
}
function isJWTVarified(token){
   return jwt.verify(token, secretKey , (error , user)=>{
        if(user){
            return true;
        }
        return false;
   });
}


module.exports= {generatetokenWithEmailAndId , isJWTVarified ,jwtExpiryTime }

