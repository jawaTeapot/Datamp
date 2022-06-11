
<template>
  <div class="dWrap container">
    <div class="dWrap__one">
    <ArticleBreadcrumbs />
    <div class="dWrap__heading">{{ article.name }}</div>
    <div class="dWrap__top">
      <div class="dWrap__bottom"><img src="/img/clock.svg" alt="img">{{ article.read_time }}</div>
      <div class="dWrap__bottom"><img src="/img/eye.svg" alt="img">{{ article.views_count }}</div>
      <div class="dWrap__bottom"><img src="/img/blank.svg" alt="img">{{ formatDate(article.created) }}</div>
    </div>
      <div class="dWrap__img" :style="{ backgroundImage: 'url(' + article.image + ')' }"></div>
      <div class="dArticleContent" v-html="article.text"></div>
    </div>
    <div class="dContent">
      <div class="dContent__heading">Содержание</div>
      <a class="dContent__link" :href="path.path + '#' + anchor.link" v-for="anchor in article.anchors" :key="anchor.link">
        —  {{ anchor.anchor }}
      </a>
      <div class="dContent__img"></div>
    </div>
  </div>
  <div class="dShow-activ container">
    <div class="dShow-case__header">Похожие статьи</div>
    <div class="dShow__content">
      <ArticleShort :article="similarArticle"  v-for="similarArticle in similarArticles" :key="`Related-${similarArticle.slug}`" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useBlogStore } from 'stores/blog'
import * as _ from 'lodash'
import ArticleShort from 'components/blog/ArticleShort.vue'
import ArticleBreadcrumbs from 'components/blog/ArticleBreadcrumbs.vue'

export default defineComponent({
  name: 'BlogArticlePage',
  components: { ArticleBreadcrumbs, ArticleShort },
  async preFetch ({ store, currentRoute }) {
    const slug = _.get(currentRoute.params, 'slug', '') as string
    const blogStore = useBlogStore(store)
    return await Promise.all([blogStore.loadSimilarArticles(slug), blogStore.loadArticle(slug)])
  },
  computed: {
    path () {
      return this.$route
    }
  },
  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    },
    goToArticle (article) {
      this.$router.push({ name: 'BlogArticle', params: { slug: article.slug } })
    }
  },
  setup () {
    const blogStore = useBlogStore()
    const article = computed(() => blogStore.article)
    const similarArticles = computed(() => blogStore.similarArticles)
    return {
      blogStore,
      article,
      similarArticles
    }
  }
})
</script>
<style lang="scss">
@import "../css/mixins";
.dWrap {
  display: flex;
  @include phone {
    display: block;
    padding: 0 10px;
  }
  &__one {
    width: 690px;
    @include phone {
      width: 100%;
    }
  }
  &__heading {
    font-weight: 700;
    font-size: 40px;
    line-height: 56px;
    color: #353535;
    margin: 32px 0;
    @include phone {
      font-size: 30px;
      line-height: 46px;
    }
  }
  &__top{
    width: 478px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 33px;
    @include phone {
      width: auto;
    }
  }
  &__bottom{
    align-items: center;
    display: flex;
    color: #BABABA;
    font-size: 20px;
    font-weight: 600;
    img {
      padding-right: 8px;
    }
  }
  &__img {
    width: 690px;
    height: 360px;
    background-color: #310062;
    border-radius: 32px;
    margin-bottom: 32px;
    background-size: cover;
    background-position: center;
    @include phone {
      width: auto;
      max-width: 100%;
    }
  }
  &__text {
    font-weight: 400;
    font-size: 24px;
    line-height: 38px;
    color: #353535;
    margin-bottom: 16px;
  }
}
.dContent {
  margin-left: 30px;
  @include phone {
    margin-left: 0;
  }
  &__heading {
    font-weight: 700;
    font-size: 32px;
    line-height: 64px;
    color: #353535;
    margin: 32px 0;
    margin-top: 105px;
    @include phone {
      margin: 16px 0;
    }
  }
  &__link {
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
    color: #310062;
    margin-bottom: 8px;
    text-decoration: none;
    display: block;
    cursor: pointer;
  }
  &__img {
    width: 425px;
    height: 200px;
    border-radius: 16px;
    background-color: #310062;
    margin-top: 24px;
    @include phone {
      width: auto;
      margin-bottom: 24px;
    }
  }
}
.dArticleContent {
  max-width: 690px;
  color: #353535;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.8;
  @include phone {
    padding: 0 10px;
  }

  h2 {
    font-weight: 700;
    font-size: 32px;
    line-height: 1.8;
    color: #000000;
    margin-top: 48px;
    margin-bottom: 24px;
    a {
      color: #000000;
      text-decoration: none;
    }
  }
  p {
    margin-bottom: 24px;
  }
  h3 {
    font-weight: 600;
    font-size: 24px;
    line-height: 38px;
    color: #353535;
    margin-top: 24px;
    margin-bottom: 16px;
    a {
      color: #000000;
      text-decoration: none;
    }
  }
  blockquote {
    background-color: #310062;
    border-radius: 16px;
    font-style: italic;
    font-weight: 500;
    font-size: 24px;
    line-height: 38px;
    color: #FFFFFF;
    padding: 32px;
    display: block;
    margin: 24px 0;
  }
  img {
    display: block;
    margin: 0 auto;
  }
  li {
    margin-bottom: 24px;
  }
  a {
    color: #310062;
    cursor: pointer;
  }
}
.dShow__content {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  @include phone {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
.dShow-case {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &__header {
    font-weight: 700;
    font-size: 48px;
    line-height: 64px;
    color: #353535;
    margin: 52px 0 64px;
    @include phone {
      text-align: center;
    }
  }
}
</style>
