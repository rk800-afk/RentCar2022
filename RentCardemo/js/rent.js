import { CarService } from "./car-service.js"
import { Toast } from "./toast.js"

const carService = new CarService()
const toast = new Toast()

document.addEventListener("DOMContentLoaded", () => {
  const classModal = document.querySelectorAll(".modal")[0]
  const classModalDimmer = document.querySelectorAll(".modal_dimmer")[0]
  const classAdminBtnModal = document.querySelectorAll(".admin_content_btn_add-car")[0]
  const classModalBtnClose = document.querySelectorAll(".modal_content_btn_close")[0]

  const previewFileImageContent = document.querySelectorAll(".render-image") 
  const form = document.querySelectorAll(".modal_form")[0]
  const inputTitle = document.getElementById("modal_form-title")
  const inputBrand = document.getElementById("modal_form-brand")
  const inputFile = document.getElementById("modal_form-image")
  const inputFirstPrice = document.getElementById("modal_form-price1")
  const inputSecondPrice = document.getElementById("modal_form-price2")
  const inputThirdPrice = document.getElementById("modal_form-price3")
  const inputFourthPrice = document.getElementById("modal_form-price4")

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

  if(classAdminBtnModal) {
    classAdminBtnModal.addEventListener("click", () => {
      classModal.classList.add("active")
    })
  
    classModalBtnClose.addEventListener("click", () => {
      classModal.classList.remove("active")
    })
  
    classModalDimmer.addEventListener("click", () => {
      classModal.classList.remove("active")
    })
  }

  document.querySelectorAll("#btn_submit")[0].addEventListener("click", async (e) => {
    e.preventDefault()
    const isValid = ValidateForm(e)
    if (isValid) {
       await carService.createACar({ image: { filename: '' }, title: inputTitle.value, brand: inputBrand.value, price: {
        one: inputFirstPrice.value, two: inputSecondPrice.value, third: inputThirdPrice.value, fourth: inputFourthPrice.value
       } })
       .then(response => {
        console.log(response);
       })
       .catch(error => {
        console.log(error);
       })
    }
  })

  const image = document.createElement("img")
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

