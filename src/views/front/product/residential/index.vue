<template>
  <div class="residential">
    <div class="box_wrap banner">
      <div class="container between">
        <div class="left space-y-5">
          <div class="excellent vh_center rounded h-10">
            <img loading="lazy" src="@/assets/images/product/excellent.png" alt="IpStar" width="257" height="21" />
          </div>
          <h1 class="title font-medium leading-none">{{ t(`product_spec.${secondName}.title`) }}</h1>
          <p class="text-lg">{{ t(`product_spec.${secondName}.desc`, { price: lowest }) }}</p>
          <ul class="space-y-3 p-5">
            <li class="v_center space-x-2">
              <CheckIcon :size="18" class="success" />
              <span>{{ t(`product_spec.${secondName}.adv1`) }}</span>
            </li>
            <li class="v_center space-x-2">
              <CheckIcon :size="18" class="success" />
              <span>{{ t(`product_spec.${secondName}.adv2`, { price: lowest }) }}</span>
            </li>
            <li class="v_center space-x-2">
              <CheckIcon :size="18" class="success" />
              <span>{{ t(`product_spec.${secondName}.adv3`, { price: lowest }) }}</span>
            </li>
          </ul>
          <div class="my-button v_center space-x-3">
            <a :href="priceLink">
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
            src="@/assets/images/product/traffic.png"
            alt="IpStar"
            class="animate__animated animate__bounceInDown"
            style="visibility: visible"
            v-if="secondName === 'residential'"
          />
          <img
            loading="lazy"
            width="497"
            height="380"
            src="@/assets/images/product/staticdata.png"
            alt="IpStar"
            class="animate__animated animate__bounceInDown"
            style="visibility: visible"
            v-if="secondName === 'data_center'"
          />
          <img
            loading="lazy"
            width="391"
            height="431"
            src="@/assets/images/product/isp.png"
            alt="IpStar"
            class="animate__animated animate__bounceInDown"
            style="visibility: visible"
            v-if="secondName === 'rotation'"
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
              <span>{{ t("product_spec.proxy_endpoints") }}</span>
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
              /><span>{{ t("product_spec.proxy_network") }}</span>
            </div>
            <p class="text-lg font-medium">{{ t("product_spec.proxy_ip") }}</p>
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
            <p class="text-lg font-medium">{{ t("product_spec.proxy_country") }}</p>
          </li>
          <li class="flex-1 shrink-0 rounded-lg box-border px-6 py-5 space-y-4">
            <div class="v_center space-x-3">
              <img
                loading="lazy"
                width="16"
                height="16"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAm5JREFUWEfFlz9oFEEUxr93s1ubSjStGPQKGxst1IAISWF35nJBMKBoFQULrQIpxULxGkG0iuS8M4JgkYQU/iu0EMRCixPbCAFBGxVuZp/M7u25tzub21lX9sq9ee/7zbw338wQSv6Rtf4SV9DFPjDGATUexIstELYwgS9YIs8mZ3aARm8KHtXAOA3wbrMIbYPwDBVeRctdzwIyGmCWj4HlTTCOZEk4GEN4C3Ku4RG93ikuHaDDAqvyFoDLVsLJwU3UnKuYIWXKYwa4yLvwXT0G+NQ/ivfDaRNj4gzu0Y94viSAP3O1Vpx4KEmbqInp+EokAeqyCeaFYmaeyNJEx70S/ToMoBvOk6/+k3iQtuIcjzbmMEC998a6221p9e5ou0cHhRnE632usGabL3U8oQumMaNnCEyHPvF3BeryPpjPFwNAD1EV59DFIUj5PpGT6AHazgX9PQDQ9vpJfU13OBusvri25Fl1HZ53IxlN26iKvdq2A4A53g8puzYy5rER8bq6BOa7AJu9xnEmsEKfgz8bfAJKvjAmJToLV7xDTz4F40B6zWkZB8W8fxiNEtdJhDOJFr3sA8gGFK+kJJ9Cx93APO/BL/ncDGEx81BE0BxaTisDAH0DiZNo0wczRA5xfwWGAHYogU+cBpFTPFGCTE0Yg/gpF1B1FjPXPF7foSbMvA0jEGHCLA2XNILYNtQDMhtRBCKXuK5o3Ij8rWhhxUS/wfwRwOFc3mG0Yn8VyjyMNEDpx7GGmOndKeAemFaZERcSHVb6lUxDlHopDRdPr8QTdbuA+2GOa3m0gqU9TOJtVNrTLA5S2uM0l+WNDvoDmkRFMFVo+94AAAAASUVORK5CYII="
              /><span>{{ t("product_spec.proxy_uptime") }}</span>
            </div>
            <p class="text-lg font-medium">99.5%</p>
          </li>
          <!--]-->
        </ul>
      </div>
    </div>

    <!-- 来源 -->
    <div class="box_wrap position">
      <div class="container v_center position_flex">
        <img loading="lazy" class="section_img" src="@/assets/images/product/section_bg.webp" width="550" height="414" />
        <div class="section_text space-y-4">
          <img loading="lazy" src="@/assets/images/product/position.png" width="48" height="48" />
          <h2 class="font-medium">{{ t("product_spec.source_title") }}</h2>
          <p class="text-lg grey-60">
            {{ t("product_spec.source_desc") }}
          </p>
          <div class="btn_box v_center">
            <a :href="priceLink">
              <IpButton type="primary_border px-5 box-border btn">{{ t("product_spec.start_use") }}</IpButton>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 方案 -->
    <div class="box_wrap position">
      <div class="container v_center position_flex">
        <div class="section_text space-y-5">
          <img loading="lazy" src="@/assets/images/product/code.png" width="48" height="48" />
          <h2 class="font-medium">{{ t("product_spec.plan_title") }}</h2>
          <p class="text-lg grey-60">
            {{ t("product_spec.plan_desc") }}
          </p>
          <div class="btn_box v_center space-x-3">
            <a href="/doc">
              <IpButton type="primary_border px-5 box-border btn">{{ t("product_spec.view_doc") }}</IpButton>
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
        <div class="font-medium text-center text-4xl">{{ t("product_spec.why_title") }}</div>
        <ul class="grid grid-cols-3 gap-6">
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits1.png" />
            <div class="text-lg font-medium">{{ t("product_spec.why1_title") }}</div>
            <p>{{ t("product_spec.why1_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits2.png" />
            <div class="text-lg font-medium">{{ t("product_spec.why2_title") }}</div>
            <p>{{ t("product_spec.why2_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits3.png" />
            <div class="text-lg font-medium">{{ t("product_spec.why3_title") }}</div>
            <p>{{ t("product_spec.why3_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits4.png" />
            <div class="text-lg font-medium">{{ t("product_spec.why4_title") }}</div>
            <p>{{ t("product_spec.why4_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits5.png" />
            <div class="text-lg font-medium">{{ t("product_spec.why5_title") }}</div>
            <p>{{ t("product_spec.why5_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits6.png" />
            <div class="text-lg font-medium">{{ t("product_spec.why6_title") }}</div>
            <p>{{ t("product_spec.why6_desc") }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="box_wrap price">
      <div class="container space-y-6">
        <h1 class="text-4xl font-medium text-center">
          <template v-if="type === 0">{{ t("Residential_Proxies") }}</template>
          <template v-else-if="type === 3">{{ t("Data_Center_Proxies") }}</template>
          <template v-else-if="type === 4">{{ t("Rotating_Proxies") }}</template>
          {{ t("Price") }}
        </h1>
        <p class="text-lg grey-80 text-center">
          {{ t(`product_spec.${secondName}.price_desc`) }}
        </p>
        <ul class="vh_center space-x-5">
          <li class="v_center space-x-2">
            <Check :size="20" class="success" />
            <span>{{ t("product_spec.price_adv1") }}</span>
          </li>
          <li class="v_center space-x-2">
            <Check :size="20" class="success" />
            <span>{{ t("product_spec.price_adv2") }}</span>
          </li>
          <li class="v_center space-x-2">
            <Check :size="20" class="success" />
            <span>{{ t("product_spec.price_adv3") }}</span>
          </li>
        </ul>
        <div class="tips px-3 v_center rounded-lg">
          <div class="v_center space-x-3">
            <div class="major bg-current rounded-full vh_center" style="width: 20px; height: 20px">
              <span class="white">!</span>
            </div>
            <span class="grey-60">{{ t("product_spec.price_note") }}</span>
          </div>
        </div>
        <div class="w-full">
          <ProductList :type="type" :tabbar="type === 0" :pack="5" />
        </div>
      </div>
    </div>

    <div class="box_wrap">
      <div class="container">
        <div class="text-3xl font-medium text-center">{{ t("product_spec.country_title") }}</div>

        <div style="margin-top: 60px">
          <ul class="flex flex-wrap" v-if="mapData.length">
            <li class="w-1/2 md:w-1/3 lg:w-1/4" v-for="item in mapData" :key="item.name">
              <div class="column_center rounded-lg text-lg p-5">
                <img loading="lazy" :src="item.icon" alt="" width="36" height="36" />
                <span>{{ item.name }}</span>
                <span>{{ item.value }} IPS+</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="box_wrap position">
      <div class="container">
        <div class="v_center position_flex">
          <div class="section_text space-y-4">
            <img loading="lazy" src="@/assets/images/product/data.png" width="48" height="48" />
            <h2 class="font-medium">{{ t("product_spec.data_title") }}</h2>
            <p class="text-lg grey-80">{{ t("product_spec.data_desc") }}</p>
            <ul class="space-y-2">
              <li class="v_center space-x-3">
                <Check :size="18" class="success" />
                <span>{{ t("product_spec.data_adv1") }}</span>
              </li>
              <li class="v_center space-x-3">
                <Check :size="18" class="success" />
                <span>{{ t("product_spec.data_adv2") }}</span>
              </li>
              <li class="v_center space-x-3">
                <Check :size="18" class="success" />
                <span>{{ t("product_spec.data_adv3") }}</span>
              </li>
              <li class="v_center space-x-3">
                <Check :size="18" class="success" />
                <span>{{ t("product_spec.data_adv4") }}</span>
              </li>
            </ul>
            <div class="btn_box">
              <a href="/overview">
                <IpButton type="primary_border" class="btn">{{ t("product_spec.enter_management") }}</IpButton>
              </a>
            </div>
          </div>

          <img loading="lazy" class="section_img" src="@/assets/images/product/control.png" width="644" height="432" />
        </div>

        <ul class="control_items between !items-stretch">
          <li class="rounded-lg pointer box-border space-y-2">
            <img loading="lazy" src="@/assets/images/product/control_img1.png" width="48" height="48" />
            <div class="text-lg font-medium">{{ t("product_spec.advant_title1") }}</div>
            <p class="grey-80">{{ t("product_spec.advant_desc1") }}</p>
          </li>
          <li class="rounded-lg pointer box-border space-y-2">
            <img loading="lazy" src="@/assets/images/product/control_img2.png" width="48" height="48" />
            <div class="text-lg font-medium">{{ t("product_spec.advant_title2") }}</div>
            <p class="grey-80">{{ t("product_spec.advant_desc2") }}</p>
          </li>
          <li class="rounded-lg pointer box-border space-y-2">
            <img loading="lazy" src="@/assets/images/product/control_img3.png" width="48" height="48" />
            <div class="text-lg font-medium">{{ t("product_spec.advant_title3") }}</div>
            <p class="grey-80">{{ t("product_spec.advant_desc3") }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="box_wrap cases">
      <div class="container">
        <div class="text-3xl font-medium text-center">{{ t("product_spec.cases_title") }}</div>

        <div class="list grid grid-cols-4 gap-6">
          <div href="/zh/solution/web-scraping/" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/web.png" />
            <div class="font-medium text-lg">{{ t("product_spec.case1_title") }}</div>
            <p class="grey-80">{{ t("product_spec.case1_desc") }}</p>
          </div>
          <div href="/zh/solution/market-research/" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/marketing.png" />
            <div class="font-medium text-lg">{{ t("product_spec.case2_title") }}</div>
            <p class="grey-80">{{ t("product_spec.case2_desc") }}</p>
          </div>
          <div href="/zh/solution/ad-verification/" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/ad.png" />
            <div class="font-medium text-lg">{{ t("product_spec.case3_title") }}</div>
            <p class="grey-80">{{ t("product_spec.case3_desc") }}</p>
          </div>
          <div href="/zh/solution/brand-protection/" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/brand.png" />
            <div class="font-medium text-lg">{{ t("product_spec.case4_title") }}</div>
            <p class="grey-80">{{ t("product_spec.case4_desc") }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="box_wrap question">
      <div class="container">
        <div class="text-3xl font-medium text-center">{{ t("product_spec.ques_title") }}</div>

        <div class="content space-y-5">
          <Question>
            <template #header>{{ t(`product_spec.${secondName}.ques1`) }}</template>
            <template #content>
              <p class="text-base grey-80">
                {{ t(`product_spec.${secondName}.ans1`) }}
              </p>
            </template>
          </Question>
          <Question>
            <template #header>{{ t(`product_spec.${secondName}.ques2`) }}</template>
            <template #content>
              <p class="text-base grey-80">
                {{ t(`product_spec.${secondName}.ans2`) }}
              </p>
            </template>
          </Question>
          <Question>
            <template #header>{{ t(`product_spec.${secondName}.ques3`) }}</template>
            <template #content>
              <p class="text-base grey-80">
                {{ t(`product_spec.${secondName}.ans3`) }}
              </p>
            </template>
          </Question>
          <Question>
            <template #header>{{ t(`product_spec.${secondName}.ques4`) }}</template>
            <template #content>
              <p class="text-base grey-80 whitespace-pre-wrap">
                {{ t(`product_spec.${secondName}.ans4`) }}
              </p>
            </template>
          </Question>
          <Question>
            <template #header>{{ t(`product_spec.${secondName}.ques5`) }}</template>
            <template #content>
              <p class="text-base grey-80 whitespace-pre-wrap">
                {{ t(`product_spec.${secondName}.ans5`) }}
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
          <a :href="priceLink" class="started_btn vh_center box-border">
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
import ProductList from "../../components/product_list/product_list.vue"
import layoutStore from "../../../../store/layout"
import loginStore from "../../../../store/login"

const { isLogin } = loginStore()

const { t } = useI18n()
const route = useRoute()
const nameReg = /residential|rotation|data_center/
const secondName = computed(() => (nameReg.test(route.params.name) ? route.params.name : "residential"))
const type = computed(() => {
  switch (secondName.value) {
    case "residential":
      return 0
    case "unlimited":
      return 1
    case "mobile":
      return 2
    case "data_center":
      return 3
    case "rotation":
      return 4
    default:
      return 0
  }
})
const priceLink = computed(() => {
  switch (secondName.value) {
    case "residential":
      return "/pricing/residential"
    case "unlimited":
      return "/pricing/unlimited"
    case "mobile":
      return "/pricing/mobile"
    case "data_center":
      return "/pricing/data_center"
    case "rotation":
      return "/pricing/rotation"
    default:
      return "/pricing/residential"
  }
})
const { lowestPrice, getLowestPrice } = layoutStore()
const lowest = computed(() => lowestPrice.value[secondName.value])
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

// 国家
const mapData = ref([])
async function IpMap() {
  const { data } = await platDataIndex()

  const countryImg = await import.meta.glob("@/assets/images/product/country/*", { eager: true })

  mapData.value = data.countries.map((item) => {
    const country = item.code === "US" ? "USA" : item.country
    const key = `/src/assets/images/product/country/${country}.svg`
    return {
      name: country,
      // value: (item.ip_count / 10000).toFixed(2),
      value: toThousands(item.ip_count),
      icon: countryImg[key].default,
    }
  })
}
function toThousands(num) {
  // 先将数字转为字符串，并分割整数部分和小数部分
  let str = num.toString()
  let parts = str.split(".")
  let integerPart = parts[0]
  let decimalPart = parts.length > 1 ? "." + parts[1] : ""

  // 核心正则：从右往左，每三位数字前加一个逗号（但不能是开头）
  let reg = /(?!^)(?=(\d{3})+$)/g
  integerPart = integerPart.replace(reg, ",")

  return integerPart + decimalPart
}

onMounted(() => {
  IpMap()
  getLowestPrice()
})
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
