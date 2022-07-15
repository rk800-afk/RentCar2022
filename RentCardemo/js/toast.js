export class Toast {
    constructor() {

    }

    toastify(message = "", type = "default", deley = 3000) {
        const toast = document.querySelectorAll(".toast-modal_info")[0]

        switch (type) {
            case "dark":
                toast.classList.add("dark")
                break;
            case "warning":
                toast.classList.add("warning")
                break;
            case "error":
                toast.classList.add("error")
                break;
            default:
                break;
        }

        if (toast.children.length !== 0) {
            toast.innerHTML = ""
        }

        //Create Message
        const p_text_infos = document.createElement("p")
        p_text_infos.innerText = message
        toast.appendChild(p_text_infos)

        toast.classList.add("active")

        //Off Toast
        setTimeout(() => {
            toast.classList.remove("active")
        }, deley)
    }
}