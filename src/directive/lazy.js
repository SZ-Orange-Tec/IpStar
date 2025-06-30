import { typeOf } from "@/utils/tools"

const weakMap = new WeakMap()

function lazyEnter(entries) {
  entries.forEach(async (change) => {
    if (change.intersectionRatio > 0) {
      const el = change.target
      const fun = weakMap.get(el)

      await execFun(el, fun)

      lazy.unobserve(el)
    }
  })
}
async function execFun(el, fun) {
  // const isImg = el.tagName === "IMG"
  const isFun = /Function/.test(typeOf(fun))

  try {
    if (isFun) {
      fun()
    }
    // if (isImg) {
    //   el.src = !isFun ? fun : (await fun()).default
    // } else if (isFun) {
    //   // 不是图片 直接执行
    //   fun()
    // }
  } catch (error) {
    console.log(error.message)
  }
}

const support = "IntersectionObserver" in window

const lazy = support ? new IntersectionObserver(lazyEnter) : null

export default {
  beforeMount(el, binding, vnode) {
    if (!binding.value && vnode.type === "img") {
      const { sizes = "", src = "", srcset = "" } = vnode.props
      el.removeAttribute("sizes")
      el.removeAttribute("src")
      el.removeAttribute("srcset")
      const fun = () => {
        sizes && el.setAttribute("sizes", sizes)
        src && el.setAttribute("src", src)
        srcset && el.setAttribute("srcset", srcset)
      }
      binding.value = fun
    }
  },
  mounted(el, binding, vnode) {
    const fun = binding.value

    if (support) {
      weakMap.set(el, fun)
      lazy.observe(el)
    } else {
      // 立即执行
      execFun(el, fun)
    }
  },
}
