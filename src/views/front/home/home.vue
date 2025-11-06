<template>
  <div class="home w-full">
    <!-- 介绍 -->
    <div class="introduce box relative" ref="introRef">
      <div class="container column space-y-10">
        <div class="space-y-4 md:space-y-7" style="max-width: 700px">
          <div class="title space-y-1 md:space-y-4">
            <p class="title text-lg lg:text-4xl whitespace-pre-wrap font-medium">{{ t("home_spec.intro_title1") }}</p>
            <p class="title text-lg lg:text-xl md:whitespace-pre-wrap font-normal">{{ t("home_spec.intro_title2") }}</p>
          </div>

          <p class="description md:whitespace-pre-wrap font-normal">{{ t("home_spec.intro_desc") }}</p>
        </div>

        <div class="my-16 btn_box">
          <div class="w-full column sm:v_center gap-4" v-if="!isLogin" style="align-items: stretch">
            <IpButton type="normal" class="white_btn flex-1" @click="toLogin">
              <div class="vh_center space-x-2 h-10">
                <span>{{ t("Free_Trial") }}</span>
                <MoveUpRight :size="14" />
              </div>
            </IpButton>
            <GoogleLoginButton v-if="!isLogin" class="flex-1 h-10 md:h-auto" />
          </div>
          <div class="w-full column md:v_center gap-4" v-else style="align-items: stretch">
            <IpButton type="normal" class="white_btn font-medium h-10 px-4 md:px-8" @click="giftPacks">{{ t("home_spec.more_try") }}</IpButton>
            <IpButton type="major" class="h-10 px-4 md:px-8 tutorial transition-color" @click="$router.push('/overview')">
              <div class="vh_center space-x-2 w-full h-full">
                <span>{{ t("home_spec.dashboard") }}</span>
                <MoveRight :size="14" />
              </div>
            </IpButton>
          </div>
        </div>

        <!-- <div class="v_center data self-center rounded-md" v-lazy="getUserIps">
          <div class="column_center">
            <strong class="title text-center text-base md:text-xl whitespace-nowrap" style="width: 10rem; height: 2rem">
              <template v-if="partner !== -1">{{ partner }} +</template>
            </strong>
            <span class="description text-xs md:text-sm font-light text-center">{{ t("home_spec.partner") }}</span>
            
          </div>
          <div class="line" style="color: #eef5ff"></div>
          <div class="column_center">
            <strong class="title text-center text-base font-semibold md:text-xl whitespace-nowrap" style="width: 10rem; height: 2rem">
              <template v-if="onlineIps !== -1">{{ onlineIps }}</template>
            </strong>
            <span class="description text-xs md:text-sm font-light text-center">{{ t("home_spec.online") }}</span>
          </div>
        </div> -->

        <div class="advant w-full md:column_center overflow-hidden">
          <ul class="flex !items-stretch font-normal">
            <li class="v_center space-x-1 rounded-full">
              <div class="icon shrink-0 vh_center rounded-full">
                <StarIcon :size="16" fill="currentColor" class="major" />
              </div>
              <p class="whitespace-nowrap sm:whitespace-normal">{{ t("home_spec.adv1") }}</p>
            </li>
            <li class="v_center space-x-1 rounded-full">
              <div class="icon shrink-0 vh_center rounded-full">
                <StarIcon :size="16" fill="currentColor" class="major" />
              </div>
              <p class="whitespace-pre-wrap">{{ t("home_spec.adv2") }}</p>
            </li>
            <li class="v_center space-x-1 rounded-full">
              <div class="icon shrink-0 vh_center rounded-full">
                <StarIcon :size="16" fill="currentColor" class="major" />
              </div>
              <p>{{ t("home_spec.adv3") }}</p>
            </li>
            <li class="v_center space-x-1 rounded-full">
              <div class="icon shrink-0 vh_center rounded-full">
                <StarIcon :size="16" fill="currentColor" class="major" />
              </div>
              <p class="whitespace-pre-wrap">{{ t("home_spec.adv4") }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="background">
        <!-- <StarPlay /> -->
      </div>
    </div>

    <div class="box_wrap proxy" v-lazy="getLowestPrice">
      <div class="container">
        <div class="space-y-5">
          <p v-lazy="showSlow" class="text-xl lg:text-3xl font-semibold text-center md:whitespace-pre-wrap">
            {{ t("home_spec.proxy_title") }}
          </p>
          <p v-lazy="showSlow" class="text-center text-sm md:whitespace-pre-wrap">{{ t("home_spec.proxy_desc") }}</p>
        </div>

        <div class="content grid grid-cols-3 gap-6">
          <div class="product_item residential">
            <div class="info">
              <img loading="lazy" src="@/assets/images/home/icon1.webp" width="48" height="48" />
              <div class="text-xl font-medium mt-4 leading-none">{{ t("Residential_Proxies") }}</div>
              <p class="mt-4">{{ t("home_spec.residential_des") }}。</p>
              <ul class="space-y-3 text-sm grey-80 mt-5">
                <li class="v_center space-x-2">
                  <div class="bg-current success vh_center w-4 h-4 rounded-full">
                    <Check :size="10" :stroke-width="3" class="white" />
                  </div>
                  <span>{{ t("home_spec.residential_adv1") }}</span>
                </li>
                <li class="v_center space-x-2">
                  <div class="bg-current success vh_center w-4 h-4 rounded-full">
                    <Check :size="10" :stroke-width="3" class="white" />
                  </div>
                  <span>{{ t("home_spec.residential_adv2") }}</span>
                </li>
                <li class="v_center space-x-2">
                  <div class="bg-current success vh_center w-4 h-4 rounded-full">
                    <Check :size="10" :stroke-width="3" class="white" />
                  </div>
                  <span>{{ t("home_spec.residential_adv3") }}</span>
                </li>
              </ul>
              <div class="between mt-7">
                <div class="left">
                  <div class="text-xs">{{ t("Starting_from") }}</div>
                  <div class="text-sm">
                    <span class="primary">$</span>
                    <b class="text-xl primary">{{ lowestPrice.residential }}</b>
                    <span>/GB</span>
                  </div>
                </div>

                <a href="/pricing/residential">
                  <IpButton type="primary_border" class="h-10 px-5">{{ t("Get_Now") }}</IpButton>
                </a>
              </div>
            </div>
            <img loading="lazy" class="bg" src="@/assets/images/home/residential.webp" width="464" height="388" />
          </div>
          <div class="product_item space-y-4">
            <img loading="lazy" src="@/assets/images/home/icon2.webp" width="48" height="48" />
            <div class="text-lg font-medium mt-4 leading-none">{{ t("Phone_Proxies") }}</div>
            <p class="mt-4">{{ t("home_spec.phone_des") }}。</p>
            <ul class="space-y-3 text-sm grey-80 mt-5">
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("home_spec.phone_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("home_spec.phone_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("home_spec.phone_adv3") }}</span>
              </li>
            </ul>
            <div class="between mt-7">
              <div class="left">
                <div class="text-xs">{{ t("Starting_from") }}</div>
                <div class="text-sm">
                  <span class="primary">$</span>
                  <b class="text-xl primary">{{ lowestPrice.phone }}</b>
                  <span>/GB</span>
                </div>
              </div>

              <a href="/pricing/mobile">
                <IpButton type="primary_border" class="h-10 px-5">{{ t("Get_Now") }}</IpButton>
              </a>
            </div>
            <!---->
          </div>
          <div class="product_item">
            <img loading="lazy" src="@/assets/images/home/icon3.webp" width="48" height="48" />
            <div class="text-lg font-medium mt-4 leading-none">{{ t("Unlimited_Residential_Proxies") }}</div>
            <p class="mt-4">{{ t("home_spec.unlimited_des") }}。</p>
            <ul class="space-y-3 text-sm grey-80 mt-5">
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("home_spec.unlimited_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("home_spec.unlimited_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("home_spec.unlimited_adv3") }}</span>
              </li>
            </ul>
            <div class="between mt-7">
              <div class="left">
                <div class="text-xs">{{ t("Starting_from") }}</div>
                <div class="text-sm">
                  <span class="primary">$</span>
                  <b class="text-xl primary">{{ lowestPrice.unlimited }}</b>
                  <span>/{{ t("Day") }}</span>
                </div>
              </div>

              <a href="/pricing/unlimited">
                <IpButton type="primary_border" class="h-10 px-5">{{ t("Get_Now") }}</IpButton>
              </a>
            </div>
            <!---->
          </div>
          <div class="product_item">
            <img loading="lazy" src="@/assets/images/home/icon4.webp" width="48" height="48" />
            <div class="text-lg font-medium mt-4 leading-none">{{ t("Data_Center_Proxies") }}</div>
            <p class="mt-4">{{ t("home_spec.data_center_des") }}。</p>
            <ul class="space-y-3 text-sm grey-80 mt-5">
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("home_spec.data_center_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("home_spec.data_center_adv2", { price: lowestPrice.data_center }) }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("home_spec.data_center_adv3") }}</span>
              </li>
            </ul>
            <div class="between mt-7">
              <div class="left">
                <div class="text-xs">{{ t("Starting_from") }}</div>
                <div class="text-sm">
                  <span class="primary">$</span>
                  <b class="text-xl primary">{{ lowestPrice.data_center }}</b>
                  <span>/IP</span>
                </div>
              </div>

              <a href="/pricing/data_center">
                <IpButton type="primary_border" class="h-10 px-5">{{ t("Get_Now") }}</IpButton>
              </a>
            </div>
            <!---->
          </div>
          <div class="product_item">
            <img loading="lazy" src="@/assets/images/home/icon5.webp" width="48" height="48" />
            <div class="text-lg font-medium mt-4 leading-none">{{ t("Rotation_Proxies") }}</div>
            <p class="mt-4">{{ t("home_spec.rotation_des") }}。</p>
            <ul class="space-y-3 text-sm grey-80 mt-5">
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("home_spec.rotation_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("home_spec.rotation_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("home_spec.rotation_adv3") }}</span>
              </li>
            </ul>
            <div class="between mt-7">
              <div class="left">
                <div class="text-xs">{{ t("Starting_from") }}</div>
                <div class="text-sm">
                  <span class="primary">$</span>
                  <b class="text-xl primary">{{ lowestPrice.residential }}</b>
                  <span>/GB</span>
                </div>
              </div>

              <a href="/pricing/rotation">
                <IpButton type="primary_border" class="h-10 px-5">{{ t("Get_Now") }}</IpButton>
              </a>
            </div>
            <!---->
          </div>
        </div>
      </div>
    </div>

    <!-- 为什么选择 -->
    <div class="box why_choose">
      <div class="container column_center" v-lazy="showSlow">
        <p class="title text-xl lg:text-3xl font-semibold">
          {{ t("home_spec.why") }}
          <span class="primary_text">IpStar</span>
        </p>

        <ul class="three mt-4 md:mt-6 column gap-8 md:v_center" v-lazy="showSlow">
          <li class="flex-1 space-y-3 pointer transition-colors" @click="toHomeSecond('introduce')">
            <div class="img_box vh_center">
              <img v-lazy sizes="(max-width:105px) 105px,89px" src="@/assets/images/home/why1.png" srcset="@/assets/images/home/why1.png 105w" />
            </div>

            <div class="column_center space-y-3 px-3 content">
              <h3 class="font-semibold text-center">{{ t("home_spec.why1_title") }}</h3>
              <p class="text-sm text-center">{{ t("home_spec.why1_desc") }}</p>
            </div>
          </li>
          <li class="flex-1 space-y-3 pointer transition-colors" @click="toHomeSecond('efficient')">
            <div class="img_box vh_center">
              <img v-lazy sizes="(max-width:90px) 96px,102px" src="@/assets/images/home/why2.png" srcset="@/assets/images/home/why2.png 96w" />
            </div>
            <div class="column_center space-y-3 px-3 content">
              <h3 class="font-semibold text-center">{{ t("home_spec.why2_title") }}</h3>
              <p class="text-sm text-center">{{ t("home_spec.why2_desc") }}</p>
            </div>
          </li>
          <li class="flex-1 space-y-3 pointer transition-colors" @click="router.push('/pricing')">
            <div class="img_box vh_center">
              <img v-lazy sizes="(max-width:90px) 105px,104px" src="@/assets/images/home/why3.png" srcset="@/assets/images/home/why3.png 105w" />
            </div>
            <div class="column_center space-y-3 px-3 content">
              <h3 class="font-semibold text-center">{{ t("home_spec.why3_title") }}</h3>
              <p class="text-sm text-center">{{ t("home_spec.why3_desc") }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 自动且即时交付 -->
    <div class="box auto">
      <div class="container column_center">
        <div class="auto_header column md:between mt-16 gap-2" v-lazy="showSlow">
          <div class="column">
            <div class="v_center space-x-2">
              <ToggleLeft :size="16" fill="#10b981" color="#10b981" />
              <p class="description text-sm whitespace-nowrap md:whitespace-pre-wrap">{{ t("home_spec.more") }}</p>
            </div>
            <p class="title text-xl lg:text-3xl font-semibold whitespace-normal md:whitespace-pre-wrap">{{ t("home_spec.automatic") }}</p>
          </div>

          <p class="description whitespace-normal md:whitespace-pre-wrap">{{ t("home_spec.instant") }}</p>
        </div>

        <div class="auto_content mt-4 md:mt-6 w-full" v-lazy="showSlow">
          <ul class="four flex" v-lazy="loadHoverImg">
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('data_collection')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four1.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active1.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-semibold">{{ t("home_spec.four1_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four1_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('search_engine')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four2.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active2.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-semibold">{{ t("home_spec.four2_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four2_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('social_media')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four3.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active3.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-semibold">{{ t("home_spec.four3_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four3_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('ecommerce')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four4.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active4.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-semibold">{{ t("home_spec.four4_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four4_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('market')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four5.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active5.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-semibold">{{ t("home_spec.four5_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four5_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('bill')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four6.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active6.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-semibold">{{ t("home_spec.four6_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four6_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('brand')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four7.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active7.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-semibold">{{ t("home_spec.four7_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four7_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('ai_model')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four8.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active8.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-semibold">{{ t("home_spec.four8_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four8_desc") }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="box_wrap location">
      <div class="container white">
        <div class="space-y-3">
          <div class="text-4xl font-medium text-center">{{ t("home_spec.location_title") }}</div>
          <div class="text-lg opacity-90 text-center">{{ t("home_spec.location_desc") }}</div>
        </div>
        <div class="map">
          <img loading="lazy" class="img" src="https://www.proxylite.com/_nuxt/map.BNfwdBbI.webp" width="1000" height="562" />
          <div class="all between relative">
            <div class="text-center space-y-5">
              <div>{{ t("home_spec.location_dot1") }}</div>
              <div class="text-3xl font-semibold"><span>72</span>M+</div>
            </div>
            <div class="text-center space-y-5">
              <div>{{ t("home_spec.location_dot2") }}</div>
              <div class="text-3xl font-semibold"><span>190</span>+</div>
            </div>
            <div class="text-center space-y-5">
              <div>{{ t("home_spec.location_dot3") }}</div>
              <div class="text-3xl font-semibold"><span>7,200</span></div>
            </div>
            <div class="text-center space-y-5">
              <div>{{ t("home_spec.location_dot4") }}</div>
              <div class="text-3xl font-semibold"><span>99</span>%</div>
            </div>
          </div>
          <div class="gps_1 gps">
            <img loading="lazy" src="@/assets/images/home/position.png" width="24" height="31" />
            <div class="dot"></div>
          </div>
          <div class="gps_2 gps">
            <img loading="lazy" src="@/assets/images/home/position.png" width="24" height="31" />
            <div class="dot"></div>
          </div>
          <div class="gps_3 gps">
            <img loading="lazy" src="@/assets/images/home/position.png" width="24" height="31" />
            <div class="dot"></div>
          </div>
          <div class="gps_4 gps">
            <img loading="lazy" src="@/assets/images/home/position.png" width="24" height="31" />
            <div class="dot"></div>
          </div>
          <div class="gps_5 gps">
            <img loading="lazy" src="@/assets/images/home/position.png" width="24" height="31" />
            <div class="dot"></div>
          </div>
          <div class="gps_6 gps">
            <img loading="lazy" src="@/assets/images/home/position.png" width="24" height="31" />
            <div class="dot"></div>
          </div>
          <div class="gps_7 gps">
            <img loading="lazy" src="@/assets/images/home/position.png" width="24" height="31" />
            <div class="dot"></div>
          </div>
          <div class="gps_8 gps">
            <img loading="lazy" src="@/assets/images/home/position.png" width="24" height="31" />
            <div class="dot"></div>
          </div>
          <div class="country country_us" :class="{ country_animtate: country_active === 0 }">
            <div class="country_title">
              <img loading="lazy" width="34" height="24" src="@/assets/images/product/country/USA.svg" /><span>United States</span>
            </div>
            <div class="country_value"><span>1,047,582</span> IPs</div>
          </div>
          <div class="country country_jp" :class="{ country_animtate: country_active === 1 }">
            <div class="country_title">
              <img loading="lazy" width="34" height="24" src="@/assets/images/product/country/Japan.svg" /><span>Japan</span>
            </div>
            <div class="country_value"><span>1,047,582</span> IPs</div>
          </div>
          <div class="country country_br" :class="{ country_animtate: country_active === 2 }">
            <div class="country_title">
              <img loading="lazy" width="34" height="24" src="@/assets/images/product/country/Brazil.svg" /><span>Brazil</span>
            </div>
            <div class="country_value"><span>1,047,582</span> IPs</div>
          </div>
          <div class="country country_gb" :class="{ country_animtate: country_active === 3 }">
            <div class="country_title">
              <img loading="lazy" width="34" height="24" src="@/assets/images/product/country/France.svg" /><span>France</span>
            </div>
            <div class="country_value"><span>1,047,582</span> IPs</div>
          </div>
          <div class="country country_au" :class="{ country_animtate: country_active === 4 }">
            <div class="country_title">
              <img loading="lazy" width="34" height="24" src="@/assets/images/product/country/Australia.svg" /><span>Australia</span>
            </div>
            <div class="country_value"><span>1,047,582</span> IPs</div>
          </div>
        </div>
      </div>
    </div>

    <!-- app -->
    <div class="app box">
      <div class="container column_center">
        <div class="space-y-5">
          <p v-lazy="showSlow" class="text-xl lg:text-3xl font-semibold text-center md:whitespace-pre-wrap">
            {{ t("home_spec.app_title") }}
          </p>
          <p v-lazy="showSlow" class="text-center md:whitespace-pre-wrap">{{ t("home_spec.app_desc") }}</p>
        </div>

        <IpImage :width="2376" :height="320" style="margin-top: 3rem" v-lazy="showSlow">
          <img v-lazy src="@/assets/images/home/app1.webp" alt="" />
        </IpImage>

        <!-- <div class="w-full pack_title mt-8 md:mt-16 column_center space-y-2 md:space-y-5" v-lazy="showSlow">
          <p class="title text-xl lg:text-3xl font-semibold text-center md:whitespace-pre-wrap">{{ t("home_spec.package_title") }}</p>

          <p class="description success text-center">{{ t("home_spec.package_desc") }}</p>
        </div> -->
      </div>
    </div>

    <!-- package -->
    <!-- <div class="package box" id="home_package">
      <div class="container" v-lazy="showSlow">
        <div>
          <ProductList :tabbar="false" :pack="pack" v-if="isProduct"></ProductList>
        </div>
      </div>
    </div> -->

    <!-- explore -->
    <div class="explore box">
      <div class="container" v-lazy="showSlow">
        <div class="column_center space-y-5 relative">
          <div class="column_center text-xl lg:text-3xl font-semibold text-center md:whitespace-pre-wrap">
            <p class="v_center space-x-2">
              <span>{{ t("Now") }}</span>
              <img v-lazy src="@/assets/images/home/magic.png" alt="" />
            </p>
            <p>{{ t("home_spec.explore") }}</p>
          </div>
          <p class="text-sm text-center description" v-html="t('home_spec.explore_desc')"></p>

          <IpButton type="major" circle class="px-10 h-10 text-sm" @click="goToPay">{{ t("Get_Now") }}</IpButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, nextTick, computed, inject, onMounted } from "vue"
import { platDataIndex } from "@/api/home"
import settingStore from "@/store/setting"
import loginStore from "@/store/login"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import { MoveRight, WandSparkles as StarIcon, ToggleLeft, Dot, Code, Laptop, Check, MoveUpRight, ChevronLeft } from "lucide-vue-next"
// import StarPlay from "@/views/front/components/starPlay/gptstar.vue"
import vLazy from "@/directive/lazy"
import IpImage from "@/components/image/image.vue"
import anime from "animejs/lib/anime.es.js"
import { roundToDecimal } from "@/utils/tools"
import { track_gift } from "@/utils/detect"
import Confirm from "@/components/confirm/confirm"
import Message from "@/components/message/message"
import position from "../../../components/dialog/position"
import GoogleLoginButton from "../components/googleLoginBtn/index.vue"
// import HomeTitle from "../components/homeTitle.vue"
import layoutStore from "@/store/layout"
import { platProductLowestPrices } from "@/api/product"

// 首页canvas高度
const homeHeight = inject("homeHeight")
const introRef = ref()
function setHomeHeight() {
  if (!introRef.value) return
  const bottom = introRef.value.getBoundingClientRect().bottom
  const top = document.body.getBoundingClientRect().top
  homeHeight.value = bottom - top + 60
}

const router = useRouter()
const { t } = useI18n()
const { en } = settingStore()
const { isLogin, token } = loginStore()

// 异步组件
// const isProduct = ref(false) // 是否加载product
// const ProductList = defineAsyncComponent(() => import("../components/product_list/product_list.vue"))

// 转换data为ref
const astrict = ref({
  num1: false,
  num2: false,
  num3: false,
  num4: false,
  num5: false,
  num6: false,
})
const step = ref(0)
const mapData = ref([])
const ipsCount = ref(null)
const ipsCountVal = ref(null)
const countryCount = ref(null)
const direction = ref("右")
const merchantTime = ref(null)

// 最低价格
const { lowestPrice, getLowestPrice } = layoutStore()

// 转换methods

function isInViewPortOfOne(dom) {
  let viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  viewPortHeight = viewPortHeight - 280
  const offsetTop = dom.offsetTop
  const scrollTop = document.documentElement.scrollTop
  const top = offsetTop - scrollTop
  return top <= viewPortHeight
}

let homeData // 首页数据
async function IpMap() {
  const result = homeData ?? (await platDataIndex())
  const { data } = result
  homeData = result

  const ip = 50 // data.ips_count
  const country = data.country_count
  ipsCount.value = 0
  countryCount.value = 0

  // 逐渐递增动画
  nextTick(() => {
    const ipobj = { charged: 0 }
    anime({
      targets: ipobj,
      charged: ip,
      round: 1,
      easing: "linear",
      update: function () {
        ipsCount.value = ipobj.charged
      },
    })
    const countryObj = { charged: 0 }
    anime({
      targets: countryObj,
      charged: country,
      round: 1,
      easing: "linear",
      update: function () {
        countryCount.value = countryObj.charged
      },
    })
  })

  const countryImg = await import.meta.glob("@/assets/images/home/country/*", { eager: true })

  mapData.value = data.countries.map((item) => {
    const country = item.code === "US" ? "USA" : item.country
    const key = `/src/assets/images/home/country/${country}.png`
    return {
      name: country,
      value: (item.ip_count / 10000).toFixed(2),
      icon: countryImg[key].default,
    }
  })
}
function loadHoverImg() {
  import("@/assets/images/home/four_active1.webp")
  import("@/assets/images/home/four_active2.webp")
  import("@/assets/images/home/four_active3.webp")
  import("@/assets/images/home/four_active4.webp")
  import("@/assets/images/home/four_active5.webp")
  import("@/assets/images/home/four_active6.webp")
  import("@/assets/images/home/four_active7.webp")
  import("@/assets/images/home/four_active8.webp")
}

// location 动效
const country_active = ref(0)
let country_timer = null
function changeCountry() {
  country_active.value = (country_active.value + 1) % 5

  if (country_timer) {
    clearTimeout(country_timer)
  }

  country_timer = setTimeout(() => {
    changeCountry()
  }, 2500)
}

// 累计用户
// const totalUser = ref(-1)
const partner = ref(-1)
const onlineIps = ref(-1)
async function getUserIps() {
  try {
    const result = homeData ?? (await platDataIndex())
    const { data } = result
    homeData = result

    partner.value = 0
    onlineIps.value = 0
    // 逐渐递增动画
    nextTick(() => {
      const ipObj = { charged: 0 }
      let ip = data?.online_ip_count ?? 3686927
      if (ip > Math.pow(10, 3)) {
        ip = roundToDecimal(ip / 1000, 2) + " K"
      }
      anime({
        targets: ipObj,
        charged: ip,
        round: 1,
        easing: "linear",
        update: function () {
          onlineIps.value = ipObj.charged
        },
      })
      const userObj = { charged: 0 }
      anime({
        targets: userObj,
        charged: data?.partners_count ?? 100,
        round: 1,
        easing: "linear",
        update: function () {
          partner.value = userObj.charged
        },
      })
    })
  } catch (error) {
    console.log(error.message)
  }
}

// 动画
function showSlow(e) {
  anime({
    targets: e,
    translateY: [100, 0],
    opacity: [0.3, 1],
    duration: 1000,
    easing: "easeOutQuart",
  })
}

// 跳转二级页面
function toHomeSecond(name) {
  router.push({
    name: "introduce",
    params: {
      name: name,
    },
  })
}
function toPriceSecond(name) {
  router.push({
    name: "pricing",
    params: {
      name: name,
    },
  })
  close()
}
function openService() {
  // window.$crisp.push(["do", "chat:show"])
  window.$crisp.push(["do", "chat:open"])
}

function merchantScroll() {
  merchantTime.value = setInterval(() => {
    if (direction.value === "右") {
      step.value += 2
      if (step.value >= 100) {
        step.value = 100
        direction.value = "左"
      }
    } else if (direction.value === "左") {
      step.value -= 2
      if (step.value <= 0) {
        step.value = 0
        direction.value = "右"
      }
    }
  }, 1000)
}

// 去购买
const { isProduc, registerAward } = layoutStore()
function goToPay() {
  if (isLogin.value) {
    isProduc.value = true
    router.push("/products")
  } else {
    Message({
      message: "Please login first",
      type: "warning",
    })
    router.push("/login")
  }
}

// 展示套餐数量
const pack = computed(() => {
  return !isLogin.value && registerAward.value ? 5 : 4
})

function toLogin() {
  router.push("/login")
  // Message({
  //   type: "info",
  //   message: t("gift_spec.sign_up", { gift: "50M" }),
  // })
}
function giftPacks(e) {
  // 领取礼包
  track_gift()

  if (token.value) {
    position.set({ x: e.clientX, y: e.clientY })
    Confirm({
      title: en.value ? "Prompt" : "温馨提示",
      message: en.value
        ? "We have already granted you a default authorization of 50M for testing traffic. You can contact us to apply for an additional 500M of testing traffic."
        : "我们已经默认授权给您50M的测试流量，您可以联系我们申请额外500M的测试流量。",
      cancelText: en.value ? "Later" : "以后再说",
      confirmText: en.value ? "Contact Now" : "立即联系",
      success: () => {
        window.$crisp.push(["do", "chat:open"])
      },
    })
    return
  }

  router.push("/login")
}

// 转换mounted
onMounted(() => {
  setHomeHeight()
  changeCountry()
})
</script>

<style lang="less" scoped>
.i-enter {
  transition: all 0.3s linear;
  transform: rotateX(-100deg);
  transform-origin: top;
  opacity: 0;
}

.i-enter-to {
  transition: all 0.3s linear;
  transform: rotateX(0deg);
  transform-origin: top;
  opacity: 1;
}
.i-leave {
  // transition: all .3s linear;
  transform: rotateX(0deg);
  transform-origin: top;
  opacity: 1;
}

.i-leave-to {
  transition: all 0.3s linear;
  transform: rotateX(70deg);
  transform-origin: top;
  opacity: 0;
}
@import url("./home.less");
</style>
