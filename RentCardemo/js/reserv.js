
import { Toast } from "./toast.js"
const toast = new Toast()

const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const regTel = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){5,14}(\s*)?$/

const nameInput = document.getElementById("name")
const lastNameInput = document.getElementById("lastName")
const telInput = document.getElementById("phone")
const emailInput = document.getElementById("email")
const agreeInput = document.getElementById("agree")

const form = document.querySelectorAll("#form")[0]
const inpts = document.querySelectorAll(".input_content")

function parseInpts(inpts = []) {
    let obj = {}
    inpts.forEach(key => {
        obj[key.getAttribute("name")] = key.value
    })
    return obj
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const isValidForm = ValidateForm(e)
    if(isValidForm){
    const data = JSON.stringify(parseInpts(inpts))
    fetch("http://localhost:4000/api/cars/order-request", { method: "POST", body: data,  headers: { 'Content-type': 'application/json' }, credentials: "include" })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
    }   
    else{
        console.log("Помилка валідації!")
    }
})


function ValidateForm(e) {
    if (nameInput.value === "" || nameInput.value == null) {
        notValid(nameInput, null, "Name must be valid", e)
        return false    }

    if (lastNameInput.value === "" || lastNameInput.value == null) {
        notValid(lastNameInput, null, "Last name must be valid", e)
        return false    
    }

    if (!regEmail.test(emailInput.value)) {
        notValid(emailInput, null, "Email must be valid", e)
        return false   
    }

    if (!regTel.test(telInput.value)) {
        notValid(telInput, null, "Phone number must be valid", e)
        return false   
    }
    if (!agreeInput.checked) {
        notValid(agreeInput, null, "You must agree", e)
        return false     
    }
    return true
}

function notValid(input, el, mess, e) {
    input.classList.add("callback_input_error")
    toast.toastify(mess, "white")
}

function valid(input, el) {
    input.classList.remove("callback_input_error")
}

nameInput.addEventListener("focus", () => {
    valid(nameInput)
})

lastNameInput.addEventListener("focus", () => {
    valid(lastNameInput)
})

telInput.addEventListener("focus", () => {
    valid(telInput)
})

emailInput.addEventListener("focus", () => {
    valid(emailInput)
})