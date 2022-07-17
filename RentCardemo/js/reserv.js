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
    const data = JSON.stringify(parseInpts(inpts))
    fetch("http://localhost:4000/api/cars/order-request", { method: "POST", body: data,  headers: { 'Content-type': 'application/json' }, credentials: "include" })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
})