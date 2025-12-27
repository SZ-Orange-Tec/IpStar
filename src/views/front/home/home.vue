<template>
  <div class="home w-full">
    <!-- 介绍 -->
    <div class="introduce box_wrap relative" ref="introRef">
      <div class="container column space-y-10">
        <div class="space-y-4 md:space-y-7" style="max-width: 670px">
          <div class="title space-y-1 md:space-y-4">
            <i18n-t keypath="home_spec.intro_title1" tag="div" scope="global" class="md:whitespace-pre-wrap font-medium">
              <template #ai>
                <div class="star space-x-1">
                  <span class="">AI</span>
                  <!-- <img class="shrink-0" src="@/assets/images/home/sparkle-filled.png" alt="" /> -->
                  <img class="shrink-0" src="@/assets/images/home/star.webp" alt="" />
                </div>
              </template>
              <template #and>
                <span class="and">&</span>
              </template>
              <template #bi>
                <span>BI</span>
              </template>
            </i18n-t>
            <!-- <p class="whitespace-pre-wrap font-medium lg:font-medium">{{ t("home_spec.intro_title1") }}</p> -->
            <!-- <p class="title text-lg lg:text-xl md:whitespace-pre-wrap font-normal">{{ t("home_spec.intro_title2") }}</p> -->
          </div>

          <p class="font-normal opacity-90 md:whitespace-pre-wrap">{{ t("home_spec.intro_desc") }}</p>
        </div>

        <div class="btn_box">
          <div class="w-full column sm:v_center gap-4" v-if="!isLogin" style="align-items: stretch">
            <IpButton type="success" class="green_btn flex-1" @click="toLogin">
              <div class="vh_center space-x-2 h-10">
                <span>{{ t("Free_Trial") }}</span>
                <MoveUpRight :size="16" class="arrow" />
              </div>
            </IpButton>
            <GoogleLoginButton v-if="!isLogin" class="flex-1 h-10 md:h-auto" />
          </div>
          <div class="w-full column md:v_center gap-4" v-else style="align-items: stretch">
            <IpButton type="normal" class="green_btn font-medium h-10 px-4 md:px-8" @click="giftPacks">{{ t("home_spec.more_try") }}</IpButton>
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

        <div class="advant w-full overflow-hidden">
          <ul class="flex !items-stretch font-normal text-sm md:text-xs">
            <li class="v_center space-x-1 rounded-full">
              <Plug :size="16" />
              <!-- <div class="icon shrink-0 vh_center rounded-full"> -->
              <!-- </div> -->
              <p class="whitespace-nowrap sm:whitespace-normal">{{ t("home_spec.adv1") }}</p>
            </li>
            <li class="v_center space-x-1 rounded-full">
              <MapPin :size="16" />
              <!-- <div class="icon shrink-0 vh_center rounded-full"> -->
              <!-- </div> -->
              <p class="whitespace-pre-wrap">{{ t("home_spec.adv2") }}</p>
            </li>
            <li class="v_center space-x-1 rounded-full">
              <Fingerprint :size="16" />
              <!-- <div class="icon shrink-0 vh_center rounded-full"> -->
              <!-- </div> -->
              <p>{{ t("home_spec.adv3") }}</p>
            </li>
            <li class="v_center space-x-1 rounded-full">
              <KeyRound :size="16" />
              <!-- <div class="icon shrink-0 vh_center rounded-full"> -->
              <!-- </div> -->
              <p class="whitespace-pre-wrap">{{ t("home_spec.adv4") }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="left_radius"></div>
      <div class="right_radius"></div>
    </div>

    <div class="box_wrap proxy" v-lazy="getLowestPrice">
      <div class="container">
        <div class="space-y-5">
          <p class="text-3xl font-medium text-center md:whitespace-pre-wrap">
            {{ t("home_spec.proxy_title") }}
          </p>
          <p class="text-center">{{ t("home_spec.proxy_desc") }}</p>
        </div>

        <div class="content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="product_item residential col-span-1 md:col-span-2">
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

    <!-- 方案 -->
    <div class="box_wrap position">
      <div class="container column lg:v_center position_flex">
        <div class="section_text space-y-5">
          <img loading="lazy" src="@/assets/images/product/code.png" width="48" height="48" />
          <h2 class="font-medium text-3xl">{{ t("home_spec.plan_title") }}</h2>
          <p class="text-lg grey-60">
            {{ t("home_spec.plan_desc") }}
          </p>
          <div class="btn_box v_center space-x-3">
            <a href="/doc">
              <IpButton type="primary_border px-5 box-border btn">{{ t("home_spec.view_doc") }}</IpButton>
            </a>
            <div class="images">
              <img loading="lazy" src="@/assets/images/product/see_icon1.png" width="40" height="40" />
            </div>
            <div class="images">
              <img loading="lazy" src="@/assets/images/product/see_icon2.png" width="40" height="40" />
            </div>
            <div class="images">
              <img loading="lazy" src="@/assets/images/product/see_icon3.png" width="40" height="40" />
            </div>
            <div class="images">
              <img loading="lazy" src="@/assets/images/product/see_icon4.png" width="40" height="40" />
            </div>
            <div class="images">
              <img loading="lazy" src="@/assets/images/product/see_icon5.png" width="40" height="40" />
            </div>
          </div>
        </div>
        <div class="code_content column !items-stretch shrink-0">
          <div class="left flex space-x-3">
            <div class="pointer vh_center rounded" :class="{ active: active === 'go' }" @click="active = 'go'">Go</div>
            <div class="pointer vh_center rounded" :class="{ active: active === 'java' }" @click="active = 'java'">Java</div>
            <div class="pointer vh_center rounded" :class="{ active: active === 'php' }" @click="active = 'php'">PHP</div>
            <div class="pointer vh_center rounded" :class="{ active: active === 'python' }" @click="active = 'python'">Python</div>
          </div>
          <div class="right flex-1 min-h-0">
            <CodeText v-if="active == 'go'" :code="GolangCode" />
            <CodeText v-if="active == 'java'" :code="JavaCode" />
            <CodeText v-if="active == 'php'" :code="PHPCode" />
            <CodeText v-if="active == 'python'" :code="PythonCode" />
          </div>
        </div>
      </div>
    </div>

    <div class="box_wrap why">
      <div class="container">
        <div class="font-medium text-center text-3xl">{{ t("home_spec.why_title") }}</div>
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits1.png" />
            <div class="text-lg font-medium">{{ t("home_spec.why1_title") }}</div>
            <p>{{ t("home_spec.why1_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits2.png" />
            <div class="text-lg font-medium">{{ t("home_spec.why2_title") }}</div>
            <p>{{ t("home_spec.why2_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits3.png" />
            <div class="text-lg font-medium">{{ t("home_spec.why3_title") }}</div>
            <p>{{ t("home_spec.why3_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits4.png" />
            <div class="text-lg font-medium">{{ t("home_spec.why4_title") }}</div>
            <p>{{ t("home_spec.why4_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits5.png" />
            <div class="text-lg font-medium">{{ t("home_spec.why5_title") }}</div>
            <p>{{ t("home_spec.why5_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits6.png" />
            <div class="text-lg font-medium">{{ t("home_spec.why6_title") }}</div>
            <p>{{ t("home_spec.why6_desc") }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="box_wrap location">
      <div class="container column_center white">
        <div class="space-y-3">
          <div class="text-3xl font-medium text-center">{{ t("home_spec.location_title") }}</div>
          <div class="text-lg opacity-90 text-center">{{ t("home_spec.location_desc") }}</div>
        </div>
        <div class="map">
          <img loading="lazy" class="img" src="https://www.proxylite.com/_nuxt/map.BNfwdBbI.webp" />
          <div class="hidden md:between all relative mt-5">
            <div class="text-center space-y-5">
              <div>{{ t("home_spec.location_dot1") }}</div>
              <div class="text-3xl font-semibold"><span>90</span>M+</div>
            </div>
            <div class="text-center space-y-5">
              <div>{{ t("home_spec.location_dot2") }}</div>
              <div class="text-3xl font-semibold"><span>190</span>+</div>
            </div>
            <div class="text-center space-y-5">
              <div>{{ t("home_spec.location_dot3") }}</div>
              <div class="text-3xl font-semibold"><span>9,000</span></div>
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
        <div class="w-full md:hidden grid grid-cols-2 gap-6 relative">
          <div class="text-center space-y-5">
            <div>{{ t("home_spec.location_dot1") }}</div>
            <div class="text-3xl font-semibold"><span>90</span>M+</div>
          </div>
          <div class="text-center space-y-5">
            <div>{{ t("home_spec.location_dot2") }}</div>
            <div class="text-3xl font-semibold"><span>190</span>+</div>
          </div>
          <div class="text-center space-y-5">
            <div>{{ t("home_spec.location_dot3") }}</div>
            <div class="text-3xl font-semibold"><span>9,000</span></div>
          </div>
          <div class="text-center space-y-5">
            <div>{{ t("home_spec.location_dot4") }}</div>
            <div class="text-3xl font-semibold"><span>99</span>%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- app -->
    <div class="app box">
      <div class="container column_center">
        <div class="space-y-5">
          <p class="text-3xl font-medium text-center md:whitespace-pre-wrap">
            {{ t("home_spec.app_title") }}
          </p>
          <p class="text-center">{{ t("home_spec.app_desc") }}</p>
        </div>

        <IpImage :width="2376" :height="320" style="margin-top: 3rem">
          <img v-lazy src="@/assets/images/home/app1.webp" alt="" />
        </IpImage>

        <!-- <div class="w-full pack_title mt-8 md:mt-16 column_center space-y-2 md:space-y-5" >
          <p class="title text-xl lg:text-3xl font-semibold text-center md:whitespace-pre-wrap">{{ t("home_spec.package_title") }}</p>

          <p class="description success text-center">{{ t("home_spec.package_desc") }}</p>
        </div> -->
      </div>
    </div>

    <div class="box_wrap cases">
      <div class="container">
        <div class="title text-3xl font-medium text-center">{{ t("home_spec.cases_title") }}</div>

        <div class="content list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a href="/home/data_collection" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/web.webp" />
            <div class="font-medium text-lg">{{ t("home_spec.four1_title") }}</div>
            <p class="grey-80">{{ t("home_spec.four1_desc") }}</p>
          </a>
          <a href="/home/search_engine" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/seo.webp" />
            <div class="font-medium text-lg">{{ t("home_spec.four2_title") }}</div>
            <p class="grey-80">{{ t("home_spec.four2_desc") }}</p>
          </a>
          <a href="/home/social_media" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/media.webp" />
            <div class="font-medium text-lg">{{ t("home_spec.four3_title") }}</div>
            <p class="grey-80">{{ t("home_spec.four3_desc") }}</p>
          </a>
          <a href="/home/ecommerce" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/commerce.webp" />
            <div class="font-medium text-lg">{{ t("home_spec.four4_title") }}</div>
            <p class="grey-80">{{ t("home_spec.four4_desc") }}</p>
          </a>
          <a href="/home/market" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/marketing.png" />
            <div class="font-medium text-lg">{{ t("home_spec.four5_title") }}</div>
            <p class="grey-80">{{ t("home_spec.four5_desc") }}</p>
          </a>
          <a href="/home/bill" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/ad.webp" />
            <div class="font-medium text-lg">{{ t("home_spec.four6_title") }}</div>
            <p class="grey-80">{{ t("home_spec.four6_desc") }}</p>
          </a>
          <a href="/home/brand" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/brand.png" />
            <div class="font-medium text-lg">{{ t("home_spec.four7_title") }}</div>
            <p class="grey-80">{{ t("home_spec.four7_desc") }}</p>
          </a>
          <a href="/home/ai_model" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/ai.webp" />
            <div class="font-medium text-lg">{{ t("home_spec.four8_title") }}</div>
            <p class="grey-80">{{ t("home_spec.four8_desc") }}</p>
          </a>
        </div>
      </div>
    </div>

    <!-- package -->
    <!-- <div class="package box" id="home_package">
      <div class="container" >
        <div>
          <ProductList :tabbar="false" :pack="pack" v-if="isProduct"></ProductList>
        </div>
      </div>
    </div> -->

    <!-- explore -->
    <!-- <div class="explore box">
      <div class="container" >
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
    </div> -->

    <div class="box question">
      <div class="container space-y-10">
        <div class="title">
          <h3 class="title text-center text-3xl font-bold">{{ t("FAQ") }}</h3>
        </div>

        <div class="content space-y-5">
          <Question>
            <template #header> {{ t("question_spec.title1") }} </template>
            <template #content>
              <i18n-t keypath="question_spec.desc1" class="whitespace-pre-wrap" tag="p" scope="global">
                <template #product>
                  <a href="https://www.ipstar.io/product/residential" target="_blank">https://www.ipstar.io/product/residential</a>
                </template>
                <template #pricing>
                  <a href="https://www.ipstar.io/pricing/residential" target="_blank">https://www.ipstar.io/pricing/residential</a>
                </template>
              </i18n-t>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title2") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc2") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title3") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc3") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title4") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc4") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title5") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("question_spec.desc5") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title6") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc6") }}</p>
            </template>
          </Question>
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
import Question from "../components/question/question.vue"
import {
  MoveRight,
  WandSparkles as StarIcon,
  ToggleLeft,
  Dot,
  Code,
  Laptop,
  Check,
  MoveUpRight,
  ChevronLeft,
  Plug,
  MapPin,
  Fingerprint,
  KeyRound,
  Sparkle,
} from "lucide-vue-next"
// import StarPlay from "@/views/front/components/starPlay/gptstar.vue"
import vLazy from "@/directive/lazy"
import IpImage from "@/components/image/image.vue"
import anime from "animejs/lib/anime.es.js"
import { roundToDecimal, formatSizeUnits } from "@/utils/tools"
import { track_gift } from "@/utils/detect"
import Confirm from "@/components/confirm/confirm"
import Message from "@/components/message/message"
import position from "../../../components/dialog/position"
import GoogleLoginButton from "../components/googleLoginBtn/index.vue"
// import HomeTitle from "../components/homeTitle.vue"
import layoutStore from "@/store/layout"
import { platProductLowestPrices } from "@/api/product"
import Header from "../components/header/header.vue"

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
const { lowestPrice, getLowestPrice, gift } = layoutStore()
const giftText = computed(() => formatSizeUnits(gift.value))

// 代码
const active = ref("go")
const CodeText = defineAsyncComponent(() => import("@/views/doc/components/code_block/code_block.vue"))
const GolangCode = ref()
const JavaCode = ref()
const PHPCode = ref()
const PythonCode = ref()
async function getCode() {
  const { go, java, php, python } = await import("@/views/doc/code.js")
  GolangCode.value = go
  JavaCode.value = java
  PHPCode.value = php
  PythonCode.value = python
}
getCode()

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
  window.$crisp.push(["do", "chat:show"])
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

// 展示套餐数量
const pack = computed(() => {
  return !isLogin.value && registerAward.value ? 5 : 4
})

function toLogin() {
  router.push("/login")
}
function giftPacks(e) {
  // 领取礼包
  track_gift()

  if (token.value) {
    position.set({ x: e.clientX, y: e.clientY })
    Confirm({
      title: en.value ? "Prompt" : "温馨提示",
      message: en.value
        ? (gift.value > 0 ? `We have already granted you a default authorization of ${giftText.value} for testing traffic.` : "") +
          " You can contact us to apply for an additional 500M of testing traffic."
        : (gift.value > 0 ? `我们已经默认授权给您 ${giftText.value} 的测试流量` : "") + "您可以联系我们申请额外500M的测试流量。",
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
