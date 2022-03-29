const config  = require("config")
const jwt = require("jsonwebtoken")

// cоздание токена авторизации



module.exports = ( req, next) => {
     if (req.methods === "OPTOIONS") {
    }

    try {
       const token = req.headers.authorization.split(' ')[1]
        if(!token) {
           console.log("Authorization failed!");
        }
        const decoded = jwt.verify(token, config.get("secretKey"))
        req.user = decoded
    } catch (error) {
        console.log(error);
    }
}
