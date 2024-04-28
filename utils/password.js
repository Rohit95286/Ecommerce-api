const CryptoJS = require('crypto-js');
require("dotenv").config();

function hashPassword(password){
    return(CryptoJS.AES.encrypt(password , process.env.PASSWORD_SECRET_KEY).toString())
}

function stringifyPassword(password){
    return(CryptoJS.AES.decrypt(password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8))
}

module.exports = {hashPassword , stringifyPassword}
