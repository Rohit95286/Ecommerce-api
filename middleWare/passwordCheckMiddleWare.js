const { stringifyPassword } = require("../utils/password");
const userSchema = require("./../models/user");


async function passwordCheckMiddleWare (req, res, next) {
 
    const DataBaseUser = await userSchema.findById(req?.body?.userId).exec();
    const originalPassword = stringifyPassword(DataBaseUser?.password);
    if (originalPassword ==  req?.body?.oldPassword) {
      next();
    } else {
      res.status(401).send("not valid password");
    }
  }
  


module.exports = passwordCheckMiddleWare;
