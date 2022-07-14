import express from "express"
import * as controler from "./controller.js"

const router = express.Router()

router.get('/rent', controler.viewRentPage)
router.get('/reserv', controler.viewReservPage)
router.get('/', controler.viewHomePage)
router.get('/contact', controler.viewContactPage)

export default router