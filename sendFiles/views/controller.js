import path from "path"
import lodash from "lodash"
import fetch, { Headers } from "node-fetch"
import { LocalStorage } from "node-localstorage"
const localStorage = new LocalStorage('./scratch');

export const viewHomePage = async (_req, res) => {
    let url = new URL("http://localhost:4000/api/cars")
    url.searchParams.append("limit", 4)

    const response = await fetch(url)
    const cars = await response.json().then(response => response.cars)

    res.render(path.resolve("RentCardemo/pages/home"), {
        cars
    });
}

export const viewLogInvPage = (_req, res) => {
    res.render(path.resolve("RentCardemo/pages/admin"));
}

export const viewRentPage = (_req, res) => {
    let user = _req?.user ? { ..._req?.user } : {}
    res.render(path.resolve("RentCardemo/pages/rent"), { user });
}

export const viewContactPage = (_req, res) => {
    res.render(path.resolve("RentCardemo/pages/contact"));
}

export const viewReservPage = async (_req, res) => {
    const response = await fetch(`http://localhost:4000/api/cars/${_req.params.carId}`)
    const {car} = await response.json()
    if(!response.ok) {
        res.redirect("http://localhost:4000/404")
    }
    res.render(path.resolve("RentCardemo/pages/reserv"), {car});
}

