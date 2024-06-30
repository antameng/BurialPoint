import { url } from "inspector";
import { Send } from "../type";

export default function pv(send: Send) {

  // hash history
  // hash的监听
  window.addEventListener('hashchange', e => {
    send({
      type: "pv-hash",
      text: location.href,
      data: {
        path: location.href,
        newURL: e.newURL,
        oldURL: e.oldURL
      }
    })
  })
  // history的监听
  // popstate只能监听浏览器上方的箭头 监听不了控制台pushState 且没有这个事件
  window.addEventListener('popstate', (e) => {
    send({
      type: 'pv-history',
      text: e.type,
      data: {
        state: e.state,
        url: location.href
      }
    })
  })

  const pushState = history.pushState
  window.history.pushState = (state, title, url) => {
    const res = pushState.call(this, state, title, url)
    //自定义事件
    const e = new Event('pushState')  //发布订阅
    window.dispatchEvent(e)
    return res
  }
  window.addEventListener('pushState', e => {
    console.log(e);
    send({
      type: 'pv-history',
      text: e.type,
      data: {
        url: location.href
      }
    })
  })

}
