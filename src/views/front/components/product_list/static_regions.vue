<template>
  <div class="regios box-border w-full h-8 between px-2 rounded">
    <span class="grey-60">{{ t("Locations") }}</span>

    <DropDown placement="bottom" class="shink-0 dropdown" :max-height="300">
      <template #label="{ open }">
        <div class="black between space-x-1 shrink-0 w-full h-9 pointer">
          <div :class="{ 'grey-60': !region_text }">{{ region_text }}</div>
          <ChevronDown :size="16" :class="{ rotate180: open }" class="transition-transform" />
        </div>
      </template>
      <template #menu>
        <ul class="menu grey-60 box-border p-1 column text-sm" @click="regionChange">
          <li
            v-for="item in regionsList"
            :key="item.value"
            :class="{ active: item.value === region }"
            class="menu_item w-full box-border px-2 h-8 rounded-md pointer transition-color v_center pointer"
            :data-value="item.value"
          >
            {{ item[lang] }}
          </li>
        </ul>
      </template>
    </DropDown>
  </div>
</template>

<script setup>
import DropDown from "@/components/dropdown/dropdown.vue"
import { useI18n } from "vue-i18n"
import { ChevronDown } from "lucide-vue-next"
import { computed, inject, onMounted, ref } from "vue"
import settingStore from "@/store/setting"

const { t } = useI18n()
const { lang } = settingStore()

const region = defineModel()
const regionsList = inject("regionsList", [])
const region_text = computed(() => {
  const item = regionsList.value.find((item) => item.value === region.value)
  return item ? item[lang.value] : ""
})
function regionChange(e) {
  function findDom(dom) {
    if (!dom || dom.tagName === "UL") return
    if (dom.tagName === "LI") {
      return dom
    }
    return findDom(dom.parentElement)
  }
  const dom = findDom(e.target)
  if (!dom) return

  const value = dom.dataset.value
  region.value = value
}
</script>

<style lang="less" scoped>
.regios {
  background-color: hsl(var(--primary) / 3%);
  font-size: 13px;
  .dropdown {
    .menu {
      width: 160px;
      overflow-y: auto;
      .menu_item {
        &:hover {
          background-color: hsl(var(--foreground) / 4%);
        }
      }
      .menu_item.active {
        color: hsl(var(--primary));
        background-color: hsl(var(--primary) / 5%);
      }
    }
  }
}
.rotate180 {
  transform: rotate(180deg);
}
</style>
