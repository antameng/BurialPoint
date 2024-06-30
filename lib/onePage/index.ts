import { Send } from "../type";
// 首屏加载
export default function onePage(send: Send) {
  let firstScreenTime = 0
  const ob = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      firstScreenTime = performance.now()
    })
    if (firstScreenTime > 0) {
      send({
        type: 'onePage',
        text: '首屏加载时间',
        data: {
          firstScreenTime
        }

      })
      ob.disconnect() // 断开监听
    }
  })
  // vue 项目document换成app
  //  childList 子节点发生变化，dom增删改查，
  // substree 监听整个子节点包括子节点的后代
  ob.observe(document, { childList: true, subtree: true })
}
