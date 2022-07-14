const jwt = require("jsonwebtoken")

const JWTAuthPremission = (req, res, next) => {
    const authToken = req.headers.authorization

    jwt.verify(authToken, process.env.ACCESS_TOKEN,  
        async (err, payload) => {
        if (err) {
            res.json({message: `some error in ${err}`}) 
            return;
        }
        return next();
      })
}

module.exports = {
    JWTAuthPremission
}