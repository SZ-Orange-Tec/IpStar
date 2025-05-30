<template>
  <div class="pc-pricing">
    <!-- pricing_content -->
    <div class="pricing_content">
      <div class="price">
        <div class="introduce column_center">
          <p>{{$t('PCPricing.pricingContentHeart.pOne.p')}}</p>
          <p>{{$t('PCPricing.pricingContentHeart.pTwo')}}<span>{{$t('PCPricing.pricingContentHeart.pOne.span')}}</span></p>
          <i>IPs: 50M+/day</i>
        </div>
        <div class="price_main">
          <ProductList :tabbar="true" :pack="5"></ProductList>
        </div>
      </div>
      <div class="pricing_list_heart">
      </div>
      <!-- pattern  payment -->
      <div class="attern_payment ">
        <!-- <img src="../../../assets/pc_img/pricing_img/mode of payment.png" alt="mode of payment"> -->
        <div class="v_center">
          <img src="../../../assets/pc_img/pricing_img/Paypal.png" alt="">
          <img src="../../../assets/pc_img/pricing_img/Visa.png" alt="">
          <img src="../../../assets/pc_img/pricing_img/yinlian.png" alt="">
          <img src="../../../assets/pc_img/pricing_img/mastercard.png" alt="">
          <img src="../../../assets/pc_img/pricing_img/USDT.png" alt="">
        </div>
        <h1>{{$t('PCPricing.atternPayment.h1')}}</h1>
      </div>
      <!-- area -->
      <div class="area">
        <div class="area_content">
          <h1>{{$t('PCPricing.areaContent.h1')}}</h1>
          <div class="area_nation">
            <ul>
              <li v-for="item,index in areaList" :key="index">
                <img :src="item.imgUrl" alt="">
                <div class="text">
                  <p>{{item.p}}</p>
                  <span>{{item.span}}</span>
                </div>
              </li>
            </ul>
            <h1 @click="moreCountry" class="pointer"><span>200+</span> {{$t('PCPricing.areaContent.h1Two')}} <i></i></h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginStore from "@/store/login"
import ProductList from '../components/product_list/product_list.vue'
export default {
  name: 'PriCing',
  metaInfo: {
    meta: [
      {
        // set meta
        name: 'keyWords',
        content: 'pricing'
      },
      {
        name: 'description',
        content: 'This is the pricing page'
      }
    ]
  },
  components: {
    ProductList
  },
  data () {
    return {
      // 滚动条 所能滚动的距离
      his: null,
      areaList: [
        {
          imgUrl: new URL('../../../assets/pc_img/pricing_img/united states.png',import.meta.url).href,
          p: 'United States',
          span: '894,243 IPs'
        },
        {
          imgUrl: new URL('../../../assets/pc_img/pricing_img/brazil.png',import.meta.url).href,
          p: 'Brazil',
          span: '5,054,208 IPs'
        },
        {
          imgUrl: new URL('../../../assets/pc_img/pricing_img/australia.png',import.meta.url).href,
          p: 'Australia',
          span: '379,344 IPs'
        },
        {
          imgUrl: new URL('../../../assets/pc_img/pricing_img/france.png',import.meta.url).href,
          p: 'France',
          span: '1,592,304 IPs'
        },
        {
          imgUrl: new URL('../../../assets/pc_img/pricing_img/canada.png',import.meta.url).href,
          p: 'Canada',
          span: '586,688 IPs'
        },
        {
          imgUrl: new URL('../../../assets/pc_img/pricing_img/malaysia.png',import.meta.url).href,
          p: 'Malaysia',
          span: '868,208 IPs'
        }
      ]
    }
  },
  methods: {
    // 更多国家
    moreCountry () {
      if (!this.token) {
        this.$message.warning(this.$t('PCHomePage.goToPay'))
        this.$router.push('/sign_in')
      } else {
        this.$router.push('/overview')
      }
    }
  },
  setup(){
    const {token}=loginStore()
    return{
      token
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./pricing.less');
.img-leave {
  opacity: 0.8;
}
.img-leave-to {
  opacity: 0;
  transition: all 1s linear;
  // transform: translateY(-50px);
}
</style>
