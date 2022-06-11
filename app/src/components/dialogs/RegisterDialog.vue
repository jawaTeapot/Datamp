<template>
  <q-dialog :maximized="$q.screen.width <= 550" v-model="isShowing">
    <q-card>
      <q-card-section class="row items-end q-pb-none">
        <q-space />
      <q-btn icon="close" color="purple-10" flat round dense @click="isShowing=false" />
      </q-card-section>
        <q-card-section>
          <div class="text-h6  text-center">Регистрация</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <RegisterForm @onSuccess="isShowing=false" @onLoginClick="onLoginClick" />
        </q-card-section>
      </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import RegisterForm from 'components/forms/RegisterForm.vue'

export default defineComponent({
  name: 'RegisterDialog',
  emits: ['onLoginClick'],
  components: { RegisterForm },
  data () {
    return {
      isShowing: false
    }
  },
  methods: {
    show () {
      this.isShowing = true
    },
    hide () {
      this.isShowing = false
    },
    onLoginClick () {
      this.isShowing = false
      this.$emit('onLoginClick')
    }
  }
})
</script>

<style lang="scss">

</style>
