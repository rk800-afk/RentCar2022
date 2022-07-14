import { createFilter } from "./filter.js";
import { Car } from "../../../db/models/index.mjs";

// V8 JS => NODEJS 01001010101
// LIBUV => CROSS-PLATFORM, NON BLOCKING I/O, EVENT LOOP

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
};