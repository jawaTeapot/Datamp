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

        <div class="login-form__section">
            <div class="q-mb-xs login-form__section-caption font-montserrat__semi-bold text-grey-9 text-body1">
                Повторите пароль
            </div>
            <q-input
                ref="password2Ref"
                v-model="password2"
                dense
                standout="bg-purple-2 text-grey-9"
                type="password"
                lazy-rules
                :rules="password2Rules"
                class="login-form__section-input font-montserrat__regular text-main text-grey-9 border-box"
            />
        </div>

        <div class="login-form__section">
            <div class="q-mb-xs login-form__section-caption font-montserrat__semi-bold text-grey-9 text-body1">
                Как к вам обращаться?
            </div>
            <q-input
                ref="nameRef"
                v-model="name"
                dense
                minLength="3"
                maxlength="12"
                standout="bg-purple-2 text-grey-9"
                lazy-rules
                :rules="nameRules"
                class="login-form__section-input font-montserrat__regular text-main text-grey-9 border-box"
            />
        </div>

        <div>
        <q-btn
            label="Регистрация"
            type="submit"
            no-caps
            color="primary"
            class="full-width"
        />
        </div>
        <div class="login-form__link-registration cursor-pointer font-montserrat__semi-bold text-center text-body1" @click="$emit('onLoginClick')">
        Уже есть аккаунт?
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
  name: 'RegisterForm',
  emits: ['onSuccess'],
  setup () {
    const email = ref()
    const emailRef = ref()
    const name = ref()
    const nameRef = ref()
    const password = ref()
    const password2 = ref()
    const passwordRef = ref()
    const password2Ref = ref()
    const authStore = useAuthStore()
    return {
      authStore,
      email,
      emailRef,
      name,
      nameRef,
      password,
      passwordRef,
      password2,
      password2Ref,
      emailRules: [
        (val: string) => !!val || 'Это обязательное поле',
        (val: string) => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(val) || 'Вы ввели некорректный email'
      ],
      passwordRules: [
        (val: string) => !!val || 'Это обязательное поле'
      ],
      password2Rules: [
        (val: string) => !!val || 'Это обязательное поле'
      ],
      nameRules: [
        (val: string) => !!val || 'Это обязательное поле',
        (val: string) => val.length < 2 || 'Слишком короткое имя',
        (val: string) => val.length > 12 || 'Слишком длинное имя'
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
      this.password2 = ''
      this.name = ''
    },
    async onSubmit (): Promise<void> {
      this.emailRef.validate()
      this.passwordRef.validate()
      this.password2Ref.validate()
      this.nameRef.validate()
      if (this.emailRef.hasError || this.passwordRef.hasError || this.password2Ref.hasError || this.nameRef.hasError) {
        Notify.create({
          type: 'warning',
          message: 'Данные не корректно заполнены'
        })
        return
      }
      if (this.password !== this.password2) {
        Notify.create({
          type: 'warning',
          message: 'Пароли не совпадают'
        })
        return
      }
      Loading.show()
      try {
        await this.authStore.register(this.email, this.password, this.password2, this.name)
        this.$emit('onSuccess')
        this.cleanForm()
      } catch (error) {
        if (_.has(error, 'response.data.detail')) {
          this.password = ''
          this.password2 = ''
        }
      } finally {
        Loading.hide()
      }
    }
  }
})
</script>

<style scoped lang="scss">
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
