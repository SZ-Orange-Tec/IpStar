// 记录dialog打开时鼠标点击位置
// import { roundToDecimal } from '@/utils/tools'

class Position {
  constructor () {
    this.x = 0
    this.y = 0
  }

  set ({ x, y }) {
    this.x = x
    this.y = y
  }

  get () {
    return { x: this.x, y: this.y }
  }
}

export default new Position()
