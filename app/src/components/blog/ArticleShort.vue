<template>
  <div class="dShow-case" @click="goToArticle(article)">
    <div class="dShow-case__card">
      <div class="dShow-case__img" :style="{ backgroundImage: 'url(' + article.image + ')' }"></div>
      <div class="dShow-case__heading">{{ article.name }}</div>
      <button class="dShow-case__btn" v-if="article.categories[0]">{{ article.categories[0].name }}</button>
      <div class="dShow-case__inf">
        <div class="dShow-case__bottom"><img src="/img/clock.svg" alt="">{{ article.read_time }}</div>
        <div class="dShow-case__bottom"><img src="/img/eye.svg" alt="">{{ article.views_count }}</div>
        <div class="dShow-case__bottom"><img src="/img/blank.svg" alt="">{{ formatDate(article.created) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ShortArticleModel } from 'stores/blog'

export default defineComponent({
  name: 'ArticleShort',
  props: {
    /**
      * Модель статьи (короткая версия)
      */
    article: {
      type: Object as PropType<ShortArticleModel>
    }
  },
  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    },
    goToArticle (article) {
      this.$router.push({ name: 'BlogArticle', params: { slug: article.slug } })
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../css/mixins";
.dShow-case {
  cursor: pointer;
  &__card{
    width: 360px;
    margin-bottom: 65px;
    @include phone {
      margin: 0 auto;
      margin-bottom: 65px;
    }
  }
  &__img {
    width: 360px;
    height: 220px;
    background-color: #310062;
    margin-bottom: 16px;
    border-radius: 16px;
    background-position: center;
    background-size: cover;
  }
  &__heading {
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
    color: #353535;
    margin-bottom: 24px;
    min-height: 120px;
  }
  &__btn {
    padding: 8px 32px;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: white;
    background: radial-gradient(61.97% 2922.15% at 0% 51.11%, #D015BE 0%, #8915D0 100%);
    border-radius: 53px;
    border: none;
    outline: none;
    cursor: pointer;
    margin-bottom: 15px;
  }
  &__inf {
    display: flex;
    justify-content: space-between;
  }
  &__bottom {
    align-items: center;
    display: flex;
    color: #BABABA;
    font-size: 20px;
    font-weight: 600;
    img {
      padding-right: 8px;
    }
  }
}
</style>
