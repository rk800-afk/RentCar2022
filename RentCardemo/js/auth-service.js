export class AuthSevice {
    constructor() {

    }

    async logIn(data) {
        data = JSON.stringify(data)
        const response = await fetch("http://localhost:4000/api/auth/logIn", { method: "POST", body: data, headers: { 'content-type': 'application/json' }, credentials: "include"})
        const {user, message} = await response.json(res => res)

        console.log(message);

        if(message) {
            return message
        }

        this.setUserToLocalStorage(user)
        location.href = "http://localhost:4000/rent"
        return user
    }
    
    async getUser() {
        const response = await fetch({url:"http://localhost:4000/api/auth/getUser", credentials: "include"})
        const user = response.json(res => res.user)
    
        return user
    }

    setUserToLocalStorage(user) {
        localStorage.setItem("user", JSON.stringify(user))
    }

    getUserFromLocalStorage() {
        return JSON.parse(localStorage.getItem("user"))
    }
}