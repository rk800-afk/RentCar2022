const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const regTel = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){5,14}(\s*)?$/
const nameInput = document.getElementById("callback_input_name")
const telInput = document.getElementById("callback_input_tel")
const emailInput = document.getElementById("callback_input_email")
const textareaInput = document.getElementById("callback_input_textarea")
const form = document.getElementById("callback_form")
const nameError = document.getElementById("callback_name_error")
const telError = document.getElementById("callback_tell_error")
const emailError = document.getElementById("callback_email_error")
const textareaError = document.getElementById("callback_textarea_error")

form.addEventListener("submit" , (e) => {
    ValidateForm(e);
})

function ValidateForm(e)
{
    if(nameInput.value === "" || nameInput.value == null)
    {
        notValid(nameInput, nameError, "Заповніть це поле", e)
    }

    if(!regEmail.test(emailInput.value))
    {
        notValid(emailInput, emailError, "Невірно введений email", e)
    }

    if(!regTel.test(telInput.value))
    {
        notValid(telInput, telError, "Невірно введений телефон", e)
    }

    if(textareaInput.value.length > 500){
        notValid(textareaInput, textareaError, "Перевищено ліміт в 500 символів", e)
    }
}

function validate(regex, input)
{
    return regex.test(input)
}

function notValid(input, el, mess, e)
{
    e.preventDefault()
    input.classList.add("callback_input_error")
    el.innerText = mess
    el.style.visibility = "visible";
    el.style.opacity = "1"
}

function valid(input, el)
{
    input.classList.remove("callback_input_error")
    el.style.opacity = "0"
    el.style.visibility = "hidden";
}

nameInput.addEventListener("focus", () => {
    valid(nameInput, nameError)
})

telInput.addEventListener("focus", () => {
    valid(telInput, telError)
})

emailInput.addEventListener("focus", () => {
    valid(emailInput, emailError)
})

textareaInput.addEventListener("focus", () => {
    valid(textareaInput, textareaError)
})