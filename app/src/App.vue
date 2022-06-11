<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
@import 'css/mixins.scss';
body {
  font-family: 'Inter', sans-serif;
}
.container {
  max-width: 1144px;
  margin: 0 auto;
  @include phone {
    max-width: 100%;
  }
}
.q-btn {
  padding: 12px 24px !important;
  font-size: 16px !important;
  line-height: 24px !important;
  text-transform: none !important;
  border-radius: 8px !important;
}

.q-pagination {
  .q-btn {
    padding: 0 !important;
    width: 40px;
    height: 40px;
    border-radius: 50% !important;
    margin-right: 10px;
    box-shadow: none !important;
    &:last-child {
      margin-right: 0;
    }
    &:before {
      display: none !important;
    }
    &.bg-primary {
      background: #310062 !important;
    }
  }
}
.q-carousel {
  background: transparent;
}
.carousel__pagination-button {
  width: 16px;
  height: 16px;
  background: #A684C9;
  border-radius: 50%;
}
.carousel__pagination-button--active {
  background: #FFFFFF;
}
.carousel__pagination {
  margin-top: 54px;
}
.carousel__slide {
  opacity: 0.7;
}
.carousel__slide--visible {
  opacity: 1;
}
</style>
