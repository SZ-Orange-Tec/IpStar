<template>
  <div class="pc-product_list">
    <!-- tabbar 个人 企业 -->
    <Tabbar
      class="mx-auto transition-opacity duration-300"
      @select="changeActive"
      v-if="tabbar"
      :lowest="lowest"
      :style="{ opacity: !newerActive || showAllPack ? 1 : 0 }"
    ></Tabbar>

    <div class="list">
      <div v-if="product_list.length" class="priceList" ref="productRef" @wheel="scrollPlugin">
        <TransList class="column_center sm:flex sm:!items-stretch gap-3">
          <!-- 新用户充值活动 -->
          <li class="newUserAward" v-if="newerActive" key="award">
            <div class="mask_bck h-full rounded relative p-2 bg-[#a993f9]">
              <div class="mask_content bg-white w-full h-full rounded column_center pt-10 pb-2 px-2">
                <h1 class="text-xl font-medium">{{ t("award_title") }}</h1>
                <div class="text-4xl text-[#d355c7] mt-6">
                  <strong class="text-7xl font-medium">{{ newer_promotion.name_count }}</strong>
                  <span class="font-semibold">{{ newer_promotion.name_unit }}</span>
                </div>
                <div class="text-3xl mt-6 text-[#524499] flex items-end space-x-5 align-baseline">
                  <span class="font-semibold">{{ t("Only") }}</span>
                  <strong class="text-7xl font-medium">${{ newer_promotion.price / 100 }}</strong>
                </div>
                <p class="underline text-sm text-center mt-10 w-full max-w-[300px] font-medium">
                  {{ t("award_desc", { total: newer_promotion.residential_size, mobile: newer_promotion.mobile_size, days: newer_promotion.days }) }}
                </p>
                <IpButton @click="buyNewUserAward" type="primary" class="px-5 min-w-[180px] vh_center h-11 mt-6 !bg-[#524499]">{{
                  t("Buy_Now")
                }}</IpButton>
                <p class="text-[10px] mt-6 text-center">{{ t("award_tip") }}</p>
              </div>
            </div>
          </li>

          <template v-if="newerActive && !showAllPack">
            <li class="newUserAward" key="award-mask">
              <div class="h-full vh_center rounded-lg relative p-2 bg-white border-2 border-gray-200 mask">
                <div class="column_center">
                  <h1 class="text-xl font-medium">{{ t("productList_spec.newer_mask1") }}</h1>
                  <ul class="vh_center space-x-3 mt-5">
                    <li>4 GB</li>
                    <li class="h-3 w-px text-gray-500 bg-current"></li>
                    <li>30 GB</li>
                    <li class="h-3 w-px text-gray-500 bg-current"></li>
                    <li>60 GB</li>
                    <li class="h-3 w-px text-gray-500 bg-current"></li>
                    <li>120 GB</li>
                  </ul>

                  <ip-button type="primary_border" class="h-11 rounded w-full mt-5" @click="showAllPack = true">
                    <div class="v_center space-x-2">
                      <span>{{ t("productList_spec.newer_mask2") }}</span>
                      <MoveRight :size="16" />
                    </div>
                  </ip-button>

                  <p class="text-gray-500 mt-5">{{ t("productList_spec.newer_mask3") }}</p>
                </div>
              </div>
            </li>
          </template>

          <template v-else-if="!newerActive || showAllPack">
            <!-- 平常套餐 -->
            <li
              v-for="(item, index) in product_list"
              :key="item.id"
              :class="[{ hidden: !showGift && item.trial }, item.hot ? 'popular' : 'common']"
              class="transition-color"
            >
              <div class="card column_center space-y-5">
                <div class="top w-full column_center space-y-4" :class="{ top_unlimit: item.unlimit }">
                  <div class="package_name vh_center rounded-full">
                    <div class="column_center">
                      <template v-if="type === 0 || type === 4 || type === 2">{{ item.pack_title }}</template>
                      <template v-if="type === 1 || type === 3 || type === 5">{{ item.prices[0].days }} {{ t("Day") }}</template>
                    </div>
                  </div>

                  <!-- 折扣 -->
                  <div v-if="type === 0 || type === 4" class="font-medium lg:font-semibold" style="height: 1.5rem">
                    <!-- <div
                    class="hot_off vh_center px-4 whitespace-nowrap rounded-full text-sm"
                    v-if="item.hot && item.prices[item.select].discount_active > 0"
                  >
                    {{ item.prices[item.select].discount + "%" }} {{ t("OFF") }} + {{ item.prices[item.select].discount_active + "%" }} {{ t("OFF") }}
                  </div> -->
                    <div class="h-8 v_center">
                      <template v-if="item.trial">{{ t("Free") }}</template>
                      <template v-else-if="item.prices[item.select]?.discount > 0"
                        >{{ item.prices[item.select]?.discount + "%" }} {{ t("OFF") }}</template
                      >
                      <template v-else>{{ item.name }}</template>
                    </div>
                  </div>

                  <div v-else-if="type === 2 && customPack" class="font-medium" style="height: 1.5rem"></div>

                  <!-- 单价 -->
                  <p class="price lg:text-4xl space-x-1">
                    <!-- 总价和实付金额相等才显示 -->
                    <!-- <span class="origin text-[13px] grey-60 line-through" v-if="item.hot">
                    <template v-if="item.prices[item.select].price === item.prices[item.select].actual_price">
                      ${{ item.prices[item.select].origin_price / 100 }}
                    </template>
                  </span> -->
                    <strong
                      class="text-3xl font-semibold"
                      :class="{
                        'text-slate-400 !font-normal line-through': item.prices[item.select].price !== item.prices[item.select].actual_price,
                      }"
                      >${{ item.prices[item.select].unit_price / 100 }}</strong
                    >
                    <!-- <span class="text-base font-semibold text-[#d5182d]" v-if="item.prices[item.select].price !== item.prices[item.select].actual_price"
                    >${{ item.prices[item.select].unit_origin_price / 100 }}</span
                  > -->
                    <span
                      class="text-sm"
                      :class="{ 'text-slate-400  line-through': item.prices[item.select].price !== item.prices[item.select].actual_price }"
                      v-if="type === 0 || type === 4 || type === 2"
                      >/GB</span
                    >
                    <span class="text-sm" v-else-if="type === 1">/{{ t("Day") }}</span>
                    <span class="text-sm" v-else-if="type === 3 || type === 5">/IP</span>
                  </p>

                  <!-- 总计 -->
                  <p
                    class="vh_center space-x-1 text-[13px] total"
                    :class="{ 'text-slate-400 !font-normal line-through': item.prices[item.select].price !== item.prices[item.select].actual_price }"
                  >
                    <span class="grey-60">{{ t("Total") }}:</span>
                    <template v-if="type === 3 || type === 5">${{ item.total }}</template>
                    <template v-else>${{ item.prices[item.select].price / 100 }}</template>
                  </p>

                  <!-- 活动 -->
                  <div
                    v-if="(type === 0 || type === 2) && item.prices[item.select].price !== item.prices[item.select].actual_price"
                    class="column_center"
                  >
                    <div class="column !items-stretch">
                      <p class="align-bottom space-x-1 text-[13px] total">
                        <span class="black">{{ t("productList_spec.pay_only_price") }}:</span>
                        <span class="font-medium text-base" style="color: #d5182d">
                          ${{ item.prices[item.select].unit_origin_price / 100 }}
                          <span class="black font-normal text-xs">/ GB</span>
                        </span>
                      </p>
                      <p class="v_center space-x-1 text-[13px] total mt-2">
                        <span class="black">{{ t("productList_spec.pay_only_total") }}:</span>
                        <span class="black">${{ item.prices[item.select].actual_price / 100 }}</span>
                      </p>
                    </div>
                    <i18n-t
                      keypath="productList_spec.new_user_activity"
                      tag="div"
                      scope="global"
                      class="text-center rounded-md py-1 text-xs px-2 success success_border mt-2"
                    >
                      <template #off>{{ discount_rate_text }}</template>
                      <template #day>{{ activity_days }}</template>
                    </i18n-t>
                  </div>

                  <div v-if="type === 0 || type === 4" class="number w-full">
                    <div v-if="item.prices.length === 1" class="duration text-center space-x-1 text-sm">
                      <span v-if="item.prices[0].days > 3650" class="font-medium text-base">{{ t("Never_Expires") }}</span>
                      <span v-else class="font-bold text-base">{{ item.prices[0].days }} {{ t("Day") }}</span>
                    </div>
                    <setpNumber v-else :list="item.prices" v-model:select="item.select"></setpNumber>
                  </div>
                  <div v-if="type === 2" class="number w-full">
                    <div class="duration text-center space-x-1 text-sm">
                      <span class="font-medium text-base">{{ t("Never_Expires") }}</span>
                    </div>
                  </div>
                  <div v-if="type === 3 || type === 5" class="w-full space-y-2" style="margin-top: 1.75rem">
                    <Regions v-model="item.region" />
                    <InputNumber v-model="item.number" @change="(num) => numberChange(index, num)" />
                  </div>
                </div>

                <!-- <p class="title v_center" v-if="item.unlimit">{{ t("PCProductList.unlimited_rights[0]") }}</p> -->

                <ul v-if="type === 0 || type === 4" class="rights column space-y-3 text-[13px] font-normal grey-80">
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.right1") }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.right2") }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.right3") }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.right4", { num: showContact ? 2000 : 600 }) }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.right5") }}</p>
                  </li>
                </ul>
                <ul v-else-if="type === 1" class="rights column space-y-3 text-[13px] font-normal grey-80">
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.unlimited_right1") }}</p>
                  </li>
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.unlimited_right2") }}</p>
                  </li>
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.unlimited_right3") }}</p>
                  </li>
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.unlimited_right4") }}</p>
                  </li>
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.unlimited_right5") }}</p>
                  </li>
                </ul>
                <ul v-else-if="type === 2" class="rights column space-y-3 text-[13px] font-normal grey-80">
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.phone_right1") }}</p>
                  </li>
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.phone_right2") }}</p>
                  </li>
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.phone_right3") }}</p>
                  </li>
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.phone_right4") }}</p>
                  </li>
                </ul>
                <ul v-else-if="type === 3 || type === 5" class="rights column space-y-3 text-[13px] font-normal grey-80">
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.data_right1") }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.data_right2") }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.data_right3") }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.data_right4") }}</p>
                  </li>
                </ul>

                <div class="hot text-center text-xs hidden sm:vh_center font-medium whitespace-pre-wrap" v-if="item.hot">{{ t("Most_popular") }}</div>
                <!-- <div class="tag px-5 whitespace-nowrap text-sm" v-if="type === 0 && item.hot">{{ t("productList_spec.hot_limit") }}</div> -->

                <IpButton @click="click_pay" :data-index="index" type="link" circle class="text-sm border-btn rounded-full px-4 font-medium">
                  {{ item.trial ? t("Get") : t("Order_Now") }}
                </IpButton>
              </div>
            </li>

            <!-- 自定义套餐 -->
            <li class="custom" v-if="customPack" key="custom">
              <div class="vh_center h-8 text-white">{{ t("productList_spec.custom_pack") }}</div>
              <div class="card column_center space-y-5 lg:space-y-10">
                <div class="top w-full column_center space-y-4">
                  <div class="package_name vh_center rounded-full">{{ customPack.product_name }}</div>

                  <!-- 折扣 -->
                  <div class="font-medium" style="height: 1.5rem">
                    <CountdownDiscount :time="customPack.last_time" @clear="customPack = null" />
                  </div>

                  <p class="price lg:text-4xl space-x-1">
                    <strong class="text-3xl font-semibold">$ {{ customPack.unit_price / 100 }}</strong>
                    <span class="text-sm">/GB</span>
                  </p>

                  <p class="vh_center space-x-1 text-[13px] total">
                    <span class="grey-60">{{ t("Total") }}:</span>
                    <span>${{ customPack.order_price / 100 }}</span>
                  </p>

                  <div v-if="customPack.product_type === 0 || customPack.product_type === 4" class="number w-full">
                    <div class="duration text-center space-x-1 text-sm">
                      <span class="font-medium text-base">{{ t("Never_Expires") }}</span>
                    </div>
                  </div>
                  <div v-if="customPack.product_type === 2" class="number w-full">
                    <div class="duration text-center space-x-1 text-sm">
                      <span class="font-medium text-base">{{ t("Never_Expires") }}</span>
                    </div>
                  </div>
                  <div v-if="customPack.product_type === 3" class="w-full space-y-2" style="margin-top: 1.75rem">
                    <Regions v-model="customPack.region" />
                    <InputNumber v-model="customPack.number" @change="(num) => numberChange(index, num)" />
                  </div>
                </div>

                <!-- <p class="title v_center" v-if="item.unlimit">{{ t("PCProductList.unlimited_rights[0]") }}</p> -->

                <ul
                  v-if="customPack.product_type === 0 || customPack.product_type === 4"
                  class="rights column space-y-3 text-[13px] font-normal grey-80"
                >
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.right1") }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.right2") }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.right3") }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.right4", { num: showContact ? 2000 : 600 }) }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.right5") }}</p>
                  </li>
                </ul>
                <ul v-else-if="customPack.product_type === 1" class="rights column space-y-3 text-[13px] font-normal grey-80">
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.unlimited_right1") }}</p>
                  </li>
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.unlimited_right2") }}</p>
                  </li>
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.unlimited_right3") }}</p>
                  </li>
                  <li class="hidden md:flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.unlimited_right4") }}</p>
                  </li>
                  <li class="hidden lg:flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.unlimited_right5") }}</p>
                  </li>
                </ul>
                <ul v-else-if="customPack.product_type === 2" class="rights column space-y-3 text-[13px] font-normal grey-80">
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.phone_right1") }}</p>
                  </li>
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.phone_right2") }}</p>
                  </li>
                  <li class="flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.phone_right3") }}</p>
                  </li>
                  <li class="hidden md:flex space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.phone_right4") }}</p>
                  </li>
                </ul>
                <ul v-else-if="customPack.product_type === 3" class="rights column space-y-3 text-[13px] font-normal grey-80">
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.data_right1") }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.data_right2") }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.data_right3") }}</p>
                  </li>
                  <li class="v_center space-x-1">
                    <CircleCheck :size="16" class="flex-shrink-0 success" />
                    <p>{{ t("productList_spec.data_right4") }}</p>
                  </li>
                </ul>

                <IpButton @click="payCustomPack" type="link" circle class="text-sm border-btn rounded-full px-4 font-medium">
                  {{ t("productList_spec.pay_now") }}
                </IpButton>
              </div>
            </li>
            <!-- 联系我们 -->
            <li v-if="showContact && isLogin" class="common contcat" key="contcat">
              <div class="card column_center space-y-5 lg:space-y-10">
                <div class="top w-full column_center space-y-4">
                  <div class="package_name whitespace-nowrap vh_center rounded-full">
                    <div>{{ t("productList_spec.Need_more") }}?</div>
                  </div>

                  <!-- 免费 -->
                  <div class="text text-sm black font-medium w-full space-y-5" :class="en ? 'column' : 'column_center'">
                    <template v-if="type === 0 || type === 4 || type === 2">
                      <p>{{ t("productList_spec.Custom1") }}</p>
                      <!-- <span>{{ t("productList_spec.Custom2") }}</span>
                    <span>{{ t("productList_spec.Custom3") }}</span> -->
                    </template>
                    <template v-if="type === 1">
                      <span class="whitespace-pre-wrap font-medium text-sm">{{ t("productList_spec.Custom4") }}</span>
                      <!-- <span>{{ t("productList_spec.Custom5") }}</span> -->
                    </template>
                    <template v-if="type === 3 || type === 5">
                      <span class="whitespace-pre-wrap font-medium text-sm">{{ t("productList_spec.Custom4") }}</span>
                      <!-- <span>{{ t("productList_spec.Custom7") }}</span> -->
                    </template>
                  </div>
                </div>

                <IpButton @click="openService" type="link" circle class="text-sm border-btn rounded-full px-4 font-medium">
                  {{ t("productList_spec.Service") }}
                </IpButton>
              </div>
            </li>
          </template>
        </TransList>
      </div>
      <!-- 骨架屏 -->
      <div v-else class="w-full md:w-auto priceList column">
        <ul class="w-full flex gap-3">
          <li class="skeletion_box" v-for="item in 5" :key="item">
            <div class="card skeletion space-y-5">
              <div style="width: 40%"></div>
              <div style="width: 100%" v-for="col in 11" :key="col"></div>
              <div style="width: 60%"></div>
            </div>
          </li>
        </ul>
      </div>
      <IpButton v-show="isLeft" type="ghost" circle class="arrow-btn rounded-full font-medium left" @click="scrollPluginValue('left')">
        <ChevronLeft :size="20" :stroke-width="2" />
      </IpButton>
      <IpButton v-show="isRight" type="ghost" circle class="arrow-btn rounded-full font-medium right" @click="scrollPluginValue('right')">
        <ChevronRight :size="20" :stroke-width="2" />
      </IpButton>
      <!-- div -->
    </div>

    <div class="support column_center space-y-3">
      <p class="text-sm">{{ t("productList_spec.support") }}</p>
      <div class="vh_center flex-wrap gap-6">
        <img height="25" src="@/assets/images/pay/support/visa.svg" alt="" />
        <img height="25" src="@/assets/images/pay/support/mastercard.svg" alt="" />
        <img height="25" src="@/assets/images/pay/support/alipay.svg" alt="" />
        <img height="25" src="@/assets/images/pay/support/union.svg" alt="" />
        <img height="25" src="@/assets/images/pay/support/weixin.svg" alt="" />
        <img height="25" src="@/assets/images/pay/support/usdt.svg" alt="" />
      </div>
    </div>

    <!-- 支付弹窗 -->
    <teleport to="body">
      <PayPopup ref="payPopupRef" v-model="isPayPopup" :order_data="order_data">
        <template #detail>
          <div class="order_detail">
            <h2>{{ t("Order_detail") }}</h2>
            <ul class="detail" v-if="product.isAward">
              <li class="between">
                <span>{{ t("Name") }}</span>
                <span>{{ t("award_title") }}</span>
              </li>
              <li class="between" v-if="type === 0 || type === 4 || type === 2">
                <span>{{ t("Traffic") }}</span>
                <span>
                  {{ t("Residential_Proxies") }} {{ newer_promotion.residential_size }}
                  +
                  {{ t("Phone_Proxies") }} {{ newer_promotion.mobile_size }}
                </span>
              </li>
              <li class="between">
                <span>{{ t("Duration") }}</span>
                <span>{{ t("Never_Expires") }}</span>
              </li>
              <!-- <li class="text-sm grey-60 translate-y-5" style="font-size: 14px">
                {{ t("award_desc", { total: newer_promotion.total_size, mobile: newer_promotion.mobile_size, days: newer_promotion.days }) }}
              </li> -->
              <li class="between">
                <span>{{ t("Total") }}</span>
                <span>${{ product?.price / 100 }}</span>
              </li>
            </ul>
            <ul class="detail" v-else>
              <li class="between">
                <span>{{ t("Name") }}</span>
                <span v-if="type === 0">{{ t("Residential_Proxies") }}</span>
                <span v-else-if="type === 1">{{ t("Unlimited_Residential_Proxies") }}</span>
                <span v-else-if="type === 2">{{ t("Phone_Proxies") }}</span>
                <span v-else-if="type === 3">{{ t("Data_Center_Proxies") }}</span>
                <span v-else-if="type === 4">{{ t("Rotation_Proxies") }}</span>
                <span v-else-if="type === 5">{{ t("Static_Residential_Proxies") }}</span>
              </li>
              <li class="between" v-if="type === 0 || type === 4 || type === 2">
                <span>{{ t("Traffic") }}</span>
                <span>{{ product?.pack_size }}</span>
              </li>
              <li class="between" v-else-if="type === 1 || type === 3 || type === 5">
                <span>{{ t("Duration") }}</span>
                <span>{{ product?.days }} {{ t("Day") }}</span>
              </li>

              <li class="between">
                <span>{{ t("payPopup_spec.unit_price") }}</span>
                <div class="v_center space-x-1">
                  <span>${{ product?.unit_price / 100 }}</span>
                  <span v-if="type === 0 || type === 4" class="grey" style="text-decoration: line-through">${{ product?.origin_price / 100 }}</span>
                  <span v-if="type === 0 || type === 4 || type === 2"> / GB</span>
                  <span v-else-if="type === 1"> / {{ t("Day") }}</span>
                  <span v-else-if="type === 3 || type === 5"> / IP</span>
                </div>
              </li>
              <li class="between" v-if="type === 0 || type === 4">
                <span>{{ t("Discount") }}</span>
                <span>{{ product?.discount_rate }}%</span>
              </li>
              <li class="between" v-else-if="type === 0 || type === 2">
                <span>{{ t("Duration") }}</span>
                <span>{{ product?.days }} {{ t("Day") }}</span>
              </li>

              <li class="between" v-if="type === 3 || type === 5">
                <span>{{ t("Locations") }}</span>
                <span>{{ product?.region }}</span>
              </li>
              <li class="between" v-if="type === 3 || type === 5">
                <span>{{ t("Number") }}</span>
                <span>{{ product?.number }}</span>
              </li>

              <li class="between">
                <span>{{ t("Total") }}</span>
                <span>${{ product?.price / 100 }}</span>
              </li>
            </ul>
            <div class="btn vh_center">
              <ip-button v-if="product.isAward" type="primary" class="px-3 h-10" @click="orderNewUserAward">
                <div class="v_center space-x-2">
                  <span class="ip-loading" v-if="loading"></span>
                  <span>{{ t("Submit") }}</span>
                </div>
              </ip-button>
              <ip-button v-else type="primary" class="px-3 h-10" @click="FoundOrder">
                <div class="v_center space-x-2">
                  <span class="ip-loading" v-if="loading"></span>
                  <span>{{ t("Submit") }}</span>
                </div>
              </ip-button>
            </div>
          </div>
        </template>
      </PayPopup>
    </teleport>
  </div>
</template>

<script setup>
import PayPopup from "../pay_popup/pay_popup.vue"
import setpNumber from "./stepNumber/stepNumber.vue"
import { platProductsV2, platCustomerOrder, platDataConfig } from "@/api/home"
import { debounce, throttle, roundToDecimal } from "@/utils/tools"
import loginStore from "@/store/login"
import { CircleCheck } from "lucide-vue-next"
import IpButton from "@/components/button/button.vue"
import Tabbar from "./tabbar/tabbar.vue"
import { ref, computed, onMounted, onBeforeUnmount, nextTick, defineAsyncComponent, provide, toRef, toRefs, watch } from "vue"
import { useRouter } from "vue-router"
import Message from "@/components/message/message"
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import layoutStore from "@/store/layout"
import settingStore from "@/store/setting"
import position from "@/components/dialog/position"
import { track_createOrder } from "@/utils/detect"
import { platProductRegions, platProductStaticRegions, platCustomerCustomOrder } from "@/api/product"
import { formatSizeUnits } from "../../../../utils/tools"
import { platNewUserAwardOrder } from "../../../../api/product"
import TransList from "./transList.vue"

const CountdownDiscount = defineAsyncComponent(() => import("./CountdownDiscount.vue"))

const Regions = defineAsyncComponent(() => import("./regions/regions.vue"))
const InputNumber = defineAsyncComponent(() => import("./number/number.vue"))

const { en, lang } = settingStore()
const layout = layoutStore()

const props = defineProps({
  type: {
    type: Number,
    default: 0,
    // 0=住宅代理 1=不限量住宅 2=移动手机 3=数据中心
  },
  tabbar: {
    type: Boolean,
    default: true,
  },
})
const { type, tabbar } = toRefs(props)

// 是否显示注册奖励
const { newer_promotion } = layout

// 新用户优惠奖励
const newerActive = computed(() => newer_promotion.value.promotion && (type.value === 0 || type.value === 4))
const showAllPack = ref(false)
// 是否显示赠送gift
const { isLogin } = loginStore()
const { registerAward, gift, activity_days, discount_rate } = layout
const discount_rate_text = computed(() => (en.value ? 100 - discount_rate.value + "%" : discount_rate.value / 10))
const showGift = computed(() => !isLogin.value && registerAward.value)

const router = useRouter()

const { t } = useI18n()

// 最低价格
const { lowestPrice, getLowestPrice } = layout
const keys = ["residential", "unlimited", "phone", "data_center", "static"]
const lowest = computed(() => {
  return lowestPrice.value[keys[type.value === 4 ? 0 : type.value]]
})

// 产品相关
const loading = ref(false)
const product_list = ref([])

let group1 = []
let group2 = []
let group3 = []
async function GetProductList() {
  try {
    const { data } = await platProductsV2({
      prd_type: props.type === 4 ? 0 : props.type === 5 ? 4 : props.type,
    })
    const tempGroup1 = [] // 个人
    const tempGroup2 = [] // 企业
    const tempGroup3 = [] // 不限量

    let prices = null

    data.forEach((item) => {
      // 注册奖励不显示
      if (item.is_sell === 0) return

      // 第一个套餐作为折扣折算标准
      if (item.is_sell !== 0 && prices === null) {
        prices = item.prices.reduce((pre, next) => {
          pre[next.days] = next.unit_price
          return pre
        }, {})
      }

      if (item.is_sell === 0) {
        gift.value = item.pack_size
      } else {
        item.prices = item.prices.map((i) => {
          const key = String(i.days)
          const origin = prices[key]
          const price = i.unit_price
          // const origin_price = i.origin_price
          i.has_discount = i.pay_price === i.price
          i.actual_price = i.pay_price
          i.discount = roundToDecimal(((origin - price) / origin) * 100, 0)
          i.origin_price = origin

          const pack_size = roundToDecimal(item.pack_size / 1024 / 1024, 0)
          i.unit_origin_price = roundToDecimal(i.actual_price / pack_size, 0)
          // if (item.promo_type === 1) {
          //   // 活动 48% off 按原价计算
          //   i.discount = roundToDecimal(((origin - origin_price) / origin) * 100, 0)
          //   i.discount_active = roundToDecimal(((origin_price - price) / origin_price) * 100, 0)
          //   i.origin_price = origin_price
          // }
          return i
        })
      }

      const obj = {
        select: 0,
        id: item.id,
        trial: item.is_sell === 0,
        unlimit: item.group === 3,
        hot: item.promo_type === 1,
        discount: item.promo_type === 2,
        // discount_rate: dis ?? 0,
        name: item.name,
        code: item.code,
        pack_title: item.pack_title,
        ips: item.ips,
        sub_accounts: item.sub_accounts,
        sel_country: item.sel_country,
        prices: item.prices,
      }
      if (props.type === 3 || props.type === 5) {
        obj.region = ref(type.value === 3 ? "lax" : "US")
        obj.number = ref(1)
        obj.total = ref(item.prices[0].price / 100)
      }

      if (item.group === 1) {
        tempGroup1.push(obj)
      } else if (item.group === 2) {
        tempGroup2.push(obj)
      } else if (item.group === 3) {
        tempGroup3.push(obj)
      }
    })

    const index = tempGroup1.findIndex((item) => item.trial)
    if (index > 0) {
      const item = tempGroup1.splice(index, 1)
      if (!isLogin.value) {
        tempGroup1.unshift(item[0])
      }
    }

    group1 = tempGroup1
    group2 = tempGroup2
    group3 = tempGroup3

    product_list.value = group1

    nextTick(() => {
      initScrollTag()
    })
  } catch (err) {
    console.log(err.message)
  }
}
function numberChange(index, num) {
  const item = product_list.value[index]
  const price = item.prices[0].price
  const { total } = toRefs(item)

  total.value = roundToDecimal((num * price) / 100)
}

// 自定义套餐
const customPack = ref()
async function GetCustomPack() {
  try {
    const { data } = await platCustomerCustomOrder({
      prd_type: type.value,
    })
    if (data.order_price <= 0 || data.order_usdt_price <= 0) return
    if (data.last_time && new Date(data.last_time).getTime() < Date.now()) return

    data.packsize = data.packsize ? roundToDecimal(data.packsize / 1024 / 1024) : Number(data.product_name.split(" ")[0])
    customPack.value = {
      ...data,
      unit_price: roundToDecimal(data.order_price / data.packsize, 2),
    }
  } catch (err) {
    console.log(err.message)
  }
}
async function payCustomPack() {
  try {
    const lastTime = customPack.value.last_time
    if (lastTime && new Date(lastTime).getTime() < Date.now()) {
      Message({
        message: en.value ? "Payment for the custom package is no longer available." : "定制套餐支付时间已过期",
        type: "warning",
      })
      return
    }
    product.value = {
      ...customPack.value,
      days: t("Never_Expires"),
      pack_size: customPack.value.product_name,
    }
    order_data.value = {
      order_no: customPack.value.order_no,
      order_price: customPack.value.order_price,
      order_usdt_price: customPack.value.order_usdt_price,
      type: type.value,
      desc_3: getTitleDesc(customPack.value.product_type),
      desc_4: "",
    }
    isPayPopup.value = true
    payPopupRef.value.toggleDetail(false)
  } catch (err) {
    console.log(err.message)
  }
}

// 地区
const regionsList = ref([])
provide("regionsList", regionsList)
async function getRegions() {
  const isStatic = type.value === 5
  const { data } = isStatic ? await platProductStaticRegions() : await platProductRegions()
  regionsList.value = data.map((item) => ({
    value: item.code,
    country: item.country,
    zh: isStatic ? item.country_cn : item.city_cn,
    en: isStatic ? item.country : item.city,
  }))
}

// 获取全局配置
// async function getDataConfig() {
//   try {
//     const { data } = await platDataConfig()
//     registerAward.value = data.register_award
//   } catch (err) {
//     console.log(err)
//   }
// }

// 切换tab
const showContact = ref(props.type !== 0 && props.type !== 4)
function changeActive(index) {
  showContact.value = index === 1

  const group = "group" + (index + 1)
  product_list.value = eval(group)
  nextTick(() => {
    initScrollTag()
  })
}
function openService() {
  window.$crisp.push(["do", "chat:show"])
  window.$crisp.push(["do", "chat:open"])
}

// 滑动相关
const productRef = ref(null)
const isLeft = ref(false)
const isRight = ref(false)
const packWidth = 210
const scrollPlugin = throttle(
  function (e) {
    if (/macintosh|mac os x/i.test(navigator.userAgent)) return

    const dom = productRef.value
    const width = dom.clientWidth
    const scrollWidth = dom.scrollWidth
    const scrollLeft = dom.scrollLeft

    if (e.deltaY > 0) {
      if (width + scrollLeft < scrollWidth - packWidth) {
        dom.scrollLeft += packWidth
      } else {
        dom.scrollLeft = scrollWidth - width
        requestAnimationFrame(() => {
          isRight.value = false
        })
      }
      if (width + scrollLeft < scrollWidth) {
        isLeft.value = true
        e.preventDefault()
      }
    } else {
      if (scrollLeft > packWidth) {
        dom.scrollLeft -= packWidth
      } else {
        dom.scrollLeft = 0
        requestAnimationFrame(() => {
          isLeft.value = false
        })
      }
      if (scrollLeft > 0) {
        isRight.value = true
        e.preventDefault()
      }
    }
  },
  150,
  true,
)

function scrollPluginValue(op) {
  const dom = productRef.value
  const width = dom.clientWidth
  const scrollWidth = dom.scrollWidth
  const scrollLeft = dom.scrollLeft

  if (op === "right" && isRight.value) {
    if (width + scrollLeft < scrollWidth - packWidth) {
      dom.scrollLeft += packWidth
    } else {
      dom.scrollLeft = scrollWidth - width
      isRight.value = false
    }
    if (!isLeft.value) isLeft.value = true
  } else if (op === "left" && isLeft.value) {
    if (scrollLeft > packWidth) {
      dom.scrollLeft -= packWidth
    } else {
      dom.scrollLeft = 0
      isLeft.value = false
    }
    if (!isRight.value) isRight.value = true
  }
}

const initScrollTag = debounce(function () {
  const dom = productRef.value
  if (!dom) return
  const width = dom.clientWidth
  const scrollWidth = dom.scrollWidth
  const scrollLeft = dom.scrollLeft

  if (scrollLeft > 0) {
    isLeft.value = true
  }
  if (width + scrollLeft < scrollWidth) {
    isRight.value = true
  } else if (width === scrollWidth) {
    isRight.value = false
    isLeft.value = false
  }
}, 100)

// 支付相关
const isPayPopup = ref(false)
const order_data = ref(null)
const payPopupRef = ref(null)
const product = ref(null)
function click_pay(e) {
  position.set({ x: e.clientX, y: e.clientY })

  const index = +e.target.dataset.index
  const item = product_list.value[index]

  if (!isLogin.value) {
    router.push("/login")
    Message({
      type: "info",
      message: en.value ? "Please login first" : "请先登录",
    })
    return
  }

  const productData = {
    code: item.code,
    days: item.prices[item.select].days > 3650 ? t("Never_Expires") : item.prices[item.select].days,
    discount_rate: item.prices[item.select].discount,
    unit_price: item.unlimit ? 0 : item.prices[item.select].unit_price,
    pack_size: item.unlimit ? t("Unlimited") : item.pack_title,
    price: item.prices[item.select].pay_price,
    origin_price: item.prices[item.select].origin_price,
    attr_id: item.prices[item.select].attr_id,
  }

  if (props.type === 3 || props.type === 5) {
    productData.region_code = item.region
    const region = regionsList.value.find((i) => i.value === item.region)
    productData.region = region[lang.value] ?? ""
    productData.number = item.number
    productData.price = item.total * 100
  }

  // productData.origin_price = productData.price * (productData.discount_rate / 100) + productData.price
  // productData.origin_price = Math.round(productData.origin_price)

  product.value = productData

  isPayPopup.value = true
}
async function FoundOrder() {
  const item = product.value
  try {
    loading.value = true
    const params = {
      pcode: item.code,
      days: item.days,
      attr_id: item.attr_id,
    }
    if (props.type === 3 || props.type === 5) {
      params.num = item.number
      params.region_code = item.region_code
    }
    const { data } = await platCustomerOrder(params)

    track_createOrder()

    order_data.value = {
      order_no: data.order_no,
      order_price: data.order_price,
      order_usdt_price: data.order_usdt_price,
      type: type.value,
      desc_3: getTitleDesc(props.type),
      desc_4: "",
    }
  } catch (err) {
    console.log(err.message)
  } finally {
    loading.value = false
    payPopupRef.value.toggleDetail(false)
  }
}
function getTitleDesc(type) {
  let desc = ""
  switch (type) {
    case 0:
      desc = t("Residential_Proxies") + " " + product.value.pack_size
      break
    case 1:
      desc = t("Unlimited_Residential_Proxies") + " " + product.value.days + t("days")
      break
    case 2:
      desc = t("Phone_Proxies") + " " + product.value.pack_size
      break
    case 3:
      desc = t("Data_Center_Proxies") + "--" + product.value.region + "[" + product.value.number + "]"
      break
    case 4:
      desc = t("Rotation_Proxies") + " " + product.value.pack_size
    case 5:
      desc = t("Static_Residential_Proxies") + "--" + product.value.region + "[" + product.value.number + "]"
      break
  }
  return desc
}

watch(
  type,
  (newVal, oldVal) => {
    if (typeof oldVal === "number") {
      product_list.value = []
      customPack.value = null
    }
    nextTick(() => {
      GetProductList()
      getRegions()
      if (isLogin.value) {
        GetCustomPack()
      }
    })
  },
  {
    immediate: true,
  },
)

// 新手奖励下单
function buyNewUserAward() {
  if (!isLogin.value) {
    router.push("/login")
    Message({
      type: "info",
      message: t("login_first"),
    })
    return
  }
  product.value = {
    isAward: true,
    code: newer_promotion.value.code,
    days: newer_promotion.value.days,
    pack_size: t("Residential_Proxies") + newer_promotion.value.residential_size + "+" + t("Phone_Proxies") + newer_promotion.value.mobile_size,
    price: newer_promotion.value.price,
  }
  isPayPopup.value = true
}
async function orderNewUserAward() {
  try {
    loading.value = true
    const { data } = await platNewUserAwardOrder({
      pcode: product.value.code,
    })
    order_data.value = {
      order_no: data.order_no,
      order_price: data.order_price,
      order_usdt_price: data.order_usdt_price,
      type: type.value,
      desc_3: product.value.pack_size,
      desc_4: "",
    }
    payPopupRef.value.toggleDetail(false)
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getRegions()
  // getDataConfig()
  // GetProductList()
  window.addEventListener("resize", initScrollTag)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", initScrollTag)
})

defineExpose({
  changeActive,
})
</script>

<style lang="less" scoped>
@import "./product_list.less";
</style>

<style lang="less">
.order_detail {
  // padding: 0 80px;
  & > h2 {
    font-size: 18px;
    font-weight: bold;
  }
  & > .detail {
    margin-top: 20px;
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    border-radius: 8px;

    & > li {
      width: 100%;
      font-size: 15px;
      span.orange {
        color: #fc7f46;
      }
      span.grey {
        color: hsl(var(--foreground) / 30%);
      }
    }
    & > li + li {
      margin-top: 20px;
    }
    & > li:last-child {
      margin-top: 30px;
      padding: 30px 0 10px;
      border-top: 1px solid #eee;
      & > span:last-child {
        color: #fd550a;
        font-size: 17px;
        i {
          font-size: 15px;
          font-weight: 400;
          text-decoration: line-through;
          color: #666;
        }
      }
    }
  }
  & > .btn {
    padding-top: 20px;
    .el-button {
      height: 40px;
      padding: 0 40px;
      background-color: #f4b121;
      color: #fff;
      border: none;
    }
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
