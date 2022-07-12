module.exports.viewHomePage = async (_req, res) => {
    let url = new URL("http://localhost:4000/api/cars")
    url.searchParams.append("limit", 4)

    const response = await fetch(url)
    const cars = await response.json().then(response => response.cars)

    res.render('D:/Practic2022/RentCar2022/RentCardemo/pages/home', { 
        cars
    });
}

module.exports.viewRentPage = (_req, res) => {
    res.render('D:/Practic2022/RentCar2022/RentCardemo/pages/rent');
}

module.exports.viewContactPage = (_req, res) => {
    res.render('D:/Practic2022/RentCar2022/RentCardemo/pages/contact.ejs');
}

module.exports.viewReservPage = (_req, res) => {
    res.render('D:/Practic2022/RentCar2022/RentCardemo/pages/reserv.ejs');
}