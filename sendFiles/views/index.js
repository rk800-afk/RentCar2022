const express = require("express")
const controler = require("./controller")

const router = express.Router()

router.get('/rent', controler.viewRentPage)
router.get('/reserv', controler.viewReservPage)
router.get('/', controler.viewHomePage)
router.get('/contact', controler.viewContactPage)

module.exports = router