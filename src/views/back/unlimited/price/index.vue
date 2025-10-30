<template>
  <div class="space-y-6">
    <div class="product board p-5 rounded">
      <div class="column_center space-y-3">
        <p class="text-xl sm:text-2xl lg:text-4xl title md:whitespace-pre-wrap font-semibold">
          {{ t("menu_spec.unlimited_proxy") }} {{ t("Price") }}
        </p>
        <p class="text-lg">{{ t("residential_spec.des") }}</p>
      </div>
      <div class="w-full mt-5">
        <ProductList :type="1" :tabbar="false" :pack="5" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import ProductList from "@/views/front/components/product_list/product_list.vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
</script>

<style lang="less" scoped>
.product {
  padding-top: 50px;
}
</style>
