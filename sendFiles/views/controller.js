import path from "path"
import fetch, { Headers } from "node-fetch"

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
    let token = ""
    if (_req.headers?.cookie) {
        token = _req.headers?.cookie.split("=")[1]
    }
    const response = await fetch("http://localhost:4000/api/auth/getUser", { headers: new Headers({ 'authorization': `Bearer ${token}` }) })
    let data = {}

    if (response.ok) {
        data = await response.json(response => response) || {}
    }

    res.render(path.resolve("RentCardemo/pages/rent"), { user: data?.user ? { ...data.user } : {} });
}

export const viewContactPage = (_req, res) => {
    res.render(path.resolve("RentCardemo/pages/contact"));
}

export const viewReservPage = (_req, res) => {
    res.render(path.resolve("RentCardemo/pages/reserv"));
}

