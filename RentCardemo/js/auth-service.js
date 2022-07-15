export class AuthSevice {
    constructor() {

    }

    async logIn(data) {
        data = JSON.stringify(data)
        const response = await fetch("http://localhost:4000/api/auth/logIn", { method: "POST", body: data, headers: { 'content-type': 'application/json' }, credentials: "include" })
        return await response.json()
    }

    async getUser() {
        const response = await fetch('http://localhost:4000/api/auth/getUser', { credentials: "include" })
        return response.json()
    }

    async logoutUser() {
        const response = await fetch('http://localhost:4000/api/auth/logOut', { credentials: "include" })
        this.clearUserFromLocalStorage()
        return await response.json()
    }

    redirectUser() {
        location.href = "http://localhost:4000/rent"
    }

    setUserToLocalStorage(user) {
        localStorage.setItem("user", JSON.stringify(user))
    }

    getUserFromLocalStorage() {
        return JSON.parse(localStorage.getItem("user"))
    }

    clearUserFromLocalStorage() {
        localStorage.removeItem("user")
    }
}