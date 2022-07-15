export class Toast {
    constructor() {
    }

    toastify(message = "", type = "default", deley = 3000) {
        const containerToasts = document.querySelectorAll(".toast_container")[0]

        if (containerToasts.children.length === 4) return

        const toast = document.createElement("div")
        toast.classList.add("toast-modal_info")
        containerToasts.appendChild(toast)

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

        // if (toast.children.length !== 0) {
        //     toast.innerHTML = ""
        // }

        //Create Message
        const p_text_infos = document.createElement("p")
        p_text_infos.innerText = message
        toast.appendChild(p_text_infos)


        setTimeout(() => {
            toast.classList.add("active")
        }, 0)

        //Off Toast
        setTimeout(() => {
            toast.classList.remove("active")
            setTimeout(() => {
                toast.remove()
            }, 0)
        }, deley)
    }
}