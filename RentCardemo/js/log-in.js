import { AuthSevice } from "./auth-service.js"
import { Toast } from "./toast.js"

const authService = new AuthSevice()
const toast = new Toast()

const logInForm = document.querySelectorAll("#form")[0]
const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

logInForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const isValid = ValidateForm(e)
    if (isValid) {
        await authService.logIn({ email: inputEmail.value, password: inputPassword.value })
            .then(res => {
                if (res?.user) {
                    authService.setUserToLocalStorage(res.user)
                    authService.redirectUser()
                    // toast.toastify("Success", "dark", 3000)
                    return
                }
                toast.toastify(res.message, "error")
            })
            .catch(err => toast.toastify(err.message, "error", 3000))
    }
})

inputEmail.addEventListener("focus", () => {
    valid(inputEmail)
})

inputPassword.addEventListener("focus", () => {
    valid(inputPassword)
})

