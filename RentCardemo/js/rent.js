import { CarService } from "./car-service.js"

const carService = new CarService()

document.addEventListener("DOMContentLoaded", () => {
  const classModal = document.querySelectorAll(".modal")[0]
  const classModalDimmer = document.querySelectorAll(".modal_dimmer")[0]
  const classAdminBtnModal = document.querySelectorAll(".admin_content_btn_add-car")[0]
  const classModalBtnClose = document.querySelectorAll(".modal_content_btn_close")[0]

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

  classAdminBtnModal.addEventListener("click", () => {
    classModal.classList.add("active")
  })

  classModalBtnClose.addEventListener("click", () => {
    classModal.classList.remove("active")
  })

  classModalDimmer.addEventListener("click", () => {
    classModal.classList.remove("active")
  })
})

