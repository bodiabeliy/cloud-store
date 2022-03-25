const config  = require("config")
const jwt = require("jsonwebtoken")

// cоздание токена авторизации
module.exports =(req, res, next) => {
    if (req.methods === "OPTOIONS") {
        next()
    }

    try {
       const token = req.headers.authorization.split('')[1]
        if(!token) {
            return res.status(401).json({message:"Authorization error!"})
        }
        const decoded = jwt.verify(token, config.get("secretKey"))
        req.user = decoded
        next()
    } catch (error) {
        
    }
}