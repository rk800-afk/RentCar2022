import fetch from "node-fetch";

import { createFilter } from "./filter.js";
import { Car } from "../../../db/models/index.mjs";

// V8 JS => NODEJS 01001010101
// LIBUV => CROSS-PLATFORM, NON BLOCKING I/O, EVENT LOOP

export const createCar = async (req, res) => {
    try {
        const car = await Car.create({ ...req.body })

        if (car) {
            const image = await fetch(`http://localhost:4000/api/image/${car._id}`, { method: "POST",  })
            console.log(image);
        }

        res.send(201).send({ car })
    } catch (error) {
        console.log(error?.message);
    }
}

export const updateCar = async (req, res) => {
    try {
        const carId = req.param.carId
        if (!carId) {
            res.send(400).send({ message: "You must set carId" })
        }
        await Car.updateOne(req.body, { _id: carId }, {}, (err, res) => {
            if (err) {
                res.send(400).send({ message: err })
                return
            }
            res.send(200).send({ message: `Updated by carId ${carID}` })
        })
    } catch (error) {
        console.log(error?.message);
    }
}

export const deleteCar = async (req, res) => {
    try {
        const carId = req.param.carId
        if (!carId) {
            res.send(400).send({ message: "You must set carId" })
        }
        await Car.deleteOne({ $where: { _id: carId } })
    } catch (error) {
        console.log(error?.message);
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