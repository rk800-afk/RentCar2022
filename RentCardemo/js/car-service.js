import { AuthSevice } from "./auth-service.js"
const auth = new AuthSevice()
export class CarService {
  constructor() {

  }
  #arrayCars = []

  async createACar(data, imageFile) {
    data = JSON.stringify(data)
    const response = await fetch("http://localhost:4000/api/cars", {
      method: 'POST', body: data, credentials: 'include', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

    return response.json()
      .then(async (res) => {
        if (imageFile) {
          this.createImageForCar(res.car._id, imageFile)
            .then(resImage => {
              const { cars } = resImage
              this.#arrayCars.push(cars)
              this.renderCars()
            })
            .catch(err => console.log(err))
        } else {
          const { car } = res
          this.#arrayCars.push(car)
          this.renderCars()
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  async updateCarById(carId, data, imageFile) {
    data = JSON.stringify(data)
    const response = await fetch(`http://localhost:4000/api/cars/${carId}`, {
      method: 'PATCH', body: data, credentials: 'include', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

    return response.json()
      .then(async (res) => {
        if (imageFile) {
          this.createImageForCar(res.car._id, imageFile)
            .then(resImage => {
              const { cars } = resImage
              this.#arrayCars = this.#arrayCars.map(itemCar => itemCar._id === cars._id ? cars : itemCar)
              this.renderCars()
            })
            .catch(err => console.log(err))
        } else {
          const { car } = res
          this.#arrayCars = this.#arrayCars.map(itemCar => itemCar._id === car._id ? car : itemCar)
          this.renderCars()
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  async deleteACarById(carId) {
    const response = await fetch(`http://localhost:4000/api/cars/${carId}`,
      {
        method: 'DELETE', credentials: 'include'
      })

    return response.json()
      .then((res) => {
        const { deletedCarById } = res
        this.#arrayCars = this.#arrayCars.filter(car => car._id !== deletedCarById)
        this.renderCars()
      })
      .catch(err => {
        console.log(err);
      })
  }

  async createImageForCar(carId, imageFile) {
    const formData = new FormData()
    formData.append("file", imageFile)
    const response = await fetch(`http://localhost:4000/api/image/${carId}`, {
      method: "POST", body: formData,
    })
    return await response.json()
  }

  async fetchCarById(carId) {
    const response = await fetch(`http://localhost:4000/api/cars/${carId}`)
    return await response.json()
  }

  async fetchCars(params) {
    const urlWithSearchParams = new URL("http://localhost:4000/api/cars")

    if (params) {
      Object.keys(params).forEach(key => {
        urlWithSearchParams.searchParams.append(key, params[key])
      })
    }

    const res = await fetch(urlWithSearchParams)
    const data = await res.json().then(res => res.cars)

    const notFound = document.querySelectorAll(".not_found_cars_text")[0]
    notFound.innerHTML = ``

    if (typeof data === "string") {
      notFound.innerHTML = `<p align="center">"Not Found Car's"</p>`
      this.#arrayCars = []
      this.renderCars()
      return
    }

    this.#arrayCars = JSON.parse(JSON.stringify(data))

    this.renderCars()
  }

  renderCars() {
    let containerCard = document.getElementsByClassName("rent_car_container");
    let isImage = '';
    let str = ``;

    this.#arrayCars.map(({ _id, title, image, price }) => {
      isImage = image?.filename && image?.filename !== '...' ? image?.filename : 'http://localhost:4000/local/images/fa9e27a7534060df383ab54354fcead3_w200.gif'

      return str += `<div class="rent_card">
      <div class="rent_card_title_image">
        <p align="center">${title}</p>
        ${auth.getUserFromLocalStorage() ? `<span>${_id}</span>` : ``}
      </div>
      <img class="rent_card_image" src=${isImage} width="220" height="190" alt="Smille">
      <div class="rent_content_list">
        <div class="list_container">
          <img class="rent_list_svg" src="http://localhost:4000/local/images/fuel.svg" width="28" height="28" alt="Benz">
          <p class="rent_list_title">Бензин</p>
        </div>
        <div class="list_container">
          <img class="rent_list_svg" src="http://localhost:4000/local/images/transmission.svg" width="28" height="28" alt="Benz">
          <p class="rent_list_title">Автомат</p>
        </div>
        <div class="list_container">
          <img class="rent_list_svg" src="http://localhost:4000/local/images/seat.svg" width="28" height="28" alt="Benz">
          <p class="rent_list_title">5 сидений</p>
        </div>
        <div class="list_container">
          <img class="rent_list_svg" src="http://localhost:4000/local/images/car.svg" width="28" height="28" alt="Benz">
          <p class="rent_list_title">1,6 л. (122 л.с)</p>
        </div>
      </div>
      <div class="rent_card_prices">
        <div class="rent_card_tile">
          <p class="rent_card_day">1-2 суток</p>
          <p class="rent_card_price">$<span class="price">${price?.one}</span></p>
        </div>
        <div class="rent_card_tile">
          <p class="rent_card_day">3-10 суток</p>
          <p class="rent_card_price">$<span>${price?.two}</span></p>
        </div>
        <div class="rent_card_tile">
          <p class="rent_card_day">11-20 суток</p>
          <p class="rent_card_price">$<span>${price?.third}</span></p>
        </div>
        <div class="rent_card_tile">
          <p class="rent_card_day">20 + суток</p>
          <p class="rent_card_price">$<span>${price?.fourth}</span></p>
        </div>
      </div>
  
      <a class="rent_card_confirm" href=${`http://localhost:4000/reserv/${_id}`}>Оренда</a>
    </div>`
    })

    return (containerCard[0].innerHTML = str);
  }
}

{/* <div class="rent_card_admin_panel">
        ${auth.getUserFromLocalStorage() ?
          `<button class="btn_icon edit" title=${_id} onclick="openUpdateModalCar(this, ${_id})"> 
          <img class="icon" src="http://localhost:4000/local/images/edit-button-svgrepo-com.svg" width="25" height="25" alt="Edit">
        </button>
        <button class="btn_icon delete" title=${_id} onclick="deleteModalCar(this, ${_id})">
          <img class="icon" src="http://localhost:4000/local/images/close-svgrepo-com.svg" width="22" height="22" alt="Delete"> 
        </button>` : ``}
      </div> */}