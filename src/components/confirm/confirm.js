import { createApp, ref, h } from "vue"

import ConfirmDialog from "./confirm.vue"

const defaultOption = {
  title: "提示",
  type: "",
  message: "",
  showInput: false,
  showCancel: true,
  confirmText: "确认",
  cancelText: "取消",
  width: "500px",
}

function confirmComponent(props) {
  return {
    render() {
      return h(ConfirmDialog, { ...props })
    },
  }
}

export default function Confirm(options) {
  // debugger
  options = Object.assign({}, defaultOption, options)
  const cancel = options.cancel
  const success = options.success

  const show = ref(true)

  options.cancel = async ({ close }) => {
    cancel && cancel()
    await close()

    app.unmount()
    div.remove()
  }
  options.success = async ({ close, input, loading }) => {
    success && (await success({ input, loading }))
    await close()

    app.unmount()
    div.remove()
  }

  const div = document.createElement("div")
  document.body.appendChild(div)

  const props = {
    modelValue: show.value,
    "onUpdate:modelValue": (value) => (show.value = value),
    ...options,
  }

  const app = createApp(confirmComponent(props))

  app.mount(div)
}
