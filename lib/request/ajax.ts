import { text } from "stream/consumers";

export default function request(send) {
    //axios 有interceptor.use(config=>{},err=>{});
    // 拦截原生api 重写他的方法
    const OriginalOpen = XMLHttpRequest.prototype.open;
    const OriginalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = (method, url, async: boolean = true) => {  //重写
        send({
            type: 'ajax',
            text: 'request',
            data: {
                method,
                url,
                async
            }
        })
        OriginalOpen.call(this, method, url, async)
    },
        XMLHttpRequest.prototype.send = (body: any) => {
            send({
                type: 'ajax',
                text: 'request',
                data: {
                    body
                }
            })
            OriginalOpen.call(this, body)
        }
    // fetch
    const OriginalFetch = window.fetch
    window.fetch = (...args: any[]) => {
        send({
            type: 'fetch',
            text: 'request',
            data: {
                args
            }
        })
        return OriginalFetch.call(this, ...args)
    }



}
