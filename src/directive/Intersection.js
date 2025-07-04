import { debounce, throttle } from "@/utils/tools"

class MyIntersectionObserver {
  constructor(callback) {
    this.callback = callback
    this.targets = new Map()

    this.debounceCheckIntersections = debounce(this.checkIntersections.bind(this), 50)
    this.throttleCheckIntersections = throttle(this.checkIntersections.bind(this), 100)

    // 监听滚动和调整大小事件
    window.addEventListener("scroll", this.throttleCheckIntersections, true)
    window.addEventListener("resize", this.throttleCheckIntersections, true)
  }

  // 获取根元素的边界矩形
  getRootRect() {
    return {
      top: 0,
      left: 0,
      bottom: window.innerHeight,
      right: window.innerWidth,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  // 检查目标元素与根元素的相交情况
  checkIntersections() {
    const rootRect = this.getRootRect()

    const entries = []

    for (const [target, _] of this.targets) {
      const targetRect = target.getBoundingClientRect()

      // 计算相交区域
      const isIntersecting =
        (0 < targetRect.top && targetRect.top < rootRect.bottom) || (0 < targetRect.bottom && targetRect.bottom < rootRect.bottom)

      const intersectionRect = {
        top: isIntersecting ? Math.max(rootRect.top, targetRect.top) : 0,
        left: isIntersecting ? Math.max(rootRect.left, targetRect.left) : 0,
        bottom: isIntersecting ? Math.min(rootRect.bottom, targetRect.bottom) : 0,
        right: isIntersecting ? Math.min(rootRect.right, targetRect.right) : 0,
      }

      intersectionRect.width = Math.max(0, intersectionRect.right - intersectionRect.left)
      intersectionRect.height = Math.max(0, intersectionRect.bottom - intersectionRect.top)

      const targetArea = targetRect.width * targetRect.height
      const intersectionArea = intersectionRect.width * intersectionRect.height

      const intersectionRatio = targetArea > 0 ? intersectionArea / targetArea : isIntersecting ? 1 : 0

      entries.push({
        target,
        intersectionRect,
        intersectionRatio,
        boundingClientRect: targetRect,
        isIntersecting,
        time: Date.now(),
      })
    }

    if (entries.some((item) => item.intersectionRatio > 0)) {
      this.callback(entries)
    }
  }

  observe(target) {
    if (!this.targets.has(target)) {
      this.targets.set(target, true)

      // 因为可能有的元素一开始就在可视区 但是添加的监听只有触发scroll事件才会检查相交情况
      // 所以需要等待所有元素都添加监听完成后在统一执行一次 checkIntersections 方法,检查相交情况
      // 这里用防抖可以实现, 因为防抖只会在一段时间内触发最后一次
      this.debounceCheckIntersections()
    }
  }

  unobserve(target) {
    this.targets.delete(target)
  }

  disconnect() {
    this.targets.clear()
    window.removeEventListener("scroll", this.throttleCheckIntersections)
    window.removeEventListener("resize", this.throttleCheckIntersections)
  }
}

export default MyIntersectionObserver
