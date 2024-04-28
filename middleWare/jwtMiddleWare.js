const jwt = require("jsonwebtoken");
const { isJWTVarified } = require("../utils/tokenGeneration");

function JWTMiddleWare(req, res, next) {
  const token = req?.headers?.token;
  if (token) {
    console.log("verified");
    isJWTVarified(token) ? next() : res?.status(401)?.send("Not valid token");
  } else {
    res?.status(401)?.send("No token found");
  }
}


module.exports = JWTMiddleWare;
