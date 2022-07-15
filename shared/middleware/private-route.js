import parseCookies from "../utils/getCookies.js";

function privateRoute(req, res, next) {
    const token = parseCookies(req)?.authorization || null

    if (token) {
        next()
    } else {
        res.status(401).json({ message: "Unhorized status 401!" })
    }
}

export default privateRoute