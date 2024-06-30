import { Send } from "../type";

export default function buttons(send: Send) {
    document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const token = target.getAttribute('data-tracker')
        const position = target.getBoundingClientRect()
        if (token) {
            //上报按钮点击
            send({
                type: 'event',
                text: token,
                data: {
                    x: position.x,
                    y: position.y,
                    width: position.width,
                    height: position.height
                }
            })
        }
    })
}
