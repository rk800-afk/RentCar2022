// BOT WEB TELE ROMCAR
import { bot } from '../../../shared/services/bot-telegram.js'

import { createFilter } from "./filter.js";
import { Car } from "../../../db/models/index.mjs";

// V8 JS => NODEJS 01001010101
// LIBUV => CROSS-PLATFORM, NON BLOCKING I/O, EVENT LOOP

export const sendToRequest = async (req, res) => {
    try {
        const { name, lastName, email, phone } = req.body

        // Listen for any kind of message. There are different kinds of
        // messages.
        bot.sendMessage(976234188, `New order request by user ${email} FULL name user - ${name + lastName}; phone - ${phone}`)
        res.status(200).send({ msg: "Good" })
    } catch (error) {
        console.log(error?.message);
    }
}

export const createCar = async (req, res) => {
    try {
        const car = await Car.create({ ...req.body })
        res.status(201).send({ car })
    } catch (error) {
        console.log(error?.message);
    }
}

export const updateCar = async (req, res) => {
    try {
        const carId = req.params.carId
        if (!carId) {
            res.send(400).send({ message: "You must set carId" })
        }
        await Car.updateOne({ _id: carId }, { $set: { ...req.body } })
        const car = await getCarById(req, res)
        res.status(200).send({ car })
    } catch (error) {
        console.log(error?.message);
    }
}

export const deleteCar = async (req, res) => {
    try {
        const carId = req.params.carId
        if (!carId) {
            res.status(400).send({ message: "You must set carId" })
        }
        await Car.deleteOne({ _id: carId })
        res.status(200).send({ deletedCarById: carId })
    } catch (error) {
        console.log(error?.message);
    }
}

export const getCarById = async (req, res) => {
    try {
        const fetchCar = await Car.findById(req.params.carId)
        if (!fetchCar) {
            res.status(404).json({ message: "Not Found Car(s)" })
        }
        res.status(200).send({ car: fetchCar })
    } catch (error) {
        console.log(error?.message);
        res.status(500).send({})
    }
}

export const getCars = async (req, res) => {
    try {
        const filter = createFilter(req)
        const carLimit = req.query?.limit || 43
        const skip = req.query?.skip || 43
        const fetchCars = await Car.find(filter).sort({ price: 1 }).limit(carLimit)
        if (fetchCars.length === 0) {
            res.status(404).json({ cars: "Not Found Car(s)" })
        }
        res.status(200).send({ cars: fetchCars })
    } catch (error) {
        console.log(error?.message);
    }
}