class CarService {
  constructor() {

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

    if(typeof data === "string") {
      notFound.innerHTML = `<p>"Not Found Car's"</p>`
      this.renderCars([])
      return 
    }

    this.renderCars(data)
  }

  renderCars(array) {
    let containerCard = document.getElementsByClassName("rent_car_container");
    let isImage = '';
    let str = ``;

    array.map(({ title, image, price }) => {
      isImage = image?.filename !== '...' && image?.filename ? image?.filename : 'http://localhost:4000/local/images/fa9e27a7534060df383ab54354fcead3_w200.gif'

      return str += `<div class="rent_card">
    <div class="rent_card_title_image">
      <p>${title}</p>
    </div>
    <img class="rent_card_image" src=${isImage} width="220" height="120" alt="Smille">
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

    <button type="button" class="rent_card_confirm">Оренда</button>
  </div>`
    })

    return (containerCard[0].innerHTML = str);
  }
}

const carService = new CarService()

document.addEventListener("DOMContentLoaded", () => {
  carService.fetchCars()

  const filter_btn_Collections = document.querySelectorAll(".filter_btn")

  function cleanFilterActiveStyle() {
    filter_btn_Collections.forEach(btn => btn.classList.remove("active"))
  }

  filter_btn_Collections.forEach(btn => {
    btn.addEventListener("click", () => {
      cleanFilterActiveStyle()
      btn.classList.toggle("active")

      const btn_title = btn.getAttribute("title")
      if (btn_title !== "all") {
        carService.fetchCars({ brand: btn_title })
      } else {
        carService.fetchCars()
      }
    })
  })
})

