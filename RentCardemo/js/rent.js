import { CarService } from "./car-service.js"
import { Toast } from "./toast.js"

const carService = new CarService()
const toast = new Toast()
carService.fetchCars()

document.addEventListener("DOMContentLoaded", () => {

  const classModal = document.querySelectorAll(".modal")[0]
  const classModalDimmer = document.querySelectorAll(".modal_dimmer")[0]
  const classAdminBtnModal = document.querySelectorAll(".admin_content_btn_add,.create")[0]
  const classModalEdit = document.querySelectorAll(".admin_content_btn_add-car,.edit")[0]
  const classModalBtnClose = document.querySelectorAll(".modal_content_btn_close")[0]

  const previewFileImageContent = document.querySelectorAll(".render-image")
  const modal_content_title = document.querySelector(".modal_content_title")
  const update_search = document.querySelectorAll(".update_search")[0]
  const form = document.querySelectorAll(".modal_form")[0]
  const inputTitle = document.getElementById("modal_form-title")
  const inputBrand = document.getElementById("modal_form-brand")
  const inputFile = document.getElementById("modal_form-image")
  const inputFirstPrice = document.getElementById("modal_form-price1")
  const inputSecondPrice = document.getElementById("modal_form-price2")
  const inputThirdPrice = document.getElementById("modal_form-price3")
  const inputFourthPrice = document.getElementById("modal_form-price4")

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

  const typeModal = { createCar: "CREATE", editCar: "EDIT" }
  let currentTypeModal = ""
  const image = document.createElement("img")
  const updateFetchCars = []
  if (classAdminBtnModal) {
    classAdminBtnModal.addEventListener("click", () => {
      form.reset()
      currentTypeModal = typeModal.createCar
      modal_content_title.innerHTML = "Modal Create A Car"
      update_search.classList.add("none")
      classModal.classList.add("active")
    })

    classModalEdit.addEventListener("click", () => {
      modal_content_title.innerHTML = "Modal Edit A Car"
      currentTypeModal = typeModal.editCar
      update_search.classList.remove("none")
      classModal.classList.add("active")
    })

    classModalBtnClose.addEventListener("click", () => {
      classModal.classList.remove("active")
    })

    classModalDimmer.addEventListener("click", () => {
      classModal.classList.remove("active")
    })

    update_search.addEventListener("input", (e) => {
      if (e.target.value) {
        carService.fetchCarById(e.target.value)
          .then(res => {
            if (res?.message) {
              toast.toastify(res.message, "dark")
              return
            }
            toast.toastify("FoundCar", "success")
            inputTitle.value = res.car.title
            inputBrand.value = res.car.brand
            inputFirstPrice.value = res.car.price.one
            inputSecondPrice.value = res.car.price.two
            inputThirdPrice.value = res.car.price.third
            inputFourthPrice.value = res.car.price.fourth
            if (res.car.image?.filename) {
              // inputFile.value = "http://localhost:4000" + res.car.image.filename
              image.classList.add("file-image")
              image.src = `${res.car.image.filename}`
              previewFileImageContent[0].appendChild(image)
            }
          })
          .catch(err => console.log(err))
      }
    })
  }

  document.querySelectorAll("#btn_submit")[0].addEventListener("click", async (e) => {
    e.preventDefault()
    const isValid = ValidateForm(e)
    if (isValid) {
      if (currentTypeModal === typeModal.createCar) {
        carService.createACar({
          image: { filename: '' },
          title: inputTitle.value,
          brand: inputBrand.value,
          price: {
            one: inputFirstPrice.value,
            two: inputSecondPrice.value,
            third: inputThirdPrice.value,
            fourth: inputFourthPrice.value
          },
        }, inputFile.files[0])
          .then(response => {
            toast.toastify("Created")
          })
          .catch(error => {
            toast.toastify(error)
          })
      } else if (currentTypeModal === typeModal.editCar) {
        carService.updateCarById(
          document.getElementById("update_search").value,
          {
            title: inputTitle.value,
            brand: inputBrand.value,
            price: {
              one: inputFirstPrice.value,
              two: inputSecondPrice.value,
              third: inputThirdPrice.value,
              fourth: inputFourthPrice.value
            },
          },
          inputFile.files[0])
          .then(response => {
            toast.toastify("Updated")
          })
          .catch(error => {
            toast.toastify(error)
          })
      }
    }
  })

  document.querySelectorAll("#btn_clear")[0].addEventListener("click", async (e) => {
    // e.preventDefault()
    try {
      form.reset()
      valid(inputTitle)
      valid(inputBrand)
      valid(inputFirstPrice)
      valid(inputSecondPrice)
      valid(inputThirdPrice)
      valid(inputFourthPrice)
      previewFileImageContent[0].removeChild(image)
    }
    catch {
      console.log("Форма пуста!")
    }

  })

  inputFile.addEventListener("change", (e) => {
    if (inputFile.files[0]) {
      const [file] = inputFile.files
      image.classList.add("file-image")
      image.src = URL.createObjectURL(file)
      previewFileImageContent[0].appendChild(image)
    }
  })

  document.querySelectorAll(".content_image_preview_close")[0].addEventListener("click", (e) => {
    if (image) {
      previewFileImageContent[0].removeChild(image)
      inputFile.value = ""
    }
  })

  function notValid(input, el, mess, e) {
    input.classList.add("callback_input_error")
    toast.toastify(mess, "white")
    // el.innerText = mess
    // el.style.visibility = "visible";
    // el.style.opacity = "1"
  }

  function valid(input, el) {
    input.classList.remove("callback_input_error")
  }

  function ValidateForm(e) {
    if (inputTitle.value == "") {
      notValid(inputTitle, null, "Field tittle is empty", e)
      return false
    }
    if (inputBrand.value == "") {
      notValid(inputBrand, null, "Field brand is empty", e)
      return false
    }
    if (inputFirstPrice.value == "") {
      notValid(inputFirstPrice, null, "Field first price is empty", e)
      return false
    }
    if (inputSecondPrice.value == "") {
      notValid(inputSecondPrice, null, "Field second price is empty", e)
      return false
    }
    if (inputThirdPrice.value == "") {
      notValid(inputThirdPrice, null, "Field third price is empty", e)
      return false
    }
    if (inputFourthPrice.value == "") {
      notValid(inputFourthPrice, null, "Field fourth price is empty", e)
      return false
    }

    return true
  }

  inputTitle.addEventListener("focus", () => {
    valid(inputTitle)
  })
  inputBrand.addEventListener("focus", () => {
    valid(inputBrand)
  })
  inputFirstPrice.addEventListener("focus", () => {
    valid(inputFirstPrice)
  })
  inputSecondPrice.addEventListener("focus", () => {
    valid(inputSecondPrice)
  })
  inputThirdPrice.addEventListener("focus", () => {
    valid(inputThirdPrice)
  })
  inputFourthPrice.addEventListener("focus", () => {
    valid(inputFourthPrice)
  })

})

