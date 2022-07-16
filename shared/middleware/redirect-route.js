import parseCookies from "../utils/getCookies.js";

function redirectRoute(req, res, next) {
    const token = parseCookies(req)?.authorization || null

    if (token) {
        res.redirect("http://localhost:4000/rent")
    } else {
        next()
    }
}

export default redirectRoute