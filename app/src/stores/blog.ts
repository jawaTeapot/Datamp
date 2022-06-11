import { defineStore } from 'pinia'
import * as _ from 'lodash'
import { api } from 'boot/axios'

export interface ParamsModel {
    category: string;
    page: number;
    page_size: number;
    search: string;
}

export interface CategoryModel {
  slug: string;
  name: string;
}

export interface ShortArticleModel {
  slug: string;
  name: string;
  description: string;
  image: string;
  created: string;
  read_time: string;
  views_count: number;
  categories: CategoryModel[]
}

export interface AnchorModel {
  link: string;
  anchor: string;
}

export interface ArticleModel {
  name: string;
  text: string;
  image: string;
  created: string;
  slug: string;
  read_time: string;
  views_count: number;
  anchors: AnchorModel[];
}

export const useBlogStore = defineStore('blog', {
  state: () => ({
    params: {} as ParamsModel,
    categories: [] as CategoryModel[],
    isLoadedCategories: false,
    articles: [] as ShortArticleModel[],
    paramsHash: '',
    totalCount: 0,
    article: {} as ArticleModel,
    firstArticle: {} as ShortArticleModel,
    nextArticles: [] as ShortArticleModel[],
    similarArticles: [] as ShortArticleModel[]
  }),
  getters: {
    // firstArticle: (state) => state.articles[0],
    // nextArticles: (state) => state.articles.slice(1),
    countPages: (state) => state.totalCount < state.params.page_size ? 1 : Math.ceil(state.totalCount / state.params.page_size)
  },
  actions: {
    async loadCategories () {
      if (this.isLoadedCategories === true) return
      const { data } = await api.get('blog/v1/categories')
      this.categories = data
      this.isLoadedCategories = true
    },
    async loadArticles () {
      const paramsHash = JSON.stringify(this.params)
      if (this.paramsHash === paramsHash) return
      const params = this.params
      const { data } = await api.get('blog/v1/articles', { params })
      this.firstArticle = data.results[0]
      this.nextArticles = data.results.slice(1)
      this.totalCount = data.count
      this.paramsHash = paramsHash
    },
    async loadArticle (slug: string) {
      if (_.get(this.article, 'slug', '') === slug) return
      const { data } = await api.get(`blog/v1/article/${slug}`)
      this.article = data
    },
    async loadSimilarArticles (slug: string) {
      if (_.get(this.article, 'slug', '') === slug) return
      const { data } = await api.get(`blog/v1/article/${slug}/similar`)
      this.similarArticles = data
    }
  }
})
