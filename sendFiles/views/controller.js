import path from "path"
import fetch from "node-fetch"

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

export const viewRentPage = async (_req, res) => {
    const response = await fetch("http://localhost:4000/api/auth/getUser", { headers: { 'authorization': `Bearer ${_req.headers?.cookie.split("=")[1]}` } })
    console.log(response);

    res.render(path.resolve("RentCardemo/pages/rent"));
}

export const viewContactPage = (_req, res) => {
    res.render(path.resolve("RentCardemo/pages/contact"));
}

export const viewReservPage = (_req, res) => {
    res.render(path.resolve("RentCardemo/pages/reserv"));
}

