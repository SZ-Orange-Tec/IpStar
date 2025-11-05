<template>
  <div class="unlimited_proxy">
    <div class="box_wrap banner">
      <div class="container between">
        <div class="left space-y-5">
          <div class="excellent vh_center rounded h-10">
            <img loading="lazy" src="@/assets/images/product/excellent.png" alt="IpStar" width="257" height="21" />
          </div>
          <i18n-t keypath="unlimited_proxy_spec.title" tag="h1" scope="global" class="title font-semibold">
            <template #place>
              <span class="linear_text title" @click="toProduct">{{ t("unlimited_proxy_spec.title_place") }}</span>
            </template>
          </i18n-t>
          <p class="text-lg">{{ t("unlimited_proxy_spec.descript") }}</p>
          <ul class="space-y-3 p-5">
            <li class="v_center space-x-2">
              <CheckIcon :size="18" class="success" />
              <span>{{ t(`unlimited_proxy_spec.adv1`) }}</span>
            </li>
            <li class="v_center space-x-2">
              <CheckIcon :size="18" class="success" />
              <span>{{ t(`unlimited_proxy_spec.adv2`) }}</span>
            </li>
            <li class="v_center space-x-2">
              <CheckIcon :size="18" class="success" />
              <span>{{ t(`unlimited_proxy_spec.adv3`) }}</span>
            </li>
            <li class="v_center space-x-2">
              <CheckIcon :size="18" class="success" />
              <span>{{ t(`unlimited_proxy_spec.adv4`) }}</span>
            </li>
            <!--]-->
          </ul>
          <div class="my-button v_center space-x-3">
            <a href="/pricing/unlimited">
              <IpButton type="primary" class="new-button vh_center rounded pointer box-border">
                <span class="font-medium">{{ t("Buy_Now") }}!</span>
                <ArrowRight class="icon" :size="18" />
              </IpButton>
            </a>
            <a v-if="!isLogin" href="/login" class="">
              <IpButton type="normal" class="google vh_center rounded space-x-2 pointer box-border">
                <img
                  loading="lazy"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABYFJREFUWEfNmG1M1XUUx7/nf5+EP4JDwHRq2jKdL0oqNJfPoIwXZvnsbNnasrK1eoOwy8w7Lc1841y5XDnsYZaAL0yhBO6NGcbTBqmz1qZOQw0Q0MCL3Kf/t10UFbj3/v8X0sG7y3n6/M75nd899wiG+Z8Mcz4MGrAta1Z8wM9M0WQWwDQKxwuRCECFoJWQZgBNAtQokJ8T52TVisOhRZuQqAFblqTNEw2bSHkJYIzRgCLSDvAbiHV3ctmpa4btjCreyJz5jC+AXSAzjdqE1BN4BJJvi4ndEn+solXPl24G6XAobadKsqlxOwGLnkOjchFcE5o2JDmryyPZRATk0qWxrV1NRQSyjAaORk8AikkykkprXeHswgIGm0Dz8jjBudEEjU5XdqU4a3OjzmCwrNcrS0qGfN8iRBZF2Z5cVvOh3oFCZrAlY9ZOUIt4sl7HIhIgUCeUU1TQCKJTwNEEJwmwiMS0ARCCLSnldR/pwQXlAwBbM2fPpN9fzRCyvg6lGyJ7TIpt3+jSk43hggW73x9ADsl1QR1FkZykstpPjcANAAyWtrWyuJpEWmQHctoK6/JRzsqLRgO1pr+QQUV7Mrms9gujNgMAfS5bpvvohFzfucS5JE2hHAlQbzWbFyecqGqPJtBgdfuU2O+0HgqWwnsh4XTXkcljGMBjDzoWQYPFZksfVVx5Y7ABo7W7B8jKpJEBz7/NJO58fXVZWm8emHqJt8zP96Ra4FUsSuron2r+iDbIUPTvAfqdltdJ5PfLGLuOT6zwnBk9F4Ivk8trNw0l2GBs7wOWW78m+FooJ76LCWe6jk5cm1Rc/6dekCU7PNMC5AQ9vYhykatOu62nUvcAfeXWeoCpIRtD5JI53TvZSND0j92fExxapkVKXXa1Zyh5sMQtJJLDABaa072rHxWgQBqdeerEvoDllm4CttCA+Myc7nvvUQFC5LbLrsYOX0DILVeeOrI/YDOBlOFQYoicd9nVKcO2SUTwq9MeN69fBq0HCW4IlcEq75iGrb7Z635ZVviX3j3M2OF+k9QfcO/OmUkh/YkUuuxqT1Pe72KX5Q1qONDnoQY0R+ezFSe8E+YD2F+3puhdPUAj8o37abnQ5r5OIiHMldrqtKvb+gCyOjE+4O5s6v2qu6nZrr/aseBSm992Z7IR8ZotphnVyw/rPtZ6kBk7u1ZomlYUTs9kQWrZ5rjf+wAGP/id1u9Jrv3NO7YhuyNtrIZ+wwKkQbXFLap45eBNPYhw8lUFtLafd58l8VRoHbnsylMn9cr6TDPBccvRkZpT6hk/L9y4BUG9RZTFVasLox63SErGTve3JNaHO4AI9jrtce+HBHTQoRQXnNUdWEVwGmbb8roVhwwPrFl7Ge+51fUVyFXhsy/dikmZWp4b83dIwOA/ZxesmumjVg1GXosIpBvgHoyw7Kt7+YewI/+LR9eO8972vSX+5GVq43YRLebp8NmTHU67mtevUQeqpx1e+QnJHCP3LPijCWAdIKcg0iga3VRknJCPa8QTIpxDwhz0pYjij/knu9Lknr6gv28RNKsmdcqPOdKpC3i31CUkhrbmCHNCy62FNTHNG6YB0vPMiIjHpChLSnNjTg4AD5elWSXr47UOz0P74W7yjbmiXtneIdqIaRBZ47THhnx2Iq4+lh7bGNvkbi8i+FBWH4DFHdeU/XbFB899F/Ze6t2znnIXnttMjdsA/m/LIwCXzWasqV55pCYSg+52q9c4rWDVDGrcBXCJ3qEiykW8APLjrHG5Rh58w4APgM6Hpr0DyDKCI4zCCqQDYL5ZUXZXrS68atzOqGY/vWATscOTSUHPChjEeAoSQVFF0EaiJbgCVgRVCpSyESnTayoWOvzRhos6g9EGGKr+sAf8D++LUkeObYr8AAAAAElFTkSuQmCC"
                  alt="IpStar"
                  width="20"
                  height="20"
                /><span class="font-medium">{{ t("Google_Start") }}</span>
              </IpButton>
            </a>
          </div>
        </div>
        <div class="right">
          <img
            loading="lazy"
            width="510"
            height="387"
            src="@/assets/images/unlimited_proxy/unlimited.webp"
            alt="IpStar"
            class="animate__animated animate__bounceInDown"
            style="visibility: visible"
          />
        </div>
      </div>
    </div>

    <div class="box_wrap intro">
      <div class="container">
        <ul class="w-full flex gap-6">
          <li class="flex-1 shrink-0 rounded-lg box-border px-6 py-5 space-y-4">
            <div class="v_center space-x-3">
              <img
                loading="lazy"
                width="16"
                height="16"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAm5JREFUWEfFlz9oFEEUxr93s1ubSjStGPQKGxst1IAISWF35nJBMKBoFQULrQIpxULxGkG0iuS8M4JgkYQU/iu0EMRCixPbCAFBGxVuZp/M7u25tzub21lX9sq9ee/7zbw338wQSv6Rtf4SV9DFPjDGATUexIstELYwgS9YIs8mZ3aARm8KHtXAOA3wbrMIbYPwDBVeRctdzwIyGmCWj4HlTTCOZEk4GEN4C3Ku4RG93ikuHaDDAqvyFoDLVsLJwU3UnKuYIWXKYwa4yLvwXT0G+NQ/ivfDaRNj4gzu0Y94viSAP3O1Vpx4KEmbqInp+EokAeqyCeaFYmaeyNJEx70S/ToMoBvOk6/+k3iQtuIcjzbmMEC998a6221p9e5ou0cHhRnE632usGabL3U8oQumMaNnCEyHPvF3BeryPpjPFwNAD1EV59DFIUj5PpGT6AHazgX9PQDQ9vpJfU13OBusvri25Fl1HZ53IxlN26iKvdq2A4A53g8puzYy5rER8bq6BOa7AJu9xnEmsEKfgz8bfAJKvjAmJToLV7xDTz4F40B6zWkZB8W8fxiNEtdJhDOJFr3sA8gGFK+kJJ9Cx93APO/BL/ncDGEx81BE0BxaTisDAH0DiZNo0wczRA5xfwWGAHYogU+cBpFTPFGCTE0Yg/gpF1B1FjPXPF7foSbMvA0jEGHCLA2XNILYNtQDMhtRBCKXuK5o3Ij8rWhhxUS/wfwRwOFc3mG0Yn8VyjyMNEDpx7GGmOndKeAemFaZERcSHVb6lUxDlHopDRdPr8QTdbuA+2GOa3m0gqU9TOJtVNrTLA5S2uM0l+WNDvoDmkRFMFVo+94AAAAASUVORK5CYII="
              />
              <span>{{ t("unlimited_proxy_spec.proxy_endpoints") }}</span>
            </div>
            <p class="text-lg font-medium">HTTP / SOCKS5</p>
          </li>
          <li class="flex-1 shrink-0 rounded-lg box-border px-6 py-5 space-y-4">
            <div class="v_center space-x-3">
              <img
                loading="lazy"
                width="16"
                height="16"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAm5JREFUWEfFlz9oFEEUxr93s1ubSjStGPQKGxst1IAISWF35nJBMKBoFQULrQIpxULxGkG0iuS8M4JgkYQU/iu0EMRCixPbCAFBGxVuZp/M7u25tzub21lX9sq9ee/7zbw338wQSv6Rtf4SV9DFPjDGATUexIstELYwgS9YIs8mZ3aARm8KHtXAOA3wbrMIbYPwDBVeRctdzwIyGmCWj4HlTTCOZEk4GEN4C3Ku4RG93ikuHaDDAqvyFoDLVsLJwU3UnKuYIWXKYwa4yLvwXT0G+NQ/ivfDaRNj4gzu0Y94viSAP3O1Vpx4KEmbqInp+EokAeqyCeaFYmaeyNJEx70S/ToMoBvOk6/+k3iQtuIcjzbmMEC998a6221p9e5ou0cHhRnE632usGabL3U8oQumMaNnCEyHPvF3BeryPpjPFwNAD1EV59DFIUj5PpGT6AHazgX9PQDQ9vpJfU13OBusvri25Fl1HZ53IxlN26iKvdq2A4A53g8puzYy5rER8bq6BOa7AJu9xnEmsEKfgz8bfAJKvjAmJToLV7xDTz4F40B6zWkZB8W8fxiNEtdJhDOJFr3sA8gGFK+kJJ9Cx93APO/BL/ncDGEx81BE0BxaTisDAH0DiZNo0wczRA5xfwWGAHYogU+cBpFTPFGCTE0Yg/gpF1B1FjPXPF7foSbMvA0jEGHCLA2XNILYNtQDMhtRBCKXuK5o3Ij8rWhhxUS/wfwRwOFc3mG0Yn8VyjyMNEDpx7GGmOndKeAemFaZERcSHVb6lUxDlHopDRdPr8QTdbuA+2GOa3m0gqU9TOJtVNrTLA5S2uM0l+WNDvoDmkRFMFVo+94AAAAASUVORK5CYII="
              /><span>{{ t("unlimited_proxy_spec.proxy_network") }}</span>
            </div>
            <p class="text-lg font-medium">{{ t("unlimited_proxy_spec.proxy_ip") }}</p>
          </li>
          <li class="flex-1 shrink-0 rounded-lg box-border px-6 py-5 space-y-4">
            <div class="v_center space-x-3">
              <img
                loading="lazy"
                width="16"
                height="16"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAm5JREFUWEfFlz9oFEEUxr93s1ubSjStGPQKGxst1IAISWF35nJBMKBoFQULrQIpxULxGkG0iuS8M4JgkYQU/iu0EMRCixPbCAFBGxVuZp/M7u25tzub21lX9sq9ee/7zbw338wQSv6Rtf4SV9DFPjDGATUexIstELYwgS9YIs8mZ3aARm8KHtXAOA3wbrMIbYPwDBVeRctdzwIyGmCWj4HlTTCOZEk4GEN4C3Ku4RG93ikuHaDDAqvyFoDLVsLJwU3UnKuYIWXKYwa4yLvwXT0G+NQ/ivfDaRNj4gzu0Y94viSAP3O1Vpx4KEmbqInp+EokAeqyCeaFYmaeyNJEx70S/ToMoBvOk6/+k3iQtuIcjzbmMEC998a6221p9e5ou0cHhRnE632usGabL3U8oQumMaNnCEyHPvF3BeryPpjPFwNAD1EV59DFIUj5PpGT6AHazgX9PQDQ9vpJfU13OBusvri25Fl1HZ53IxlN26iKvdq2A4A53g8puzYy5rER8bq6BOa7AJu9xnEmsEKfgz8bfAJKvjAmJToLV7xDTz4F40B6zWkZB8W8fxiNEtdJhDOJFr3sA8gGFK+kJJ9Cx93APO/BL/ncDGEx81BE0BxaTisDAH0DiZNo0wczRA5xfwWGAHYogU+cBpFTPFGCTE0Yg/gpF1B1FjPXPF7foSbMvA0jEGHCLA2XNILYNtQDMhtRBCKXuK5o3Ij8rWhhxUS/wfwRwOFc3mG0Yn8VyjyMNEDpx7GGmOndKeAemFaZERcSHVb6lUxDlHopDRdPr8QTdbuA+2GOa3m0gqU9TOJtVNrTLA5S2uM0l+WNDvoDmkRFMFVo+94AAAAASUVORK5CYII="
              /><span>{{ t("Locations") }}</span>
            </div>
            <p class="text-lg font-medium">{{ t("unlimited_proxy_spec.proxy_country") }}</p>
          </li>
          <li class="flex-1 shrink-0 rounded-lg box-border px-6 py-5 space-y-4">
            <div class="v_center space-x-3">
              <img
                loading="lazy"
                width="16"
                height="16"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAm5JREFUWEfFlz9oFEEUxr93s1ubSjStGPQKGxst1IAISWF35nJBMKBoFQULrQIpxULxGkG0iuS8M4JgkYQU/iu0EMRCixPbCAFBGxVuZp/M7u25tzub21lX9sq9ee/7zbw338wQSv6Rtf4SV9DFPjDGATUexIstELYwgS9YIs8mZ3aARm8KHtXAOA3wbrMIbYPwDBVeRctdzwIyGmCWj4HlTTCOZEk4GEN4C3Ku4RG93ikuHaDDAqvyFoDLVsLJwU3UnKuYIWXKYwa4yLvwXT0G+NQ/ivfDaRNj4gzu0Y94viSAP3O1Vpx4KEmbqInp+EokAeqyCeaFYmaeyNJEx70S/ToMoBvOk6/+k3iQtuIcjzbmMEC998a6221p9e5ou0cHhRnE632usGabL3U8oQumMaNnCEyHPvF3BeryPpjPFwNAD1EV59DFIUj5PpGT6AHazgX9PQDQ9vpJfU13OBusvri25Fl1HZ53IxlN26iKvdq2A4A53g8puzYy5rER8bq6BOa7AJu9xnEmsEKfgz8bfAJKvjAmJToLV7xDTz4F40B6zWkZB8W8fxiNEtdJhDOJFr3sA8gGFK+kJJ9Cx93APO/BL/ncDGEx81BE0BxaTisDAH0DiZNo0wczRA5xfwWGAHYogU+cBpFTPFGCTE0Yg/gpF1B1FjPXPF7foSbMvA0jEGHCLA2XNILYNtQDMhtRBCKXuK5o3Ij8rWhhxUS/wfwRwOFc3mG0Yn8VyjyMNEDpx7GGmOndKeAemFaZERcSHVb6lUxDlHopDRdPr8QTdbuA+2GOa3m0gqU9TOJtVNrTLA5S2uM0l+WNDvoDmkRFMFVo+94AAAAASUVORK5CYII="
              /><span>{{ t("unlimited_proxy_spec.proxy_uptime") }}</span>
            </div>
            <p class="text-lg font-medium">99.5%</p>
          </li>
          <!--]-->
        </ul>
      </div>
    </div>

    <div class="box_wrap train">
      <div class="container">
        <div class="title font-medium text-center">{{ t("unlimited_proxy_spec.how_title") }}</div>

        <ul class="content grid grid-cols-3 gap-6">
          <li class="rounded-lg box-border column_center space-y-4">
            <img loading="lazy" width="48" height="48" src="@/assets/images/unlimited_proxy/icon0.webp" />
            <div class="text-lg font-medium">{{ t("unlimited_proxy_spec.how1_title") }}</div>
            <p class="text-center">{{ t("unlimited_proxy_spec.how1_desc") }}</p>
          </li>
          <li class="rounded-lg box-border column_center space-y-4">
            <img loading="lazy" width="48" height="48" src="@/assets/images/unlimited_proxy/icon1.webp" />
            <div class="text-lg font-medium">{{ t("unlimited_proxy_spec.how2_title") }}</div>
            <p class="text-center">{{ t("unlimited_proxy_spec.how2_desc") }}</p>
          </li>
          <li class="rounded-lg box-border column_center space-y-4">
            <img loading="lazy" width="48" height="48" src="@/assets/images/unlimited_proxy/icon2.webp" />
            <div class="text-lg font-medium">{{ t("unlimited_proxy_spec.how3_title") }}</div>
            <p class="text-center">{{ t("unlimited_proxy_spec.how3_desc") }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 克服 LLM 训练数据 收集挑战 -->
    <div class="box_wrap position">
      <div class="container">
        <i18n-t keypath="unlimited_proxy_spec.collect_title" tag="div" scope="global" class="title font-medium text-center">
          <template #place>
            <span class="linear_text title" @click="toProduct">{{ t("unlimited_proxy_spec.title_place") }}</span>
          </template>
        </i18n-t>

        <div class="content between position_flex">
          <img loading="lazy" width="550" height="320" src="@/assets/images/unlimited_proxy/bg1.webp" />
          <div class="section_text space-y-5">
            <h2 class="title font-medium">{{ t("unlimited_proxy_spec.collect1_title") }}</h2>
            <p class="grey-60 text-lg">
              {{ t("unlimited_proxy_spec.collect1_desc") }}
            </p>
            <ul class="space-y-2">
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("unlimited_proxy_spec.collect1_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("unlimited_proxy_spec.collect1_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("unlimited_proxy_spec.collect1_adv3") }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 绕过 IP 封锁和验证码 -->
    <div class="box_wrap position">
      <div class="container">
        <div class="between flex-row-reverse position_flex">
          <div class="section_text space-y-5">
            <h2 class="title font-medium">{{ t("unlimited_proxy_spec.collect2_title") }}</h2>
            <p class="grey-60 text-lg">
              {{ t("unlimited_proxy_spec.collect2_desc") }}
            </p>
            <ul class="space-y-2">
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("unlimited_proxy_spec.collect2_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("unlimited_proxy_spec.collect2_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("unlimited_proxy_spec.collect2_adv3") }}</span>
              </li>
            </ul>
          </div>

          <img loading="lazy" width="550" height="320" src="@/assets/images/unlimited_proxy/bg2.webp" />
        </div>
      </div>
    </div>

    <!-- 为什么选择 Aproxy 的无限流量代理？ -->
    <div class="box_wrap why">
      <div class="container">
        <div class="title font-medium text-center">{{ t("unlimited_proxy_spec.why_title") }}</div>

        <ul class="content grid grid-cols-4 gap-6">
          <li class="space-y-4 rounded-lg box-border p-6">
            <img loading="lazy" width="40" height="40" src="@/assets/images/unlimited_proxy/choose0.webp" />
            <div class="text-lg font-medium">{{ t("unlimited_proxy_spec.why1_title") }}</div>
            <p>{{ t("unlimited_proxy_spec.why1_desc") }}</p>
          </li>
          <li class="space-y-4 rounded-lg box-border p-6">
            <img loading="lazy" width="40" height="40" src="@/assets/images/unlimited_proxy/choose1.webp" />
            <div class="text-lg font-medium">{{ t("unlimited_proxy_spec.why2_title") }}</div>
            <p>{{ t("unlimited_proxy_spec.why2_desc") }}</p>
          </li>
          <li class="space-y-4 rounded-lg box-border p-6">
            <img loading="lazy" width="40" height="40" src="@/assets/images/unlimited_proxy/choose2.webp" />
            <div class="text-lg font-medium">{{ t("unlimited_proxy_spec.why3_title") }}</div>
            <p>{{ t("unlimited_proxy_spec.why3_desc") }}</p>
          </li>
          <li class="space-y-4 rounded-lg box-border p-6">
            <img loading="lazy" width="40" height="40" src="@/assets/images/unlimited_proxy/choose3.webp" />
            <div class="text-lg font-medium">{{ t("unlimited_proxy_spec.why4_title") }}</div>
            <p>{{ t("unlimited_proxy_spec.why4_desc") }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 满足全模态 LLM 训练数据采集 -->
    <div class="box_wrap meet">
      <div class="container between">
        <div class="images" :class="`images${meet_active}`"></div>
        <div class="text">
          <div class="title font-medium">{{ t("unlimited_proxy_spec.collect3_title") }}</div>
          <ul class="space-y-3">
            <li :class="{ active: meet_active === 0 }" @click="meet_active = 0">
              <div class="name">{{ t("unlimited_proxy_spec.collect3_adv1_title") }}</div>
              <p :style="{ '--height': en ? '44px' : '22px' }">{{ t("unlimited_proxy_spec.collect3_adv1_desc") }}</p>
            </li>
            <li :class="{ active: meet_active === 1 }" @click="meet_active = 1">
              <div class="name">{{ t("unlimited_proxy_spec.collect3_adv2_title") }}</div>
              <p :style="{ '--height': en ? '44px' : '22px' }">{{ t("unlimited_proxy_spec.collect3_adv2_desc") }}</p>
            </li>
            <li :class="{ active: meet_active === 2 }" @click="meet_active = 2">
              <div class="name">{{ t("unlimited_proxy_spec.collect3_adv3_title") }}</div>
              <p :style="{ '--height': en ? '44px' : '22px' }">{{ t("unlimited_proxy_spec.collect3_adv3_desc") }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 受益于无限代理的 AI 应用场景 -->
    <div class="box_wrap cases">
      <div class="container">
        <div class="title font-medium text-center">{{ t("unlimited_proxy_spec.cases_title") }}</div>
        <div class="content between">
          <div class="text space-y-5">
            <p>{{ t("unlimited_proxy_spec.cases_desc") }}</p>
            <div class="list space-y-5">
              <div class="list_item" :class="{ active: case_active === 0 }" @click="case_active = 0">
                <div class="mock">
                  <div class="header">
                    <div class="arrow arrow0"></div>
                    <div class="name">{{ t("unlimited_proxy_spec.case1_title") }}</div>
                  </div>
                  <p style="--height: 44px">{{ t("unlimited_proxy_spec.case1_desc") }}</p>
                </div>
              </div>
              <div class="list_item" :class="{ active: case_active === 1 }" @click="case_active = 1">
                <div class="mock">
                  <div class="header">
                    <div class="arrow arrow1"></div>
                    <div class="name">{{ t("unlimited_proxy_spec.case2_title") }}</div>
                  </div>
                  <p style="--height: 44px">{{ t("unlimited_proxy_spec.case2_desc") }}</p>
                </div>
              </div>
              <div class="list_item" :class="{ active: case_active === 2 }" @click="case_active = 2">
                <div class="mock">
                  <div class="header">
                    <div class="arrow arrow2"></div>
                    <div class="name">{{ t("unlimited_proxy_spec.case3_title") }}</div>
                  </div>
                  <p style="--height: 44px">{{ t("unlimited_proxy_spec.case3_desc") }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="images"></div>
        </div>
      </div>
    </div>

    <!-- 探索我们对所有 LLM 工作流的兼容性 -->
    <div class="box_wrap carousel">
      <div class="container">
        <div class="space-y-4">
          <h3 class="title font-medium text-center">{{ t("unlimited_proxy_spec.app_title") }}</h3>
          <p class="text-lg grey-80 text-center">{{ t("unlimited_proxy_spec.app_desc") }}</p>
        </div>
        <div class="content">
          <div class="line line1 flex gap-2 pointer">
            <!--[-->
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top1.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top2.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top3.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top4.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top5.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top6.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top7.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top8.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top9.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top10.webp" /></div>
            <!--]--><!--[-->
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top1.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top2.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top3.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top4.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top5.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top6.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top7.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top8.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top9.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_top10.webp" /></div>
            <!--]-->
          </div>
          <div class="line line2 flex gap-2 pointer">
            <!--[-->
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom1.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom2.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom3.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom4.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom5.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom6.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom7.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom8.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom9.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom10.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom11.webp" /></div>
            <!--]--><!--[-->
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom1.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom2.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom3.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom4.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom5.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom6.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom7.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom8.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom9.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom10.webp" /></div>
            <div class="item"><img width="56" height="56" src="@/assets/images/unlimited_proxy/partner_bottom11.webp" /></div>
            <!--]-->
          </div>
        </div>
      </div>
    </div>

    <!-- 无限流量代理的无缝集成 -->
    <div class="box_wrap position">
      <div class="container">
        <div class="content between position_flex">
          <img loading="lazy" width="550" height="320" src="@/assets/images/unlimited_proxy/bg7.webp" />
          <div class="section_text space-y-5">
            <h2 class="title font-medium">{{ t("unlimited_proxy_spec.unlimited_traffic") }}</h2>
            <ul class="space-y-2">
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>面向开发者的集成和文档</span>
              </li>
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>端点构建器</span>
              </li>
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>兼容第三方软件</span>
              </li>
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>通过公告 API 进行代理管理</span>
              </li>
            </ul>
            <div class="btn_box v_center space-x-3">
              <a href="/zh/user-guide/">
                <IpButton type="primary_border px-5 box-border btn">{{ t("unlimited_proxy_spec.view_doc") }}</IpButton>
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
        </div>
      </div>
    </div>

    <!-- 不限流量套餐定价 -->
    <div class="box_wrap price">
      <div class="container space-y-6">
        <h1 class="text-4xl font-medium text-center">{{ t(`unlimited_proxy_spec.title`) }} {{ t("Price") }}</h1>
        <p class="text-center">
          {{ t("unlimited_proxy_spec.price_desc") }}
        </p>
        <ul class="vh_center space-x-5">
          <li class="v_center space-x-2">
            <Check :size="20" class="success" />
            <span>{{ t("unlimited_proxy_spec.price_adv1") }}</span>
          </li>
          <li class="v_center space-x-2">
            <Check :size="20" class="success" />
            <span>{{ t("unlimited_proxy_spec.price_adv2") }}</span>
          </li>
          <li class="v_center space-x-2">
            <Check :size="20" class="success" />
            <span>{{ t("unlimited_proxy_spec.price_adv3") }}</span>
          </li>
        </ul>
        <div class="tips px-3 v_center rounded-lg">
          <div class="v_center space-x-3">
            <div class="major bg-current rounded-full vh_center" style="width: 20px; height: 20px">
              <span class="white">!</span>
            </div>
            <span class="grey-60">{{ t("unlimited_proxy_spec.price_note") }}</span>
          </div>
        </div>
        <div class="w-full">
          <ProductList :type="type" :tabbar="type === 0" :pack="5" />
        </div>
      </div>
    </div>

    <div class="box_wrap question">
      <div class="container">
        <div class="text-3xl font-medium text-center">{{ t("unlimited_proxy_spec.ques_title") }}</div>

        <div class="content space-y-5">
          <Question>
            <template #header>{{ t("unlimited_proxy_spec.ques1_title") }}</template>
            <template #content>
              <p class="text-base grey-80">
                {{ t("unlimited_proxy_spec.ques1_desc") }}
              </p>
            </template>
          </Question>
          <Question>
            <template #header>{{ t("unlimited_proxy_spec.ques2_title") }}</template>
            <template #content>
              <p class="text-base grey-80">
                {{ t("unlimited_proxy_spec.ques2_desc") }}
              </p>
            </template>
          </Question>
          <Question>
            <template #header>{{ t("unlimited_proxy_spec.ques3_title") }}</template>
            <template #content>
              <p class="text-base grey-80">
                {{ t("unlimited_proxy_spec.ques3_desc") }}
              </p>
            </template>
          </Question>
          <Question>
            <template #header>{{ t("unlimited_proxy_spec.ques4_title") }}</template>
            <template #content>
              <p class="text-base grey-80">
                {{ t("unlimited_proxy_spec.ques4_desc") }}
              </p>
            </template>
          </Question>
          <Question>
            <template #header>{{ t("unlimited_proxy_spec.ques5_title") }}</template>
            <template #content>
              <p class="text-base grey-80">
                {{ t("unlimited_proxy_spec.ques5_desc") }}
              </p>
            </template>
          </Question>
        </div>
      </div>
    </div>

    <div class="box_wrap footer">
      <div class="container">
        <img loading="lazy" id="bottom_bg" src="@/assets/images/product/bottom_bg.png" width="270" height="270" style="" />
        <div class="started" style="">
          <div class="started_title text-3xl font-medium">有一个大项目?</div>
          <div class="started_desc">与我们的顾问取得联系，开始让您的员工了解情况、投入、高效和安全。</div>
          <a href="/pricing/unlimited" class="started_btn vh_center box-border">
            <ArrowRight class="icon" :size="20" />
            <span>开始</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import { CircleCheckBig as CheckIcon, ArrowRight, Check } from "lucide-vue-next"
import IpTag from "@/components/tag/tag.vue"
import IpButton from "@/components/button/button.vue"
import { computed, defineAsyncComponent, onMounted, ref } from "vue"
import { platDataIndex } from "../../../../api/home"
import Question from "../../components/question/question.vue"
import { useRoute } from "vue-router"
import settingStore from "../../../../store/setting"
import ProductList from "../../components/product_list/product_list.vue"
import loginStore from "../../../../store/login"

const { t } = useI18n()
const { en } = settingStore()
const { isLogin } = loginStore()

const meet_active = ref(0)
const case_active = ref(0)
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
