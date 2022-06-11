<template>
    <div class="dFaq container">
      <h1 class="dFaq__heading">Вопросы и ответы</h1>
      <div class="dFaq__accordion">
      <q-list>
        <q-expansion-item class="dFaq__item"
          expand-separator
          :label="item.name"
          v-for="item in data"
          :key="item.name"
        >
          <div class="dFaq__content">{{ item.description }}</div>
        </q-expansion-item>
      </q-list>
    </div>
    <div class="dFaq__btn">
      <q-btn color="primary">Получить консультацию</q-btn>
    </div>
    <d-charts/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DCharts from 'components/dCharts.vue'

const data = [
  {
    name: 'У меня есть аккаунт. Как мне войти?',
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.`
  },
  {
    name: 'Как вам задонатить?',
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.`
  },
  {
    name: 'А имеет смысл? Мне подойдет?',
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.`
  },
  {
    name: 'Для юридических лиц как проходит оплата?',
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.`
  },
  {
    name: 'Сколько все это стоит?',
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.`
  }
]

export default defineComponent({
  name: 'FaqPage',
  components: { DCharts },
  data () {
    return {
      data
    }
  }
})
</script>
<style lang="scss">
@import "../css/mixins";
.dFaq {
  &__heading {
     font-weight: 700;
     font-size: 48px;
     line-height: 64px;
     text-align: center;
     margin: 80px 0 64px;
    @include phone {
      margin: 30px 0 24px;
    }
   }
   &__accordion {
     max-width: 826px;
     margin: 0 auto;
     margin-bottom: 40px;

     .q-expansion-item__container {
       border-radius: 16px;
       overflow: hidden;
     }
    }
  &__item {
    background-color: #310062;
    border-radius: 16px;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #FFFFFF;
    margin-bottom: 24px;
    @include phone {
      font-size: 16px;
    }
    .q-item__label {
      padding: 30px 0 30px 17px;
      @include phone {
        padding: 20px 0 20px 7px;
      }
    }
    .q-icon{
      color: #FFFFFF;
      font-size: 40px;
    }
  }
  &__content {
    background-color: #5A2194;
    padding: 36px 0 32px 32px;
    border-radius: 0 0 16px 16px;
    font-weight: 500;
  }
  &__btn {
    text-align: center;
    margin-bottom: 64px;
  }
}
</style>
