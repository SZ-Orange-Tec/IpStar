import anime from "animejs/lib/anime.es.js"
import "./message.less"

const defaultOptions = {
  type: "success", // error warning
  message: "",
  duration: 5000,
}

function Message(options) {
  options = Object.assign(defaultOptions, options)

  const { type, message, duration } = options

  let messages = []

  async function addMessage() {
    const div = document.createElement("div")
    const container = document.createElement("div")
    div.className = "chat-message"
    container.className = "container v_center space-x-2"

    const image = document.createElement("img")
    image.src = new URL(`./${type}.svg`, import.meta.url).href
    const p = document.createElement("p")
    p.innerText = message

    container.appendChild(image)
    container.appendChild(p)

    div.appendChild(container)
    messages.push(div)
    document.body.appendChild(div)

    return new Promise((resolve) => {
      anime({
        targets: container,
        scale: [0.9, 1],
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 300,
        easing: "easeOutBack",
        complete: () => {
          resolve()
        },
      })
    })
  }

  function removeMessage() {
    const targets = []
    for (let i = 0; i < messages.length; i++) {
      targets.push(messages[i].firstChild)
    }
    anime({
      targets,
      scale: [1, 0.9],
      opacity: [1, 0],
      translateY: [0, -10],
      duration: 100,
      easing: "easeOutQuad",
      complete: () => {
        messages.forEach((message) => message?.remove())
        messages = []
      },
    })
  }

  if (!message) return

  addMessage().then(() => {
    setTimeout(() => {
      removeMessage()
    }, duration)
  })
}

export default Message
