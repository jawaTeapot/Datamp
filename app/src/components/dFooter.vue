<template>
  <footer class="dFooter">
    <div class="dColumns container">
    <div class="dColumn">
      <img src="/img/logo_white.svg" alt="logo">
      <a class="dColumn__img" href="#">
        <img src="/img/telegram.svg" alt="logo">
      </a>
      <a class="dColumn__img" href="#">
        <img src="/img/vk.svg" alt="logo">
      </a>
      <a class="dColumn__img" href="#">
        <img src="/img/facebook.svg" alt="logo">
      </a>
      <a class="dColumn__img" href="#">
        <img src="/img/whatsapp.svg" alt="logo">
      </a>
    </div>
    <div class="dColumn">
      <a class="dColumn__link" href="#">Политика конфиденциальности</a>
      <a class="dColumn__link" href="#">Пользовательское соглашение</a>
      <a class="dColumn__link" href="#">Политика оплаты и возврата</a>
      <a class="dColumn__link" href="#">Партнерская программа</a>
      <a class="dColumn__link" href="#">Тарифы</a>
    </div>
    <div class="dColumn">
      <a class="dColumn__link" href="#">Рейтинг поставщиков</a>
      <a class="dColumn__link" href="#">API документация</a>
      <a class="dColumn__link" href="#">Рейтинг брендов</a>
      <a class="dColumn__link" href="#">Контакты</a>
    </div>
    <div class="dColumn">
      <a class="dColumn__link" href="#">Вход и регистрация</a>
      <a class="dColumn__link" href="#">Блог</a>
      <a class="dColumn__link" href="#">FAQ</a>
      <a class="dColumn__link" href="#">API</a>
    </div>
    <div class="dColumn">
      <a class="dColumn__link" href="#">Варианты оплаты</a>
      <a class="dColumn__img" href="#"><img src="/img/visa.svg" alt="logo"></a>
      <a class="dColumn__img" href="#"><img src="/img/mc.svg" alt="logo"></a>
      <a class="dColumn__img" href="#"><img  src="/img/mir.svg" alt="logo"></a>
    </div>
    </div>
    <div class="dFooter__text container">Moneyplace © 2021. Все права защищены</div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from 'stores/auth'

const tabs = [
  {
    link: { name: 'Index' },
    anchor: 'О сервисе'
  },
  {
    link: { name: 'Blog' },
    anchor: 'Блог'
  },
  {
    link: { name: 'Pricing' },
    anchor: 'Тарифы'
  },
  {
    link: { name: 'Faq' },
    anchor: 'FAQ'
  }
]

export default defineComponent({
  name: 'dFooter',
  setup () {
    const authStore = useAuthStore()
    return {
      loginDialogRef: ref(),
      registerDialogRef: ref(),
      tabs: ref(tabs),
      tab: ref(''),
      authStore
    }
  },
  methods: {
    logout () {
      this.authStore.logout(null)
    },
    toService () {
      this.$router.push('/service')
    }
  }
})
</script>

<style lang="scss">
@import "../css/mixins";
.dFooter {
  background-color: #310062;
  &__text {
    padding: 46px 0 47px;
    font-weight: 400;
    line-height: 19px;
    color: #572A84;
    @include phone {
      text-align: center;
    }
  }
}
.dColumns {
  display: flex;
  justify-content: space-between;
  padding-top: 61px;
  @include phone {
    display: block;
    padding-top: 40px;
  }
}
.dColumn {
  display: flex;
  flex-direction: column;
  @include phone {
    display: block;
    &:first-child {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 16px;
    }
    &:last-child {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .dColumn__img img {
        max-width: inherit;
      }
    }
  }
  &__link {
    text-decoration: none;
    margin-bottom: 16px;
    color: #FFFFFF;
    font-weight: 500;
    line-height: 19px;
    @include phone {
      width: 100%;
      display: block;
      padding-left: 20px;
    }
  }
  &__img {
    text-align: center;
    margin-top: 25px;
    @include phone {
      margin-top: 0;
      img {
        max-width: 25px;
      }
    }
  }
}
</style>
