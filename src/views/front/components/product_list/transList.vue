<template>
  <TransitionGroup tag="ul" :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
    <slot></slot>
  </TransitionGroup>
</template>

<script setup>
import anime from "animejs/lib/anime.es.js"

function onBeforeEnter(el) {
  el.style = `opacity:0;`
}
function onEnter(el, done) {
  const index = Array.from(el.parentElement.children).findIndex((i) => i === el)

  const delay = 50 + index * 50

  // anime({
  //   targets: el,
  //   width: [0, el.clientWidth],
  //   easing: "easeOutQuad",
  //   duration: 200,
  //   complete: () => {
  //     done()
  //   },
  // })
  // done()
  anime({
    targets: el,
    opacity: [0, 1],
    translateX: ["100%", 0],
    easing: "easeOutQuad",
    duration: 200,
    delay,

    complete: () => {
      done()
    },
  })
}
function onLeave(el, done) {
  anime({
    targets: el,
    opacity: {
      value: [1, 0],
      easing: "easeOutQuad",
    },
    duration: 150,
    complete: () => {
      done()
    },
  })
}
</script>

<style lang="scss" scoped></style>
