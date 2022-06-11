<template>
  <div>
    <div class="card-rate column full-height">
      <div class="card-rate__headline">
        <div class="q-mb-xs card-rate__headline-name font-montserrat__medium text-black">{{ name }}</div>
        <div class="card-rate__headline-title row">
          <div class="card-rate__headline-symbol font-montserrat__medium text-main text-black">₽</div>
          <div class="q-mr-xs card-rate__headline-price font-montserrat__medium text-black">{{ price }}</div>
          <div class="card-rate__headline-mounth font-montserrat__medium text-body2 text-black text-no-wrap">/{{ period }}</div>
        </div>
      </div>
      <div class="card-rate__content bg-purple-2 font-montserrat__regular text-body2 text-center text-grey-9" >
        <div v-html="htmlDescription"></div>
        <q-btn
          no-caps
          flat
          class="login-form__btn full-width border-box bg-purple-5 font-montserrat__bold text-black text-main"
          label="Подключить"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PricingItem',
  props: {
    /**
      * название тарифа
      */
    name: {
      type: String
    },
    /**
      * цена тарифа
      */
    price: {
      type: Number
    },
    /**
      * Период тарифа
      */
    period: {
      type: String
    },
    /**
      * Описание тарифа
      */
    htmlDescription: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped lang="scss">
.card-rate {
  &__headline {
    border-radius: 15px 15px 0 0;
    padding: 12px 4px 14px 18px;
    &-title {
      flex-wrap: nowrap;
    }
    &-name {
      font-size: 20px;
      line-height: 24px;
    }
    &-symbol {
      margin-top: 10px;
      margin-right: 8px;
      align-self: flex-start;
    }
    &-price {
      font-size: 40px;
      letter-spacing: -0.02em;
    }
    &-mounth {
      margin-bottom: 12px;
      align-self: flex-end;
    }
  }
  &__content {
    flex-grow: 1;
    padding: 30px 16px;
    border-radius: 0 0 15px 15px;
    &-item {
      line-height: 100%;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
