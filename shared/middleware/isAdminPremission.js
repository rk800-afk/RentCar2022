import { ADMIN } from "../const/user-role.js"

const isAdminPremission = (req, res, next) => {
    if (req?.user && req?.user.role === ADMIN) {
        next()
    } else {
        res.status(403).send({ message: "You must be a ADMIN" })
    }
}

export default isAdminPremission