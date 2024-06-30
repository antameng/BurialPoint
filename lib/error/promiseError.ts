import { Send } from "../type";

export default function promiseError(send: any) {
    window.addEventListener("unhandledrejection", (e) => {
        send({

        })
    });
}
