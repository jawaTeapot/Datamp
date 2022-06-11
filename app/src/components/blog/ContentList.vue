<template>
  <div class="q-pa-md">
    <div v-for="item in data" :key="item.link">
      <a :href="item.link">{{ item.anchor }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { AnchorModel } from 'stores/blog'

export default defineComponent({
  name: 'ContentList',
  props: {
    /**
      * Массив из якорей (быстрые ссылки по статье)
      */
    data: {
      type: Array as PropType<AnchorModel[]>
    }
  }
})
</script>

<style scoped lang="scss">

</style>
