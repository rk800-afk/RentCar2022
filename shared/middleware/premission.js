import jwt from "jsonwebtoken"
import parseCookies from "../utils/getCookies.js"

const JWTAuthPremission = (req, res, next) => {
    const authToken = parseCookies(req)?.authorization || null

    jwt.verify(authToken, process.env.ACCESS_TOKEN,
        async (err, payload) => {
            if (err) {
                res.json({ message: `some error in ${err}` })
                return;
            }
            return next();
        })
}

export default JWTAuthPremission