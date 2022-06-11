<template>
  <div class="dBlog container">
    <div class="dBlog__header">
      <div class="dBlog__heading">Блог</div>
      <div class="dBlog__input-wrap">
        <input
          class="dBlog__input"
          type="text"
          placeholder="Поиск статей"
          v-model="search"
        />
      </div>
    </div>
    <div class="dSailing">
      <a class="dSailing__link"
         href="#"
         v-for="cat in categories"
         :key="cat.slug"
         :class="{ _active: category === cat.slug }"
         @click.prevent="changeCategory(cat.slug)"
      >
        {{ cat.name }}
      </a>
    </div>
    <div class="dPromo" v-if="firstArticle" @click="goToArticle(firstArticle)">
      <div class="dPromo__img" :style="{ backgroundImage: 'url(' + firstArticle.image + ')' }"></div>
      <div class="dPromo__content">
        <div class="dPromo__heading">{{ firstArticle.name }}</div>
        <div class="dPromo__text" v-html="firstArticle.description"></div>
        <button class="dPromo__btn">Работа с Wildberries</button>
      <div class="dPromo__inf">
        <div class="dPromo__bottom"><img src="/img/clock.svg" alt="">{{ firstArticle.read_time }}</div>
        <div class="dPromo__bottom"><img src="/img/eye.svg" alt="">{{ firstArticle.views_count }}</div>
        <div class="dPromo__bottom"><img src="/img/blank.svg" alt="">{{ formatDate(firstArticle.created) }}</div>
      </div>
      </div>
    </div>
    <div class="dShow">
      <template v-if="articles.length || firstArticle ">
        <ArticleShort :article="article"  v-for="article in articles" :key="`Related-${article.slug}`" />
      </template>
      <template v-else>
        Статей не найдено
      </template>
    </div>
    <div class="dShow__pagination">
      <q-pagination
        v-model="page"
        :max="total"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import * as _ from 'lodash'
import ArticleShort from 'components/blog/ArticleShort.vue'
import { ShortArticleModel, useBlogStore } from 'stores/blog'

export default defineComponent({
  name: 'BlogPage',
  components: { ArticleShort },
  async preFetch ({ store, currentRoute }) {
    const blogStore = useBlogStore(store)
    blogStore.params = {
      category: _.get(currentRoute.query, 'category', '') as string,
      page: _.get(currentRoute.query, 'page', 1) as number,
      page_size: _.get(currentRoute.query, 'page_size', 7) as number,
      search: _.get(currentRoute.query, 'search', '') as string
    }
    return await Promise.all([blogStore.loadCategories(), blogStore.loadArticles()])
  },
  methods: {
    changeCategory (category) {
      this.category = category
    },
    goToArticle (article) {
      this.$router.push({ name: 'BlogArticle', params: { slug: article.slug } })
    },
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    }
  },
  setup () {
    const blogStore = useBlogStore()
    const categories = computed(() => blogStore.categories)
    const firstArticle = computed(() => blogStore.firstArticle)
    const total = computed(() => Math.ceil(blogStore.totalCount / 7))
    return {
      blogStore,
      categories,
      firstArticle,
      total,
      loadArticlesDebounce: _.debounce(blogStore.loadArticles, 1000)
    }
  },
  data () {
    return {
      page: 1,
      search: '',
      category: ''
    }
  },
  created () {
    this.page = this.$route.query.page ? Number(this.$route.query.page) : this.blogStore.params.page
    this.search = this.blogStore.params.search
    this.category = this.$route.query.category ? this.$route.query.category as string : this.blogStore.categories[0]?.slug
  },
  computed: {
    articles (): ShortArticleModel[] {
      return this.blogStore.nextArticles
    }
  },
  watch: {
    page () {
      this.blogStore.params.page = this.page
      this.blogStore.loadArticles()
      this.$router.replace({ query: { ...this.$route.query, page: this.page } })
    },
    search () {
      this.blogStore.params.search = this.search
      this.loadArticlesDebounce()
    },
    category () {
      this.blogStore.params.category = this.category
      this.blogStore.loadArticles()
      this.$router.replace({ query: { ...this.$route.query, category: this.category } })
    }
  }
})
</script>
<style lang="scss">
@import "../css/mixins";
 .dBlog {
   &__header {
     margin-top: 92px;
     display: flex;
     justify-content: center;
     align-items: center;
     position: relative;
     @include phone {
       display: block;
       text-align: center;
       margin-top: 30px;
     }
   }
   &__heading {
     margin-bottom: 32px;
     font-weight: 700;
     font-size: 48px;
     line-height: 64px;
   }
   &__input-wrap {
     position: absolute;
     background: #EEEEEE;
     border-radius: 33px;
     right: 0;
     top: 15px;
     &:before {
       display: block;
       content: '';
       width: 24px;
       height: 24px;
       border-radius: 50%;
       position: absolute;
       top: 12px;
       left: 18px;
       background: url(/icons/search-icon.svg) no-repeat;
       background-size: cover;
       background-position: center;
     }
     @include phone {
       position: relative;
       top: 0;
       text-align: left;
       margin-bottom: 30px;
     }
   }
   &__input {
     width: 250px;
     padding: 10px 18px;
     padding-left: 50px;
     border: none;
     outline: none;
     font-size: 16px;
     line-height: 28px;
     background-color: transparent;
   }
 }
 .dSailing {
   text-align: center;
   margin-bottom: 47px;
   &__link {
     margin-right: 21px;
     text-decoration: none;
     font-weight: 500;
     font-size: 24px;
     line-height: 32px;
     color: #000000;
     :hover {
       color: #310062;
     }
     @include phone {
       display: block;
       margin-bottom: 15px;
     }
     &._active {
       font-weight: 700;
       color: #310062;
     }
   }
 }
 .dPromo {
   display: flex;
   justify-content: space-between;
   margin-bottom: 56px;
   cursor: pointer;
   @include phone {
     display: block;
     width: 360px;
     margin: 0 auto;
     margin-bottom: 56px;
   }
   &__img {
     width: 671px;
     height: 392px;
     background-color: #310062;
     border-radius: 25.2988px;
     background-size: cover;
     background-position: center;
     @include phone {
       width: 360px;
       height: 220px;
       margin: 0 auto;
       margin-bottom: 20px;
     }
   }
   &__content {
     width: 440px;
     @include phone {
       width: 100%;
     }
   }
   &__heading {
     font-weight: 700;
     font-size: 30px;
     line-height: 38px;
     color: #353535;
     @include phone {
       line-height: 36px;
     }
   }
   &__text {
     margin: 19px 0;
     font-weight: 500;
     font-size: 20px;
     line-height: 28px;
     color: #4A4A4A;
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
       margin-right: 8px;
     }
   }
   &__btn {
     padding: 7px 28px;
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
 }
 .dShow {
   display: grid;
   grid-template-columns: 2fr 2fr 1fr;
   @include phone {
     display: block;
     margin: 0 auto;
   }
   &__card{
     height: 100%;
     width: 360px;
     margin-bottom: 65px;
     cursor: pointer;
     @include phone {
       margin: 0 auto;
       margin-bottom: 20px;
     }
   }
   &__img {
     width: 360px;
     height: 263px;
     background-color: #310062;
     margin-bottom: 16px;
     border-radius: 16px;
   }
   &__heading {
     font-weight: 700;
     font-size: 30px;
     line-height: 38px;
     color: #353535;
     margin-bottom: 24px;
     min-height: 80px;
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
   &__pagination {
     display: flex;
     justify-content: center;
     margin: 65px 0;
   }
 }
</style>
