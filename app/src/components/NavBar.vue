<template>
  <header class="dHeader">
    <div class="dNav container" :class="{ _white: white }">
      <img class="dNav__img" :src="white ? '/img/logo_white.svg' : '/img/logo_black.svg'" alt="logo">
      <div class="dNav__links">
        <router-link class="dNav__link" :to="{ name: 'Index' }">О сервисе</router-link>
        <router-link class="dNav__link" :to="{ name: 'Blog' }">Блог</router-link>
        <router-link class="dNav__link" :to="{ name: 'Pricing' }">Тарифы</router-link>
        <router-link class="dNav__link" :to="{ name: 'Faq' }">F.A.Q.</router-link>
      </div>
      <div class="dNav__reg" >
        <template v-if="authStore.isAuthenticated">
          <q-btn :color="white ? 'white' : 'black'" flat @click="toService">На сервис</q-btn>
          <q-btn color="primary" class="dNav__regBtn" @click="logout">Выйти</q-btn>
        </template>
        <template v-else>
          <LoginDialog ref="loginDialogRef" @onRegisterClick="registerDialogRef.show()"/>
          <q-btn :color="white ? 'white' : 'black'" flat @click="loginDialogRef.show()">Вход</q-btn>
          <RegisterDialog ref="registerDialogRef" @onLoginClick="loginDialogRef.show()"/>
          <q-btn color="primary" class="dNav__regBtn" @click="registerDialogRef.show()">Регистрация</q-btn>
        </template>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from 'stores/auth'
import LoginDialog from 'components/dialogs/LoginDialog.vue'
import RegisterDialog from 'components/dialogs/RegisterDialog.vue'

export default defineComponent({
  name: 'NavBar',
  components: { LoginDialog, RegisterDialog },
  props: {
    white: Boolean
  },
  setup () {
    const authStore = useAuthStore()
    return {
      loginDialogRef: ref(),
      registerDialogRef: ref(),
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
 .dNav {
   display: flex;
   justify-content: space-between;
   padding-top: 32px;
   align-items: center;
   @include phone {
     flex-direction: column;
   }
   &__img {
     @include phone {
       order: 1;
     }
   }
   &__links {
     @include phone {
       order: 3;
       margin-top: 40px;
     }
     .router-link-exact-active {
       font-weight: 700;
       text-decoration-line: underline;
     }
   }
   &__link {
     text-decoration: none;
     font-weight: 500;
     font-size: 16px;
     line-height: 24px;
     color: #000000;
     margin-right: 48px;
     &:hover {
      color: #310062;
     }
     @include phone {
       margin-right: 20px;
     }
   }
   &__reg {
     @include phone {
       order: 2;
       margin-top: 20px;
     }
   }
   &__regBtn {
     margin-left: 10px;
   }
   &._white {
     .dNav__link {
       color: white;
       &:hover {
         color: white;
       }
     }
   }
 }
</style>
