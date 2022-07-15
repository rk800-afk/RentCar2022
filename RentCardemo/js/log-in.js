import { AuthSevice } from "./auth-service.js"

const authService = new AuthSevice()

const logInForm = document.querySelectorAll("#form")[0]
const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const toast = document.querySelectorAll(".toast-modal_info")[0]
const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function notValid(input, el, mess, e) {
    input.classList.add("callback_input_error")
    toast.classList.add("active")

    if(toast.children.length !== 0) {
        toast.innerHTML = ""
    }

    const p = document.createElement("p")
    p.innerText = mess
    toast.appendChild(p) 

    setTimeout(() => {
        toast.classList.remove("active")
    }, 3000)
    // el.innerText = mess
    // el.style.visibility = "visible";
    // el.style.opacity = "1"
}

function valid(input, el) {
    input.classList.remove("callback_input_error")
}

function ValidateForm(e) {
    if (!regEmail.test(inputEmail.value)) {
        notValid(inputEmail, null, "Email must be valid", e)
        return false
    }

    if (inputPassword.value.length < 8) {
        notValid(inputPassword, null, "Password must have minimun 8 symbol length", e)
        return false
    }
    return true
}

logInForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const isValid = ValidateForm(e)
    console.log(isValid);
    if(isValid) {
        authService.logIn({ email: inputEmail.value, password: inputPassword.value })
    }
})

inputEmail.addEventListener("focus", () => {
    valid(inputEmail)
})

inputPassword.addEventListener("focus", () => {
    valid(inputPassword)
})

