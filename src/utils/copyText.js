function copyText () { // 复制文本 惰性函数
  if ('clipboard' in navigator && window.isSecureContext) {
    return function (text) {
      return navigator.clipboard.writeText(text)
    }
  } else {
    return function (text) {
      return new Promise((resolve) => {
        const input = document.createElement('textarea')
        input.value = text
        document.body.appendChild(input)
        input.select()
        document.execCommand('Copy')

        input.remove()// 删除动态创建的节点

        resolve(true)
      })
    }
  }
}
export default copyText()
