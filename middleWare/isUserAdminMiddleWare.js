let userSchema = require("./../models/user");

async function isUserAdmin(req, res, next) {
    
  try{
        let userData = await userSchema.findById(req?.body?.userId || req?.params?.userId).select('isAdmin');
        if (userData?.isAdmin === "true") {next()} 
        else {res?.status(403)?.send("not authorised / admin")}
    }
  catch(e){
        res.status(500).send("something went wrong")}  
}

module.exports = isUserAdmin;
