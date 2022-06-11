<template>
  <q-dialog :maximized="$q.screen.width <= 550" v-model="isShowing">
    <q-card>
      <q-card-section class="row items-end q-pb-none">
        <q-space />
      <q-btn icon="close" color="purple-10" flat round dense @click="isShowing=false" />
      </q-card-section>
        <q-card-section>
          <div class="text-h6  text-center">Вход</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <LoginForm @onSuccess="isShowing=false" @onRegisterClick="onRegisterClick"/>
        </q-card-section>
      </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import LoginForm from 'components/forms/LoginForm.vue'

export default defineComponent({
  name: 'LoginDialog',
  emits: ['onRegisterClick'],
  components: { LoginForm },
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
    onRegisterClick () {
      this.isShowing = false
      this.$emit('onRegisterClick')
    }
  }
})
</script>

<style lang="scss">

</style>
