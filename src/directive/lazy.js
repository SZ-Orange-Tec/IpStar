import { typeOf } from "@/utils/tools"
import MyIntersectionObserver from "./Intersection"

const weakMap = new WeakMap()

function lazyEnter(entries) {
  entries.forEach(async (change) => {
    if (change.intersectionRatio > 0) {
      const el = change.target
      const fun = weakMap.get(el)

      const isFun = /Function/.test(typeOf(fun))
      isFun && (await fun())

      lazy.unobserve(el)
    }
  })
}

const lazy = "IntersectionObserver" in window ? new IntersectionObserver(lazyEnter) : new MyIntersectionObserver(lazyEnter)

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

    weakMap.set(el, fun)
    lazy.observe(el)
  },
}
