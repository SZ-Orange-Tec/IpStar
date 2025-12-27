<template>
  <div v-if="show">
    <div class="product_pop" ref="container">
      <div class="main black flex rounded-lg">
        <div class="flex-1 min-w-0">
          <div class="grey-40 font-medium between">
            <span>{{ t("Proxy_Location") }}</span>
            <div class="v_center space-x-2 slider_bck slider_bck_left" @click="router.push('/country')">
              <strong class="font-medium">{{ t("All_Regions") }}</strong>
              <MoveRight />
            </div>
          </div>

          <div class="split w-full"></div>

          <div class="w-full">
            <ul class="content grid grid-cols-2 w-full">
              <li class="w-1/2 v_center space-x-3 rounded-lg" @click="toCountry('US')">
                <div class="w-6 h-6 vh_center rounded-full overflow-hidden">
                  <img src="@/assets/images/home/country/USA.png" alt="" />
                </div>
                <span>{{ t("United_States") }}</span>
              </li>
              <li class="w-1/2 v_center space-x-3 rounded-lg" @click="toCountry('FR')">
                <div class="w-6 h-6 vh_center rounded-full overflow-hidden">
                  <img src="@/assets/images/home/country/France.png" alt="" />
                </div>
                <span>{{ t("France") }}</span>
              </li>
              <li class="w-1/2 v_center space-x-3 rounded-lg" @click="toCountry('DE')">
                <div class="w-6 h-6 vh_center rounded-full overflow-hidden">
                  <img src="@/assets/images/home/country/Germany.png" alt="" />
                </div>
                <span>{{ t("Germany") }}</span>
              </li>
              <li class="w-1/2 v_center space-x-3 rounded-lg" @click="toCountry('BR')">
                <div class="w-6 h-6 vh_center rounded-full overflow-hidden">
                  <img src="@/assets/images/home/country/Brazil.png" alt="" />
                </div>
                <span>{{ t("Brazil") }}</span>
              </li>
              <li class="w-1/2 v_center space-x-3 rounded-lg" @click="toCountry('GB')">
                <div class="w-6 h-6 vh_center rounded-full overflow-hidden">
                  <img src="@/assets/images/home/country/United_Kingdom.png" alt="" />
                </div>
                <span>{{ t("United_Kingdom") }}</span>
              </li>
              <li class="w-1/2 v_center space-x-3 rounded-lg" @click="toCountry('JP')">
                <div class="w-6 h-6 vh_center rounded-full overflow-hidden">
                  <img src="@/assets/images/home/country/Japan.png" alt="" />
                </div>
                <span>{{ t("Japan") }}</span>
              </li>
              <li class="w-1/2 v_center space-x-3 rounded-lg" @click="toCountry('KR')">
                <div class="w-6 h-6 vh_center rounded-full overflow-hidden">
                  <img src="@/assets/images/home/country/France.png" alt="" />
                </div>
                <span>{{ t("South_Korea") }}</span>
              </li>
              <li class="w-1/2 v_center space-x-3 rounded-lg" @click="toCountry('AU')">
                <div class="w-6 h-6 vh_center rounded-full overflow-hidden">
                  <img src="@/assets/images/home/country/Australia.png" alt="" />
                </div>
                <span>{{ t("Australia") }}</span>
              </li>
              <li class="w-1/2 v_center space-x-3 rounded-lg" @click="toCountry('NL')">
                <div class="w-6 h-6 vh_center rounded-full overflow-hidden">
                  <img src="@/assets/images/home/country/Netherlands.png" alt="" />
                </div>
                <span>{{ t("Netherlands") }}</span>
              </li>
              <li class="w-1/2 v_center space-x-3 rounded-lg" @click="toCountry('MX')">
                <div class="w-6 h-6 vh_center rounded-full overflow-hidden">
                  <img src="@/assets/images/home/country/Mexico.png" alt="" />
                </div>
                <span>{{ t("Mexico") }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex-1 min-w-0 ml-10">
          <div class="grey-40 font-medium between">{{ t("Resources") }}</div>

          <div class="split w-full"></div>

          <div>
            <ul class="content w-full column space-y-1">
              <!-- <li class="w-full px-3 py-2 rounded-lg v_center gap-3" @click="router.push('/blog')">
                <div class="iconbox rounded-lg vh_center shrink-0">
                  <FilePen class="" />
                </div>
                <div class="flex-1 min-w-0 space-y-1">
                  <strong class="font-medium slider_bck slider_bck_left">{{ t("Blog") }}</strong>
                  <p class="grey-80 text-[13px] whitespace-normal font-normal leading-4">{{ t("header_spac.blog_desc") }}</p>
                </div>
              </li> -->
              <li class="w-full px-3 py-2 rounded-lg v_center gap-3" @click="router.push('/proxy-checker')">
                <div class="iconbox rounded-lg vh_center shrink-0">
                  <ShieldCheck class="" />
                </div>
                <div class="flex-1 min-w-0 space-y-1">
                  <strong class="font-medium slider_bck slider_bck_left">{{ t("Proxy_Detection_Tool") }}</strong>
                  <p class="grey-80 text-[13px] whitespace-normal font-normal leading-4">{{ t("header_spac.proxy_tool") }}</p>
                </div>
              </li>
              <li class="w-full px-3 py-2 rounded-lg v_center gap-3" @click="router.push('/ipaddress')">
                <div class="iconbox rounded-lg vh_center shrink-0">
                  <ScanSearch class="" />
                </div>
                <div class="flex-1 min-w-0 space-y-1">
                  <strong class="font-medium slider_bck slider_bck_left">{{ t("IP_Lookup") }}</strong>
                  <p class="grey-80 text-[13px] whitespace-normal font-normal leading-4">{{ t("header_spac.lookup") }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MoveRight, FilePen, ShieldCheck, ScanSearch } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import anime from "animejs/lib/anime.es.js"
import { nextTick, onMounted, ref, toRefs, watch } from "vue"
import { platProductLowestPrices } from "@/api/product"
import { useRouter } from "vue-router"

const { t } = useI18n()

const show = ref(false)

const props = defineProps({
  modelValue: Boolean,
})
const { modelValue } = toRefs(props)
const emit = defineEmits(["update:modelValue"])

watch(
  modelValue,
  (val) => {
    if (val) {
      show.value = val

      nextTick(() => {
        open()
      })
    } else {
      close()
    }
  }
  // { immediate: true }
)

// 开启 关闭动画
const container = ref(null)
function close() {
  const target = container.value

  target.parentNode.style.backgroundColor = "hsl(var(--dialog-wrap) / 0%)"

  return new Promise((resolve) => {
    anime({
      targets: target,
      opacity: {
        value: [1, 0],
        easing: "easeInQuart",
      }, // 明确指定起始和结束值
      // width: {
      //   value: [window.innerWidth, 0],
      //   easing: "easeInQuart",
      // },
      duration: 150,
      complete: () => {
        show.value = false
        emit("update:modelValue", false)
        resolve()
      },
    })
  })
}
function open() {
  const target = container.value

  target.parentNode.style.backgroundColor = "hsl(var(--dialog-wrap) / 90%)"

  anime({
    targets: target,
    opacity: {
      value: [0, 1],
      easing: "easeOutQuad",
    }, // 明确指定起始和结束值
    // width: {
    //   value: [0, window.innerWidth],
    //   easing: "easeOutQuad",
    // },
    duration: 300,
  })
}

// 跳转
const router = useRouter()
function toCountry(name) {
  router.push({
    name: "country_detail",
    params: {
      code: name.toLowerCase(),
    },
  })
  close()
}

onMounted(() => {
  if (modelValue.value) {
    show.value = true

    nextTick(() => {
      open()
    })
  }
})
</script>

<style lang="less" scoped>
.iconbox {
  width: 40px;
  height: 40px;
  background-color: hsl(var(--primary) / 8%);
  background-color: #eff6ff;
  position: relative;
  transition: background-color 0.3s ease-in-out;
  &::after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background-color: hsl(var(--primary) / 20%);
    border-radius: 50%;
  }
}
.product_pop {
  box-sizing: border-box;
  // width: 100vw;
  position: absolute;
  // top: 100%;
  padding-top: 10px;
  left: -40px;
  top: 100%;
  .main {
    padding: 20px 40px;
    width: 1000px;
    margin: 0 auto;
    box-shadow: 0 2px 8px 0 rgba(48, 39, 73, 0.08);
    transform-origin: center center;
    background-color: hsl(var(--background));
    border-bottom: 1px solid hsl(var(--border));
    .split {
      margin: 10px 0 20px;
      height: 1px;
      background-color: hsl(var(--border));
    }
    .content {
      // column-gap: 25px;
      & > li {
        width: 100%;
        height: 100%;
        padding: 16px 12px;
        transition: background-color 0.3s;
        &:hover {
          background-color: hsl(var(--primary) / 8%);
          .iconbox {
            background-color: #ffffff;
          }
          .slider_bck {
            color: hsl(var(--primary));
            &::after {
              width: 100%;
            }
          }
        }
      }
    }
  }
}

.slider_bck {
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 0%;
    height: 1px;
    border-radius: 10px;
    position: absolute;
    bottom: 0;

    background-color: hsl(var(--primary) / 80%);
    transition: all 0.3s;
  }
  &:hover {
    color: hsl(var(--primary));
    &::after {
      width: 100%;
    }
  }
}
.slider_bck_left {
  &::after {
    left: 0;
    transform-origin: left center;
  }
}
</style>
