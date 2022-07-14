import { CarService } from "./car-service.js"

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

