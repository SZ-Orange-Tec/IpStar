<template>
  <div class="h-full column_center space-y-4 board rounded-md lock" style="justify-content: center">
    <img src="@/assets/images/products/lock.png" width="60" alt="" />
    <span class="text-lg primary">{{ t("proxy_spec.no_buy") }}</span>

    <!-- <div class="column_center space-y-2">
          <strong class="text-2xl">{{ t("proxy_spec.unlock_title") }}</strong>
          <p>{{ t("proxy_spec.unlock_desc") }}</p>
        </div> -->
    <ip-button type="black" @click="toBuy" class="px-5 h-9 text-sm" style="margin-top: 1.5rem">
      <div class="vh_center space-x-2">
        <ShoppingCart :size="14" />
        <span>{{ t("Buy_now") }}</span>
      </div>
    </ip-button>
  </div>
</template>
