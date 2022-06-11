<template>
  <div class="flex flex-center">
    <q-form
        @submit="onSubmit"
        class="q-gutter-md"
    >
        <div class="login-form__section">
        <div class="q-mb-xs login-form__section-caption font-montserrat__semi-bold text-grey-9 text-body1">
            Email
        </div>
        <q-input
            ref="emailRef"
            v-model="email"
            dense
            standout="bg-purple-2 text-grey-9"
            type="email"
            lazy-rules
            :rules="emailRules"
            class="login-form__section-input font-montserrat__regular text-main text-grey-9 border-box"
        />
        </div>
        <div class="login-form__section">
        <div class="q-mb-xs login-form__section-caption font-montserrat__semi-bold text-grey-9 text-body1">
            Пароль
        </div>
        <q-input
            ref="passwordRef"
            v-model="password"
            dense
            standout="bg-purple-2 text-grey-9"
            type="password"
            lazy-rules
            :rules="passwordRules"
            class="login-form__section-input font-montserrat__regular text-main text-grey-9 border-box"
        />
        </div>
        <div class="login-form__link-password cursor-pointer font-montserrat__semi-bold text-center text-body1" @click="$emit('onRecoveryClick')">
          Забыли пароль?
        </div>
        <div>
        <q-btn
            label="Войти"
            type="submit"
            color="primary"
            no-caps
            class="full-width"
        />
        </div>
        <div class="login-form__link-registration cursor-pointer font-montserrat__semi-bold text-center text-body1" @click="$emit('onRegisterClick')">
        Регистрация
        </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from 'stores/auth'
import * as _ from 'lodash'
import { Notify, Loading } from 'quasar'

export default defineComponent({
  name: 'LoginForm',
  emits: ['onSuccess'],
  setup () {
    const email = ref()
    const emailRef = ref()
    const password = ref()
    const passwordRef = ref()
    const authStore = useAuthStore()
    return {
      authStore,
      email,
      emailRef,
      password,
      passwordRef,
      emailRules: [
        (val: string) => !!val || 'Это обязательное поле',
        (val: string) => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(val) || 'Вы ввели некорректный email'
      ],
      passwordRules: [
        (val: string) => !!val || 'Это обязательное поле'
      ]
    }
  },
  created () {
    this.cleanForm()
  },
  methods: {
    cleanForm (): void {
      this.email = ''
      this.password = ''
    },
    async onSubmit (): Promise<void> {
      this.emailRef.validate()
      this.passwordRef.validate()
      if (this.emailRef.hasError || this.passwordRef.hasError) {
        Notify.create({
          type: 'warning',
          message: 'Данные не корректно заполнены'
        })
        return
      }
      Loading.show()
      try {
        await this.authStore.login(this.email, this.password, null)
        this.$emit('onSuccess')
        this.cleanForm()
      } catch (error) {
        if (_.has(error, 'response.data.detail')) {
          this.password = ''
        }
      } finally {
        Loading.hide()
      }
    }
  }
})
</script>

<style lang="scss">
.login {
  &-form {
    padding: 0 48px 36px;
    &__section {
      &-input {
        width: 355px;
        .q-field__append {
          display: none;
        }
        .q-field__control {
          height: 44px;
          background: #EEEEEE !important;
          box-shadow: none !important;
          border-radius: 32px;
          input {
            color: #212121 !important;
          }
        }
      }
    }
    &__link-password {
      margin: 12px auto;
    }
    &__link-registration {
      margin-top: 19px;
    }
    &__link-password, &__link-registration {
      color: rgba(58, 1, 102, 0.49);
      &:hover {
        color: #53326C;
      }
    }
    &__btn {
      height: 44px;
      .q-btn__wrapper {
        min-height: auto;
      }
    }
  }
}
@media (max-width: 550px) {
  .login {
    &-form {
      margin-top: 20px;
      &__section {
        &-input {
          width: 100%;
        }
      }
      &__btn {
        min-width: auto;
      }
    }
  }
}
@media (max-width: 400px) {
  .login {
    &-form {
      padding: 0 15px 36px;
    }
  }
}
</style>
