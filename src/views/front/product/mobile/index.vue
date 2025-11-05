<template>
  <div class="unlimited_proxy">
    <div class="box_wrap banner">
      <div class="container between">
        <div class="left space-y-5">
          <div class="excellent vh_center rounded h-10">
            <img loading="lazy" src="@/assets/images/product/excellent.png" alt="IpStar" width="257" height="21" />
          </div>
          <h1 class="title font-semibold">{{ t("mobile_proxy_spec.title") }}</h1>
          <p class="text-lg">{{ t("mobile_proxy_spec.descript") }}</p>
          <ul class="space-y-3 p-5">
            <li class="v_center space-x-2">
              <CheckIcon :size="18" class="success" />
              <span>{{ t(`mobile_proxy_spec.adv1`) }}</span>
            </li>
            <li class="v_center space-x-2">
              <CheckIcon :size="18" class="success" />
              <span>{{ t(`mobile_proxy_spec.adv2`) }}</span>
            </li>
            <li class="v_center space-x-2">
              <CheckIcon :size="18" class="success" />
              <span>{{ t(`mobile_proxy_spec.adv3`) }}</span>
            </li>
          </ul>
          <div class="my-button v_center space-x-3">
            <a href="/pricing/mobile">
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
            src="@/assets/images/mobile_proxy/1m.png"
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
              <span>{{ t("mobile_proxy_spec.proxy_endpoints") }}</span>
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
              /><span>{{ t("mobile_proxy_spec.proxy_network") }}</span>
            </div>
            <p class="text-lg font-medium">{{ t("mobile_proxy_spec.proxy_ip") }}</p>
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
            <p class="text-lg font-medium">{{ t("mobile_proxy_spec.proxy_country") }}</p>
          </li>
          <li class="flex-1 shrink-0 rounded-lg box-border px-6 py-5 space-y-4">
            <div class="v_center space-x-3">
              <img
                loading="lazy"
                width="16"
                height="16"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAm5JREFUWEfFlz9oFEEUxr93s1ubSjStGPQKGxst1IAISWF35nJBMKBoFQULrQIpxULxGkG0iuS8M4JgkYQU/iu0EMRCixPbCAFBGxVuZp/M7u25tzub21lX9sq9ee/7zbw338wQSv6Rtf4SV9DFPjDGATUexIstELYwgS9YIs8mZ3aARm8KHtXAOA3wbrMIbYPwDBVeRctdzwIyGmCWj4HlTTCOZEk4GEN4C3Ku4RG93ikuHaDDAqvyFoDLVsLJwU3UnKuYIWXKYwa4yLvwXT0G+NQ/ivfDaRNj4gzu0Y94viSAP3O1Vpx4KEmbqInp+EokAeqyCeaFYmaeyNJEx70S/ToMoBvOk6/+k3iQtuIcjzbmMEC998a6221p9e5ou0cHhRnE632usGabL3U8oQumMaNnCEyHPvF3BeryPpjPFwNAD1EV59DFIUj5PpGT6AHazgX9PQDQ9vpJfU13OBusvri25Fl1HZ53IxlN26iKvdq2A4A53g8puzYy5rER8bq6BOa7AJu9xnEmsEKfgz8bfAJKvjAmJToLV7xDTz4F40B6zWkZB8W8fxiNEtdJhDOJFr3sA8gGFK+kJJ9Cx93APO/BL/ncDGEx81BE0BxaTisDAH0DiZNo0wczRA5xfwWGAHYogU+cBpFTPFGCTE0Yg/gpF1B1FjPXPF7foSbMvA0jEGHCLA2XNILYNtQDMhtRBCKXuK5o3Ij8rWhhxUS/wfwRwOFc3mG0Yn8VyjyMNEDpx7GGmOndKeAemFaZERcSHVb6lUxDlHopDRdPr8QTdbuA+2GOa3m0gqU9TOJtVNrTLA5S2uM0l+WNDvoDmkRFMFVo+94AAAAASUVORK5CYII="
              /><span>{{ t("mobile_proxy_spec.proxy_uptime") }}</span>
            </div>
            <p class="text-lg font-medium">99.5%</p>
          </li>
          <!--]-->
        </ul>
      </div>
    </div>

    <div class="box_wrap position">
      <div class="container">
        <div class="between position_flex">
          <div class="section_text space-y-7">
            <!-- <img src="" alt=""> -->
            <div class="space-y-5">
              <h2 class="title font-medium">{{ t("mobile_proxy_spec.proxy_title") }}</h2>
              <p class="grey-60 text-lg">
                {{ t("mobile_proxy_spec.proxy_desc") }}
              </p>
            </div>
            <ul class="space-y-5">
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("mobile_proxy_spec.proxy_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("mobile_proxy_spec.proxy_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("mobile_proxy_spec.proxy_adv3") }}</span>
              </li>
            </ul>
          </div>

          <img class="images" loading="lazy" decoding="async" width="600" src="@/assets/images/mobile_proxy/netnut_illustration18.svg" alt="" />
        </div>
      </div>
    </div>

    <div class="box_wrap position">
      <div class="container">
        <div class="between position_flex">
          <img loading="lazy" class="images" decoding="async" width="600" src="@/assets/images/mobile_proxy/netnut_illustration17.svg" alt="" />

          <div class="section_text space-y-7">
            <!-- <img src="" alt=""> -->
            <div class="space-y-5">
              <h2 class="title font-medium">{{ t("mobile_proxy_spec.code_title") }}</h2>
              <p class="grey-60 text-lg">
                {{ t("mobile_proxy_spec.code_desc") }}
              </p>
            </div>
            <ul class="space-y-5">
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("mobile_proxy_spec.code_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("mobile_proxy_spec.code_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("mobile_proxy_spec.code_adv3") }}</span>
              </li>
              <li class="v_center space-x-2">
                <CheckIcon class="success" :size="18" />
                <span>{{ t("mobile_proxy_spec.code_adv4") }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="box_wrap advant">
      <div class="container">
        <div class="title font-medium text-center">{{ t("mobile_proxy_spec.mobile_title") }}</div>

        <div class="content">
          <ul class="grid grid-cols-3 gap-6">
            <li class="rounded-lg p-6 space-y-4 pointer">
              <img loading="lazy" width="40" height="40" src="@/assets/images/mobile_proxy/icon-1.png" />
              <div class="text-lg font-medium">{{ t("mobile_proxy_spec.mobile1_title") }}</div>
              <p>{{ t("mobile_proxy_spec.mobile1_desc") }}</p>
            </li>
            <li class="rounded-lg p-6 space-y-4 pointer">
              <img loading="lazy" width="40" height="40" src="@/assets/images/mobile_proxy/icon-2.png" />
              <div class="text-lg font-medium">{{ t("mobile_proxy_spec.mobile2_title") }}</div>
              <p>{{ t("mobile_proxy_spec.mobile2_desc") }}</p>
            </li>
            <li class="rounded-lg p-6 space-y-4 pointer">
              <img loading="lazy" width="40" height="40" src="@/assets/images/mobile_proxy/icon-3.png" />
              <div class="text-lg font-medium">{{ t("mobile_proxy_spec.mobile3_title") }}</div>
              <p>{{ t("mobile_proxy_spec.mobile3_desc") }}</p>
            </li>
            <li class="rounded-lg p-6 space-y-4 pointer">
              <img loading="lazy" width="40" height="40" src="@/assets/images/mobile_proxy/icon-4.png" />
              <div class="text-lg font-medium">{{ t("mobile_proxy_spec.mobile4_title") }}</div>
              <p>{{ t("mobile_proxy_spec.mobile4_desc") }}</p>
            </li>
            <li class="rounded-lg p-6 space-y-4 pointer">
              <img loading="lazy" width="40" height="40" src="@/assets/images/mobile_proxy/icon-5.png" />
              <div class="text-lg font-medium">{{ t("mobile_proxy_spec.mobile5_title") }}</div>
              <p>{{ t("mobile_proxy_spec.mobile5_desc") }}</p>
            </li>
            <li class="rounded-lg p-6 space-y-4 pointer">
              <img loading="lazy" width="40" height="40" src="@/assets/images/mobile_proxy/icon-6.png" />
              <div class="text-lg font-medium">{{ t("mobile_proxy_spec.mobile6_title") }}</div>
              <p>{{ t("mobile_proxy_spec.mobile6_desc") }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="box_wrap network">
      <div class="container">
        <div class="title font-medium text-center">{{ t("mobile_proxy_spec.network_title") }}</div>

        <div class="content">
          <ul class="grid grid-cols-2 gap-6">
            <li class="rounded-lg p-6 space-y-4 pointer">
              <div class="bck orange"></div>
              <div class="v_center space-x-2">
                <img loading="lazy" width="70" height="70" src="@/assets/images/mobile_proxy/Speed.webp" />
                <div class="text-lg font-medium">{{ t("mobile_proxy_spec.network1_title") }}</div>
              </div>
              <p>{{ t("mobile_proxy_spec.network1_desc") }}</p>
            </li>
            <li class="rounded-lg p-6 space-y-4 pointer">
              <div class="bck blue"></div>
              <div class="v_center space-x-2">
                <img loading="lazy" width="70" height="70" src="@/assets/images/mobile_proxy/Stability.webp" />
                <div class="text-lg font-medium">{{ t("mobile_proxy_spec.network2_title") }}</div>
              </div>
              <p>{{ t("mobile_proxy_spec.network2_desc") }}</p>
            </li>
            <li class="rounded-lg p-6 space-y-4 pointer">
              <div class="bck purple"></div>
              <div class="v_center space-x-2">
                <img loading="lazy" width="70" height="70" src="@/assets/images/mobile_proxy/Quality.webp" />
                <div class="text-lg font-medium">{{ t("mobile_proxy_spec.network3_title") }}</div>
              </div>
              <p>{{ t("mobile_proxy_spec.network3_desc") }}</p>
            </li>
            <li class="rounded-lg p-6 space-y-4 pointer">
              <div class="bck green"></div>
              <div class="v_center space-x-2">
                <img loading="lazy" width="70" height="70" src="@/assets/images/mobile_proxy/support.webp" />
                <div class="text-lg font-medium">{{ t("mobile_proxy_spec.network4_title") }}</div>
              </div>
              <p>{{ t("mobile_proxy_spec.network4_desc") }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="box_wrap advant">
      <div class="container">
        <div class="">
          <ul class="grid grid-cols-3 gap-6">
            <li class="rounded-lg p-6 space-y-4 pointer">
              <img loading="lazy" width="40" height="40" src="@/assets/images/mobile_proxy/icon-1.png" />
              <div class="text-lg font-medium">{{ t("mobile_proxy_spec.data1_title") }}</div>
              <p>{{ t("mobile_proxy_spec.data1_desc") }}</p>
            </li>
            <li class="rounded-lg p-6 space-y-4 pointer">
              <img loading="lazy" width="40" height="40" src="@/assets/images/mobile_proxy/icon-2.png" />
              <div class="text-lg font-medium">{{ t("mobile_proxy_spec.data2_title") }}</div>
              <p>{{ t("mobile_proxy_spec.data2_desc") }}</p>
            </li>
            <li class="rounded-lg p-6 space-y-4 pointer">
              <img loading="lazy" width="40" height="40" src="@/assets/images/mobile_proxy/icon-3.png" />
              <div class="text-lg font-medium">{{ t("mobile_proxy_spec.data3_title") }}</div>
              <p>{{ t("mobile_proxy_spec.data3_desc") }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 不限流量套餐定价 -->
    <div class="box_wrap price">
      <div class="container space-y-6">
        <h1 class="text-4xl font-medium text-center">{{ t(`mobile_proxy_spec.title`) }} {{ t("Price") }}</h1>
        <p class="text-center">
          {{ t("mobile_proxy_spec.price_desc") }}
        </p>
        <ul class="vh_center space-x-5">
          <li class="v_center space-x-2">
            <Check :size="20" class="success" />
            <span>{{ t("mobile_proxy_spec.price_adv1") }}</span>
          </li>
          <li class="v_center space-x-2">
            <Check :size="20" class="success" />
            <span>{{ t("mobile_proxy_spec.price_adv2") }}</span>
          </li>
          <li class="v_center space-x-2">
            <Check :size="20" class="success" />
            <span>{{ t("mobile_proxy_spec.price_adv3") }}</span>
          </li>
        </ul>
        <div class="tips px-3 v_center rounded-lg">
          <div class="v_center space-x-3">
            <div class="major bg-current rounded-full vh_center" style="width: 20px; height: 20px">
              <span class="white">!</span>
            </div>
            <span class="grey-60">{{ t("mobile_proxy_spec.price_note") }}</span>
          </div>
        </div>

        <div class="w-full">
          <ProductList :type="2" :tabbar="false" :pack="5" ref="product"></ProductList>
        </div>
      </div>
    </div>

    <div class="box_wrap question">
      <div class="container">
        <div class="text-3xl font-medium text-center">{{ t("FAQ") }}</div>

        <div class="content space-y-5">
          <Question>
            <template #header>{{ t("mobile_proxy_spec.ques1") }}</template>
            <template #content>
              <p class="text-base grey-80">
                {{ t("mobile_proxy_spec.ans1") }}
              </p>
            </template>
          </Question>
          <Question>
            <template #header>{{ t("mobile_proxy_spec.ques2") }}</template>
            <template #content>
              <p class="text-base grey-80">
                {{ t("mobile_proxy_spec.ans2") }}
              </p>
            </template>
          </Question>
          <Question>
            <template #header>{{ t("mobile_proxy_spec.ques3") }}</template>
            <template #content>
              <p class="text-base grey-80">
                {{ t("mobile_proxy_spec.ans3") }}
              </p>
            </template>
          </Question>
          <Question>
            <template #header>{{ t("mobile_proxy_spec.ques4") }}</template>
            <template #content>
              <p class="text-base grey-80">
                {{ t("mobile_proxy_spec.ans4") }}
              </p>
            </template>
          </Question>
          <Question>
            <template #header>{{ t("mobile_proxy_spec.ques5") }}</template>
            <template #content>
              <p class="text-base grey-80 whitespace-pre-wrap">
                {{ t("mobile_proxy_spec.ans5") }}
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
          <a href="/pricing/mobile" class="started_btn vh_center box-border">
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
