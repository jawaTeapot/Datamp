<template>
  <div class="dRates container">
    <div class="dRates__heading">Тарифы</div>
    <div class="dSubscriptions-wrap">
      <div class="dSubscriptions">
        <div class="dSubscriptions__option"
             v-for="rate in rates"
             :key="rate.period"
             @click="tab = rate.period"
             :class="{ _active: tab === rate.period }"
        >
          {{ rate.period }}
          <div v-if="rate.sale" class="dSubscriptions__sale">
            {{ rate.sale }}
          </div>
        </div>
      </div>
    </div>
    <div class="dProduct">
      <div class="dProduct__card"
           v-for="tabTariff in tabTariffs"
           :key="`TabTariff [${tabTariff.name}]`"
      >
        <div class="dProduct__top">
          <div class="dProduct__heading" :class="{ _big: bigHeader }">{{ tabTariff.name }}</div>
          <div class="dProduct__content" v-html="tabTariff.description_html"></div>
        </div>
        <div class="dProduct__bottom">
          <div class="dProduct__bottom-text-mini">{{ tabTariff.period }}</div>
          <div class="dProduct__bottom-text">{{ formatPrice(tabTariff.price) }} ₽</div>
          <div class="dFaq__btn dProduct__bottom-btn">
            <q-btn color="primary">Попробовать <img class="dProduct__bottom-img" src="/img/vr.svg" alt="img"></q-btn>
          </div>
        </div>
      </div>
    </div>
    <d-chart />
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import {computed, defineComponent, ref} from 'vue'
import * as _ from 'lodash'
import dChart from '../components/dCharts.vue';

import {usePriceStore} from 'stores/price'

export default defineComponent({
  name: 'PricingPage',
  components: { dChart },
  async preFetch ({ store }) {
    const priceStore = usePriceStore(store)
    return await priceStore.loadPrices()
  },
  setup () {
    const priceStore = usePriceStore()
    const tariffs = computed(() => priceStore.getTariffs)
    const rates = computed(() => priceStore.getRates)
    return { priceStore, tariffs, tab: ref(''), rates, tabTariffs: [], bigHeader: false }
  },
  mounted () {
    if (this.rates) {
      this.tab = this.rates[0].period
    }
  },
  methods: {
    formatPrice (number) {
      return number.toLocaleString();
    },
  },
  watch: {
    tab () {
      const rateData = _.findLast(this.rates, { period: this.tab })
      this.tabTariffs = []
      for (let i = 0; i < rateData.prices.length; i++) {
        const tariff = _.findLast(this.tariffs, { name: rateData.prices[i].name })
        if (!tariff) continue
        tariff['price'] = rateData.prices[i].price
        tariff['period'] = rateData.period
        if (tariff.name.length > 13) {
          this.bigHeader = true;
        }
        this.tabTariffs.push(tariff)
      }
    }
  }
})
</script>
<style lang="scss">
@import "../css/mixins";
.dRates{
  &__heading {
    text-align: center;
    font-weight: 700;
    font-size: 48px;
    line-height: 64px;
    margin: 92px 0 60px;
    @include phone {
      margin: 30px 0 24px;
    }
  }
}
.dSubscriptions-wrap {
  display: flex;
  justify-content: center;
}
.dSubscriptions {
  display: inline-flex;
  margin: 0 auto;
  margin-bottom: 64px;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(35, 6, 64, 0.15);
  border-radius: 93px;
  background-color: #310062;
  @include phone {
    display: block;
    border-radius: 36px;
  }

  &__option {
    box-shadow: 0px 0px 20px rgba(35, 6, 64, 0.15);
    border-radius: 93px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    padding: 19px 37px;
    cursor: pointer;
    color: white;
    position: relative;
    &._active {
      background-color: white;
      color: #310062;
    }
  }
  &__sale {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 73px;
    height: 34px;
    background: #FE3D98;
    border-radius: 39px;
    transform: rotate(28deg);
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
    position: absolute;
    top: -10px;
    right: 0px;
    @include phone {
      top: 0;
      right: -30px;
    }
  }
}

.dProduct {
  display: flex;
  justify-content: space-between;
  margin-bottom: 64px;
  @include phone {
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 14px;
  }
  &__card {
    justify-content: space-between;
    flex-direction: column;
    display: flex;
    height: 619px;
    width: 275px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    @include phone {
      margin-bottom: 40px;
      height: auto;
    }
  }
  &__content {
    padding: 0 15px;
    li {
      display: flex;
      list-style: none;
      margin-bottom: 12px;
      &:before {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        background: url(/img/check_circle.svg) no-repeat;
        background-size: cover;
        margin-right: 10px;
      }
    }
  }
  &__heading {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 32px;
    line-height: 32px;
    color: #FFFFFF;
    background-color: #310062;
    padding: 32px 0;
    text-align: center;
    border-radius: 32px 32px 0 0;
    margin-bottom: 28px;
    word-break: break-all;

    &._big {
      min-height: 128px;
    }
  }
  &__case {
    display: flex;
    align-items: flex-start;
    margin-left: 15px;
  }
  &__img {
    margin-right: 10px;
    position: relative;
    top: 4px;
  }
  &__top-text {
    font-weight: 500;
    line-height: 32px;
    color: #464646;
  }
  &__bottom {
    padding: 0 15px 18px 15px;
    .q-btn {
      width: 100%;
    }
  }
  &__bottom-text-mini{
    font-weight: 600;
    line-height: 24px;
    color: #A4A4A4;
  }
  &__bottom-text{
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    letter-spacing: -0.06em;
    color: #313131;
    margin-bottom: 32px;
  }
  &__bottom-img{
    margin-left: 5px;
  }
}
</style>
