const weak = new Map()

const handleFun = (e) => {
  weak.forEach((allFun, el) => {
    allFun.forEach((fun) => {
      fun(e, el)
    })
  })
}
document.addEventListener("click", handleFun)

export default {
  mounted(el, binding) {
    const fun = (e, el) => {
      // 判断所点击dom是否为el的节点
      if (!el.contains(e.target)) {
        binding.value(e)
      }
    }
    const set = weak.get(el) ?? new Set()
    set.add(fun)
    weak.set(el, set)
  },
  beforeUnmount(el) {
    weak.delete(el)
  },
}
