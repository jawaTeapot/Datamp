<template>
  <q-card class="dashboard-widget" :style="styleObject">
    <div class="dashboard-widget__info">
      <div class="text-subtitle1 text-no-wrap" v-html="title"></div>
      <template v-if="loading">
        <q-circular-progress indeterminate size="30px" class="q-mt-sm" color="white"/>
      </template>
      <template v-else>
        <div class="text-h5">
          <vue3-autocounter ref='counter'
                            :startAmount='0'
                            :endAmount='value'
                            :duration='duration'
                            separator=','
                            decimalSeparator='.'
                            :decimals='0'
                            :autoinit='true'
          />
        </div>
      </template>
    </div>
      <q-icon class="dashboard-widget__icon" size="48px" :name="icon" v-if="icon"/>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Vue3Autocounter from 'vue3-autocounter'

export default defineComponent({
  name: 'CounterWidget',
  components: { Vue3Autocounter },
  props: {
    /**
      * название
      */
    title: {
      type: String,
      default: ''
    },
    /**
      * выводимое число
      */
    value: {
      type: Number,
      default: null
    },
    /**
      * фон иконки
      */
    iconBackgroundColor: {
      type: String,
      default: '#ffffff'
    },
    /**
      * цвет иконки
      */
    iconColor: {
      type: String,
      default: '#000000'
    },
    /**
      * иконка
      */
    icon: {
      type: String,
      default: ''
    },
    /**
      * длительность инкремента значения
      * от 0 до value
      */
    duration: {
      type: Number,
      default: 1
    },
    /**
      * история значений
      * для line графика
      */
    history: {
      type: Array as PropType<number[]>
    }
  },
  computed: {
    styleObject () {
      return {
        color: this.iconColor,
        background: this.iconBackgroundColor,
        width: '100%'
      }
    },
    loading (): boolean {
      return !this.value
    }
  }
})
</script>

<style lang="scss" scoped>
.dashboard-widget {
  display: flex;
  padding: 16px;
  align-items: center;
  &__info {
    flex-grow: 1;
  }
}
</style>
