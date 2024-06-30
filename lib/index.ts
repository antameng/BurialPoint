import user from "./user";
import buttons from "./button";
import error from "./error/window.ts";
import promiseError from "./error/promiseError.ts";
import { Types } from "./type/index.ts";
import request from "./request/ajax.ts";

export class Tracker {
    enevts: Record<string, Function>;
    constructor() {
        this.enevts = { buttons, error, promiseError, request }
        this.init()

    }
    /**
     * 上报
     * @res 上报的信息
     */
    public sendRequest(params: Types) {
        let userInfo = user()
        const body = Object.assign({}, userInfo, params)
        // 拿到信息要上报 发起请求  用axios fetch xhr 缺点是关闭页面就请求停止了
        // 缺点不支持跨域 不支持json
        // 1、ping请求 不能发送长的东西 返回的东西也简短  post
        // 2、不支持传json 利用blob
        // 3、使用json后会跨域 因为设置了content-type 修改了请求头
        // 4、navigator.sendBeacon() 默认携带cookie
        let blob = new Blob([JSON.stringify(userInfo)], { type: "application/json" })
        navigator.sendBeacon('http://localhost:3000/tacker', blob)
    }
    private init() {
        console.log(Object.keys(this.enevts), 'enevts')
        Object.keys(this.enevts).forEach(key => {
            this.enevts[key](this.sendRequest)
        })
    }
}
