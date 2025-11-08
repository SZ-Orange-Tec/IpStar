<template>
  <div class="pc-dropDown" v-clickoutside="closeMenu">
    <div class="label h-full" @click="toggleMenu" ref="label">
      <slot name="label" :open="open"></slot>
    </div>
    <div
      class="dropMenu"
      :class="maxHeight ? 'overflow-y-auto' : 'overflow-hidden'"
      ref="menu"
      @click="closeMenu"
      :placement="direction"
      :style="position"
      @wheel.stop
    >
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js"
import clickoutside from "@/directive/clickoutside"
export default {
  name: "PCDropDown",
  directives: {
    clickoutside,
  },
  props: {
    trigger: String,
    maxHeight: {
      type: Number,
    },
    placement: {
      type: String,
      default: "bottom",
    },
  },
  data() {
    // this.open = false
    return {
      open: false,
      position: {},
    }
  },
  computed: {
    direction() {
      return this.placement.split("-")[0]
    },
  },
  methods: {
    toggleMenu() {
      const open = this.open

      if (!open) {
        this.openMenu()
      } else {
        this.closeMenu()
      }
    },
    openMenu() {
      const target = this.$refs.menu

      this.computePosition()

      const height = this.maxHeight ? Math.min(target.scrollHeight, this.maxHeight) : target.scrollHeight

      anime({
        targets: target,
        opacity: {
          value: [0.5, 1],
          duration: 200,
          easing: "easeOutQuad",
        },
        height: {
          value: height,
          duration: 200,
          easing: "easeOutExpo",
        },
      })
      this.open = true
      this.$emit("onChange", true)
    },
    closeMenu() {
      const target = this.$refs.menu

      anime({
        targets: target,
        opacity: {
          value: 0,
          duration: 200,
          easing: "easeOutQuad",
        },
        height: {
          value: 0,
          duration: 200,
          easing: "easeOutExpo",
        },
      })
      this.open = false
      this.$emit("onChange", false)
    },
    computePosition() {
      // 计算剩余空间
      const compute = (placement) => {
        switch (placement) {
          case "bottom":
            return {
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
            }
          case "bottom-start":
            return {
              top: "100%",
              left: "0%",
            }
          case "bottom-end":
            return {
              top: "100%",
              right: "0%",
            }
          case "start-top":
            return {
              bottom: "100%",
              left: 0,
            }
          default:
            return {}
        }
      }

      const placement = this.placement
      this.position = compute(placement)

      const { left, right } = this.$refs.label.getBoundingClientRect()
      const labelWidth = right - left
      const menuWidth = this.$refs.menu.clientWidth
      const difference = menuWidth - labelWidth

      if (placement === "bottom-start" && difference > window.innerWidth - right) {
        const space = difference / 2 < window.innerWidth - right
        this.position = compute(space ? "bottom" : "bottom-end")
      } else if (placement === "bottom-end" && difference > left) {
        const space = difference / 2 < left
        this.position = compute(space ? "bottom" : "bottom-start")
      } else if (placement === "bottom") {
        if (difference / 2 > left) {
          this.position = compute("bottom-start")
        } else if (difference / 2 > window.innerWidth - right) {
          this.position = compute("bottom-end")
        }
      }
    },
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
@import "./dropDown.less";
</style>
