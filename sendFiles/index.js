const path = require("path")
const express = require("express")
const viewRouter = require("./views")

module.exports = (app) => {
    // app.use('/pages/', express.static(path.resolve("D:/Backend/RentCardemo/pages"))) // RENDER PAGES
    app.use('/', viewRouter)
    app.use('/js/', express.static(path.resolve("D:/Practic2022/RentCar2022/RentCardemo/js"))) // RENDER SCRIPT'S JS
    app.use('/css/', express.static(path.resolve("D:/Practic2022/RentCar2022/RentCardemo/styles"))) // RENDER STYLES CSS
    app.use('/local/images/', express.static(path.resolve("D:/Practic2022/RentCar2022/RentCardemo/images"))) // RENDER IMAGES
}