import anime from 'animejs/lib/anime.es'
import '@/assets/css/tooltip.less'
import { typeOf } from '@/utils/tool'

function allTooltip (el) {
  let tips = []

  const enter = () => {
    const { message, placement = 'top', offset, disabled = false } = el.tooltipConfig
    if (!message.trim() || disabled) return

    const trans = offset ?? 8

    // 增加dom
    const tip = document.createElement('div')
    tip.innerText = message
    tip.setAttribute('class', 'chat-tooltip')
    document.body.appendChild(tip)
    // debugger
    tips.push(tip)

    const tipWidth = tip.clientWidth
    const tipHeight = tip.clientHeight

    const { top, left, right, bottom } = el.getBoundingClientRect()
    const width = right - left
    const height = bottom - top

    let style

    switch (placement) {
      case 'top': {
        style = `left:${left - (tipWidth - width) / 2}px;`
        const hasSpace = top > tipHeight
        tip.setAttribute('placement', hasSpace ? 'top' : 'bottom')
        style += hasSpace ? `top:${top - tipHeight - trans}px;` : `top:${bottom + trans}px`
        break
      }
      case 'right': {
        style = `top:${top - (tipHeight - height) / 2}px;`
        const hasSpace = window.innerWidth - right > tipWidth
        tip.setAttribute('placement', hasSpace ? 'right' : 'left')
        style += hasSpace ? `left:${right + trans}px;` : `left:${left - tipWidth - trans}px`
        break
      }
    }

    tip.style = style

    anime({
      targets: tip,
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 300,
      easing: 'easeOutBack',
      complete: () => {
      }
    })
  }

  const leave = () => {
    anime({
      targets: tips,
      scale: [1, 0.9],
      opacity: [1, 0],
      duration: 100,
      easing: 'easeOutQuad',
      complete: () => {
        tips.forEach(tip => tip?.remove())
        tips = []
      }
    })
  }

  const remove = () => {
    tips.forEach(tip => tip?.remove())
    el.removeEventListener('mouseenter', enter)
    el.removeEventListener('mouseleave', leave)
  }

  el.addEventListener('mouseenter', enter)
  el.addEventListener('mouseleave', leave)

  el.removeTootip = remove
}

export default {
  bind (el, binding) {
    el.tooltipConfig = typeOf(binding.value) !== 'String' ? binding.value : { message: binding.value }
    allTooltip(el)
  },
  update (el, binding) {
    el.tooltipConfig = typeOf(binding.value) !== 'String' ? binding.value : { message: binding.value }
  },
  unbind (el) {
    el.removeTootip()
  }
}
